import React, { FC, memo, PureComponent, useEffect, useRef } from 'react';
// @ts-ignore: Unreachable code error
import { Platform, UIManager, Linking } from 'react-native';
import Orientation from 'react-native-orientation';

// @ts-ignore: Unreachable code error
import KeyboardManager from 'react-native-keyboard-manager';
import pushConfig from './push/push';
// import {dataStorage} from '../redux/actions/util'
import { epUpdate } from '../components/Update/EPUpdate';
// const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;

import LightStatuBar from '../Theme/LightStatuBar';
// import InfoBar from '../components/InfoBar';
import { useGetUserInfo } from 'src/data/data-context';
import { isTablet } from 'react-native-device-info';
import { navigationRef } from '@components/Nav/navigators';
import { RouteKey } from '@pages/interface';
import useLocalNotification from './localNotification';

require('../../helps/AnimatableRegist');
//
// import exceptionHandler from './exceptionHandler';

// interface StateType {
//   isEmulator: boolean;
// }

class ConfigureClass extends PureComponent<{ isLogin: boolean; uid: string }> {
  constructor(props: { isLogin: boolean; uid: string }) {
    super(props);
    // 企业版检测版本
    pushConfig(props.uid);
    // props.dispatch(appStateUpdate(AppState.currentState));
  }

  // static defaultProps = {};

  // componentWillReceiveProps(nextProps) {
  //   if (this.urlTask.length > 0 && nextProps.isLogin) {
  //     this.urlTask.forEach((url) => {
  //       const { routeName, params } = handleUrl(url);
  //       routeName &&
  //         this.props.dispatch(
  //           CommonActions.navigate({ key: routeName, params }),
  //         );
  //     });
  //     this.urlTask = [];
  //   }
  // }

  // _handleOpenURL = async (event: { url: string }) => {
  //   this._handleUrlWithUrlTask(event.url);
  // };

  // _getInitialURL = async () => {
  //   const url = (await Linking.getInitialURL()) || '';
  //   this._handleUrlWithUrlTask(url);
  // };

  // urlTask: string[] = [];

  // _handleUrlWithUrlTask = (url: string) => {
  //   if (!this.props.isLogin) {
  //     this.urlTask.push(url);
  //   } else {
  //     const { routeName, params } = handleUrl(url);
  //     this.props.dispatch(CommonActions.navigate({ key: routeName, params }));
  //   }
  // };

  componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    // Linking.addEventListener('url', this._handleOpenURL);
    // AppState.addEventListener('change', this._handleAppStateChange);
    // this._getInitialURL();
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    // Linking.removeEventListener('url', this._handleOpenURL);
    // AppState.removeEventListener('change', this._handleAppStateChange);
  }

  // _handleAppStateChange = (nextAppState) => {
  //   // this.props.dispatch(appStateUpdate(nextAppState));
  // };

  // onBeforeStart = // 在这里可以发请求，用promise返回结果
  //   // let res = await toolApi.updateApp()
  //   // return res.data
  //   /* 返回结果 res 如下
  //   {
  //       "data": {
  //           "version":"1.1",
  //           "filename":"微信.apk",
  //           "url":"http://gdown.baidu.com/data/wisegame/785f37df5d72c409/weixin_1320.apk",
  //           "desc":["更新了一些bug", "修复了一些UI问题"]
  //       },
  //       "error":{"code":0}
  //   } */
  //   async () => ({
  //     version: '1.1',
  //     filename: '微信.apk',
  //     url:
  //       'http://gdown.baidu.com/data/wisegame/785f37df5d72c409/weixin_1320.apk',
  //     desc: ['更新了一些bug', '修复了一些UI问题'],
  //   });

  render() {
    return null;
  }
}

const handleUrl = (url: string): { routeName?: string; params?: Object } => {
  url = decodeURI(url);
  if (url) {
    const wurl = require('wurl');
    const key = wurl(1, url);
    const params = wurl('?', url);
    const hostname = wurl('hostname', url);
    const protocol = wurl('protocol', url);

    if (params && params.deeplink) {
      return handleUrl(params.deeplink);
    }

    const conditions = [
      { hostname: 'combo', protocol: 'combo' },
      { hostname: 'stg-icard.leanapp.cn', protocol: 'https' },
      { hostname: 'icard.leanapp.cn', protocol: 'https' },
      { hostname: 'stg-icard.leanapp.cn', protocol: 'http' },
      { hostname: 'icard.leanapp.cn', protocol: 'http' },
      { hostname: 'icourage.cn', protocol: 'http' },
      { hostname: 'icourage.cn', protocol: 'https' },
    ];

    // console.log('testxxx:', hostname,protocol);
    const flag = conditions.findIndex(
      (item) => item.hostname === hostname && protocol === item.protocol,
    );

    if (flag >= 0 && key) {
      const keys = {
        recorddetail: 'recordDetail',
        cardsetting: 'cardSetting',
        coursechoose: 'courseChoose',
        coursecreat: 'courseCreat',
        courserelease: 'courseRelease',
        newcard: 'newCard',
        cardinfo: 'cardInfo',
        carduse: 'cardUse',
        done: RouteKey.clockIn,
      };
      const routeName = keys[key.toLowerCase()] || key.toLowerCase();

      console.log('routeName:', routeName);
      console.log('params:', params);

      return {
        routeName,
        params,
      };
    }
  }
  return {};
};

const keyboardConfig = () => {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(false);
    KeyboardManager.setEnableDebugging(false);
    KeyboardManager.setKeyboardDistanceFromTextField(20);
    KeyboardManager.setEnableAutoToolbar(false);
  }
};

// const UserDepends: FC<{ user: UserType }> = ({ user }) => {
//   const { dispatch } = useContext(DataContext);
//   const userString = JSON.stringify(user);
//   useEffect(() => {
//     if (user && user.objectId) {
//       dispatch({ type: 'update_user_info', user });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userString, dispatch]);
//   return null;
// };

// @ts-ignore: Unreachable code error
// @connect((state) => ({ user: state.user.data }))
// class UserDependsClass extends PureComponent {
//   render() {
//     // @ts-ignore: Unreachable code error
//     return <UserDepends user={this.props.user} />;
//   }
// }

const Configure: FC<{}> = ({ children }) => {
  const user = useGetUserInfo();
  // const { navigate } = useNavigation();
  const isLogin = !!user?.objectId;
  console.log('userid', user?.objectId);

  const urlTaskRef = useRef<string[]>([]);
  useEffect(() => {
    epUpdate();
    keyboardConfig();
    if (Platform.OS !== 'ios') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    if (isTablet()) {
      // Orientation.lockToLandscape();
      // Orientation.lockToPortrait();
    } else {
      Orientation.lockToPortrait();
    }
  }, []);

  const handleOpenURL = async (event: { url: string }) => {
    handleUrlWithUrlTask(event.url);
  };
  const handleUrlWithUrlTask = (url: string) => {
    if (!isLogin) {
      urlTaskRef.current.push(url);
    } else {
      const { routeName, params } = handleUrl(url);
      if (routeName && navigationRef.current) {
        // navigate(routeName, params);
        navigationRef.current.navigate(routeName, params);
      }
    }
  };

  const getInitialURL = async () => {
    const url = (await Linking.getInitialURL()) || '';
    handleUrlWithUrlTask(url);
  };
  useEffect(() => {
    Linking.addEventListener('url', handleOpenURL);
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  useEffect(() => {
    getInitialURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   isEmulator().then((res) => {
  //     console.log('res', res);
  //   });
  // }, []);
  // console.log('isEmulatorSync()', isEmulatorSync());
  useLocalNotification();
  return (
    <>
      <LightStatuBar />
      <ConfigureClass isLogin={isLogin} uid={user.objectId} />
      {/* {children} */}
      {/* <InfoBar /> */}
      {/* <UserDependsClass /> */}
    </>
  );
};

export default memo(Configure);
