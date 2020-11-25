import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';

const navigationOptions: NavigationOptionsType<RouteKey.cardInfo> = () => {
  return {
    title: '',
  };
};
export default toLazyExoticComponent(Render, navigationOptions);
