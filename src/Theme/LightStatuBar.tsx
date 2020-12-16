/**
 * Created by lintong on 2018/4/19.
 * @flow
 */
'use strict';

import React from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';

const LightStatuBar = () => {
  //判断不为小米或者魅族

  // if(DeviceInfo.getBrand() === 'Xiaomi'){
  //     return <View/>
  // }

  //魅族下是正常的 Version < 23

  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === 'dark';

  if (Platform.OS === 'ios') {
    return (
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    );
  }

  return (
    <>
      {Platform.Version >= 21 && Platform.Version < 23 && (
        <StatusBar backgroundColor={isDarkMode ? 'black' : 'white'} />
      )}
      {Platform.Version >= 23 && (
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
      )}
    </>
  );
};

export default LightStatuBar;
