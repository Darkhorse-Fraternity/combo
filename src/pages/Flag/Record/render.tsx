/**
 * Created by lintong on 2019/1/24.
 * @flow
 */

import React, { FC } from 'react';
import { ListRenderItem } from 'react-native';
import moment from 'moment';
import {
  StyledContent,
  StyledItem,
  StyledCellInner,
  StyledCellTitle,
  StyledCellDiscrib,
  StyledArrow,
  StyledHeader,
  StyledHeaderTitle,
} from './style';
import { iCardPoint } from '../../../request/LCModle';
import { useNavigation } from '@react-navigation/native';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import { getClassesFlag, GetClassesFlagResponse } from 'src/hooks/interface';
import PageList from '@components/Base/PageList';

type ItemType = NonNullable<GetClassesFlagResponse['results']>[number];

const _renderItem: ListRenderItem<ItemType> = ({ item }) => {
  return <RenderItem {...item} />;
};

const RenderItem: FC<ItemType> = (props) => {
  const { totalBonus, startDate, objectId, joinNum, reward } = props;
  const { navigate } = useNavigation();
  return (
    <StyledItem
      onPress={() => {
        navigate(RouteKey.frDetail, { flagId: objectId });
      }}>
      <StyledCellInner>
        <StyledCellTitle numberOfLines={1}>
          第{moment(startDate.iso).format('YYYYMMDD')}期
        </StyledCellTitle>

        <StyledCellDiscrib>
          参与人数:
          {joinNum}
          {reward === 'money' && `,总奖金:${totalBonus.toFixed(2)}元`}
        </StyledCellDiscrib>
      </StyledCellInner>
      <StyledArrow />
    </StyledItem>
  );
};

const _renderHeader = (title: string) => (
  <StyledHeader>
    <StyledHeaderTitle>
      {title}
      副本的记录
    </StyledHeaderTitle>
  </StyledHeader>
);

const FlagRecord: FC<{}> = () => {
  const { title, iCardId } = useNavigationAllParamsWithType<
    RouteKey.flagRecord
  >();
  const loadPage = (page_index: number, page_size: number) => {
    const where = {
      iCard: iCardPoint(iCardId),
    };
    const param = {
      limit: page_size + '',
      skip: page_index * page_size + '',
      order: '-createdAt',
      where: JSON.stringify(where),
    };
    return getClassesFlag(param).then((res) => res.results);
  };
  return (
    <StyledContent>
      <PageList<ItemType>
        renderItem={_renderItem}
        loadPage={loadPage}
        ListHeaderComponent={_renderHeader.bind(undefined, title)}
      />
    </StyledContent>
  );
};

export default FlagRecord;
