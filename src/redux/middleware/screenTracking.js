import { NavigationActions } from 'react-navigation';

// const tracker = new GoogleAnalyticsTracker(GA_TRACKING_ID);

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


const screenTracking = ({ getState }) => next => (action) => {
    if (
        action.type !== NavigationActions.NAVIGATE
        && action.type !== NavigationActions.BACK
    ) {
        return next(action);
    }

    const currentScreen = getActiveRouteName(getState().nav);
    const result = next(action);
    const nextScreen = getActiveRouteName(getState().nav);
    if (nextScreen !== currentScreen) {
        // the line below uses the Google Analytics tracker
        // change the tracker here to use other Mobile analytics SDK.
        // tracker.trackScreenView(nextScreen);
        // console.log('screenTracking:', nextScreen);
    }
    return result;
};

export default screenTracking;