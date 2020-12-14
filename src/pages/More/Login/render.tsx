/* @flow */
// 注册页面

import React, {
  Component,
  FC,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Keyboard,
  TextInputProps,
} from 'react-native';
import Toast from 'react-native-simple-toast';
// @ts-ignore: Unreachable code error
// import { connect } from 'react-redux';
// import { req } from '../../../redux/actions/req';
// import { APPLELOGIN } from '../../../redux/reqKeys';
// import { requestSmsCode } from '../../../request/leanCloud';
// import { weChatLogin, qqLogin, appleLogin } from '../../../redux/actions/user';

// import { WECHATLOGIN, QQLOGIN, APPLELOGIN } from '../../../redux/reqKeys';
import * as Animatable from 'react-native-animatable';
import { checkPhoneNum } from '../../../request/validation';
import {
  StyledContent,
  ThirdPartyInnerLoginView,
  StyledImage,
  SyledImageName,
  StyledActivityIndicator,
  StyledCodeButton,
  StyledCodeButtonText,
  StyledSignInBtn,
  StyledBottomView,
  StyledMoreBtn,
  StyledMoreBtnText,
  StyledInputView,
} from './style';
import { getTheme } from '../../../Theme/index';
import * as WeChat from 'react-native-wechat';
import { strings } from '../../../../locales/i18n';
// const webUrl = 'https://static.dayi.im/static/fudaojun/rule.html?version=20160603182000';
import { SigninBtn } from './components/signin-btn';
import appleAuth from '@invertase/react-native-apple-authentication';
import { usePostRequestSmsCode } from 'src/hooks/interface';
import { UserType } from 'src/data/data-context/interface';
import {
  useAppleLogin,
  useGetInfoOfMe,
  usePhoneLogin,
  useQQLogin,
  useWechatLogin,
} from 'src/data/data-context/user';
import { useNavigation } from '@react-navigation/native';
const { mainColor } = getTheme();

interface LoginProps {
  isWXAppInstalled: boolean;
  authCode: (phone: string) => Promise<{ error?: string }>;
  authLoad: boolean;
  user: UserType;
  loaded: boolean;

  phoneLogin: (phone: string, code: string) => void;
}

interface LoginState {
  time: number;
  codeName: string;
  phone: string;
  ymCode: string;
  isTap: boolean;
  showMobile: boolean;
}

type LoginKey = 'qqLogin' | 'wxLogin' | 'appleLogin';

// @connect(
//   // @ts-ignore: Unreachable code error
//   (state) => ({
//     // data:state.req.get()
//     // loaded: state.user.loaded,
//     theThirdLoaded: state.user.theThirdLoaded,
//     // auth: state.req.get(AUTHCODE),
//   }),
//   // @ts-ignore: Unreachable code error
//   (dispatch) => ({
//     // ...bindActionCreators({},dispatch),
//     //换成 hook 写法
//     // mRegister: (state: { phone: string; ymCode: string }, uid: string) => {
//     //   dispatch(register(state, uid));
//     // },
//     //三合一
//     qqLogin: (user: UserType) => {
//       dispatch(qqLogin(user));
//     },
//     wxLogin: (user: UserType) => {
//       dispatch(weChatLogin(user));
//     },
//     appleLogin: (user: UserType) => {
//       dispatch(appleLogin(user));
//     },
//   }),
// )
class LoginViewClass extends Component<LoginProps, LoginState> {
  phoneRef: RefObject<TextInput> | undefined;
  ymCodeRef: RefObject<TextInput> | undefined;
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      time: 60,
      codeName: '',
      phone: props.user.mobilePhoneNumber ?? (__DEV__ ? '13588833404' : ''), // 号码
      ymCode: __DEV__ ? '924007' : '', // 验证码
      isTap: false,
      showMobile: true,
    };
  }

  id: number = 0;

  _onClickCode = async () => {
    // 发送验证码请求
    const { isTap } = this.state;
    const self = this;
    this.ymCodeRef?.current?.focus();
    const res = await this.props.authCode(this.state.phone);
    console.log('res:', res);
    if (!res.error) {
      Toast.show('发送成功!');
      if (!isTap) {
        this.setState({ isTap: true });
        this.time();
        this.id = setInterval(() => {
          self.time();
        }, 1000);
      }
    }
  };

  time = () => {
    if (this.state.time === 0) {
      this.id && clearInterval(this.id);
      // this.isTap = false;
      this.setState({ isTap: false });
    }

    const nextTime = this.state.time - 1;
    this.setState({
      time: this.state.time === 0 ? 60 : nextTime,
    });
  };

  _goRegist = () => {
    // 判断手机号的正则
    if (!checkPhoneNum(this.state.phone)) {
      Toast.show('不是正确的手机号码');
      this.ymCodeRef?.current?.focus();
      return;
    }
    // 判断验证码的正则
    const reg = /^\d{6}$/;
    const flag = reg.test(this.state.ymCode);
    if (!flag) {
      Toast.show('不是正确验证码');
      this.ymCodeRef?.current?.focus();
      return;
    }
    Keyboard.dismiss();
    this.props.phoneLogin(this.state.phone, this.state.ymCode);
    this.setState({ ymCode: '' });
  };

  componentWillUnmount() {
    this.id && clearInterval(this.id);
  }

  // componentWillReceiveProps(props: LoginProps) {
  //   if (
  //     props.userData.mobilePhoneNumber !== this.props.userData.mobilePhoneNumber
  //   ) {
  //     this.setState({ phone: props.userData.mobilePhoneNumber });
  //   }
  // }

  render() {
    const { authLoad } = this.props;
    const { phone, time, isTap, ymCode } = this.state;
    const { setState, phoneRef, ymCodeRef, _onClickCode, _goRegist } = this;
    const codeEnable = checkPhoneNum(phone) && time === 60 && !isTap;
    const reg = /^\d{6}$/;
    const { loaded } = this.props;
    const flag = reg.test(ymCode) && checkPhoneNum(phone);
    return (
      <>
        <View style={styles.top}>
          <StyledInputView>
            <RenderRowMain
              title={'手机号:'}
              placeholder="请填入手机号"
              onChangeText={(text) => setState({ phone: text })}
              keyboardType="numeric"
              maxLength={11}
              inputRef={phoneRef}
              defaultValue={phone}
              onSubmitEditing={() => phoneRef?.current?.focus()}
              // ref={(ref = this.phone = ref)}
            />
          </StyledInputView>
          <View style={{ height: 10 }} />
          <StyledInputView>
            <RenderRowMain
              title={'验证码:'}
              placeholder="请输入验证码"
              onChangeText={(text) => setState({ ymCode: text })}
              keyboardType="numeric"
              maxLength={6}
              defaultValue={ymCode}
              inputRef={ymCodeRef}
              // inputRef={this.ymCodeRef}
              onSubmitEditing={_goRegist}
              // ref={(ref = this.phone = ref)}
            />
            <View style={styles.valLine} />
            <StyledCodeButton
              disabled={!codeEnable || authLoad}
              // load={authLoad}
              // loadColor="rgb(230,230,230)"
              // styleDisabled={{fontWeight:'normal'}}
              onPress={_onClickCode.bind(this)}
              style={styles.buttonContainerStyle}>
              {authLoad ? (
                <StyledActivityIndicator />
              ) : (
                <StyledCodeButtonText>
                  {this.state.time === 60 || this.state.time === 0
                    ? '获取验证码'
                    : this.state.time.toString() + '秒'}
                </StyledCodeButtonText>
              )}
            </StyledCodeButton>
          </StyledInputView>
          <View style={styles.line} />
        </View>
        <StyledSignInBtn
          titleStyle={styles.titleStyle}
          disabled={!flag || loaded}
          load={loaded}
          onPress={_goRegist.bind(this)}
          title="登 录"
        />
      </>
    );

    // return this._renderWechat();
  }
}

const RenderRowMain: FC<
  TextInputProps & {
    title: string;
    inputRef?: React.RefObject<TextInput>;
  }
> = ({ title, inputRef, ...rest }) => {
  return (
    <View style={styles.rowMainStyle}>
      <Text style={styles.textStyle}>{title}</Text>
      <TextInput
        placeholderTextColor="rgba(180,180,180,1)"
        selectionColor={mainColor}
        returnKeyType="next"
        // autoFocus={autoFocus}
        style={styles.textInputStyle}
        underlineColorAndroid="transparent"
        clearButtonMode="while-editing"
        enablesReturnKeyAutomatically
        ref={inputRef}
        {...rest}
        // onSubmitEditing={() => this.focusNextField(ref)}
      />
    </View>
  );
};

interface RenderWechatProps {
  load: boolean;
  onWeChat: () => void;
  onMore: () => void;
}

const RenderWechat: FC<RenderWechatProps> = ({ load, onWeChat, onMore }) => {
  return (
    <StyledContent style={{ justifyContent: 'space-between' }}>
      <Animatable.View animation="fadeIn">
        <StyledImage
          source={require('../../../../source/img/my/icon-60.png')}
        />
        <SyledImageName>{strings('app.name')}</SyledImageName>
      </Animatable.View>
      <StyledBottomView>
        <StyledSignInBtn
          style={{ width: 300 }}
          titleStyle={{ color: 'black', fontWeight: '300', fontSize: 15 }}
          load={load}
          onPress={onWeChat}
          title={'微信登录'}
        />
        <StyledMoreBtn onPress={onMore}>
          <StyledMoreBtnText>更多登录方式</StyledMoreBtnText>
        </StyledMoreBtn>
      </StyledBottomView>
    </StyledContent>
  );
};

const LoginView: FC<{}> = () => {
  const [isWXAppInstalled, setIsWXAppInstalled] = useState(false);
  const { user } = useGetInfoOfMe();
  const { loading: qqLoading, run: qqLogin } = useQQLogin();
  const { loading: wechatLoading, run: wxLogin } = useWechatLogin();
  const { loading: appleLoading, run: appleLogin } = useAppleLogin();
  const { goBack } = useNavigation();
  const { run: phoneLogin, loading: phoneLoginLoding } = usePhoneLogin();
  const { isTourist } = user;
  const { run, loading: smsCodeLoad } = usePostRequestSmsCode((res) => res, {
    manual: true,
  });
  const [isRenderMore, setIsRenderMore] = useState(false);

  const firstRef = useRef(true);
  useEffect(() => {
    if (!isTourist && !firstRef.current) {
      goBack();
    }
    firstRef.current = false;
  }, [goBack, isTourist]);

  useEffect(() => {
    WeChat.isWXAppInstalled().then((is) => {
      setIsWXAppInstalled(is);
    });
  }, []);

  const login = useCallback(
    (key: LoginKey) => {
      const actions = { qqLogin, wxLogin, appleLogin };
      return actions[key]();
    },
    [appleLogin, qqLogin, wxLogin],
  );

  if (isRenderMore || !isWXAppInstalled) {
    return (
      <StyledContent
        onStartShouldSetResponder={() => true}
        onResponderGrant={Keyboard.dismiss}>
        <LoginViewClass
          // {...props}
          isWXAppInstalled={isWXAppInstalled}
          authCode={(phone) => {
            return run({ mobilePhoneNumber: phone });
          }}
          user={user}
          authLoad={smsCodeLoad}
          phoneLogin={phoneLogin}
          loaded={phoneLoginLoding}
        />
        <ThirdPartyInnerLoginView>
          {!!isWXAppInstalled && (
            <SigninBtn
              name={'weixin'}
              color={'#1AAD19'}
              onPress={login.bind(this, 'wxLogin')}
              loading={wechatLoading}
            />
          )}
          {Platform.OS === 'ios' && appleAuth.isSupported && (
            <SigninBtn
              name={'apple'}
              onPress={login.bind(this, 'appleLogin')}
              loading={appleLoading}
            />
          )}
          <SigninBtn
            name={'qq'}
            color={'#0188fb'}
            onPress={login.bind(this, 'qqLogin')}
            loading={qqLoading}
          />
        </ThirdPartyInnerLoginView>
      </StyledContent>
    );
  }
  return (
    <RenderWechat
      load={wechatLoading}
      onWeChat={login.bind(this, 'wxLogin')}
      onMore={() => {
        setIsRenderMore(true);
      }}
    />
  );
};

export default LoginView;

const styles = StyleSheet.create({
  rowMainStyle: {
    flex: 1,
    // width: Dimensions.get('window').width,
    height: 50,
    // marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 15,
  },
  buttonContainerStyle: {
    // marginRight: 15,
    height: 40,
    paddingHorizontal: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    // flex: ,
    width: 55,
    fontSize: 14,
    color: '#333333',
  },
  textInputStyle: {
    // width:200,
    flex: 1,
    marginLeft: 0,
    textAlign: 'left',
    fontSize: 14,
    color: 'black',
    // backgroundColor: 'red',
    height: 50,
  },
  buttonSelectStyle: {
    marginLeft: Platform.OS === 'ios' ? 29 / 2 : 27,
    flex: 1,
    height: 30,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontSize: 14,
    color: '#9ba0a2',
  },

  buttonContainerStyle2: {
    marginLeft: 29 / 2,
    marginRight: 29 / 2,
    marginTop: 30,
    height: 40,
    justifyContent: 'center',
  },

  protocolPre: {
    marginTop: 8,
    fontSize: 11,
    color: '#9e9e9e',
  },
  protocolSuf: {
    marginTop: 8,
    fontSize: 11,
    color: mainColor,
  },

  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    marginTop: 30,
    alignItems: 'center',
  },
  line: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 15,
    backgroundColor: '#ebebeb',
  },
  valLine: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginVertical: 8,
  },
  titleStyle: {
    color: 'black',
    fontWeight: '300',
    width: 100,
  },
});
