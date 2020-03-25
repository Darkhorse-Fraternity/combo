import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Platform,
  UIManager,
  ToastAndroid,
  BackHandler,
  Linking,
  AppState,
  View
} from "react-native";
import { NavigationActions } from "react-navigation";
import Orientation from "react-native-orientation";
import DeviceInfo from "react-native-device-info";
import KeyboardManager from "react-native-keyboard-manager";
import pushConfig from "./push/push";
// import {dataStorage} from '../redux/actions/util'
import { epUpdate } from "../components/Update/EPUpdate";
import { appStateUpdate } from "../redux/actions/util";
// const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;

import LocalNotification from "./localNotification";
import LightStatuBar from "../Theme/LightStatuBar";
import InfoBar from "../components/InfoBar";
//
// import exceptionHandler from './exceptionHandler';

@connect(
  state => ({
    nav: state.nav,
    isLogin: state.user.isLogin
  })
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
    // 企业版检测版本
    this.config();
  }

  config = () => {
    epUpdate();
    this.props.dispatch(pushConfig());
    if (Platform.OS !== "ios") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    if (DeviceInfo.isTablet()) {
      // Orientation.lockToLandscape();
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToPortrait();
    }
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
  };

  static defaultProps = {};

  componentWillReceiveProps(nextProps) {
    if (this.urlTask.length > 0 && nextProps.isLogin) {
      this.urlTask.forEach(url => this._handleUrl(url));
      this.urlTask = [];
    }
  }

  _handleOpenURL = async event => {
    this._handleUrlWithUrlTask(event.url);
  };

  _getInitialURL = async () => {
    const url = await Linking.getInitialURL();
    this._handleUrlWithUrlTask(url);
  };

  urlTask = [];

  _handleUrlWithUrlTask = url => {
    if (!this.props.isLogin) {
      this.urlTask.push(url);
    } else {
      this._handleUrl(url);
    }
  };

  _handleUrl = url => {
    url = decodeURI(url);
    if (url) {
      const wurl = require("wurl");
      const key = wurl(1, url);
      const params = wurl("?", url);
      const hostname = wurl("hostname", url);
      const protocol = wurl("protocol", url);

      if (params && params.deeplink) {
        return this._handleUrl(params.deeplink);
      }

      const conditions = [
        { hostname: "combo", protocol: "combo" },
        { hostname: "stg-icard.leanapp.cn", protocol: "https" },
        { hostname: "icard.leanapp.cn", protocol: "https" },
        { hostname: "stg-icard.leanapp.cn", protocol: "http" },
        { hostname: "icard.leanapp.cn", protocol: "http" },
        { hostname: "icourage.cn", protocol: "http" },
        { hostname: "icourage.cn", protocol: "https" }
      ];

      // console.log('testxxx:', hostname,protocol);
      const flag = conditions.findIndex(
        item => item.hostname === hostname && protocol === item.protocol
      );

      if (flag >= 0 && key) {
        const keys = {
          recorddetail: "recordDetail",
          cardsetting: "cardSetting",
          coursechoose: "courseChoose",
          coursecreat: "courseCreat",
          courserelease: "courseRelease",
          newcard: "newCard",
          cardinfo: "cardInfo",
          carduse: "cardUse"
        };
        const routeName = keys[key.toLowerCase()] || key.toLowerCase();

        console.log("routeName:", routeName);
        console.log("params:", params);
        this.props.dispatch(NavigationActions.navigate({ routeName, params }));
      }
    }
  };

  // async requestCameraPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       {
  //         title: "申请摄像头权限",
  //         message:
  //           "一个很牛逼的应用想借用你的摄像头，" +
  //           "然后你就可以拍出酷炫的皂片啦。"
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("现在你获得摄像头权限了");
  //     } else {
  //       console.log("用户并不屌你");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }

  keyboardConfig = () => {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
      KeyboardManager.setEnableDebugging(false);
      KeyboardManager.setKeyboardDistanceFromTextField(20);
      KeyboardManager.setEnableAutoToolbar(false);
    }
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    Linking.addEventListener("url", this._handleOpenURL);
    AppState.addEventListener("change", this._handleAppStateChange);
    this.props.dispatch(appStateUpdate(AppState.currentState));
    this._getInitialURL();
    this.keyboardConfig();
    // if (Platform.OS === 'ios') {
    //   !__DEV__ && Rate.rate({
    //     AppleAppID: "1332546993",
    //     preferInApp: true,
    //     inAppDelay: 5.0,
    //     openAppStoreIfInAppFails: false,
    //   }, () => {})
    // } else {
    //   //TODO 给Android 做一个评论智能跳出。
    //   // Alert.alert(
    //   //     '给我们一个好评吧!',
    //   //     'Thanks♪(･ω･)ﾉ',
    //   //     [{ text: '取消' }, {
    //   //         text: '确定', onPress: () => {
    //   //             Rate.rate(options,()=>{})
    //   //         }
    //   //     }]
    //   // )
    // }

    // this.requestCameraPermission()
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    Linking.removeEventListener("url", this._handleOpenURL);
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    this.props.dispatch(appStateUpdate(nextAppState));
  };

  lastBackPressed: number = 0;

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    const { routes, index } = nav;
    const { routeName } = routes[index];
    // idnex 前两个分别是登录和tabview
    if (routeName === "tab") {
      const tab = routes[index];
      const tabIndex = tab.index;
      const tabNav = tab.routes[tabIndex];
      if (tabNav.index > 0) {
        dispatch(NavigationActions.back());
        return true;
      }
    }
    const times = Date.now();
    if (times - this.lastBackPressed >= 2500) {
      // 再次点击退出应用
      this.lastBackPressed = times;
      ToastAndroid.show("再按一次退出应用", 0);
      return true;
    }
    this.lastBackPressed = 0;
    return false;
  };

  onBeforeStart = // 在这里可以发请求，用promise返回结果
    // let res = await toolApi.updateApp()
    // return res.data
    /* 返回结果 res 如下
    {
        "data": {
            "version":"1.1",
            "filename":"微信.apk",
            "url":"http://gdown.baidu.com/data/wisegame/785f37df5d72c409/weixin_1320.apk",
            "desc":["更新了一些bug", "修复了一些UI问题"]
        },
        "error":{"code":0}
    } */
    async () => ({
      version: "1.1",
      filename: "微信.apk",
      url:
        "http://gdown.baidu.com/data/wisegame/785f37df5d72c409/weixin_1320.apk",
      desc: ["更新了一些bug", "修复了一些UI问题"]
    });

  render() {
    const level = DeviceInfo.getApiLevelSync(); // andorid q 用会报错

    return (
      <View style={{ flex: 1 }}>
        {(Platform.OS === "ios" || level < 29) && <LocalNotification />}
        <LightStatuBar />
        {this.props.children}
        <InfoBar />
      </View>
    );
  }
}
