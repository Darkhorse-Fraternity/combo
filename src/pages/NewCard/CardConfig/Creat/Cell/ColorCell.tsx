/**
 * Created by lintong on 2018/10/14.
 * @flow
 */
'use strict';

import React, { Component } from 'react';

import { StyledColorCell } from './style';

interface IconCellProps {
  select: boolean;
  color: string;
  onPress: (color: string) => void;
}

export default class ColorCell extends Component<IconCellProps> {
  constructor(props: IconCellProps) {
    super(props);
  }

  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {}

  shouldComponentUpdate(nextProps: IconCellProps) {
    return nextProps.select !== this.props.select;
  }

  render() {
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
