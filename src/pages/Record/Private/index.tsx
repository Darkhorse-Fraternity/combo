import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';

const navigationOptions: NavigationOptionsType<RouteKey.recordPrivate> = () => {
  return {
    title: '隐私保护',
  };
};

export default toLazyExoticComponent(Render, navigationOptions);
