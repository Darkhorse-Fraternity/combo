import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import { TransitionConfiguration } from './TransitionConfiguration';
import Tab from '../components/StaticTab';
import AuthLoadingScreen from '../auth/AuthLoadingView';


// eslint-disable-next-line import/prefer-default-export
export const creatAppNavigator = () => {
  const SwitchNavigator = createSwitchNavigator({
    // Auth: AuthStack,
    // ...route,
    AuthLoading: AuthLoadingScreen,
    tab: { screen: Tab, },
    // WebView: {screen: WebView}
  }, {

    // mode:'modal',
    // headerMode: 'none',
    initialRouteName: 'AuthLoading',

  });

  return createAppContainer(SwitchNavigator);
};
