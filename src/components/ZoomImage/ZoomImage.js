/**
 * Created by lintong on 2018/4/3.
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import ImagesViewModal from './ImagesViewModal'
import FastImage from 'react-native-fast-image'

export default class ZoomImage extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false
    }
  }

  state: {};
  static propTypes = {
    imageUrls: PropTypes.array.isRequired,
    height: PropTypes.number,
  };
  static defaultProps = {
    height: 250
  };


  render() {

    const { style, imageUrls } = this.props

    return (
      <View >
        <ImagesViewModal
          visible={this.state.visible}
          closeCallBack={() => {
            this.setState({ visible: false })
          }}
          imageUrls={imageUrls}/>

          <TouchableOpacity
            onPress={() => {
              this.setState({ visible: true })
            }}
          >
            {imageUrls && <FastImage source={{ uri: imageUrls[0].url }} style={style}/>}
          </TouchableOpacity>

      </View>
    );
  }
}
