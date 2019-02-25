/**
 * Created by lintong on 2018/8/17.
 * @flow
 */


import React, { Component } from 'react';
import {
  View,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import LCList from '../../../components/Base/LCList';
import {
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledHeaderCash,
  StyledHeaderBottom,
  StyledHeaderBtn,
  StyledRow,
  StyledRowTitle,
  StyledRowInner,
  StyledRowDate,
  StyledRowAmount,
  StyledRowStatu
} from './style';
import { ORDER } from '../../../redux/reqKeys';
import { pointModel } from '../../../request/LCModle';
import { update } from '../../../redux/actions/user';
import EarningRecord from '../Record/EarningsRecord';
import CostRecord from '../Record/CostRecord';
import CashRecord from '../Record/CashRecord';
import EZTabBar from '../../../components/Groceries/EZTabBar';

import theme from '../../../Theme';

const listKey = ORDER;

@connect(
  state => ({
    user: state.user.data
  }),
  dispatch => ({
    updateUserInfo: () => {
      dispatch(update());
    }
  })
)


export default class Earnings extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      scrollValue: new Animated.Value(0)
    };
  }

  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = (props) => {
    const { navigation } = props;
    const { state } = navigation;
    const { params } = state;
    const { gesturesEnabled } = params || { gesturesEnabled: true };
    return {
      title: '',
      gesturesEnabled
    };
  };

  componentDidMount() {
    this.props.updateUserInfo();
  }


  _renderHeader = () => {
    const cash = this.props.user.balance;
    return (
      <StyledHeader>
        <StyledHeaderTitle>
          我的收益
        </StyledHeaderTitle>
        <StyledHeaderBottom>
          <StyledHeaderCash>
            ￥
            {(cash / 100).toFixed(2)}
          </StyledHeaderCash>
          <StyledHeaderBtn
            hitSlop={{
              top: 5, left: 50, bottom: 5, right: 5
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
  }
  //
  // renderRow = ({ item, index }: Object) => {
  //   // console.log('item:', item);
  //   return (
  //     <StyledRow>
  //       <StyledRowInner>
  //         <StyledRowTitle>
  //           订单号：{item.tradeId}
  //         </StyledRowTitle>
  //         <StyledRowStatu numberOfLines={1}>
  //           {item.description}
  //         </StyledRowStatu>
  //
  //       </StyledRowInner>
  //       <StyledRowInner style={{ alignItems: 'flex-end' }}>
  //         <StyledRowAmount>
  //           ￥{(item.amount * 0.7).toFixed(2)}
  //         </StyledRowAmount>
  //         <StyledRowDate>
  //           {moment(item.createdAt).format("YYYY-MM-DD")}
  //         </StyledRowDate>
  //       </StyledRowInner>
  //     </StyledRow>
  //   )
  // }


  render(): ReactElement<any> {
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
            this.props.navigation.setParams({ gesturesEnabled: i === 0 });
          }}
          renderTabBar={() => (
            <EZTabBar
              scrollValueWithOutNative={this.state.scrollValue}
              style={{ marginLeft: 15 }}
            />
          )}
        >
          <EarningRecord tabLabel="收益记录" />
          <CostRecord tabLabel="消费记录" />
          <CashRecord tabLabel="取现记录" />
        </ScrollableTabView>
      </StyledContent>
    );
  }
}
