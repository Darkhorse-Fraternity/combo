import { ColorSchemeName, Platform, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
import { strings } from '../../../../locales/i18n';
import HeaderBackImage from './HeaderBackImage';
import { StackNavigationOptions } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const currentHeight = StatusBar.currentHeight || 20;

const headerStyleAndroid =
  Platform.OS === 'ios' || Platform.Version < 20
    ? {}
    : {
        height: 64 + currentHeight - 20,
      };

export const defaultNavigationOptions: (
  scheme: ColorSchemeName,
) => StackNavigationOptions = (scheme) => {
  const isMode = scheme === 'dark';

  const theme = isMode ? DarkTheme : DefaultTheme;
  const colors = theme.colors;

  return {
    headerStyle: {
      // backgroundColor: 'red',
      shadowColor: colors.text,
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

    headerTintColor: colors.text,
    headerTitleStyle: {
      alignItems: 'center',
      fontSize: 19,
      fontWeight: '400',
    },
    cardStyle: { backgroundColor: colors.card },
    // headerBackImage: require('../../source/img/bar/back-icon.png'),
    headerBackImage: (props) => (
      <HeaderBackImage
        tintColor={props.tintColor}
        // style={{marginLeft: Platform.OS === 'ios' ? 15 : 10}}
      />
    ),
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
    title: '',

    ...TransitionPresets.SlideFromRightIOS,
    // gesturesEnabled: true,
  };
};

export const tabsOptions = {
  [strings('tabs.clockIn')]: {
    iconName: 'check',
    size: 27,
    Icon: Feather,
    color: '#5B37B7',
  },
  [strings('tabs.habit')]: {
    iconName: 'sun',
    size: 27,
    Icon: Feather,
    color: '#E6A919',
  },
  [strings('tabs.flag')]: {
    iconName: 'flag',
    size: 27,
    Icon: Feather,
    color: '#C9379D',
  },
  [strings('tabs.more')]: {
    iconName: 'more-vertical',
    size: 27,
    Icon: Feather,
    color: '#1194AA',
  },
};
