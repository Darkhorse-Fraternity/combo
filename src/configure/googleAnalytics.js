import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";
import DeviceInfo from 'react-native-device-info'
const app_version = DeviceInfo.getVersion()
import { Platform } from 'react-native'
import { NativeModules } from 'react-native';

const { RNAppUtil } = NativeModules;



const TrackerID = 'UA-120450052-1'


const tracker = new GoogleAnalyticsTracker(TrackerID);
GoogleAnalyticsSettings.setDispatchInterval(30);
GoogleAnalyticsSettings.setDryRun(__DEV__);


tracker.setAppName("iBetter");
tracker.setAppVersion(app_version);



const setAppChannel = async ()=>{
  const app_channel = Platform.OS === 'ios' ? 'appStore' :
    await RNAppUtil.getAppMetadataBy("TD_CHANNEL_ID")
  tracker.trackEvent(app_channel,'app_channel')
}
setAppChannel()
// tracker.dispatchWithTimeout(10000)
// tracker.setTrackUncaughtExceptions(true)
//持续时间
// tracker.trackTiming("testcategory", 2000, { name: "LoadList" });

// tracker.trackScreenView("Home3");
// tracker.setUser("12345678");

export default  tracker