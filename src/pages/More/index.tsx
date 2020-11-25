import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';

const navigationOptions: NavigationOptionsType<RouteKey.more> = () => {
  return {
    title: '',
    gestureEnabled: false,
    headerShown: false,
  };
};

export default toLazyExoticComponent(Render, navigationOptions);
