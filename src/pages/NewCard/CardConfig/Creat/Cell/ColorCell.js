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
import { shouldComponentUpdate } from 'react-immutable-render-mixin';


import {
  StyledColorCell,
} from './style'



@connect(
  state => ({}),
  dispatch => ({})
)


export default class IconCell extends Component {
  constructor(props: Object) {
    super(props);
    // this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

  }

  static propTypes = {};
  static defaultProps = {};


  componentDidMount() {

  }

  shouldComponentUpdate(nextProps) {
    return nextProps.select !== this.props.select
  }


  render(): ReactElement<any> {
    // console.log('color:', i++);

    const { color, onPress, select } = this.props
    return (<StyledColorCell
      select={select}
      activeOpacity={1}
      onPress={()=>onPress(color)}
      color={color}/>);
  }
}


