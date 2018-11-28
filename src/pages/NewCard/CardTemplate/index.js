/**
 * Created by lintong on 2018/11/23.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import CardCell from '../CardCell'

import {
  StyledRow
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';


@connect(
  state => ({}),
  dispatch => ({})
)


export default class CardTemplate extends PureComponent {
  constructor(props: Object) {
    super(props);

  }

  static propTypes = {};
  static defaultProps = {};




  render(): ReactElement<any> {


    return (<StyledRow>
      {this.props.data.map((item, index) => (
        <CardCell
          key={'cell' + index}
          title={item.title}
          name={item.icon}
          color={item.color}
          onPress={() => {
            this.props.onPress && this.props.onPress(item)
          }}/>
      ))}
    </StyledRow>)
  }
}


