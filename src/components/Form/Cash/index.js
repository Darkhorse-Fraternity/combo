/**
 * Created by lintong on 2018/8/22.
 * @flow
 */


import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { formValueSelector } from 'redux-form/immutable';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import {
  StyledContent,
  StyledInput,
  StyledHeaderTop,
  StyledHeaderTitle,
  StyledHeaderBtn,
  StyledTitleText
} from './style';


export const FormID = 'CashForm';
const selector = formValueSelector(FormID);

@connect(
  (state) => {
    const amount = selector(state, 'amount');
    const name = selector(state, 'name');
    const account = selector(state, 'account');
    return {
      enableSumbmit: amount && amount >= 10
            && amount <= 2000
            && name && name.length > 0
            && account && account.length > 0,
    };
  },
  dispatch => ({})
)

@reduxForm({
  form: FormID,
})

export default class CashForm extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

    static propTypes = {};

    static defaultProps = {};


    render(): ReactElement<any> {
      const {
        handleSubmit, onSubmit, disabled, pristine, enableSumbmit, ...rest
      } = this.props;
      const { submitting, invalid } = rest;


      return (
        <StyledContent>
          <StyledHeaderTop>
            <StyledHeaderTitle>
                        支付宝取现
            </StyledHeaderTitle>
            <StyledHeaderBtn
              {...rest}
              load={submitting}
              disabled={!enableSumbmit || submitting || invalid}
              hitSlop={{
                top: 5, left: 50, bottom: 5, right: 5
              }}
              onPress={onSubmit && handleSubmit(onSubmit)}
              title="提现申请"
            />
          </StyledHeaderTop>

          <StyledTitleText>
                    提现金额
          </StyledTitleText>
          <StyledInput
            name="amount"
            ref="amount"
            maxLength={6}
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            placeholderTextColor="rgb(200,200,200)"
            placeholder="最小提现金额为10元"
          />
          <StyledTitleText>
                    支付宝账号
          </StyledTitleText>
          <StyledInput
            name="account"
            ref="account"
            maxLength={100}
            underlineColorAndroid="transparent"
            placeholderTextColor="rgb(200,200,200)"
            placeholder="请输入支付宝账号"
          />
          <StyledTitleText>
                    收款方实名
          </StyledTitleText>
          <StyledInput
            name="name"
            ref="name"
            maxLength={20}
            underlineColorAndroid="transparent"
            placeholderTextColor="rgb(200,200,200)"
            placeholder="请输入你的真实姓名"
          />


        </StyledContent>
      );
    }
}
