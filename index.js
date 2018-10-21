/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry, YellowBox } from 'react-native';

console.ignoredYellowBox = ['Warning: isMounted(...)','Module RCTAlipay requires main queue setup since it overrides `init` but doesn\'t implement `requiresMainQueueSetup`. In a future release React Native will default to initializing all native modules on a background thread unless explicitly opted-out of.'];
// YellowBox.ignoreWarnings([
//     'Warning: componentWillMount is deprecated',
//     'Warning: componentWillReceiveProps is deprecated',
// ]);

// import svgs from './source/icons'
import {name} from './app.json';
import App from './src/app'
import { required } from "./src/request/validation";

AppRegistry.registerComponent('Combo', () => App);