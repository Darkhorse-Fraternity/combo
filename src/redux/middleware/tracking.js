import { NavigationActions } from 'react-navigation';
import DeviceInfo from 'react-native-device-info'
// const tracker = new GoogleAnalyticsTracker(GA_TRACKING_ID);
import { Platform } from 'react-native'
import { openCollet } from '../../request/leanCloud'
import { send } from '../../request'
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


  if(__DEV__){return next(action);}

  action.type === 'APP_STATE_UPDATE' && appStateTracking(action.state)
  action.type === 'APP_SHARE' && shareTracking(action.tag)
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
  const app_channel = Platform.OS === 'ios' ? 'appStore' : await RNAppUtil.getAppMetadataBy("TD_CHANNEL_ID")
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
const uniqueId = DeviceInfo.getUniqueID();
let stateTime = new Date().getTime()
const sessionId = () => uniqueId + "-" + stateTime
const appStateTracking = async (state) => {

  if (state === 'active') {

    stateTime = new Date().getTime()

    let params = {
      client: client(),
      session: {
        id: sessionId()
      }
    }
    params = openCollet(params)
    // console.log('active:', params);
    const res = await send(params)
    // console.log('res:', res);
  } else if (state === 'background') {
    const endTime = new Date().getTime()
    const duration = endTime - stateTime
    const events = [...trackingEvents, {
      "event": "_session.close", //必须为 _session.close 表示一次使用结束
      'ts': endTime,
      "duration": duration // 使用时长，单位毫秒
    }]

    trackingEvents.splice(0, trackingEvents.length);

    let params = {
      client: client(),
      session: {
        id: sessionId()
      },
      events
    }
    params = openCollet(params)
    // console.log('background:', params);
    const res = await send(params)
    // console.log('background:',res, trackingEvents);
  }


}


let screenStartTime
let lastSceen
const trackingEvents = []
const screenTracking = async (sceen) => {


  const sceenEndTime = new Date().getTime()
  if (lastSceen && lastSceen !== sceen) {
    trackingEvents.push({
      "event": "_page", // 必须为 _page 表示一次页面访问
      "duration": sceenEndTime - screenStartTime, // 页面停留时间，单位毫秒
      tag: lastSceen,// 页面名称
      ts: sceenEndTime
    })

  }
  lastSceen = sceen;
  screenStartTime = sceenEndTime
  if (trackingEvents.length === 10) {
    let params = {
      client: client(),
      session: { id: sessionId() },
      events: trackingEvents
    }
    params = openCollet(params)
    // console.log('background:', params);
    const res = await send(params)
    trackingEvents.splice(0, trackingEvents.length);
  }
}

const shareTracking = async (tag) => {
  let params = {
    client: client(),
    session: { id: sessionId() },
    events: [{
      event: "share", // 必须为 _page 表示一次页面访问
      tag,// 页面名称
      ts: new Date().getTime()
    },{
      event: "_session.close", //必须为 _session.close 表示一次使用结束
      duration: 10000 // 使用时长，单位毫秒
    }]
  }

  params = openCollet(params)
  // console.log('background:', params);
  console.log('params:',params );
  let res = await send(params)
  // res = await  res.json()
  // console.log('res1111:', res);
}
