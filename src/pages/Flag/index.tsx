import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';

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

export default toLazyExoticComponent(Render, navigationOptions);
