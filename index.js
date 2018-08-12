/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry, YellowBox } from 'react-native';

console.ignoredYellowBox = ['Warning: isMounted(...)'];
YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);

import {name} from './app.json';
import App from './src/app'

AppRegistry.registerComponent('Combo', () => App);