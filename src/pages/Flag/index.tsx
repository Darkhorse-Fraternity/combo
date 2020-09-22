import React from 'react';
import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import { View } from 'react-native-animatable';
import { useGetFb, useGetFbId } from 'src/hooks/interface';

const navigationOptions: NavigationOptionsType<RouteKey.punch> = props => {
  return {
    title: '',
  };
};


// const Render = () => {
//   // const { data } = useGetFb({ offset: '0', limit: '10' })
//   const { data } = useGetFbId({ ":id": "1", id: '1' }, {});

//   // data?.list
//   return < View />
// }


export default { component: Render, options: navigationOptions };
