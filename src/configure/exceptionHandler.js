import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from 'react-native-exception-handler';
import {Alert} from 'react-native';
import RNRestart from 'react-native-restart';
import { strings } from '../../locales/i18n';
const allowInDevMode = false


//=================================================
// ADVANCED use case:
const errorHandler = (e, isFatal) => {
  if (isFatal) {
    //发送错误信息给服务器

    const  errorString = `${e.name} ${e.message}`

    console.log('errorString:', errorString);

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
  console.log('nativeExceptionHandler:', errorString);
  //You can do something like call an api to report to dev team here
  // When you call setNativeExceptionHandler, react-native-exception-handler sets a
  // Native Exception Handler popup which supports restart on error in case of android.
  // In case of iOS, it is not possible to restart the app programmatically, so we just show an error popup and close the app.
  // To customize the popup screen take a look at CUSTOMIZATION section.

});