/**
 * Created by lintong on 9/21/16.
 * @flow
 */
'use strict';


import React, { Component, } from 'react'
import { Platform, StatusBar,View } from 'react-native'
import { Provider } from 'react-redux'
import store from './redux/store'
import AppWithNavigationState from './components/Nav/navigators/AppNavigator';
import { ThemeProvider } from 'styled-components'
import theme from './Theme'
import SplashScreen from 'react-native-splash-screen'
import Configure from './configure'

// import  SafeAreaView  from 'react-native-safe-area-view'
//启动初始配置


// import App from './components/js/App'
export default  class App extends Component {


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
                            <AppWithNavigationState/>
                    </Configure>
                </ThemeProvider>
            </Provider>
        );
    }
}

// var WhiteBoardRN = require('../example_advanced');

