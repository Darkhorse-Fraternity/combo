import React from 'react';
import Render from './render';

const navigationOptions: NavigationOptionsType<TestRouteKey.rn_home> = props => {
  return {
    headerShown: false,
  };
};

export default {component: Render, options: navigationOptions};
