import {Platform, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-safe-area-view';
// const {StatusBarManager} = NativeModules;

// iOS Only
const StatusBarHeight =
  (Platform.OS === 'ios' ? getStatusBarHeight(false) : StatusBar.currentHeight) || 20;


export {StatusBarHeight};
