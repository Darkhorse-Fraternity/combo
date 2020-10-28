import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();
export const navigationIsReadyRef = React.createRef<boolean>();

export const goBack: NavigationContainerRef['goBack'] = () =>
  navigationRef.current?.goBack();

export const reset: NavigationContainerRef['reset'] = (...args) =>
  navigationRef.current?.reset(...args);

export const dispatch: NavigationContainerRef['dispatch'] = (...args) =>
  navigationRef.current?.dispatch(...args);

export const isFocused: NavigationContainerRef['isFocused'] = () =>
  navigationRef.current?.isFocused() || false;

// export const navigate: NavigationContainerRef['navigate']['0'] = (...args) =>
//   navigationRef.current?.navigate(...args);

export default function navigation() {
  return navigationRef.current;
}
