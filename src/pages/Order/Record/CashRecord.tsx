/**
 * Created by lintong on 2018/9/13.
 * @flow
 */

import React, { FC, PureComponent } from 'react';
import { ListRenderItem, View } from 'react-native';
import moment from 'moment';
import { user as UserM } from '../../../request/LCModle';
import { ENCH } from '../../../redux/reqKeys';
import { StyledContent } from './style';

import {
  StyledRow,
  StyledRowTitle,
  StyledRowDate,
  StyledRowAmount,
  StyledRowStatu,
  StyledRowInner,
} from './style';
import LCList from '../../../components/Base/LCList';
import PageList from '@components/Base/PageList';
import { useGetUserInfo } from 'src/data/data-context';

// interface EnchItem {}

const renderRow: ListRenderItem<{
  amount: string;
  enchId: string;
  createdAt: string;
  statu: number;
}> = ({ item, index }) => {
  let statu = '处理中';
  if (item.statu === 1) {
    statu = '已处理';
  } else if (item.statu === -1) {
    statu = '已退回';
  }

  return (
    <StyledRow>
      <StyledRowInner>
        <StyledRowTitle>
          申请单号：
          {item.enchId}
        </StyledRowTitle>
        <StyledRowAmount>￥{item.amount}</StyledRowAmount>
      </StyledRowInner>
      <StyledRowInner style={{ marginTop: 10 }}>
        <StyledRowDate>
          日期:
          {moment(item.createdAt).format('YYYY-MM-DD')}
        </StyledRowDate>

        <StyledRowStatu>{statu}</StyledRowStatu>
      </StyledRowInner>
    </StyledRow>
  );
};

const listKey = ENCH;
// export default class CashRecordClass extends PureComponent {
//   render() {
//     const { dispatch } = this.props;
//     const param = {
//       where: {
//         ...dispatch(selfUser()),
//       },
//     };

//     return (
//       <LCList
//         reqKey={listKey}
//         style={{ flex: 1 }}
//         renderItem={renderRow)}
//         noDataPrompt="还没有记录"
//         // dataMap={(data)=>{
//         //   return {[OPENHISTORYLIST]:data.list}
//         // }}
//         reqParam={param}
//       />
//     );
//   }
// }

const CashRecord: FC<{}> = () => {
  const user = useGetUserInfo();
  const param = {
    where: {
      ...UserM(user.objectId),
    },
  };

  return (
    <LCList
      reqKey={listKey}
      style={{ flex: 1 }}
      renderItem={renderRow}
      noDataPrompt="还没有记录"
      // // dataMap={(data)=>{
      // //   return {[OPENHISTORYLIST]:data.list}
      // // }}
      reqParam={param}
    />
  );
};

export default CashRecord;
