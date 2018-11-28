import React from 'react'
import {
  View,
  Button,
  Text,
  InteractionManager,
  Platform
} from 'react-native'
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
  punchRoute
} from '../../../pages'
import { navigationOptions, tabsOptions } from './navigationOptions'
import { TransitionConfiguration } from '../navigators/TransitionConfiguration'


const PunchStack = createStackNavigator({
  ...punchRoute,
}, {
  initialRouteName: 'punch',
  navigationOptions,
  transitionConfig: TransitionConfiguration,
});


const HabitStack = createStackNavigator({
  ...habitRoute
}, {
  initialRouteName: 'habit',
  navigationOptions,
  transitionConfig: TransitionConfiguration,
});


const SettingsStack = createStackNavigator({
  ...settingRoute,
}, {
  initialRouteName: 'more',
  navigationOptions,
  transitionConfig: TransitionConfiguration,
});


export default createBottomTabNavigator(
  {
    Punch: PunchStack,
    Habit: HabitStack,
    Settings: SettingsStack,
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName, index } = navigation.state;
      const { iconName, labelName,Icon,size } = tabsOptions[routeName]

      return {
        // header:null,
        tabBarIcon: ({ focused, tintColor }) => {

          // const iterationCount = focused?infinite:1

          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Icon
            // delay={1000}
            // iterationCount={iterationCount}
            name={iconName}
            // animation={'bounceIn'}
            size={!!focused ? size : size}
            color={tintColor}/>;
        },
        tabBarButtonComponent: TouchableBounce,
        tabBarOnPress: ({ navigation, defaultHandler }: args) => {
          // console.log('test:', '1111');
          defaultHandler()
          // // console.log('test:', '222');
          // const { routeName } = navigation.state;
          // refs[routeName] && refs[routeName].bounceIn(1000);
          // InteractionManager.runAfterInteractions(() => {
          //   defaultHandler()
          // })


        },
        tabBarVisible: index === 0,
        tabBarLabel: labelName
      }
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
      activeTintColor: Platform.OS === 'ios'?
        'rgba(0,0,0,0.85)':'rgba(0,0,0,0.75)',
      inactiveTintColor: '#cbcbcb',
      showLabel: true,

      style: {
        backgroundColor: "#f1f6f9",
        borderTopColor: 'white'
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