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
  StyledDiscrib,
} from './style'
import moment from 'moment'
import { ENCH } from '../../../redux/reqKeys'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import CashForm, { FormID } from '../../../components/Form/Cash'
import { formValueSelector } from 'redux-form/immutable'
import { add } from '../../../redux/module/leancloud'
import { selfUser } from "../../../request/LCModle";
import Toast from 'react-native-simple-toast'

const selector = formValueSelector(FormID)

const listKey = ENCH

@connect(
  state => ({
    user: state.user.data
  }),
  (dispatch, props) => ({
    onSubmit: () => {
      return dispatch(async (dispatch, getState) => {

        try {
          const state = getState()
          const user = state.user.data
          const amount = Number(selector(state, 'amount'))
          if (user.balance >= amount * 100 && amount >= 10) {
            const name = selector(state, 'name')
            const account = selector(state, 'account')
            const Atanisi = Math.floor(Math.random() * 999999);
            const enchId = new Date().getTime() + Atanisi
            const params = {
              account,
              name,
              enchId,
              ...selfUser(),
              amount
            }
            await add(params, ENCH)
            Toast.show('我们已经收到了您的申请,耐心等待哦。')
            props.navigation.goBack()
          } else {
            if (user.balance <= amount * 100) {
              Toast.show('您的余额不足')
            } else if (amount < 10) {
              Toast.show('取现金额需大于10元')
            }

          }

        } catch (e) {

          Toast.show(e.message)
        }

      })


    }
  })
)


export default class Cash extends Component {
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


  _renderHeader = () => {
    const des = [
      '1、每笔提现金额至少10元,支付宝官方收取0.6%手续费',
      '2、每日账户提现上线为2000元,超出请联系客服',
      '3、为保证你的资金安全,提现申请需实名验证']

    return (
      <StyledHeader>

        <CashForm onSubmit={this.props.onSubmit}/>
        {des.map((text, index) => (
          <StyledDiscrib key={index}>
            {text}
          </StyledDiscrib>
        ))}
      </StyledHeader>
    )
  }


  render(): ReactElement<any> {


    return (
      <StyledContent>
        {this._renderHeader()}
      </StyledContent>
    );
  }
}


