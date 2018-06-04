/**
 * Created by lintong on 9/21/16.
 * @flow
 */
'use strict';


import React, { Component, } from 'react'
import {Platform, StatusBar} from 'react-native'
import {Provider} from 'react-redux'
import {AppRegistry, View} from 'react-native';
import configureStore from './redux/configureStore'
import {preConfig} from './redux/config'
import InfoBar from './components/InfoBar'
import AppWithNavigationState from './components/Nav/navigators/AppNavigator';
import {ThemeProvider} from 'styled-components'
import theme from './Theme'
import LightStatuBar from './Theme/LightStatuBar'
import SplashScreen from 'react-native-splash-screen'
// import Form from './components/Form/Form'
// import  SafeAreaView  from 'react-native-safe-area-view'
//启动初始配置
configureStore.dispatch(preConfig())
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
// const store = configureStore()


// import App from './components/js/App'
class App extends Component {


    componentDidMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }

    render() {

        return (
            <Provider store={configureStore}>
                <ThemeProvider theme={theme} >
                    <View style={{flex: 1}}>
                        <LightStatuBar/>
                        <AppWithNavigationState {...this.props}/>
                        <InfoBar/>
                    </View>
                </ThemeProvider>
            </Provider>
        );
    }
}

// var WhiteBoardRN = require('../example_advanced');
AppRegistry.registerComponent('Combo', () => App);
