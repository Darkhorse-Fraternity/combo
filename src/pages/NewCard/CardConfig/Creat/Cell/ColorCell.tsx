/**
 * Created by lintong on 2018/10/14.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { StyledColorCell } from './style';

@connect((state) => ({}), (dispatch) => ({}))
export default class IconCell extends PureComponent {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {}

  shouldComponentUpdate(nextProps) {
    return nextProps.select !== this.props.select;
  }

  render(): ReactElement<any> {
    // console.log('color:', i++);

    const { color, onPress, select } = this.props;
    return (
      <StyledColorCell
        select={select}
        activeOpacity={1}
        onPress={() => onPress(color)}
        color={color}
      />
    );
  }
}
