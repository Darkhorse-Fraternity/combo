/**
 * Created by lintong on 9/21/16.
 * @flow
 */
'use strict';


import React, { Component, } from 'react'
import { Platform, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { AppRegistry, View } from 'react-native';
import store from './redux/store'
import InfoBar from './components/InfoBar'
import AppWithNavigationState from './components/Nav/navigators/AppNavigator';
import { ThemeProvider } from 'styled-components'
import theme from './Theme'
import LightStatuBar from './Theme/LightStatuBar'
import SplashScreen from 'react-native-splash-screen'
import Configure from './configure'
import PushManage from './configure/localNotification'
// import  SafeAreaView  from 'react-native-safe-area-view'
//启动初始配置


// import App from './components/js/App'
class App extends Component {


    componentDidMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }

    render() {

        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Configure>
                        <View style={{ flex: 1 }}>
                            <PushManage/>
                            <LightStatuBar/>
                            <AppWithNavigationState/>
                            <InfoBar/>
                        </View>
                    </Configure>
                </ThemeProvider>
            </Provider>
        );
    }
}

// var WhiteBoardRN = require('../example_advanced');
AppRegistry.registerComponent('Combo', () => App);
