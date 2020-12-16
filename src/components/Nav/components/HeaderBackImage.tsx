/**
 * Created by lintong on 2018/9/12.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
// import { default as BaseIcon } from 'react-native-vector-icons/Ionicons';

interface HeaderBackImageProps {
  tintColor: string;
}

export default class HeaderBackImage extends PureComponent<
  HeaderBackImageProps
> {
  render() {
    console.log('this.props.tintColor', this.props.tintColor);

    return (
      <Image
        source={require('../../../../source/img/bar/back-icon.png')}
        style={[styles.image, { tintColor: this.props.tintColor }]}
      />
    );
  }
}
const styles = StyleSheet.create({
  image: {
    height: 24,
    width: 24,
    marginLeft: Platform.OS === 'ios' ? 15 : 5,
    marginRight: 12,
    marginVertical: 14,
    alignSelf: 'center',
  },
});
