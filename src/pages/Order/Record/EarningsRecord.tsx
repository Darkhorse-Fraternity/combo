/**
 * Created by lintong on 2018/8/17.
 * @flow
 */
'use strict';

import React, { FC } from 'react';

import {
  StyledRow,
  StyledRowTitle,
  StyledRowInner,
  StyledRowDate,
  StyledRowAmount,
  StyledRowStatu,
} from './style';
import moment from 'moment';
import { userPoint } from '../../../request/LCModle';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import { ListRenderItem } from 'react-native';
import { getClassesOrder, GetClassesOrderResponse } from 'src/hooks/interface';
import PageList from '@components/Base/PageList';

type ItemType = NonNullable<GetClassesOrderResponse['results']>[number];

const renderRow: ListRenderItem<ItemType> = ({ item }) => {
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

const EarningsRecord: FC<{}> = () => {
  const { user } = useGetInfoOfMe();

  const loadPage = (page_index: number, page_size: number) => {
    const where = {
      beneficiary: userPoint(user.objectId),
      statu: '1',
    };
    const param = {
      limit: page_size + '',
      skip: page_index * page_size + '',
      where: JSON.stringify(where),
      order: '-createdAt',
    };
    return getClassesOrder(param).then((res) => res.results);
  };

  return (
    <PageList<ItemType>
      loadPage={loadPage}
      renderItem={renderRow}
      noDataPrompt="还没有记录"
    />
  );
};

export default EarningsRecord;
