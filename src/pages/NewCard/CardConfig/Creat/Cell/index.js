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

import SvgUri from 'react-native-svg-uri';
import {
  StyledCell,
  StyledCellBtn,
  StyledSvgUri
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import svgs from '../../../../../../source/svgs'
import { Field } from 'redux-form/immutable'

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

    const { data, onPress } = this.props
    const { size, name } = data
    return (
      <StyledCell>
        <SvgUri
          style={{ position: 'absolute' }}
          width={size}
          height={size}
          source={svgs[name]}
        />
        <Field
          name={`iconAndColor`}
          component={props => {
            const value = props.input.value
            return (
              <StyledCellBtn
                activeOpacity={1}
                select={value.get('name') === name}
                onPress={(() => onPress(props))}/>)
          }
          }/>

      </StyledCell>
    );
  }
}


