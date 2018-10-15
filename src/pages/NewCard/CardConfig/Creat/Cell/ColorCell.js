/**
 * Created by lintong on 2018/10/14.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import {
  StyledColorCell,
} from './style'
import SvgUri from 'react-native-svg-uri';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

@connect(
  state => ({}),
  dispatch => ({})
)


export default class IconCell extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

  }

  static propTypes = {};
  static defaultProps = {};

  render(): ReactElement<any> {

    const { color, onPress, select } = this.props
    return (<StyledColorCell
      select={select}
      activeOpacity={1}
      onPress={onPress}
      color={color}/>);
  }
}


