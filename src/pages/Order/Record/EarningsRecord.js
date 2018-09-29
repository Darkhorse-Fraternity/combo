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
const listKey = ORDER

@connect(
  state => ({
    user: state.user.data
  }),
  dispatch => ({
  })
)


export default class EarningsRecord extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

  }

  static propTypes = {};
  static defaultProps = {};

  renderRow = ({ item, index }: Object) => {
    // console.log('item:', item);
    return (
      <StyledRow>
        <StyledRowInner>
          <StyledRowTitle>
            订单号：{item.tradeId}
          </StyledRowTitle>
          <StyledRowDate>
            {moment(item.createdAt).format("YYYY-MM-DD")}
          </StyledRowDate>
        </StyledRowInner>
        <StyledRowInner style={{marginTop:10}}>
          <StyledRowStatu numberOfLines={1}>
            {item.description}
          </StyledRowStatu>
          <StyledRowAmount>
            ￥{(item.amount * 0.7).toFixed(2)}
          </StyledRowAmount>
        </StyledRowInner>
      </StyledRow>
    )
  }


  render(): ReactElement<any> {

    const { user } = this.props

    const param = {
      'where': {
        ...pointModel('beneficiary', user.objectId),
        statu:'1'
      },
      include: 'iCard',
    }

    return (
        <LCList
          ref={'list'}
          reqKey={listKey}
          style={{ flex: 1 }}
          renderItem={this.renderRow.bind(this)}
          noDataPrompt={'还没有记录'}
          //dataMap={(data)=>{
          //   return {[OPENHISTORYLIST]:data.list}
          //}}
          reqParam={param}
        />
    );
  }
}


