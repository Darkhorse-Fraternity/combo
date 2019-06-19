import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyledContent } from '../style';

@connect(
  state => ({

  }),
  dispatch => bindActionCreators({}, dispatch)
)
export default class Search extends PureComponent {
  static propTypes = {};

  static defaultProps = {};


  render() {
    return (
      <StyledContent />
    );
  }
}
