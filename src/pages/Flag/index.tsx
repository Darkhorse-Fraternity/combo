import React from 'react';
import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import { useGetFb } from 'src/hooks/interface';
import { View } from 'react-native';


const navigationOptions: NavigationOptionsType<RouteKey.flag> = props => {
  return {
    title: ''
  };
};


// const Render = () => {
//   const { data: response } = useGetFb({ offset: '0', limit: '10' }, {})
//   const { data } = response || {};
//   // const { data } = useGetFb({ offset: 0, limit: 10 })

//   console.log('data ?===', data?.rows);

//   // data?.list
//   return < View />
// }


export default { component: Render, options: navigationOptions };
