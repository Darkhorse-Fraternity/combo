import React, { Component, PureComponent, ReactChild } from 'react';
import {
  StyleProp,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';

const SelectWrapper = styled.View``;

interface MultipleProps<T> extends ViewProps {
  onValueChange: (data: T[]) => void;
  options: T[];
  renderItem: (item: T, contain: boolean) => ReactChild;
  keyName?: string;
  value: T[];
}

export default class Multiple<T> extends PureComponent<MultipleProps<T>> {
  constructor(props: MultipleProps<T>) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
  }
  static defaultProps = {
    componentName: 'Multiple',
    onValueChange: () => {},
    keyName: '',
    // value: [],
  };

  onValueChange(newValue: T[]) {
    // this.setState({
    //     value: newValue
    // }, () => {
    this.props.onValueChange(newValue);
    // })
  }

  __renderItem = (item: T) => {
    const { keyName, onValueChange, value } = this.props;
    const key = keyName ? item[keyName] + '' : item + '';

    const index = value.indexOf(item);
    const contain = index !== -1;
    // const value = options;
    // console.log('value', value);

    // console.log('key:',keyName, key,item);
    return (
      <TouchableOpacity
        key={key}
        onPress={() => {
          if (contain) {
            value.splice(index, 1);
          } else {
            value.push(item);
          }

          onValueChange(value);
        }}>
        {this.props.renderItem(item, contain)}
      </TouchableOpacity>
    );
  };

  render() {
    const { options, style } = this.props;
    // const { value } = this.state

    return (
      <SelectWrapper style={style as never}>
        {options.map((option) => this.__renderItem(option))}
      </SelectWrapper>
    );
  }
}
