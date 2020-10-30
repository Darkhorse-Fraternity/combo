import React, { lazy } from 'react';
import {
  // import render from './render'
  toLazyExoticComponent,
} from '@components/util/toLazyExoticComponent';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import { NavigationOptionsType, RouteKey } from '@pages/interface';
import { StyledHeader, StyledHeaderText } from './style';
import { TransitionPresets } from '@react-navigation/stack';
import { Keyboard, View } from 'react-native';
import { ButtonItem } from '@components/Button';
const render = lazy(() => import('./render'));

const title = '打卡';

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
    title: '',
    // cardStyle: { backgroundColor: 'transparent' },
    ...TransitionPresets.ScaleFromCenterAndroid,
    headerRight: (headerRightProps) => (
      <ButtonItem
        style={{ marginRight: 15 }}
        {...headerRightProps}
        onPress={() => {
          console.log('props', props);
        }}>
        <StyledHeaderText>发布</StyledHeaderText>
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
