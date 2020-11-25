import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import Render from './render';
const navigationOptions: NavigationOptionsType<RouteKey.FRDetail> = () => {
  return {
    title: '',
  };
};

export default toLazyExoticComponent(Render, navigationOptions);
