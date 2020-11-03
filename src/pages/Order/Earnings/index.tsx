/**
 * Created by lintong on 2018/8/17.
 * @flow
 */

import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledHeaderCash,
  StyledHeaderBottom,
  StyledHeaderBtn,
} from './style';
import { ORDER } from '../../../redux/reqKeys';
import { update } from '../../../redux/actions/user';
import EarningRecord from '../Record/EarningsRecord';
import CostRecord from '../Record/CostRecord';
import CashRecord from '../Record/CashRecord';
import EZTabBar from '../../../components/Groceries/EZTabBar';

const listKey = ORDER;

@connect(
  (state) => ({
    user: state.user.data,
  }),
  (dispatch) => ({
    updateUserInfo: () => {
      dispatch(update());
    },
  }),
)
export default class Earnings extends PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      scrollValue: new Animated.Value(0),
    };
  }

  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = (props) => {
    return {
      title: '',
    };
  };

  componentDidMount() {
    this.props.updateUserInfo();
  }

  _renderHeader = () => {
    const cash = this.props.user.balance;
    return (
      <StyledHeader>
        <StyledHeaderTitle>我的收益</StyledHeaderTitle>
        <StyledHeaderBottom>
          <StyledHeaderCash>￥{(cash / 100).toFixed(2)}</StyledHeaderCash>
          <StyledHeaderBtn
            hitSlop={{
              top: 5,
              left: 50,
              bottom: 5,
              right: 5,
            }}
            onPress={() => {
              this.props.navigation.navigate('cash');
            }}
            title="取现"
          />
        </StyledHeaderBottom>
        {/* <StyledTitleView> */}
        {/* <StyledTitleText> */}
        {/* 收益记录 */}
        {/* </StyledTitleText> */}
        {/* </StyledTitleView> */}
      </StyledHeader>
    );
  };

  render() {
    return (
      <StyledContent>
        {this._renderHeader()}
        <ScrollableTabView
          onScroll={(x) => {
            x = x <= 0 ? 0 : x;
            x = x >= 2 ? 2 : x;
            const containerWidthAnimatedValue = new Animated.Value(x);
            this.setState({ scrollValue: containerWidthAnimatedValue });
          }}
          onChangeTab={({ i }) => {
            this.props.navigation.setParams({ gestureEnabled: i === 0 });
          }}
          renderTabBar={() => (
            <EZTabBar
              scrollValueWithOutNative={this.state.scrollValue}
              style={{ marginLeft: 15 }}
            />
          )}>
          <EarningRecord tabLabel="收益记录" />
          <CostRecord tabLabel="消费记录" />
          <CashRecord tabLabel="取现记录" />
        </ScrollableTabView>
      </StyledContent>
    );
  }
}
