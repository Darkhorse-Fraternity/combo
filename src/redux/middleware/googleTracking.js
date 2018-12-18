import { NavigationActions } from 'react-navigation';
import DeviceInfo from 'react-native-device-info'
// const tracker = new GoogleAnalyticsTracker(GA_TRACKING_ID);
import tracker from '../../configure/googleAnalytics'
import { Platform } from 'react-native'
import { NativeModules } from 'react-native';

const { RNAppUtil } = NativeModules;


function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}


const tracking = ({ getState }) => next => (action) => {


  // if(__DEV__){return next(action);}

  // action.type === 'APP_STATE_UPDATE' && appStateTracking(action.state)
  action.type === 'LOGIN_SUCCEED' && tracker.setUser(action.data.objectId)
  action.type === 'APP_SHARE' && shareTracking(action.tag)
  // action.type === 'LOGIN_SUCCEED' && console.log('id:', action.data.objectId);
  if (
    action.type !== NavigationActions.NAVIGATE
    && action.type !== NavigationActions.BACK
  ) {
    return next(action);
  }

  const currentScreen = getActiveRouteName(getState().nav);
  const result = next(action);
  const nextScreen = getActiveRouteName(getState().nav);
  nextScreen !== currentScreen && screenTracking(nextScreen)
  return result;
};

export default tracking;


const client =  async () => {
  const uniqueId = DeviceInfo.getUniqueID();
  const platform = Platform.OS === 'ios' ? 'iOS' : 'Android'
  const app_version = DeviceInfo.getVersion()
  const app_channel = Platform.OS === 'ios' ? 'appStore' :
    await RNAppUtil.getAppMetadataBy("TD_CHANNEL_ID")
  const os_version = DeviceInfo.getSystemVersion();
  const device_brand = DeviceInfo.getBrand();
  const device_model = DeviceInfo.getModel();
  // const network_access = ''
  const network_carrier = DeviceInfo.getCarrier()
  return {
    id: uniqueId,
    platform,
    app_channel,
    app_version,
    os_version,
    device_brand,
    device_model,
    network_carrier
  }
}




const screenTracking = async (sceen) => {
  tracker.trackScreenView(sceen);
}

const shareTracking = async (tag) => {
  // let params = {
  //   client: await client(),
  //   events: [{
  //     event: "share", // 必须为 _page 表示一次页面访问
  //     tag,// 页面名称
  //     ts: new Date().getTime()
  //   },{
  //     event: "_session.close", //必须为 _session.close 表示一次使用结束
  //     duration: 10000 // 使用时长，单位毫秒
  //   }]
  // }

  tracker.trackSocialInteraction(tag, "Post");
  // console.log('background:', params);
  // res = await  res.json()
  // console.log('res1111:', res);
}
