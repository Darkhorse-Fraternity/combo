import React from 'react';
import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';

const navigationOptions: NavigationOptionsType<RouteKey.account> = (props) => {
  return {
    title: '',
  };
};

export default { component: Render, options: navigationOptions };
