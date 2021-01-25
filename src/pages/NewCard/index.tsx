import React from 'react';
import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import { StyledIcon } from './style';
import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';

const navigationOptions: NavigationOptionsType<RouteKey.punch> = (props) => {
  return {
    title: '',
    headerRight: (headerRightProps) => (
      <TouchableItem
        borderless
        pressColor="rgba(0, 0, 0, .16)"
        style={{ padding: 10, marginRight: 5 }}
        // style={{ marginRight: 20 }}
        {...headerRightProps}
        onPress={() => {
          props.navigation.navigate(RouteKey.search);
        }}>
        <StyledIcon size={20} color="black" name="search" />
      </TouchableItem>
    ),
  };
};

export default toLazyExoticComponent(Render, navigationOptions);
