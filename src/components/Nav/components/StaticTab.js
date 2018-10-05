import React from 'react'
import {
  View,
  Button,
  Text,
  InteractionManager,
} from 'react-native'
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons';
// import * as Animatable from 'react-native-animatable';
import { strings } from '../../../../locales/i18n';

import {
  homeRoute,
  settingRoute,
} from '../../../pages'
import { navigationOptions } from './navigationOptions'
// import { TransitionConfiguration } from '../navigators/TransitionConfiguration'


const doStack = createStackNavigator({
  ...settingRoute,
}, {
  initialRouteName: 'do',
  navigationOptions,
  // transitionConfig: TransitionConfiguration,
});



const HomeStack = createStackNavigator({
  ...homeRoute
}, {
  initialRouteName: 'home',
  navigationOptions,
  // transitionConfig: TransitionConfiguration,
});


const SettingsStack = createStackNavigator({
  ...settingRoute,
}, {
  initialRouteName: 'more',
  navigationOptions,
  // transitionConfig: TransitionConfiguration,
});




export default createBottomTabNavigator(
  {
    Home: HomeStack,
    Settings: SettingsStack,
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName, index } = navigation.state;
      let iconName;
      let labelName;
      if (routeName === 'Home') {
        iconName = `md-sunny`;
        labelName = 'Now'
      } else if (routeName === 'Settings') {
        iconName = `ios-happy`;
        labelName = strings('tabs.more')
      }
      return {
        // header:null,
        tabBarIcon: ({ focused, tintColor }) => {

          // const iterationCount = focused?infinite:1

          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons
            // delay={1000}
            // iterationCount={iterationCount}
            name={iconName}
            // animation={'bounceIn'}
            size={!!focused ? 25 : 25}
            color={tintColor}/>;
        },
        tabBarButtonComponent: TouchableBounce,
        tabBarOnPress:  ({ navigation, defaultHandler }: args) => {
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
      activeTintColor: '#F3AC41',
      inactiveTintColor: '#cbcbcb',
      showLabel: true,

      style: {
        backgroundColor: "#f1f6f9",
        borderTopColor: 'white'
      },
      labelStyle: {
        fontSize: 12,
        marginTop: -1,
        marginBottom: 2
      },
      tabStyle: {
        paddingTop: 3,
      }

    },
  },
);