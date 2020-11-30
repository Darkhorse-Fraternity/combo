// const tracker = new GoogleAnalyticsTracker(GA_TRACKING_ID);
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
// @ts-ignore: Unreachable code error
import tracker from 'react-native-umeng-analytics';
import { navigationRef } from '@components/Nav/navigators';

tracker.setDebugMode(__DEV__);

export const useTrackView = () => {
  // const info = useNavigationAllParamsWithType();
  const navigation = useNavigation();
  const state = navigation.dangerouslyGetState();
  const routeName = state.routes[state.index].name;
  // const isFocused = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      // console.log('join:', routeName);
      tracker.beginLogPageView(routeName || 'start');
      return () => {
        // console.log('remove:', routeName);
        tracker.endLogPageView(routeName || 'end');
      };
    }, [routeName]),
  );
};

export const useTracker = () => {
  const routeNameRef = useRef<string>('');
  const onReady = () => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name || '';
    tracker.beginLogPageView(routeNameRef.current || 'start');
  };
  const onStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName =
      navigationRef.current?.getCurrentRoute()?.name || '';
    if (previousRouteName !== currentRouteName) {
      if (previousRouteName && previousRouteName.length > 0) {
        tracker.endLogPageView(previousRouteName || 'end');
      }
      tracker.beginLogPageView(currentRouteName || 'start');
    }
    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName;
  };
  return { onReady, onStateChange };
};
