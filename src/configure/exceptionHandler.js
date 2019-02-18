import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from 'react-native-exception-handler';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';
import { strings } from '../../locales/i18n';
import tracker from './googleAnalytics'

const allowInDevMode = false
import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native'





const DeviceBugInfo =  ()=>{

  return `Brand: ${DeviceInfo.getBrand()}\n`+
    `DeviceCountry: ${DeviceInfo.getDeviceCountry()}\n`+
    `FreeDiskStorage: ${DeviceInfo.getFreeDiskStorage()}\n`+
    `Model: ${DeviceInfo.getModel()}\n`+
    `SystemVersion: ${DeviceInfo.getSystemVersion()}\n`+
    `APILevel: ${DeviceInfo.getAPILevel()}`

}

//=================================================
// ADVANCED use case:
const errorHandler = (e, isFatal) => {
  if (isFatal) {
    //发送错误信息给服务器
    const errorString = `${e.name} ${e.message}`
    uploadErrorString('js\n'+DeviceBugInfo()+'\n', errorString,isFatal)
    Alert.alert(
      e.name,
      e.message,
      [{
        text: strings('error.Restart'),
        onPress: () => {
          RNRestart.Restart();
        }
      }]
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
  // your error handler function
};
setJSExceptionHandler(errorHandler, allowInDevMode);
// - exceptionhandler is the exception handler function
// - allowInDevMode is an optional parameter is a boolean.
//   If set to true the handler to be called in place of RED screen
//   in development mode also.

// getJSExceptionHandler gives the currently set JS exception handler


setNativeExceptionHandler((errorString) => {
  //发送错误信息给服务器

  uploadErrorString('native\n'+DeviceBugInfo()+'\n', errorString,true)
  //You can do something like call an api to report to dev team here
  // When you call setNativeExceptionHandler, react-native-exception-handler sets a
  // Native Exception Handler popup which supports restart on error in case of android.
  // In case of iOS, it is not possible to restart the app programmatically, so we just show an error popup and close the app.
  // To customize the popup screen take a look at CUSTOMIZATION section.
});


// const client = async () => {
//   const uniqueId = DeviceInfo.getUniqueID();
//   const platform = Platform.OS === 'ios' ? 'iOS' : 'Android'
//   const app_version = DeviceInfo.getVersion()
//   const app_channel = Platform.OS === 'ios' ? 'appStore' :
//     await RNAppUtil.getAppMetadataBy("TD_CHANNEL_ID")
//   const os_version = DeviceInfo.getSystemVersion();
//   const device_brand = DeviceInfo.getBrand();
//   const device_model = DeviceInfo.getModel();
//   // const network_access = ''
//   const network_carrier = DeviceInfo.getCarrier()
//   return {
//     id: uniqueId,
//     platform,
//     app_channel,
//     app_version,
//     os_version,
//     device_brand,
//     device_model,
//     network_carrier
//   }
// }
// const uniqueId = DeviceInfo.getUniqueID();
// let stateTime = new Date().getTime()
// const sessionId = () => uniqueId + "-" + stateTime


const uploadErrorString = async (from, errorString,isFatal) => {
  // console.log('nativeExceptionHandler:',from, errorString);
  // let params = {
  //   client: await client(),
  //   session: { id: sessionId() },
  //   events: [{
  //     event: from + "error", // 必须为 _page 表示一次页面访问
  //     tag: errorString,// 页面名称
  //     ts: new Date().getTime()
  //   }, {
  //     event: "_session.close", //必须为 _session.close 表示一次使用结束
  //     duration: 10000 // 使用时长，单位毫秒
  //   }]
  // }
  tracker.trackException(`${from}:${errorString}`, isFatal);

}