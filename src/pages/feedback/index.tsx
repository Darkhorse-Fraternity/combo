import React, { lazy } from 'react';
import {
  // import render from './render'
  toLazyExoticComponent,
} from '@components/util/toLazyExoticComponent';
import { NavigationOptionsType, RouteKey } from '@pages/interface';
import { StyledHeader, StyledHeaderText } from './style';
import { Keyboard } from 'react-native';
import { ButtonItem } from '@components/Button';
const render = lazy(() => import('./render'));

// const title = '打卡';

// const RightView = ({...props}: {tintColor?: string}) => {
//   return (
//     <StyledRule {...props}>
//       <StyledRuleText style={{color: props.tintColor || 'balck'}}>
//         animation
//       </StyledRuleText>
//     </StyledRule>
//   );
// };

const navigationOptions: NavigationOptionsType<RouteKey.clockIn> = (props) => {
  return {
    title: '意见反馈',
    // cardStyle: { backgroundColor: 'transparent' },
    headerRight: (headerRightProps) => (
      <ButtonItem
        style={{ marginRight: 15 }}
        {...headerRightProps}
        onPress={() => {
          console.log('props', props);
        }}>
        <StyledHeaderText>提交</StyledHeaderText>
      </ButtonItem>
    ),
    headerBackground: () => (
      <StyledHeader
        // style={{ backgroundColor: 'red' }}
        onResponderGrant={() => Keyboard.dismiss()}
        onStartShouldSetResponder={() => true}
      />
    ),
    // headerRight: headerRightProps => <RightView {...headerRightProps} />,
  };
};

//转为懒加载对象并导出类对象，导出类对象是为了支持@react-navigation/native

export default toLazyExoticComponent(render, navigationOptions);
