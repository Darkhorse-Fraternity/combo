import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyledContent,
  StyledNarBarRightView
} from '../style';
import NavBar from '../../../components/Nav/bar/NavBar';
@connect(
  state => ({

  }),
  dispatch => bindActionCreators({}, dispatch)
)
export default class Search extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = () => ({
    header: null,
  });


  renderNarBarRightView = () => (
    <StyledNarBarRightView />
  )

  render() {
    const { navigation } = this.props;
    const { goBack } = navigation;
    return (
      <StyledContent>
        <NavBar
          onBackPress={goBack}
          rightView={this.renderNarBarRightView}
        />
      </StyledContent>
    );
  }
}
