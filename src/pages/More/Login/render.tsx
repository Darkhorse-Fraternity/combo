/* @flow */
// 注册页面

import React, { Component, FC, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Platform,
  Keyboard,
  TouchableNativeFeedback,
  Image,
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
import { TransitionPresets } from '@react-navigation/stack';

import { WECHATLOGIN, QQLOGIN } from '../../../redux/reqKeys';
import * as Animatable from 'react-native-animatable';
import { checkPhoneNum } from '../../../request/validation';
import {
  StyledContent,
  ThirdPartyLoginView,
  ThirdPartyInnerLoginView,
  StyledIconView,
  StyledIcon,
  StyledIconText,
  StyledIconItem,
  StyledImage,
  SyledImageName,
  StyledActivityIndicator,
  StyledCodeButton,
  StyledCodeButtonText,
  StyledSignInBtn,
  StyledImageBottom,
  ThirdPartyLoginViewInner,
  StyledEvilIcons,
  StyledBtn,
  StyledBottomView,
  StyledMoreBtn,
  StyledMoreBtnText,
} from './style';
import { getTheme } from '../../../Theme/index';
import * as WeChat from 'react-native-wechat';
import { strings } from '../../../../locales/i18n';
// const webUrl = 'https://static.dayi.im/static/fudaojun/rule.html?version=20160603182000';
import { SigninBtn } from './components/signin-btn';
import appleAuth from '@invertase/react-native-apple-authentication';
const { mainColor } = getTheme();
@connect(
  (state) => ({
    // data:state.req.get()
    userData: state.user,
    auth: state.req.get(AUTHCODE),
  }),
  (dispatch, props) => ({
    // ...bindActionCreators({},dispatch),
    push: () => {
      // index.js 为空 则为当前index
      // dispatch(navigateReplaceIndex('TabView'));
    },
    mRegister: (state) => {
      Keyboard.dismiss();
      dispatch(register(state, props.navigation));
    },
    authCode: (number) => {
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
class LoginViewClass extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      time: 60,
      codeName: '',
      phone: __DEV__ ? '13588833404' : '', // 号码
      ymCode: __DEV__ ? '924007' : '', // 验证码
      isTap: false,
      showMobile: true,
      isWXAppInstalled: false,
      isRenderMore: false,
    };

    WeChat.isWXAppInstalled().then((isWXAppInstalled) => {
      this.setState({ isWXAppInstalled });
    });
  }

  state: {
    phone: string;
    time: number;
    codeName: string;
    ymCode: string;
    isTap: boolean; // 用于time 是否在走。
  };

  id: number = 0;

  async _onClickCode() {
    // 发送验证码请求
    const self = this;
    this.refs['2'].focus();
    const res = await this.props.authCode(this.state.phone);
    console.log('res:', res);
    if (!res.error) {
      Toast.show('发送成功!');
      if (this.state.isTap === false) {
        this.setState({ isTap: true });
        self.time();
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

    this.setState({
      time: this.state.time === 0 ? 60 : --this.state.time,
    });
  }

  _goRegist() {
    // 判断手机号的正则
    if (!checkPhoneNum(this.state.phone)) {
      Toast.show('不是正确的手机号码');
      this.refs['1'].focus();
      return;
    }
    // 判断验证码的正则
    const reg = /^\d{6}$/;
    const flag = reg.test(this.state.ymCode);
    if (!flag) {
      Toast.show('不是正确验证码');
      this.refs['2'].focus();
      return;
    }

    this.props.mRegister(this.state);
    this.setState({ ymCode: '' });
  }

  componentWillUnmount() {
    this.id && clearInterval(this.id);
  }

  componentWillReceiveProps(Props: Object) {
    if (
      Props.userData.mobilePhoneNumber !== this.props.userData.mobilePhoneNumber
    ) {
      this.setState({ phone: Props.userData.mobilePhoneNumber });
    }
  }

  focusNextField(nextField: string) {
    if (nextField === '1') {
      this.refs['2'].focus();
    } else if (nextField === '2') {
      this._goRegist();
    }
  }

  _renderRowMain(
    title: string,
    placeholder: string,
    onChangeText: Function,
    boardType: PropTypes.oneOf = 'default',
    autoFocus: boolean = false,
    maxLength: number = 16,
    ref: string,
    defaultValue: string,
  ) {
    return (
      <View style={styles.rowMainStyle}>
        <Text style={styles.textStyle}>{title}</Text>
        <TextInput
          ref={ref}
          defaultValue={defaultValue}
          placeholderTextColor="rgba(180,180,180,1)"
          selectionColor={mainColor}
          returnKeyType="next"
          // autoFocus={autoFocus}
          maxLength={maxLength}
          keyboardType={boardType}
          style={styles.textInputStyle}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          clearButtonMode="while-editing"
          enablesReturnKeyAutomatically
          onSubmitEditing={() => this.focusNextField(ref)}
          onChangeText={onChangeText}
        />
      </View>
    );
  }

  renderLoginItem = (
    size,
    color,
    title,
    name,
    load = false,
    onPress,
    style = {},
  ) => (
    <StyledIconItem
      disabled={load}
      onPress={onPress}
      style={style}
      background={
        TouchableNativeFeedback.SelectableBackgroundBorderless &&
        TouchableNativeFeedback.SelectableBackgroundBorderless()
      }>
      <StyledIconView style={{ backgroundColor: color }}>
        {load ? (
          <StyledActivityIndicator color={'#c3c3c3'} />
        ) : (
          <StyledIcon color={'#233238'} name={name} size={size} />
        )}
      </StyledIconView>
      {/*<StyledIconText>*/}
      {/*{title}*/}
      {/*</StyledIconText>*/}
    </StyledIconItem>
  );

  _renderWechat = () => {
    const thirdLoaded = this.props.userData.theThirdLoaded;
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
            load={thirdLoaded === WECHATLOGIN}
            onPress={this.props.wxLogin}
            title={'微信登录'}
          />
          <StyledMoreBtn
            onPress={() => {
              this.setState({ isRenderMore: true });
            }}>
            <StyledMoreBtnText>更多登录方式</StyledMoreBtnText>
          </StyledMoreBtn>
        </StyledBottomView>
      </StyledContent>
    );
  };

  _renderMore = () => {
    const codeEnable =
      checkPhoneNum(this.state.phone) &&
      this.state.time === 60 &&
      !this.state.isTap;
    const reg = /^\d{6}$/;
    const flag = reg.test(this.state.ymCode) && checkPhoneNum(this.state.phone);
    const authLoad = this.props.auth.get('load');
    const thirdLoaded = this.props.userData.theThirdLoaded;
    return (
      <StyledContent
        onStartShouldSetResponder={() => true}
        onResponderGrant={Keyboard.dismiss}>
        {/* {!this.props.userData.isLogin && (<BG/>)}*/}

        <Animatable.View>
          <View style={styles.top}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#f0f0f0',
                // width: Dimensions.get('window').width - 40,
                paddingHorizontal: 20,
                marginHorizontal: 20,
                maxWidth: 500,
              }}>
              {this._renderRowMain(
                '手机号:',
                '请填入手机号',
                (text) => this.setState({ phone: text }),
                'numeric',
                true,
                11,
                '1',
                this.state.phone,
              )}
            </View>
            <View style={{ height: 10 }} />
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#f0f0f0',
                marginHorizontal: 20,
                maxWidth: 500,
                // width: Dimensions.get('window').width - 40,
                paddingHorizontal: 20,
              }}>
              {this._renderRowMain(
                '验证码:',
                '请输入验证码',
                (text) => {
                  this.setState({ ymCode: text });
                },
                'numeric',
                false,
                6,
                '2',
                this.state.ymCode,
              )}
              <View style={styles.valLine} />
              <StyledCodeButton
                disabled={!codeEnable || authLoad}
                // load={authLoad}
                loadColor="rgb(230,230,230)"
                // styleDisabled={{fontWeight:'normal'}}
                onPress={this._onClickCode.bind(this)}
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
            </View>
            <View style={styles.line} />
          </View>

          <StyledSignInBtn
            titleStyle={{ color: 'black', fontWeight: '300', width: 100 }}
            disabled={!flag || this.props.userData.loaded}
            load={this.props.userData.loaded}
            onPress={this._goRegist.bind(this)}
            title="登 录"
          />
        </Animatable.View>
        <ThirdPartyInnerLoginView>
          {!!this.state.isWXAppInstalled && (
            <SigninBtn
              name={'weixin'}
              color={'#1AAD19'}
              onPress={this.props.wxLogin}
              loading={thirdLoaded === WECHATLOGIN}
            />
          )}
          {Platform.OS === 'ios' && appleAuth.isSupported && (
            <SigninBtn
              name={'apple'}
              onPress={this.props.appleLogin}
              loading={thirdLoaded === APPLELOGIN}
            />
          )}
          <SigninBtn
            name={'qq'}
            color={'#0188fb'}
            onPress={this.props.qqLogin}
            loading={thirdLoaded === QQLOGIN}
          />
        </ThirdPartyInnerLoginView>
      </StyledContent>
    );
  };

  render() {
    if (this.state.isRenderMore || !this.state.isWXAppInstalled) {
      return this._renderMore();
    }
    return this._renderWechat();
  }
}

const LoginView: FC<{}> = (props) => {
  return <LoginViewClass {...props} />;
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
});
