/**
 * Created by lintong on 9/21/16.
 * @flow
 */

import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';
// import { useScreens } from "react-native-screens";

import {creatStore} from './redux/store';
import {theme} from './Theme';
import Configure from './configure';
import {SwitchNavigator} from '@pages/index';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {route} from './pages'
// const AppNavigator = creatAppNavigator();
require('../helps/AnimatableRegist');

// if (Platform.OS === "ios") {
//   enableScreens();
// }

// 启动初始配置
// import Toast from 'react-native-simple-toast'

// import App from './components/js/App'
@codePush
export default class App extends PureComponent {
  // https://github.com/Microsoft/react-native-code-push/blob/master/docs/api-js.md
  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    console.log(
      `${progress.receivedBytes} of ${progress.totalBytes} received.`,
    );
  }

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
    // if (appChannel === 'tencent') {
    //   Alert.alert('隐私政策', '请您务必阅读,充分理解"隐私政策"');
    // }

    // this.test()
  }

  render() {
    return (
      <Provider store={creatStore(SwitchNavigator)}>
        <ThemeProvider theme={theme}>
          <Configure>
            <SafeAreaProvider>
              <NavigationContainer>
                <SwitchNavigator />
              </NavigationContainer>
            </SafeAreaProvider>
          </Configure>
        </ThemeProvider>
      </Provider>
    );
  }
}

// var WhiteBoardRN = require('../example_advanced');
