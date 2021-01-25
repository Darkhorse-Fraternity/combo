/*
 * @Author: tonyYo
 * @Date: 2021-01-22 14:28:00
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-25 14:33:18
 * @FilePath: /Combo/src/pages/Punch/index.tsx
 */
import React from 'react';
import Render from './render';
import { RouteKey, NavigationOptionsType } from '@pages/interface';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import { StyledIonicons } from './style';
import { toLazyExoticComponent } from '@components/util/toLazyExoticComponent';
import { Text } from 'react-native';
const navigationOptions: NavigationOptionsType<RouteKey.punch> = (props) => {
  return {
    title: '',
    headerLeft: __DEV__
      ? ({ tintColor }) => (
          <TouchableItem
            borderless
            pressColor="rgba(0, 0, 0, .16)"
            style={{ padding: 10, marginLeft: 5 }}
            onPress={() => {
              props.navigation.navigate(RouteKey.test);
            }}>
            <Text style={{ color: tintColor }}>测试</Text>
          </TouchableItem>
        )
      : undefined,
    headerRight: ({ tintColor }) => (
      <TouchableItem
        borderless
        pressColor="rgba(0, 0, 0, .16)"
        style={{ padding: 10, marginRight: 5 }}
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
