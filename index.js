/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry } from 'react-native';

console.ignoredYellowBox = ['Warning: isMounted(...)'];
// require('./src/app');
import App from './src/app';
import { name } from './app.json';

AppRegistry.registerComponent(name, () => App);