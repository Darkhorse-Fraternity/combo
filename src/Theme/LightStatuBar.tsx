/**
 * Created by lintong on 2018/4/19.
 * @flow
 */
'use strict';

import React from 'react';
import { Platform, StatusBar } from 'react-native';

const LightStatuBar = () => {
  //判断不为小米或者魅族

  // if(DeviceInfo.getBrand() === 'Xiaomi'){
  //     return <View/>
  // }

  //魅族下是正常的 Version < 23

  if (Platform.OS === 'ios') {
    return <StatusBar barStyle={'dark-content'} />;
  }

  return (
    <>
      {Platform.Version >= 21 && Platform.Version < 23 && (
        <StatusBar backgroundColor="white" />
      )}
      {Platform.Version >= 23 && (
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
      )}
    </>
  );
};

export default LightStatuBar;
