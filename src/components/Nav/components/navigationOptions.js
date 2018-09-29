import HeaderBackImage from './HeaderBackImage'
import {
  Platform,
} from 'react-native'

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
    color: 'black',
    alignItems: 'center',
    fontSize: 21,
    fontWeight:'400',
  },
  // headerBackImage: require('../../source/img/bar/back-icon.png'),
  headerBackImage:(Platform.OS === "ios" && <HeaderBackImage/>),
  headerBackTitle: null,
  gesturesEnabled: true,
}