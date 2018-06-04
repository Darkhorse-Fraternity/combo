import React from 'react';
import {TransitionConfiguration} from './TransitionConfiguration'
import Tab from '../components/StaticTab'
import {route} from '../../../pages'
import WebView from '../../Base/BaseWebView'
import { createStackNavigator} from 'react-navigation';


export const AppNavigator = createStackNavigator({
    ...route,
    Tab: {screen: Tab,},
    WebView: {screen: WebView}
}, {
    // initialRouteName:'Home',
    navigationOptions: {
        header:null,
        gesturesEnabled: false,
    },
    //使得视图和头部一起运动，
    // 目前没有办法单独设置，除非使页面单独存在一个栈中
    //https://github.com/react-community/react-navigation/issues/1276
    headerMode:'screen',


    transitionConfig: TransitionConfiguration,
});