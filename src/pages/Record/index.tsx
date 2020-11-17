import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';

const navigationOptions: NavigationOptionsType<RouteKey.record> = (props) => {
  return {
    title: '',
  };
};

export default { component: Render, options: navigationOptions };
