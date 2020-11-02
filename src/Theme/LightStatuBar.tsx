/**
 * Created by lintong on 2018/4/19.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';

export default class LightStatuBar extends Component {
  constructor(props: Object) {
    super(props);
  }

  render() {
    //判断不为小米或者魅族

    // if(DeviceInfo.getBrand() === 'Xiaomi'){
    //     return <View/>
    // }

    //魅族下是正常的 Version < 23

    return (
      <View>
        {Platform.OS !== 'ios' &&
          Platform.Version >= 21 &&
          Platform.Version < 23 && <StatusBar backgroundColor="white" />}
        {Platform.OS !== 'ios' && Platform.Version >= 23 && (
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={'dark-content'}
          />
        )}
      </View>
    );
  }
}