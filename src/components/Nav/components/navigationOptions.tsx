import {Platform, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Iconfont from '../../../../source/font/Iconfont';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React from 'react';
import {strings} from '../../../../locales/i18n';
import HeaderBackImage from './HeaderBackImage';
import {StackNavigationOptions} from '@react-navigation/stack/lib/typescript/src/vendor/types';
import {TransitionPresets} from '@react-navigation/stack';

export const defaultNavigationOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: 'white',
    shadowColor: 'red',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    borderBottomColor: '#F5FCFF',
    elevation: 0,
    marginTop:
      Platform.OS === 'ios' || Platform.Version < 20
        ? 0
        : StatusBar.currentHeight,
    // headerBackTitle:' '
  },
  headerTintColor: 'black',
  headerTitleStyle: {
    alignItems: 'center',
    fontSize: 21,
    fontWeight: '500',
  },
  cardStyle: {backgroundColor: 'white'},
  // headerBackImage: require('../../source/img/bar/back-icon.png'),
  headerBackImage: props => (
    <HeaderBackImage
      color={props.tintColor}
      style={{margin: Platform.OS === 'ios' ? 15 : 10}}
    />
  ),
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  ...TransitionPresets.SlideFromRightIOS,
  // gesturesEnabled: true,
};

export const tabsOptions = {
  [strings('tabs.clockIn')]: {
    iconName: 'check',
    size: 27,
    Icon: Feather,
  },
  [strings('tabs.habit')]: {
    iconName: 'sun',
    size: 27,
    Icon: Feather,
  },
  [strings('tabs.flag')]: {
    iconName: 'flag',
    size: 27,
    Icon: Feather,
  },
  [strings('tabs.more')]: {
    iconName: 'more-vertical',
    size: 27,
    Icon: Feather,
  },
};
