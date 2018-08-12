import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Platform,
    UIManager,
    ToastAndroid,
    StatusBar,
    BackHandler,
    NetInfo,
    Linking,
    AppState,
    Alert
} from 'react-native';
import pushConfig from '../configure/push/push'
// import {dataStorage} from '../redux/actions/util'
import { NavigationActions } from 'react-navigation';
import Orientation from 'react-native-orientation';
import DeviceInfo from 'react-native-device-info'
import { epUpdate } from '../components/Update/EPUpdate'
import {appStateUpdate} from '../redux/actions/util'
// const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;
import KeyboardManager from 'react-native-keyboard-manager'
import Rate from 'react-native-rate'

@connect(
    state => ({ nav: state.nav, }),
    // (dispatch, props) => ({
    //     //...bindActionCreators({},dispatch)
    //     deeplink: () => {
    //         console.log('test:', '1111');
    //     }
    // })
)

export default class Configure extends React.Component {
    constructor(props) {
        super(props);
        //企业版检测版本
        this.config()
    }


    config = () => {
        epUpdate()
        pushConfig()
        if (Platform.OS !== 'ios') {
            // UIManager.setLayoutAnimationEnabledExperimental &&
            // UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        if (DeviceInfo.isTablet()) {
            // Orientation.lockToLandscape();
            Orientation.lockToPortrait()
        } else {
            Orientation.lockToPortrait()
        }
    }


    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    };
    static defaultProps = {};


    _handleOpenURL = async (event)=>{
        this._handleUrl(event.url)
    }

    _getInitialURL = async ()=>{
        const url = await Linking.getInitialURL()
        this._handleUrl(url)
    }

    _handleUrl = (url)=> {
        if(url){
            const wurl = require('wurl');
            const key =  wurl(1, url)
            const params = wurl('?', url);
            const hostname =  wurl('hostname', url)
            const protocol = wurl('protocol', url)
            if(hostname==='combo' && protocol === 'combo'){
                console.log('params:', params);
                this.props.dispatch(NavigationActions.navigate({ routeName: key, params }))
            }
        }


    }
    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    'title': '申请摄像头权限',
                    'message': '一个很牛逼的应用想借用你的摄像头，' +
                    '然后你就可以拍出酷炫的皂片啦。'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("现在你获得摄像头权限了")
            } else {
                console.log("用户并不屌你")
            }
        } catch (err) {
            console.warn(err)
        }
    }


    keyboardConfig = ()=>{
        if (Platform.OS === 'ios') {
            KeyboardManager.setEnable(true);
            KeyboardManager.setEnableDebugging(false);
            KeyboardManager.setKeyboardDistanceFromTextField(20);
            KeyboardManager.setEnableAutoToolbar(false);
        }

    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        Linking.addEventListener('url', this._handleOpenURL);
        AppState.addEventListener('change', this._handleAppStateChange);
        this.props.dispatch(appStateUpdate(AppState.currentState))
        this._getInitialURL()
        this.keyboardConfig()

        let options = {
            AppleAppID:"1332546993",
            preferInApp:true,
            inAppDelay:5.0,
            openAppStoreIfInAppFails:false,
            // preferredAndroidMarket: AndroidMarket.Other,
        }

        if(Platform.OS === 'ios'){
            Rate.rate(options,()=>{})
        }else {
            //TODO 给Android 做一个评论智能跳出。
            // Alert.alert(
            //     '给我们一个好评吧!',
            //     'Thanks♪(･ω･)ﾉ',
            //     [{ text: '取消' }, {
            //         text: '确定', onPress: () => {
            //             Rate.rate(options,()=>{})
            //         }
            //     }]
            // )
        }


        // this.requestCameraPermission()

        // NetInfo.isConnected.addEventListener(
        //     'connectionChange',
        //     (isConnected)=>{
        //        dispatch(dataStorage('isConnected',isConnected))
        //     }
        // );
        // this.props.deeplink()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        Linking.removeEventListener('url', this._handleOpenURL);
        AppState.removeEventListener('change', this._handleAppStateChange);


    }

    _handleAppStateChange = (nextAppState) => {
        this.props.dispatch(appStateUpdate(nextAppState))
    }

    lastBackPressed: number = 0
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        const { routes, index } = nav
        const { routeName } = routes[index]
        //idnex 前两个分别是登录和tabview
        if (routeName === 'Tab') {
            const tab = routes[index]
            const tabIndex = tab.index
            const tabNav = tab.routes[tabIndex]
            if (tabNav.index > 0) {
                dispatch(NavigationActions.back())
                return true;
            }
        }
        let times = Date.now();
        if (times - this.lastBackPressed >= 2500) {
            //再次点击退出应用
            this.lastBackPressed = times;
            ToastAndroid.show("再按一次退出应用", 0);
            return true;
        }
        this.lastBackPressed = 0;
        return false;
    }


    render() {
        return this.props.children;
    }

}
