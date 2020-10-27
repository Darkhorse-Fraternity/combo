import React from 'react';

// import { TransitionConfiguration } from './TransitionConfiguration';
import Tab from './tabs';
import AuthLoadingScreen from '@components/Nav/auth/AuthLoadingView';
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';

export const screenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  ...TransitionPresets.ScaleFromCenterAndroid,
};

export const SwitchNavigator = () => {
  // const {initialRouteName, route} = props;

  const Stack = createStackNavigator<{
    AuthLoading: undefined;
    tab: undefined;
  }>();
  return (
    <Stack.Navigator
      initialRouteName={'AuthLoading'}
      screenOptions={screenOptions}
      // initialParams={}
      headerMode="screen">
      <Stack.Screen
        name={'AuthLoading'}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'white' },
        }}
        // initialParams={
        //   initialRouteName === key ? initialRouteParams : undefined
        // }
        component={AuthLoadingScreen}
      />
      <Stack.Screen
        name={'tab'}
        options={{ headerShown: false }}
        // initialParams={
        //   initialRouteName === key ? initialRouteParams : undefined
        // }
        component={Tab}
      />
    </Stack.Navigator>
  );
};
