/*
 * @Author: tonyYo
 * @Date: 2021-01-06 16:44:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-22 09:39:52
 * @FilePath: /Combo/src/pages/Publish/JoinSetting/index.ts
 */
import { lazy } from 'react';
import {
  // import render from './render'
  toLazyExoticComponent,
} from '@components/util/toLazyExoticComponent';
const render = lazy(() => import('./render'));

// const title = '测试';

const navigationOptions = () => ({
  title: '',
});

//转为懒加载对象并导出类对象，导出类对象是为了支持react-navigation

export default toLazyExoticComponent(render, navigationOptions);
