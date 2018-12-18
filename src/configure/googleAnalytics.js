import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";
import DeviceInfo from 'react-native-device-info'
const app_version = DeviceInfo.getVersion()

const TrackerID = 'UA-120450052-1'


const tracker = new GoogleAnalyticsTracker(TrackerID);
GoogleAnalyticsSettings.setDispatchInterval(30);
GoogleAnalyticsSettings.setDryRun(__DEV__);


tracker.setAppName("iBetter");
tracker.setAppVersion(app_version);
// tracker.dispatchWithTimeout(10000)
// tracker.setTrackUncaughtExceptions(true)
//持续时间
// tracker.trackTiming("testcategory", 2000, { name: "LoadList" });

// tracker.trackScreenView("Home3");
// tracker.setUser("12345678");

export default  tracker