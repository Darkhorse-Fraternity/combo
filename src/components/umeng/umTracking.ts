// const tracker = new GoogleAnalyticsTracker(GA_TRACKING_ID);
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import tracker from 'react-native-umeng-analytics';

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
