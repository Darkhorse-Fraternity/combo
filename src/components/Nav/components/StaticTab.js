import React from 'react';
import {
  View,
  Button,
  Text,
  InteractionManager,
  Platform
} from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'


// import * as Animatable from 'react-native-animatable';
import { strings } from '../../../../locales/i18n';

import {
  habitRoute,
  settingRoute,
  punchRoute,
  flagRoute
} from '../../../pages';
import { defaultNavigationOptions, tabsOptions } from './navigationOptions';
import { TransitionConfiguration } from '../navigators/TransitionConfiguration';

// 默认背景色
const cardStyle = { backgroundColor: 'white' };
const stackDefoultConfig = {
  defaultNavigationOptions,
  transitionConfig: TransitionConfiguration,
  cardStyle
};


const PunchStack = createStackNavigator({
  ...punchRoute,
}, {
  initialRouteName: 'punch',
  navigationOptions: {
    labelName: strings('tabs.clockIn'),
  },
  ...stackDefoultConfig
});


const HabitStack = createStackNavigator({
  ...habitRoute
}, {
  initialRouteName: 'habit',
  navigationOptions: {
    labelName: strings('tabs.habit'),
  },
  ...stackDefoultConfig
});


const FlagStack = createStackNavigator({
  ...flagRoute,
}, {
  initialRouteName: 'flag',
  navigationOptions: {
    labelName: strings('tabs.flag'),
  },
  ...stackDefoultConfig
});

const SettingsStack = createStackNavigator({
  ...settingRoute,
}, {
  initialRouteName: 'more',
  navigationOptions: {
    labelName: strings('tabs.more'),
  },
  ...stackDefoultConfig
});


export default createBottomTabNavigator(
  {
    Punch: PunchStack,
    Habit: HabitStack,
    Flag: FlagStack,
    Settings: SettingsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName, index } = navigation.state;
      const { iconName, Icon, size } = tabsOptions[routeName];

      return {
        // header:null,
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon
            // delay={1000}
            // iterationCount={iterationCount}
            name={iconName}
            // animation={'bounceIn'}
            size={focused ? size : size}
            color={tintColor}
          />
        ),
        tabBarButtonComponent: TouchableBounce,
        tabBarOnPress: ({ navigation, defaultHandler }: args) => {
          // console.log('test:', '1111');
          defaultHandler();
          // // console.log('test:', '222');
          // const { routeName } = navigation.state;
          // refs[routeName] && refs[routeName].bounceIn(1000);
          // InteractionManager.runAfterInteractions(() => {
          //   defaultHandler()
          // })
        },
        tabBarVisible: index === 0,
        // tabBarLabel: labelName
      };
    },
    // tabBarComponent: (option, k) => {
    //     console.log('test:', option, k);
    //     const {onTabPress} = option
    //     console.log('test:', onTabPress);
    //     return (<View style={{ height: 64,
    //             flexDirection:'row',
    //             width: 320, backgroundColor: 'red' }}>
    //
    //
    //         </View>
    //     )
    // },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios'
        ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.65)',
      inactiveTintColor: 'rgba(0,0,0,0.2)',
      showLabel: false,

      style: {
        backgroundColor: Platform.OS === 'ios'
          ? '#fdfbfb' : '#fdfbfb',
        borderTopColor: 'white',
        height: 70,
      },
      labelStyle: {
        fontSize: 11,

      },
      tabStyle: {
        paddingVertical: 3,
      }

    },
  },
);
