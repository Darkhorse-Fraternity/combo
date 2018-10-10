import React from 'react';
import {TransitionConfiguration} from './TransitionConfiguration'
import Tab from '../components/StaticTab'
import WebView from '../../Base/BaseWebView'
const Web = {WebView: {screen: WebView},}
import { createStackNavigator,createSwitchNavigator} from 'react-navigation';
import AuthLoadingScreen from '../auth/AuthLoadingView'



export const creatAppNavigator = (route)=>{
    return createSwitchNavigator({
      // Auth: AuthStack,
      ...route,
      AuthLoading: AuthLoadingScreen,
      tab: {screen: Tab,},
      // WebView: {screen: WebView}
    }, {

      // mode:'modal',
      // headerMode: 'none',
      initialRouteName: 'AuthLoading',

    });
}

