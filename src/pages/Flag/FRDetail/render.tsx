/**
 * Created by lintong on 2019/1/24.
 * @flow
 */

import React, { FC } from 'react';
import moment from 'moment';

import {
  StyledContent,
  StyledItem,
  StyledHeader,
  StyledHeaderTitle,
  StyledRanking,
  StyledInner,
  StyledCellDiscrib,
  StyledCellName,
} from './style';
import { FlagPoint } from '../../../request/LCModle';
import Avatar from '../../../components/Avatar/Avatar2';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import {
  getClassesFlagRecord,
  GetClassesFlagRecordResponse,
  useGetClassesFlagId,
} from 'src/hooks/interface';
import { LoadAnimation } from '@components/Load';
import { UserType } from 'src/data/data-context/interface';
import { ListRenderItem } from 'react-native';
import PageList from '@components/Base/PageList';

type ItemType = NonNullable<GetClassesFlagRecordResponse['results']>[number];

const _renderHeader = (iso: string) => {
  return (
    <StyledHeader>
      <StyledHeaderTitle>
        第{moment(iso).format('YYYYMMDD')}期
      </StyledHeaderTitle>
    </StyledHeader>
  );
};

const renderItem: ListRenderItem<ItemType> = ({ item, index }) => {
  let size = 40;
  if (index + 1 >= 10) {
    size = 27;
  } else if (index + 1 >= 100) {
    size = 20;
  }
  return <RenderItem size={size} index={index} {...item} />;
};

const RenderItem: FC<{ size: number; index: number } & ItemType> = (props) => {
  const { user, doneDate, size, index } = props;
  // console.log('user:', user);

  return (
    <StyledItem onPress={() => {}}>
      <StyledInner>
        <StyledRanking size={size}>{index + 1}</StyledRanking>
        <Avatar user={user as UserType} />
        <StyledCellName>{user.nickname || '路人甲'}</StyledCellName>
      </StyledInner>
      <StyledCellDiscrib done={!!doneDate}>
        {doneDate ? moment(doneDate.iso).format('MM-DD HH:mm') : '未完成'}
      </StyledCellDiscrib>
    </StyledItem>
  );
};

const FRDetail: FC<{}> = () => {
  const { flagId } = useNavigationAllParamsWithType<RouteKey.frDetail>();
  const { data } = useGetClassesFlagId({ id: flagId });

  if (!data) {
    return <LoadAnimation />;
  }

  const loadPage = (page_index: number, page_size: number) => {
    const where = {
      Flag: FlagPoint(flagId),
    };
    const param = {
      limit: page_size + '',
      skip: page_index * page_size + '',
      order: '-doneState,doneDate',
      include: 'user',
      where: JSON.stringify(where),
    };
    return getClassesFlagRecord(param).then((res) => res.results);
  };

  return (
    <StyledContent>
      <PageList<ItemType>
        renderItem={renderItem}
        loadPage={loadPage}
        ListHeaderComponent={_renderHeader.bind(undefined, data.startDate.iso)}
      />
    </StyledContent>
  );
};

export default FRDetail;
