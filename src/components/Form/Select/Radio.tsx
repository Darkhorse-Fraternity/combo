import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Map } from 'immutable';

const SelectWrapper = styled.View``;

export default class Radio extends Component {
  constructor(props) {
    super(props);
    let value = props.value;
    this.state = {
      value: value.toJS ? value.toJS() : value,
    };

    this.onValueChange = this.onValueChange.bind(this);
  }

  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    keyName: PropTypes.string,
    value: PropTypes.any,
  };
  static defaultProps = {
    componentName: 'Radio',
    onValueChange: () => {},
    keyName: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      const value = nextProps.value.toJS
        ? nextProps.value.toJS()
        : nextProps.value;

      this.setState({ value: value });
    }
  }

  onValueChange(newValue) {
    this.setState(
      {
        value: newValue,
      },
      () => {
        const value =
          typeof newValue === 'object' ? new Map(newValue) : newValue;
        this.props.onValueChange(value);
      },
    );
  }

  __renderItem = (item) => {
    const { keyName, renderItem } = this.props;
    const key = keyName.length !== 0 ? item[keyName] + '' : item + '';

    // console.log('key:',keyName, key,renderItem,item);
    return (
      <TouchableOpacity
        key={key}
        onPress={() => {
          this.onValueChange(item);
        }}>
        {renderItem(item, this.state.value)}
      </TouchableOpacity>
    );
  };

  render() {
    const { options, theme, style, ...rest } = this.props;
    // const { value } = this.state

    return (
      <SelectWrapper style={style} theme={theme}>
        {options.map((option) => this.__renderItem(option))}
      </SelectWrapper>
    );
  }
}
