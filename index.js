/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry,  } from 'react-native';

console.ignoredYellowBox = ['Warning: isMounted(...)'];
import {name} from './app.json';
import App from './src/app'

AppRegistry.registerComponent('Combo', () => App);