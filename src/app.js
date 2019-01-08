/**
 * Created by lintong on 9/21/16.
 * @flow
 */

'use strict';


import React, { Component, } from 'react'
import { Platform, StatusBar, View } from 'react-native'
import { Provider } from 'react-redux'
import { creatStore } from './redux/store'
import ReduxApp from './components/Nav/navigators/ReduxApp';
import { ThemeProvider } from 'styled-components'
import theme from './Theme'
import SplashScreen from 'react-native-splash-screen'
import Configure from './configure'
import { creatAppNavigator } from "./components/Nav/navigators/CreateAppNavigator";
import codePush from "react-native-code-push";
// import {route} from './pages'
const AppNavigator = creatAppNavigator()
require('../helps/AnimatableRegist')
import { useScreens } from 'react-native-screens';
import { required } from "./request/validation";
useScreens();



// import  SafeAreaView  from 'react-native-safe-area-view'
//启动初始配置
// import Toast from 'react-native-simple-toast'

// import App from './components/js/App'
@codePush
export default class App extends Component {




  // https://github.com/Microsoft/react-native-code-push/blob/master/docs/api-js.md
  codePushStatusDidChange(status) {
    switch(status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("Checking for updates.");
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("Downloading package.");
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log("Installing update.");
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log("Up-to-date.");
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log("Update installed.");
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
  }




  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
    // this.test()
  }

  render() {
    return (
      <Provider store={creatStore(AppNavigator)}>
        <ThemeProvider theme={theme}>
          <Configure>
            <ReduxApp appNavigator={AppNavigator} />
          </Configure>
        </ThemeProvider>
      </Provider>
    );
  }
}

// var WhiteBoardRN = require('../example_advanced');

