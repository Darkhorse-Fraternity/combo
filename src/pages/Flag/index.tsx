import React from 'react';
import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';


const navigationOptions: NavigationOptionsType<RouteKey.flag> = props => {
  return {
    title: ''
  };
};


// const Render = () => {
//   // const { data } = useGetFb({ offset: '0', limit: '10' })
//   const { data } = useGetFbId({ ":id": "1", id: '1' }, {});

//   // data?.list
//   return < View />
// }


export default { component: Render, options: navigationOptions };
