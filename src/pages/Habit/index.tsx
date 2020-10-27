import React from 'react';
import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';

const navigationOptions: NavigationOptionsType<RouteKey.habit> = (props) => {
  return {
    title: '',
  };
};

export default { component: Render, options: navigationOptions };
