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
    height: 28,
    width: 28,
    marginLeft: 15,
    marginRight: 12,
    marginVertical: 12,
  },
})