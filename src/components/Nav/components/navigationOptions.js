import HeaderBackImage from './HeaderBackImage'
import {
  Platform,
} from 'react-native'
import { strings } from '../../../../locales/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconfont from '../../../../source/font/Iconfont'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import React from 'react';

export const defaultNavigationOptions = {
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
    fontWeight:'500',
  },
  // headerBackImage: require('../../source/img/bar/back-icon.png'),
  headerBackImage:(Platform.OS === "ios" && <HeaderBackImage/>),
  headerBackTitle: null,
  gesturesEnabled: true,
}


export const tabsOptions = {
  Punch:{
    iconName:'check-decagram',
    size:25,
    Icon:MaterialCommunityIcons

  },
  Habit:{
    iconName:'sun',
    size:30,
    Icon:Iconfont
  },
  Settings:{
    iconName:'more',
    size:22,
    Icon:MaterialIcons
  }
}