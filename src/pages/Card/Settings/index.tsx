import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import React from 'react';
import { StyledBtn, StyledBtnTitle } from './style';
import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';

const navigationOptions: NavigationOptionsType<RouteKey.cardSetting> = (
  props,
) => {
  const { iCardId } = props.route.params;
  return {
    title: '',
    headerRight: () => (
      <StyledBtn
        // backgroundColor={iCard.iconAndColor && iCard.iconAndColor.color}
        hitSlop={{
          top: 5,
          left: 20,
          bottom: 5,
          right: 20,
        }}
        onPress={() => {
          props.navigation.navigate(RouteKey.cardInfo, { iCardId });
        }}>
        <StyledBtnTitle>查看</StyledBtnTitle>
      </StyledBtn>
    ),
  };
};

export default toLazyExoticComponent(Render, navigationOptions);
