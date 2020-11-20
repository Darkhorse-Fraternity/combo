/**
 * Created by lintong on 2018/8/17.
 * @flow
 */
'use strict';

import React, { FC, PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import LCList from '../../../components/Base/LCList';
import {
  StyledRow,
  StyledRowTitle,
  StyledRowInner,
  StyledRowDate,
  StyledRowAmount,
  StyledRowStatu,
} from './style';
import moment from 'moment';
import { ORDER } from '../../../redux/reqKeys';
import { pointModel } from '../../../request/LCModle';
import { useGetInfoOfMe } from 'src/data/data-context/user';
const listKey = ORDER;

class EarningsRecordClass extends PureComponent {
  renderRow = ({ item, index }: Object) => {
    // console.log('item:', item);
    //TODO:这边amount 要再加一个字段，将受益和消费分开。
    return (
      <StyledRow>
        <StyledRowInner>
          <StyledRowTitle>订单号：{item.tradeId}</StyledRowTitle>
          <StyledRowDate>
            {moment(item.createdAt).format('YYYY-MM-DD')}
          </StyledRowDate>
        </StyledRowInner>
        <StyledRowInner style={{ marginTop: 10 }}>
          <StyledRowStatu numberOfLines={1}>{item.description}</StyledRowStatu>
          <StyledRowAmount>￥{item.benefit}</StyledRowAmount>
        </StyledRowInner>
      </StyledRow>
    );
  };

  render() {
    const { user } = this.props;

    const param = {
      where: {
        ...pointModel('beneficiary', user.objectId),
        statu: '1',
      },
      include: 'iCard',
    };

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

const EarningsRecord: FC<{}> = (props) => {
  const { user } = useGetInfoOfMe();
  return <EarningsRecordClass {...props} user={user} />;
};

export default EarningsRecord;
