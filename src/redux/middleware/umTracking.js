import { NavigationActions } from "react-navigation";
// const tracker = new GoogleAnalyticsTracker(GA_TRACKING_ID);
import tracker from "react-native-umeng-analytics";

tracker.setDebugMode(__DEV__);

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

const tracking = ({ getState }) => next => action => {
  // if(__DEV__){return next(action);}

  // action.type === 'APP_STATE_UPDATE' && appStateTracking(action.state)
  switch (action.type) {
    case "LOGIN_SUCCEED":
      tracker.onProfileSignIn(action.data.objectId);
      break;
    case "LOGOUT":
      tracker.onProfileSignOff();
      break;
    case "APP_SHARE":
      tracker.event(action.tag);
      break;

    default:
      break;
  }
  // action.type === 'LOGIN_SUCCEED' && console.log('id:', action.data.objectId);
  if (
    action.type !== NavigationActions.NAVIGATE &&
    action.type !== NavigationActions.BACK
  ) {
    return next(action);
  }

  const currentScreen = getActiveRouteName(getState().nav);
  const result = next(action);
  const nextScreen = getActiveRouteName(getState().nav);

  // if (nextScreen !== currentScreen) {
  console.log("currentScreen", currentScreen);
  console.log("nextScreen", nextScreen);
  // currentScreen && tracker.endLogPageView(currentScreen);
  tracker.beginLogPageView(currentScreen);
  // tracker.onResume();
  // }
  return result;
};

export default tracking;
