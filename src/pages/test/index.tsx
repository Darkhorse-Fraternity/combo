import React, { lazy } from 'react';
import {
  // import render from './render'
  toLazyExoticComponent,
} from '@components/util/toLazyExoticComponent';
import { NavigationOptionsType, RouteKey } from '@pages/interface';
const render = lazy(() => import('./render'));

const title = '测试';

// const RightView = ({...props}: {tintColor?: string}) => {
//   return (
//     <StyledRule {...props}>
//       <StyledRuleText style={{color: props.tintColor || 'balck'}}>
//         animation
//       </StyledRuleText>
//     </StyledRule>
//   );
// };

const navigationOptions: NavigationOptionsType<RouteKey.test> = (props) => {
  return {
    title: '222',
    // headerRight: headerRightProps => <RightView {...headerRightProps} />,
  };
};

//转为懒加载对象并导出类对象，导出类对象是为了支持@react-navigation/native

export default toLazyExoticComponent(render, navigationOptions);
