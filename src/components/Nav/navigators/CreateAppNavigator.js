import React from 'react';
import {TransitionConfiguration} from './TransitionConfiguration'
import Tab from '../components/StaticTab'
import WebView from '../../Base/BaseWebView'
const Web = {WebView: {screen: WebView},}
import { createStackNavigator,createSwitchNavigator} from 'react-navigation';
import AuthLoadingScreen from '../auth/AuthLoadingView'
import {
    route,

} from '../../../pages'


export const AppNavigator = createSwitchNavigator({
    // Auth: AuthStack,
    ...route,
    AuthLoading: AuthLoadingScreen,
    Tab: {screen: Tab,},
    // WebView: {screen: WebView}
}, {

    // mode:'modal',
    // headerMode: 'none',
    initialRouteName: 'AuthLoading',

});


