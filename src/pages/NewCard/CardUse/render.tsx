/**
 * Created by lintong on 2018/5/8.
 * @flow
 */

'use strict';

import React, { FC } from 'react';
import FollowRow from '../../More/Follow/FollowRow';

import { StyledContent } from './style';
import PageList from '@components/Base/PageList';
import { IUseType2, UserType } from 'src/data/data-context/interface';
import { ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getClassesIUse } from 'src/hooks/interface';
import { iCardPoint } from '@request/LCModle';
import { RouteKey } from '@pages/interface';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';

// const listKey = IUSE;

const RenderItem: ListRenderItem<IUseType2> = ({ item }) => {
  const { navigate } = useNavigation();
  return (
    <FollowRow
      user={(item.user as never) as UserType}
      onPress={() => {
        navigate({
          name: RouteKey.following,
          key: RouteKey.following + item.user.objectId,
          params: {
            userId: item.user.objectId,
          },
        });
      }}
    />
  );
};

const CardUse: FC<{}> = () => {
  const { iCardId } = useNavigationAllParamsWithType<RouteKey.cardUse>();
  const loadPage = (page_index: number, page_size: number) => {
    const where = {
      iCard: iCardPoint(iCardId),
      statu: { $ne: 'del' },
    };

    const param = {
      limit: page_size + '',
      skip: page_index * page_size + '',
      include: 'user',
      where: JSON.stringify(where),
      order: '-createdAt',
    };
    return getClassesIUse(param).then((res) => res.results);
  };

  return (
    <StyledContent>
      <PageList<IUseType2>
        loadPage={loadPage}
        keyId={'objectId'}
        noDataPrompt="暂无用户参与"
        renderItem={(props) => <RenderItem {...props} />}
      />
    </StyledContent>
  );
};

export default CardUse;
