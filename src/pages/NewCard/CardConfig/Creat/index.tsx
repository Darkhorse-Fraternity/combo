import React from 'react';
import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';

const navigationOptions: NavigationOptionsType<RouteKey.creat> = (props) => {
  return {
    headerShown: false,
  };
};

export default { component: Render, options: navigationOptions };
