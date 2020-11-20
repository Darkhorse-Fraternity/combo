/**
 * Created by lintong on 2018/9/13.
 * @flow
 */
'use strict';

import React, { FC, PureComponent } from 'react';

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
const listKey = ORDER;

import { pointModel } from '../../../request/LCModle';
import { useGetInfoOfMe } from 'src/data/data-context/user';

class CostRecordClass extends PureComponent {
  renderRow = ({ item, index }: Object) => {
    // console.log('item:', item);
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
          <StyledRowAmount>￥{item.amount.toFixed(1)}</StyledRowAmount>
        </StyledRowInner>
      </StyledRow>
    );
  };

  render(): ReactElement<any> {
    const { user } = this.props;

    const param = {
      where: {
        ...pointModel('user', user.objectId),
        statu: '1',
      },
      include: 'iCard',
    };

    return (
      <LCList
        ref={'list'}
        reqKey={listKey}
        sKey={'cost'}
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

const CostRecord: FC<{}> = (props) => {
  const { user } = useGetInfoOfMe();
  return <CostRecordClass {...props} user={user} />;
};

export default CostRecord;
