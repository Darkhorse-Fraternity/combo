import React from 'react';
import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';

const navigationOptions: NavigationOptionsType<RouteKey.more> = props => {
  return {
    title: '',
    gestureEnabled: false,
    headerShown: false,
  };
};

export default { component: Render, options: navigationOptions };
