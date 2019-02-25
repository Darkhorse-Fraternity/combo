import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledRow,
  StyledRowTitle,
  StyledRowDiscrib,
  StyledIcon,
  StyledRowInner
} from './style';
import { update } from '../../../redux/actions/user';

@connect(
  state => ({
    toolConfig: state.user.data.toolConfig
  }),
  dispatch => bindActionCreators({ update }, dispatch)
)
export default class extends PureComponent {
  static propTypes = {};

  static defaultProps = {};


  componentDidMount() {
    const { update } = this.props;
    update();
  }


  renderHeader = () => (
    <StyledHeader>
      <StyledHeaderTitle>
          我的道具
      </StyledHeaderTitle>
    </StyledHeader>
  )

  renderRedoRow = redo => (
    <StyledRow>
      <StyledRowInner>
        <StyledRowTitle>
       补签卡
          {' '}
          <StyledRowTitle style={{ fontSize: 30 }}>
              x
          </StyledRowTitle>
          <StyledRowTitle style={{ fontSize: 25, fontWeight: '600' }}>
            {' '}
            {redo}
          </StyledRowTitle>

        </StyledRowTitle>
        <StyledRowDiscrib>
        点击卡片日历进行补签
        </StyledRowDiscrib>
      </StyledRowInner>
      <StyledIcon
        name="calendar-check"
        size={50}
        color="white"
      />
    </StyledRow>
  )

  render() {
    const { toolConfig } = this.props;
    const { redo } = toolConfig;
    return (
      <StyledContent>
        {this.renderHeader()}
        {this.renderRedoRow(redo)}
      </StyledContent>
    );
  }
}
