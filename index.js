/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';

// import svgs from './source/icons'
import {name} from './app.json';
import App from './src/app';
import {enableScreens} from 'react-native-screens';

LogBox.ignoreLogs([
  //'Warning: Async Storage has been extracted',
  'BugReporting extraData:',
  'Expected style',
  'Battery state',
  'componentWillMount',
  'componentWillUpdate',
  'componentWillReceiveProps',
  '[location] ERROR - 0',
  'Warning: DatePickerAndroid', // will be fixed with https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/262
  'RCTRootView cancelTouches', // https://github.com/kmagiera/react-native-gesture-handler/issues/746
]);

AppRegistry.registerComponent(name, () => App);
