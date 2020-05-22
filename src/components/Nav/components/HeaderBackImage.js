/**
 * Created by lintong on 2018/9/12.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  Platform
} from 'react-native'
// import { default as BaseIcon } from 'react-native-vector-icons/Ionicons';


export default class HeaderBackImage extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {};
  }

  state: {};
  static propTypes = {};
  static defaultProps = {};


  render() {
    return (
      <Image
        source={require('../../../../source/img/bar/back-icon.png')}
        style={styles.image}
      />
    );
  }
}
const styles = StyleSheet.create({
  image: {
    height: 24,
    width: 24,
    marginLeft: Platform.OS ==='ios'?15:5,
    marginRight: 12,
    marginVertical: 14,
    alignSelf:'center'
  },
})