/**
 * Created by lintong on 2018/4/3.
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import { View, TouchableOpacity, StyleProp, ImageStyle } from 'react-native';
import ImagesViewModal from './ImagesViewModal';
import FastImage from 'react-native-fast-image';
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';

interface ZoomImageProps {
  imageUrls: IImageInfo[];
  height?: number;
  style?: StyleProp<ImageStyle>;
}

export default class ZoomImage extends Component<
  ZoomImageProps,
  { visible: boolean }
> {
  constructor(props: ZoomImageProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  // state: {};

  static defaultProps = {
    height: 250,
  };

  render() {
    const { style, imageUrls } = this.props;

    return (
      <View>
        <ImagesViewModal
          visible={this.state.visible}
          closeCallBack={() => {
            this.setState({ visible: false });
          }}
          imageUrls={imageUrls}
        />

        <TouchableOpacity
          onPress={() => {
            this.setState({ visible: true });
          }}>
          {imageUrls && (
            <FastImage
              source={{ uri: imageUrls[0].url }}
              style={[{ backgroundColor: '#fdfbfb' }, style as never]}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
