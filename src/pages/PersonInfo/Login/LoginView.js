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
} from 'react-native'
import BG from '../../../components/BG/BG'
import Toast from 'react-native-simple-toast';
import { BCButton } from '../../../components/Base/WBButton'
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
    StyledActivityIndicator
} from './style'
import { mainColor } from '../../../Theme/index'
import * as WeChat from 'react-native-wechat';
import { strings } from '../../../../locales/i18n';
const webUrl = 'https://static.dayi.im/static/fudaojun/rule.html?version=20160603182000';


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
            return req(parmas)
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
            ymCode: __DEV__ ? '732061' : "", //验证码
            isTap: false,
            showMobile: false,
            isWXAppInstalled: false,
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
            title: '登录',
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
        await this.props.authCode(this.state.phone)
        Toast.show("发送成功!");
        if (this.state.isTap === false) {
            this.setState({ isTap: true });
            this.id = setInterval(function() {
                self.time()
            }, 1000)
        }


    }


    time() {
        if (this.state.time === 0) {
            clearInterval(this.id);
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
                useNativeDriver
                duration={1000}
                delay={200+Math.random() * 500}
                animation="bounceInUp"

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
                            color={'white'}
                            name={name}
                            size={size}/>}
                    </StyledIconView>
                    <StyledIconText>
                        {title}
                    </StyledIconText>
                </StyledIconItem>
            </Animatable.View>
        )
    }

    render() {

        const codeEnable = checkPhoneNum(this.state.phone) &&
            this.state.time === 60 && !this.state.isTap;
        const reg = /^\d{6}$/;
        const flag = reg.test(this.state.ymCode) && checkPhoneNum(this.state.phone)
        const authLoad = this.props.auth.get('load')
        const thirdLoaded = this.props.userData.theThirdLoaded
        return (
            <StyledContent
                colors={['#f1f6f9', '#ffffff']}
                onStartShouldSetResponder={() => true}
                onResponderGrant={Keyboard.dismiss}>
                {!this.props.userData.isLogin && (<BG/>)}


                {this.state.showMobile ? <Animatable.View
                        animation="fadeIn"
                    >

                        <View style={styles.top}>
                            <View style={{ flexDirection: 'row' }}>
                                {this._renderRowMain('手机号:', '请填入手机号',
                                    (text) => this.setState({ phone: text }), 'numeric',
                                    true, 11, "1", this.state.phone
                                )}
                            </View>
                            <View style={styles.line}/>
                            <View style={{ flexDirection: 'row' }}>
                                {this._renderRowMain('验证码:', '请输入验证码',
                                    (text) => {
                                        this.setState({ ymCode: text })
                                    },
                                    'numeric'
                                    , false, 6, "2", this.state.ymCode
                                )}
                                <View style={styles.valLine}/>
                                <BCButton containerStyle={styles.buttonContainerStyle}
                                          disabled={!codeEnable || authLoad}
                                          isLoad={authLoad}
                                          loadColor='rgb(230,230,230)'
                                    //styleDisabled={{fontWeight:'normal'}}
                                          onPress={this._onClickCode.bind(this)}
                                          style={{
                                              fontWeight: '400',
                                              fontSize: 14,
                                              color: 'black'
                                          }}
                                >
                                    {this.state.time === 60 ||
                                    this.state.time === 0 ? '获取验证码' :
                                        this.state.time.toString() + '秒'}
                                </BCButton>
                            </View>
                            <View style={styles.line}/>
                        </View>

                        <BCButton
                            disabled={!flag}
                            isLoad={this.props.userData.loaded}
                            onPress={this._goRegist.bind(this)}
                            containerStyle={styles.buttonContainerStyle2}>
                            登 录
                        </BCButton>


                        {/*<View style={styles.bottom}>*/}
                        {/*<Text style={styles.protocolPre}>点击开始,即表示已阅读并同意</Text>*/}
                        {/*<Button*/}
                        {/*onPress={this._gowebView}*/}
                        {/*style={styles.protocolSuf}>*/}
                        {/*《diff使用条款》*/}
                        {/*</Button>*/}
                        {/*</View>*/}
                    </Animatable.View> :
                    <Animatable.View
                        animation="slideInUp"
                    >
                        <StyledImage
                            source={require('../../../../source/img/my/icon-60.png')}
                        />
                        <SyledImageName>
                          {strings('app.name')}
                        </SyledImageName>
                    </Animatable.View>
                }
                <ThirdPartyLoginView>
                    <View/>
                    <ThirdPartyInnerLoginView>

                        {this.state.isWXAppInstalled && this.renderLoginItem(25,
                            '#30d77f',
                            '微信登录',
                            'weixin',
                            thirdLoaded === WECHATLOGIN,
                            this.props.wxLogin,
                        )}
                        {this.renderLoginItem(25,
                            '#37c2fc',
                            'QQ登录',
                            'qq',
                            thirdLoaded === QQLOGIN,
                            this.props.qqLogin,
                        )}
                        {this.renderLoginItem(35,
                            '#38d5c2',
                            '手机登录',
                            'mobile',
                            false,
                            () => {
                                this.setState({
                                    showMobile: !this.state.showMobile
                                })
                            },
                        )}

                    </ThirdPartyInnerLoginView>
                </ThirdPartyLoginView>
            </StyledContent>
        );
    }
}


const styles = StyleSheet.create({
    rowMainStyle: {
        flex: 1,
        // width: Dimensions.get('window').width,
        height: 50,
        //marginTop: 10,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        // marginHorizontal: 15,
    },
    buttonContainerStyle: {
        //marginRight: 15,
        height: 40,
        paddingHorizontal: 15,
        alignSelf: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    textStyle: {
        // flex: ,
        width: 65,
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
        backgroundColor: 'white',
        marginTop: 100,
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




