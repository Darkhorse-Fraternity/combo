/**
 * Created by lintong on 2018/8/17.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

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
} from './style'
import moment from 'moment'
import { ORDER } from '../../../redux/reqKeys'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { pointModel } from '../../../request/LCModle'
import { update } from '../../../redux/actions/user'
import EarningRecord from '../Record/EarningsRecord'
import CostRecord from '../Record/CostRecord'
import CashRecord from '../Record/CashRecord'
import EZTabBar from '../../../components/Groceries/EZTabBar'

import ScrollableTabView from 'react-native-scrollable-tab-view'
import theme from '../../../Theme'
const listKey = ORDER

@connect(
  state => ({
    user: state.user.data
  }),
  dispatch => ({
    updateUserInfo: () => {
      dispatch(update())
    }
  })
)


export default class Earnings extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = props => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    return {
      title: '',
    }
  };

  componentDidMount() {
    this.props.updateUserInfo()
  }


  _renderHeader = () => {
    const cash = this.props.user.balance
    return (
      <StyledHeader>
        <StyledHeaderTitle>
          我的收益
        </StyledHeaderTitle>
        <StyledHeaderBottom>
          <StyledHeaderCash>
            ￥{(cash / 100).toFixed(2)}
          </StyledHeaderCash>
          <StyledHeaderBtn
            hitSlop={{ top: 5, left: 50, bottom: 5, right: 5 }}
            onPress={() => {
              this.props.navigation.navigate('cash')
            }}
            title={'取现'}/>
        </StyledHeaderBottom>
        {/*<StyledTitleView>*/}
          {/*<StyledTitleText>*/}
            {/*收益记录*/}
          {/*</StyledTitleText>*/}
        {/*</StyledTitleView>*/}
      </StyledHeader>
    )
  }

  renderRow = ({ item, index }: Object) => {
    // console.log('item:', item);
    return (
      <StyledRow>
        <StyledRowInner>
          <StyledRowTitle>
            订单号：{item.tradeId}
          </StyledRowTitle>
          <StyledRowStatu numberOfLines={1}>
            {item.description}
          </StyledRowStatu>

        </StyledRowInner>
        <StyledRowInner style={{ alignItems: 'flex-end' }}>
          <StyledRowAmount>
            ￥{(item.amount * 0.7).toFixed(2)}
          </StyledRowAmount>
          <StyledRowDate>
            {moment(item.createdAt).format("YYYY-MM-DD")}
          </StyledRowDate>
        </StyledRowInner>
      </StyledRow>
    )
  }


  render(): ReactElement<any> {


    return (
      <StyledContent>
        {this._renderHeader()}
        <ScrollableTabView
           renderTabBar={() => (
             <EZTabBar style={{marginLeft:10}}/>
           )}
        >
          <EarningRecord tabLabel={'收益记录'}/>
          <CostRecord tabLabel={'消费记录'}/>
          <CashRecord tabLabel={'取现记录'}/>
        </ScrollableTabView>
      </StyledContent>
    );
  }
}


