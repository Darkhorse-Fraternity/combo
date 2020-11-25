import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';

const navigationOptions: NavigationOptionsType<RouteKey.cardConfig> = () => {
  return {
    headerShown: false,
  };
};

export default { component: Render, options: navigationOptions };
