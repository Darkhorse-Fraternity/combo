import { RouteKey, NavigationOptionsType } from '@pages/interface';
import Render from './render';
import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';
const navigationOptions: NavigationOptionsType<RouteKey.flagDetail> = () => {
  return {
    title: '',
  };
};

export default toLazyExoticComponent(Render, navigationOptions);
