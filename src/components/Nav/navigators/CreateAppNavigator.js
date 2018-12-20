import React from 'react';
import {TransitionConfiguration} from './TransitionConfiguration'
import Tab from '../components/StaticTab'
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import AuthLoadingScreen from '../auth/AuthLoadingView'



export const creatAppNavigator = ()=>{
    const SwitchNavigator =  createSwitchNavigator({
      // Auth: AuthStack,
      // ...route,
      AuthLoading: AuthLoadingScreen,
      tab: {screen: Tab,},
      // WebView: {screen: WebView}
    }, {

      // mode:'modal',
      // headerMode: 'none',
      initialRouteName: 'AuthLoading',

    });

    return createAppContainer(SwitchNavigator)
}


