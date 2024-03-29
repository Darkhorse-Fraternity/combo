/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import 'react-native-gesture-handler';
import { AppRegistry, LogBox, Text, TextInput } from 'react-native';

// import svgs from './source/icons'
import { name } from './app.json';
import App from './src/app';
import { enableScreens } from 'react-native-screens';

LogBox.ignoreLogs([
  //'Warning: Async Storage has been extracted',
  'BugReporting extraData:',
  'Expected style',
  'Setting a timer',
  'Battery state',
  'componentWillMount',
  'componentWillUpdate',
  'componentWillReceiveProps',
  '[location] ERROR - 0',
  'Warning: DatePickerAndroid', // will be fixed with https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/262
  'RCTRootView cancelTouches', // https://github.com/kmagiera/react-native-gesture-handler/issues/746
  'Sending `onAnimatedValueUpdate` with no listeners registered.', //https://github.com/react-navigation/react-navigation/issues/7839
]);

AppRegistry.registerComponent(name, () => App);

/**
 * 禁止系统放大字体
 */
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};

TextInput.defaultProps.allowFontScaling = false;

// Modal.defaultProps = Text.defaultProps || {};
// Modal.defaultProps.useNativeDriver = true
