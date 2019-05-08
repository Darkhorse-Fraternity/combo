import { firebase } from '@react-native-firebase/analytics';

const defaultAppAnalytics = firebase.analytics();

defaultAppAnalytics.setAnalyticsCollectionEnabled(!__DEV__);


export default defaultAppAnalytics;
