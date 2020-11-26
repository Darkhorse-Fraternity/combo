import { Platform } from 'react-native';
import DialogAndroid from './index.android';
import DialogIos from './index.ios';

const Dialog = Platform.select({
  ios: DialogIos,
  android: DialogAndroid,
});

export default Dialog;
