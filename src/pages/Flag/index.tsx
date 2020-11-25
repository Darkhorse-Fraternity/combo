import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';

const navigationOptions: NavigationOptionsType<RouteKey.flag> = () => {
  return {
    title: '',
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
