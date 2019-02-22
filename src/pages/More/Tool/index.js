import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyledContent } from './style';


@connect(
  state => ({}),
  dispatch => ({ actions: bindActionCreators({ }, dispatch) }),
)
export default class extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  _renderHeader = () => (
    <StyledHeader>
      <StyledHeaderTitle>
          提醒时间线
      </StyledHeaderTitle>
    </StyledHeader>
  )

  render() {
    return (
      <StyledContent>
        {this._renderHeader()}
      </StyledContent>
    );
  }
}
