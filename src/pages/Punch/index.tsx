import React from 'react';
import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import { StyledIonicons } from './style';
import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';

const navigationOptions: NavigationOptionsType<RouteKey.punch> = (props) => {
  return {
    title: '',
    headerRight: ({ tintColor }) => (
      <TouchableItem
        style={{ marginRight: 15 }}
        onPress={() => {
          props.navigation.navigate(RouteKey.newCard);
        }}>
        <StyledIonicons color={tintColor} size={25} name="plus-circle" />
      </TouchableItem>
    ),
    // headerRight,
    // headerShown: false,
  };
};

export default toLazyExoticComponent(Render, navigationOptions);
