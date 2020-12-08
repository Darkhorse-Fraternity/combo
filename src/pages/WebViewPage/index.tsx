import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';
import { NavigationOptionsType, RouteKey } from '@pages/interface';
import { lazy } from 'react';

const render = lazy(() => import('./render'));

const navigationOptions: NavigationOptionsType<RouteKey.web> = (props) => {
  const { title, headerShown = true } = props.route?.params || {};
  return { headerShown, title: title || '' };
};

//转为懒加载对象并导出类对象，导出类对象是为了支持@react-navigation/native

export default toLazyExoticComponent(render, navigationOptions);
