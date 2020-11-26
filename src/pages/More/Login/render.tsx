/* @flow */
// 注册页面

import React, { Component, FC, RefObject, useEffect, useState } from 'react';
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
import { connect } from 'react-redux';
import { req } from '../../../redux/actions/req';
import { APPLELOGIN, AUTHCODE } from '../../../redux/reqKeys';
import { requestSmsCode } from '../../../request/leanCloud';
import {
  register,
  weChatLogin,
  qqLogin,
  appleLogin,
} from '../../../redux/actions/user';

import { WECHATLOGIN, QQLOGIN } from '../../../redux/reqKeys';
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
const { mainColor } = getTheme();

interface LoginProps {
  isWXAppInstalled: boolean;
}

interface LoginState {
  time: number;
  codeName: string;
  phone: string;
  ymCode: string;
  isTap: boolean;
  showMobile: boolean;
  isRenderMore: boolean;
}

@connect(
  (state) => ({
    // data:state.req.get()
    userData: state.user,
    auth: state.req.get(AUTHCODE),
  }),
  (dispatch, props) => ({
    // ...bindActionCreators({},dispatch),
    mRegister: (state: { phone: string; ymCode: string }) => {
      dispatch(register(state, props.navigation));
    },
    authCode: (number: number) => {
      const parmas = requestSmsCode(number);
      return dispatch(req(parmas, AUTHCODE));
    },
    qqLogin: () => {
      dispatch(qqLogin(QQLOGIN, props.navigation));
    },
    wxLogin: () => {
      dispatch(weChatLogin(WECHATLOGIN, props.navigation));
    },
    appleLogin: () => {
      dispatch(appleLogin(APPLELOGIN, props.navigation));
    },
  }),
)
class LoginViewClass extends Component<LoginProps, LoginState> {
  phoneRef: RefObject<TextInput> | undefined;
  ymCodeRef: RefObject<TextInput> | undefined;
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      time: 60,
      codeName: '',
      phone: __DEV__ ? '13588833404' : '', // 号码
      ymCode: __DEV__ ? '924007' : '', // 验证码
      isTap: false,
      showMobile: true,
      isRenderMore: false,
    };
  }

  id: number = 0;

  async _onClickCode() {
    // 发送验证码请求
    const self = this;
    this.ymCodeRef?.current?.focus();
    const res = await this.props.authCode(this.state.phone);
    console.log('res:', res);
    if (!res.error) {
      Toast.show('发送成功!');
      if (this.state.isTap === false) {
        this.setState({ isTap: true });
        this.time();
        this.id = setInterval(() => {
          self.time();
        }, 1000);
      }
    }
  }

  time() {
    if (this.state.time === 0) {
      this.id && clearInterval(this.id);
      // this.isTap = false;
      this.setState({ isTap: false });
    }

    const nextTime = this.state.time - 1;
    this.setState({
      time: this.state.time === 0 ? 60 : nextTime,
    });
  }

  _goRegist() {
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
    this.props.mRegister(this.state);
    this.setState({ ymCode: '' });
  }

  componentWillUnmount() {
    this.id && clearInterval(this.id);
  }

  componentWillReceiveProps(Props: LoginProps) {
    if (
      Props.userData.mobilePhoneNumber !== this.props.userData.mobilePhoneNumber
    ) {
      this.setState({ phone: Props.userData.mobilePhoneNumber });
    }
  }

  _renderMore = () => {
    const { auth, userData } = this.props;
    const { phone, time, isTap, ymCode } = this.state;
    const { setState, phoneRef, ymCodeRef, _onClickCode, _goRegist } = this;
    const authLoad = auth.get('load');
    const codeEnable = checkPhoneNum(phone) && time === 60 && !isTap;
    const reg = /^\d{6}$/;
    const flag = reg.test(ymCode) && checkPhoneNum(phone);

    return (
      <Animatable.View>
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
          disabled={!flag || userData.loaded}
          load={userData.loaded}
          onPress={_goRegist.bind(this)}
          title="登 录"
        />
      </Animatable.View>
    );
  };

  render() {
    if (this.state.isRenderMore || !this.props.isWXAppInstalled) {
      const { auth, userData, wxLogin, appleLogin, qqLogin } = this.props;
      const thirdLoaded = userData.theThirdLoaded;
      return (
        <StyledContent
          onStartShouldSetResponder={() => true}
          onResponderGrant={Keyboard.dismiss}>
          {this._renderMore()}
          <ThirdPartyInnerLoginView>
            {!!this.props.isWXAppInstalled && (
              <SigninBtn
                name={'weixin'}
                color={'#1AAD19'}
                onPress={wxLogin}
                loading={thirdLoaded === WECHATLOGIN}
              />
            )}
            {Platform.OS === 'ios' && appleAuth.isSupported && (
              <SigninBtn
                name={'apple'}
                onPress={appleLogin}
                loading={thirdLoaded === APPLELOGIN}
              />
            )}
            <SigninBtn
              name={'qq'}
              color={'#0188fb'}
              onPress={qqLogin}
              loading={thirdLoaded === QQLOGIN}
            />
          </ThirdPartyInnerLoginView>
        </StyledContent>
      );
    }
    // return this._renderWechat();
    return (
      <RenderWechat
        load={this.props.userData.theThirdLoaded === WECHATLOGIN}
        onWeChat={this.props.wxLogin}
        onMore={() => {
          this.setState({ isRenderMore: true });
        }}
      />
    );
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

const LoginView: FC<{}> = (props) => {
  const [isWXAppInstalled, setIsWXAppInstalled] = useState(false);
  useEffect(() => {
    WeChat.isWXAppInstalled().then((is) => {
      setIsWXAppInstalled(is);
    });
  }, []);

  return <LoginViewClass {...props} isWXAppInstalled={isWXAppInstalled} />;
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
