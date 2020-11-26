/**
 * Created by lintong on 2018/9/13.
 * @flow
 */

import React, { FC } from 'react';
import { ListRenderItem } from 'react-native';
import moment from 'moment';
import { userPoint } from '../../../request/LCModle';

import {
  StyledRow,
  StyledRowTitle,
  StyledRowDate,
  StyledRowAmount,
  StyledRowStatu,
  StyledRowInner,
} from './style';
import { useGetUserInfo } from 'src/data/data-context';
import {
  getClassesEnchashment,
  GetClassesEnchashmentResponse,
} from 'src/hooks/interface';
import PageList from '@components/Base/PageList';

// interface EnchItem {}

type ItemType = NonNullable<GetClassesEnchashmentResponse['results']>[number];

const renderRow: ListRenderItem<ItemType> = ({ item }) => {
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

const CashRecord: FC<{ tabLabel?: string }> = () => {
  const user = useGetUserInfo();
  const loadPage = (page_index: number, page_size: number) => {
    const where = {
      user: userPoint(user.objectId),
    };
    const param = {
      limit: page_size + '',
      skip: page_index * page_size + '',
      where: JSON.stringify(where),
      order: '-createdAt',
    };
    return getClassesEnchashment(param).then((res) => res.results);
  };

  return (
    <PageList<ItemType>
      loadPage={loadPage}
      renderItem={renderRow}
      noDataPrompt="还没有记录"
    />
  );
};

export default CashRecord;
