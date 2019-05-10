import { firebase } from '@react-native-firebase/analytics';
import { Platform } from 'react-native';
import { NativeModules } from 'react-native';

const { RNAppUtil } = NativeModules;

const defaultAppAnalytics = firebase.analytics();

defaultAppAnalytics.setAnalyticsCollectionEnabled(!__DEV__);

const setAppChannel = async () => {
  const app_channel = Platform.OS === 'ios' ? 'appStore'
    : await RNAppUtil.getAppMetadataBy('TD_CHANNEL_ID');
  defaultAppAnalytics.logEvent('app_channel', app_channel,);
};
setAppChannel();

export default defaultAppAnalytics;
