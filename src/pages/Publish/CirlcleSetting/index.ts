import { lazy } from 'react';
import {
  // import render from './render'
  toLazyExoticComponent,
} from '@components/util/toLazyExoticComponent';
const render = lazy(() => import('./render'));

const title = '测试';

const navigationOptions = (props: any) => ({});

//转为懒加载对象并导出类对象，导出类对象是为了支持react-navigation

export default toLazyExoticComponent(render, navigationOptions);
