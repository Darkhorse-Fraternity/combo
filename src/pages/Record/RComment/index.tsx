import React from 'react';
import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import { TouchableItem } from '@react-navigation/stack/src/views/TouchableItem';
import { StyledIonicons } from './style';

const navigationOptions: NavigationOptionsType<RouteKey.rcomment> = props => {
  return {
    title: '',
    // headerRight: headerRightProps => (
    //   <TouchableItem
    //     style={{marginRight: 15}}
    //     {...headerRightProps}
    //     onPress={() => {
    //       props.navigation.navigate(RouteKey.newCard);
    //     }}>
    //     <StyledIonicons
    //       // color={'#39ba98'}
    //       size={25}
    //       name="plus-circle"
    //     />
    //   </TouchableItem>
    // ),
    // headerRight,
    // headerShown: false,
  };
};

export default { component: Render, options: navigationOptions };
