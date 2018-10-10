import HeaderBackImage from './HeaderBackImage'
import {
  Platform,
} from 'react-native'
import { strings } from '../../../../locales/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import React from 'react';

export const navigationOptions = {
  headerStyle: {
    backgroundColor: 'white',
    shadowColor: 'red',
    shadowOpacity: 0.1,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
    borderBottomColor: '#F5FCFF',
    elevation: 0,
    paddingTop: (Platform.OS === "ios" || Platform.Version < 20) ? 0 : 25,
    //headerBackTitle:' '
  },
  headerTintColor: 'black',
  headerTitleStyle: {
    alignItems: 'center',
    fontSize: 21,
    fontWeight:'400',
  },
  // headerBackImage: require('../../source/img/bar/back-icon.png'),
  headerBackImage:(Platform.OS === "ios" && <HeaderBackImage/>),
  headerBackTitle: null,
  gesturesEnabled: true,
}


export const tabsOptions = {
  Punch:{
    iconName:'check-decagram',
    labelName:'Now',
    Icon:MaterialCommunityIcons

  },
  Habit:{
    iconName:'md-sunny',
    labelName:strings('tabs.habit'),
    Icon:Ionicons
  },
  Settings:{
    iconName:'ios-more',
    labelName: strings('tabs.more'),
    Icon:Ionicons
  }
}