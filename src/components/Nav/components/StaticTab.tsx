import React from 'react';
import {View, Button, Text, InteractionManager, Platform} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
// import * as Animatable from 'react-native-animatable';
import {strings} from '../../../../locales/i18n';

import {habitRoute, settingRoute, punchRoute, flagRoute} from '../../../pages';
import {defaultNavigationOptions, tabsOptions} from './navigationOptions';

interface RootStackParamList {}

interface StackPropsType {
  initialRouteName: string;
  route: {};
}

const OrigenStack = (props: StackPropsType) => {
  const {initialRouteName, route} = props;

  const Stack = createStackNavigator<{}>();
  const keys = Object.keys(route) as (keyof RootStackParamList)[];
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      // initialParams={}
      headerMode="screen"
      screenOptions={defaultNavigationOptions}>
      {keys.map(key => (
        <Stack.Screen
          name={key}
          // initialParams={
          //   initialRouteName === key ? initialRouteParams : undefined
          // }
          key={key}
          component={route[key].screen}
          options={route[key].screen.navigationOptions}
        />
      ))}
    </Stack.Navigator>
  );
};

const PunchStack = () => {
  return (
    <OrigenStack
      initialRouteName={'punch'}
      // initialParams={}
      route={punchRoute}
    />
  );
};

const HabitStack = () => {
  return (
    <OrigenStack
      initialRouteName={'habit'}
      // initialParams={}
      route={habitRoute}
    />
  );
};

const FlagStack = () => {
  return (
    <OrigenStack
      initialRouteName={'flag'}
      // initialParams={}
      route={flagRoute}
    />
  );
};

const SettingsStack = () => {
  return (
    <OrigenStack
      initialRouteName={'more'}
      // initialParams={}
      route={settingRoute}
    />
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          const {iconName, Icon, size} = tabsOptions[route.name];
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel: false,
      }}>
      <Tab.Screen name={strings('tabs.clockIn')} component={PunchStack} />
      <Tab.Screen name={strings('tabs.habit')} component={HabitStack} />
      <Tab.Screen name={strings('tabs.flag')} component={FlagStack} />
      <Tab.Screen name={strings('tabs.more')} component={SettingsStack} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}
