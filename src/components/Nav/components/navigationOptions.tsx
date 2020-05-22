import {Platform, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Iconfont from '../../../../source/font/Iconfont';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React from 'react';
import {strings} from '../../../../locales/i18n';
import HeaderBackImage from './HeaderBackImage';
import {StackNavigationOptions} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';

const currentHeight = StatusBar.currentHeight || 20;

const headerStyleAndroid =
  Platform.OS === 'ios' || Platform.Version < 20
    ? {}
    : {
        height: 64 + currentHeight - 20,
      };

export const defaultNavigationOptions: StackNavigationOptions = {
  headerStyle: {
    // backgroundColor: 'red',
    shadowColor: 'red',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    ...headerStyleAndroid,
    borderBottomColor: '#F5FCFF',
    elevation: 0,
    // headerBackTitle:' '
  },

  headerTintColor: 'black',
  headerTitleStyle: {
    alignItems: 'center',
    fontSize: 23,
    fontWeight: '400',
  },
  cardStyle: {backgroundColor: 'white'},
  // headerBackImage: require('../../source/img/bar/back-icon.png'),
  headerBackImage: props => (
    <HeaderBackImage
      color={props.tintColor}
      // style={{marginLeft: Platform.OS === 'ios' ? 15 : 10}}
    />
  ),
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  title: '',
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
