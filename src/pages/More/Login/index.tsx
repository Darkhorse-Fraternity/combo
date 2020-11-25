import React from 'react';
import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import { TransitionPresets } from '@react-navigation/stack';
import { View } from 'react-native';
import { StyledBtn, StyledEvilIcons } from './style';
import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';

const navigationOptions: NavigationOptionsType<RouteKey.more> = (props) => {
  return {
    title: '',
    ...TransitionPresets.ModalSlideFromBottomIOS,

    headerLeft: () => <View />,
    headerRight: (headerRightProps) => (
      <StyledBtn
        {...headerRightProps}
        hitSlop={{ top: 5, left: 15, bottom: 5, right: 15 }}
        onPress={() => {
          props.navigation.goBack();
        }}>
        <StyledEvilIcons size={30} name={'close'} />
      </StyledBtn>
    ),
  };
};

export default toLazyExoticComponent(Render, navigationOptions);
