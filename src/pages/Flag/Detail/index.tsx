import React from 'react';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import { StyledBtn, StyledHeaderBtnText } from './style';
import Render from './render';
import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';
const navigationOptions: NavigationOptionsType<RouteKey.flagDetail> = (
  props,
) => {
  return {
    title: '',
    headerRight: (headerRightProps) => (
      <StyledBtn
        hitSlop={{
          top: 5,
          left: 15,
          bottom: 5,
          right: 15,
        }}
        onPress={() => {
          props.navigation.navigate(RouteKey.flagRecord, {
            iCardId: props.route.params.iCardId,
            title: props.route.params.title || '',
          });
        }}>
        <StyledHeaderBtnText color={headerRightProps.tintColor}>
          副本记录
        </StyledHeaderBtnText>
      </StyledBtn>
    ),
  };
};

export default toLazyExoticComponent(Render, navigationOptions);
