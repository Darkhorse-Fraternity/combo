/* @flow */
//注册页面
'use strict';
import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Dimensions,
  Platform,
  Keyboard,
  TouchableNativeFeedback,
  Image
} from 'react-native'
import BG from '../../../components/BG/BG'
import Toast from 'react-native-simple-toast';
import { req } from '../../../redux/actions/req'
import { AUTHCODE } from '../../../redux/reqKeys'
import { requestSmsCode } from '../../../request/leanCloud'
import { connect } from 'react-redux'
import {
  register,
  weChatLogin,
  qqLogin
} from '../../../redux/actions/user'
import { WECHATLOGIN, QQLOGIN } from '../../../redux/reqKeys'
import * as Animatable from 'react-native-animatable';
import { checkPhoneNum } from '../../../request/validation'
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
  StyledMoreBtnText
} from './style'
import { mainColor } from '../../../Theme/index'
import * as WeChat from 'react-native-wechat';
import { strings } from '../../../../locales/i18n';
// const webUrl = 'https://static.dayi.im/static/fudaojun/rule.html?version=20160603182000';
import Button from '../../../components/Button'
import BackBtn from "../../../components/Button/BackBtn/index";

@connect(
  state => ({
    //data:state.req.get()
    userData: state.user,
    auth: state.req.get(AUTHCODE)
  }),
  (dispatch, props) => ({
    //...bindActionCreators({},dispatch),
    push: () => {
      //index.js 为空 则为当前index
      // dispatch(navigateReplaceIndex('TabView'));
    },
    mRegister: (state) => {
      Keyboard.dismiss()
      dispatch(register(state));
    },
    pushWebView: (params) => {
      // dispatch(navigatePush(params));
    },
    authCode: (number) => {
      const parmas = requestSmsCode(number)
      return dispatch(req(parmas, AUTHCODE))
    },
    qqLogin: () => {
      dispatch(qqLogin(QQLOGIN))
    },
    wxLogin: () => {
      dispatch(weChatLogin(WECHATLOGIN))
    }
  })
)


export default class LoginView extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      time: 60,
      codeName: '',
      phone: __DEV__ ? '13588833404' : "", //号码
      ymCode: __DEV__ ? '924007' : "", //验证码
      isTap: false,
      showMobile: true,
      isWXAppInstalled: false,
      isRenderMore: false,
    };

    WeChat.isWXAppInstalled().then(isWXAppInstalled => {
      this.setState({ isWXAppInstalled })
    })

  }

  state: {
    phone: string,
    time: number,
    codeName: string,
    ymCode: string,
    isTap: bool, // 用于time 是否在走。
  };


  static navigationOptions = props => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    return {
      title: '',
      headerLeft: null,
      headerRight: (<StyledBtn
        hitSlop={{ top: 5, left: 15, bottom: 5, right: 15 }}
        onPress={() => {
          props.navigation.goBack()
        }}>
        <StyledEvilIcons size={30} name={'close'}/>
      </StyledBtn>),
      // headerStyle: {
      //     backgroundColor: '#f5fcff',
      //     shadowColor: '#F5FCFF',
      //     borderBottomColor: '#F5FCFF',
      // },
    }
  };

  id: number = 0;

  async _onClickCode() {
    //发送验证码请求
    const self = this;
    this.refs['2'].focus();
    const res = await this.props.authCode(this.state.phone)
    console.log('res:', res);
    if (!res.error) {
      Toast.show("发送成功!");
      if (this.state.isTap === false) {
        this.setState({ isTap: true });
        self.time()
        this.id = setInterval(function() {
          self.time()
        }, 1000)
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
    })
  }

  _goRegist() {
    // 判断手机号的正则
    if (!checkPhoneNum(this.state.phone)) {
      Toast.show('不是正确的手机号码');
      this.refs['1'].focus();
      return;
    }
    //判断验证码的正则
    const reg = /^\d{6}$/;
    const flag = reg.test(this.state.ymCode)
    if (!flag) {
      Toast.show('不是正确验证码');
      this.refs['2'].focus();
      return;
    }

    this.props.mRegister(this.state);
    this.setState({ ymCode: '' })
  }


  componentWillUnmount() {
    this.id && clearInterval(this.id);
  }

  componentWillReceiveProps(Props: Object) {
    if (Props.userData.mobilePhoneNumber !== this.props.userData.mobilePhoneNumber) {
      this.setState({ phone: Props.userData.mobilePhoneNumber })
    }
  }


  focusNextField(nextField: string) {

    if (nextField === '1') {
      this.refs['2'].focus();
    } else if (nextField === '2') {
      this._goRegist()
    }
  }

  _renderRowMain(title: string, placeholder: string, onChangeText: Function,
                 boardType: PropTypes.oneOf = 'default', autoFocus: bool = false, maxLength: number = 16,
                 ref: string, defaultValue: string) {

    return (
      <View style={styles.rowMainStyle}>

        <Text style={styles.textStyle}>{title}</Text>
        <TextInput
          ref={ref}
          defaultValue={defaultValue}
          placeholderTextColor="rgba(180,180,180,1)"
          selectionColor={mainColor}
          returnKeyType='next'
          //autoFocus={autoFocus}
          maxLength={maxLength}
          keyboardType={boardType}
          style={styles.textInputStyle}
          underlineColorAndroid='transparent'
          placeholder={placeholder}
          clearButtonMode='while-editing'
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={() => this.focusNextField(ref)}
          onChangeText={onChangeText}/>

      </View>
    )
  }


  renderLoginItem = (size,
                     color,
                     title,
                     name,
                     load = false,
                     onPress,
                     style = {}) => {
    return (
      <Animatable.View
        style={{ zIndex: 100 }}
        useNativeDriver
        // duration={1000}
        // delay={200 + Math.random() * 500}
        // animation="bounceInUp"
        animation="fadeIn"
      >
        <StyledIconItem
          disabled={load}
          onPress={onPress}
          style={style}
          background={TouchableNativeFeedback.SelectableBackgroundBorderless &&
          TouchableNativeFeedback.SelectableBackgroundBorderless()}>
          <StyledIconView
            style={{ backgroundColor: load ? 'transparent' : color, }}>
            {load ? <StyledActivityIndicator/> : <StyledIcon
              color={'#233238'}
              name={name}
              size={size}/>}
          </StyledIconView>
          {/*<StyledIconText>*/}
          {/*{title}*/}
          {/*</StyledIconText>*/}
        </StyledIconItem>
      </Animatable.View>
    )
  }


  _renderWechat = () => {

    const thirdLoaded = this.props.userData.theThirdLoaded
    return (<StyledContent style={{ justifyContent: 'space-between' }}>

      <Animatable.View
        animation="fadeIn"
      >
        <StyledImage
          source={require('../../../../source/img/my/icon-60.png')}
        />
        <SyledImageName>
          {strings('app.name')}
        </SyledImageName>
      </Animatable.View>
      <StyledBottomView>
        <StyledSignInBtn
          style={{ width: 300 }}
          titleStyle={{ color: 'black', fontWeight: '300', fontSize: 15 }}
          load={thirdLoaded === WECHATLOGIN}
          onPress={this.props.wxLogin}
          title={'微信登录'}
        />
        <StyledMoreBtn onPress={() => {
          this.setState({ isRenderMore: true })
        }}>
          <StyledMoreBtnText>
            更多登录方式
          </StyledMoreBtnText>
        </StyledMoreBtn>
      </StyledBottomView>

    </StyledContent>)
  }

  _renderMore = () => {

    const codeEnable = checkPhoneNum(this.state.phone) &&
      this.state.time === 60 && !this.state.isTap;
    const reg = /^\d{6}$/;
    const flag = reg.test(this.state.ymCode) && checkPhoneNum(this.state.phone)
    const authLoad = this.props.auth.get('load')
    const thirdLoaded = this.props.userData.theThirdLoaded
    return (
      <StyledContent
        colors={['white', '#f7f8fe', 'white']}
        onStartShouldSetResponder={() => true}
        onResponderGrant={Keyboard.dismiss}>
        {/*{!this.props.userData.isLogin && (<BG/>)}*/}


        <Animatable.View
           // animation="fadeIn"
        >

          <View style={styles.top}>
            <View style={{
              flexDirection: 'row', backgroundColor: '#f0f0f0',
              width: Dimensions.get('window').width - 40,
              paddingHorizontal: 20
            }}>
              {this._renderRowMain('手机号:', '请填入手机号',
                (text) => this.setState({ phone: text }), 'numeric',
                true, 11, "1", this.state.phone
              )}
            </View>
            <View style={{ height: 10 }}/>
            <View style={{
              flexDirection: 'row', backgroundColor: '#f0f0f0',
              width: Dimensions.get('window').width - 40,
              paddingHorizontal: 20
            }}>
              {this._renderRowMain('验证码:', '请输入验证码',
                (text) => {
                  this.setState({ ymCode: text })
                },
                'numeric'
                , false, 6, "2", this.state.ymCode
              )}
              <View style={styles.valLine}/>
              <StyledCodeButton
                disabled={!codeEnable || authLoad}
                // load={authLoad}
                loadColor='rgb(230,230,230)'
                //styleDisabled={{fontWeight:'normal'}}
                onPress={this._onClickCode.bind(this)}
                style={styles.buttonContainerStyle}
              >
                {authLoad ? <StyledActivityIndicator/> : <StyledCodeButtonText>

                  {this.state.time === 60 ||
                  this.state.time === 0 ? '获取验证码' :
                    this.state.time.toString() + '秒'}
                </StyledCodeButtonText>}
              </StyledCodeButton>
            </View>
            <View style={styles.line}/>
          </View>

          <StyledSignInBtn
            titleStyle={{ color: 'black', fontWeight: '300' }}
            disabled={!flag || this.props.userData.loaded}
            load={this.props.userData.loaded}
            onPress={this._goRegist.bind(this)}
            title={'登 录'}
          />
        </Animatable.View>
        <ThirdPartyLoginView>
          <ThirdPartyLoginViewInner colors={['white', '#fcfdfe', '#fafbfe', '#fbfcfe']}/>
          <ThirdPartyLoginViewInner colors={['white', '#fcfdfe', '#fafbfe', '#f8f9fb']}/>
          <ThirdPartyLoginViewInner colors={['white', '#fcfdfe', '#fafbfe', '#fafbfd']}/>
          <ThirdPartyInnerLoginView isWXAppInstalled={this.state.isWXAppInstalled}>

            {this.state.isWXAppInstalled && this.renderLoginItem(25,
              '#f0f0f0',
              '微信登录',
              'weixin',
              thirdLoaded === WECHATLOGIN,
              this.props.wxLogin,
            )}
            {this.renderLoginItem(25,
              '#f0f0f0',
              'QQ登录',
              'qq',
              thirdLoaded === QQLOGIN,
              this.props.qqLogin,
            )}
            {/*{this.renderLoginItem(35,*/}
            {/*'#f0f0f0',*/}
            {/*'手机登录',*/}
            {/*'mobile',*/}
            {/*false,*/}
            {/*() => {*/}
            {/*this.setState({*/}
            {/*showMobile: !this.state.showMobile*/}
            {/*})*/}
            {/*},*/}
            {/*)}*/}

          </ThirdPartyInnerLoginView>
        </ThirdPartyLoginView>
        <StyledImageBottom source={require('../../../../source/img/loginBottom.png')}/>
      </StyledContent>
    );
  }

  render() {
    if (this.state.isRenderMore || !this.state.isWXAppInstalled) {
      return this._renderMore()
    } else {
      return this._renderWechat()
    }


  }
}


const styles = StyleSheet.create({
  rowMainStyle: {
    flex: 1,
    // width: Dimensions.get('window').width,
    height: 50,
    //marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 15,
  },
  buttonContainerStyle: {
    //marginRight: 15,
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
    height: 50
  },
  buttonSelectStyle: {
    marginLeft: Platform.OS === 'ios' ? 29 / 2 : 27,
    flex: 1,
    height: 30,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontSize: 14,
    color: '#9ba0a2'
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
    alignItems: 'center'
  },
  line: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 15,
    backgroundColor: '#ebebeb'
  },
  valLine: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#ebebeb',
    marginVertical: 8,
  }
})




