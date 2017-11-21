/**
 * Created by lintong on 9/21/16.
 * @flow
 */
'use strict';


import React, {Component} from 'react'
import { Provider } from 'react-redux'
import {AppRegistry,View} from 'react-native';
import configureStore from './redux/configureStore'
import {preConfig} from './redux/config'
import InfoBar from './components/InfoBar'
import AppWithNavigationState from './components/Nav/navigators/AppNavigator';
// import  SafeAreaView  from 'react-native-safe-area-view'
//启动初始配置
configureStore.dispatch(preConfig())
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
// const store = configureStore()


// import App from './components/js/App'
class App extends Component {

	render() {
		return (
			<Provider store={configureStore}>
				{/*{Route(store)}*/}
				{/*<Route/>*/}
				<View style={{flex: 1}}>
					<AppWithNavigationState/>
					<InfoBar/>
				</View>
			</Provider>
		)
	}
}

// var WhiteBoardRN = require('../example_advanced');
AppRegistry.registerComponent('Combo', () => App);
