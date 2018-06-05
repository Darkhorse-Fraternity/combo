import React from 'react';
import {TransitionConfiguration} from './TransitionConfiguration'
import Tab from '../components/StaticTab'
import {route} from '../../../pages'
import WebView from '../../Base/BaseWebView'
import { createStackNavigator,createSwitchNavigator} from 'react-navigation';
import AuthLoadingScreen from '../auth/AuthLoadingView'
const AuthStack = createStackNavigator(route);

export const AppNavigator = createSwitchNavigator({
    // Auth: AuthStack,
    ...route,
    AuthLoading: AuthLoadingScreen,
    Tab: {screen: Tab,},
    // WebView: {screen: WebView}
}, {
    // initialRouteName:'Home',
    // navigationOptions: {
    //     header:null,
    //     gesturesEnabled: false,
    // },
    // mode:'modal',
    // headerMode: 'none',
    initialRouteName: 'AuthLoading',

});