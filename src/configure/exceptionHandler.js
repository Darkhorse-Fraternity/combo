import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from 'react-native-exception-handler';
import {Alert} from 'react-native';
import RNRestart from 'react-native-restart';
import { strings } from '../../locales/i18n';
import { openCollet } from '../request/leanCloud'
import { send } from '../request'
const allowInDevMode = false


//=================================================
// ADVANCED use case:
const errorHandler = (e, isFatal) => {
  if (isFatal) {
    //发送错误信息给服务器
    const  errorString = `${e.name} ${e.message}`
    uploadErrorString('js',errorString)
    Alert.alert(
      strings('error.Unexpected_error_occurred'),
      strings('error.We_will_need_to_restart_the_app'),
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

  uploadErrorString('native',errorString)
  //You can do something like call an api to report to dev team here
  // When you call setNativeExceptionHandler, react-native-exception-handler sets a
  // Native Exception Handler popup which supports restart on error in case of android.
  // In case of iOS, it is not possible to restart the app programmatically, so we just show an error popup and close the app.
  // To customize the popup screen take a look at CUSTOMIZATION section.
});

const uploadErrorString = async (from,errorString)=>{
  console.log('nativeExceptionHandler:',from, errorString);
  // let params = {
  //   client: client(),
  //   session: { id: sessionId() },
  //   events: [{
  //     event:from+ "error", // 必须为 _page 表示一次页面访问
  //     tag:errorString,// 页面名称
  //     ts: new Date().getTime()
  //   },{
  //     event: "_session.close", //必须为 _session.close 表示一次使用结束
  //     duration: 10000 // 使用时长，单位毫秒
  //   }]
  // }
  //
  // params = openCollet(params)
  // // console.log('background:', params);
  // console.log('params:',params );
  // let res = await send(params)
  // console.log('uploadErrorString:', res);
}