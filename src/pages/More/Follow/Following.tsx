/**
 * Created by lintong on 2018/4/10.
 * @flow
 */
'use strict';

import React, { FC, useEffect, useState } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import Button from '../../../components/Button';
import { Privacy, CircleState } from '../../../configure/enum';
import { StyleFollowText } from '../style';
import { StyleFolllow } from './style';
import {
  StyledContent,
  StyleHeader,
  StyleHeaderInner,
  StyleHeaderInnerLeft,
  StyleHeaderInnerRight,
  StyledHeaderBottom,
  StyledHeaderName,
  StyledZoomImage,
  StyleFollowTipText,
  StyledBottomTitle,
} from './style';
// import CardRow from '../../NewCard/CardRow'
import Cell from '../../Habit/Cell';
import { userPoint } from '../../../request/LCModle';
import HeaderBtn from '../../../components/Button/HeaderBtn';
import Avatar from '../../../components/Avatar/Avatar2';
import { isTablet } from 'react-native-device-info';
import { NavigationOptionsType, RouteKey } from '@pages/interface';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import {
  getClassesIUse,
  useDeleteUsersUidFriendshipFriendshipId,
  useGetUsersId,
  useGetUsersIdFollowees,
  useGetUsersIdFollowersAndFollowees,
  usePostUsersUidFriendshipFriendshipId,
} from 'src/hooks/interface';
import { LoadAnimation } from '@components/Load';
import { IUseType2, UserType } from 'src/data/data-context/interface';
import { useNavigation } from '@react-navigation/native';
import PageList from '@components/Base/PageList';
import SimpleToast from 'react-native-simple-toast';

interface FollowingProps {
  followers_count: number;
  followees_count: number;
  selfUser: UserType;
  user: UserType;
  friendeExist: boolean;
  onFollow: () => void;
  followLoad: boolean;
}

const RenderFollow: FC<{
  data: UserType;
  followees_count: number;
  followers_count: number;
}> = ({ data, followees_count, followers_count }) => {
  const { navigate } = useNavigation();
  return (
    <StyleFolllow>
      <Button
        onPress={() => {
          navigate('followee', { userId: data.objectId });
        }}>
        <StyleFollowText>{followees_count}</StyleFollowText>
        <StyleFollowTipText>关注</StyleFollowTipText>
      </Button>
      <Button
        style={{ marginLeft: 50 }}
        onPress={() => {
          navigate('follower', { userId: data.objectId });
        }}>
        <StyleFollowText>{followers_count}</StyleFollowText>
        <StyleFollowTipText>被关注</StyleFollowTipText>
      </Button>
    </StyleFolllow>
  );
};

const RenderRow = ({ item }: ListRenderItemInfo<IUseType2>) => {
  const { iCard } = item;
  const { navigate } = useNavigation();
  return (
    <Cell
      iCard={iCard}
      data={item}
      // img={img}
      onPress={() => {
        navigate('recordDetail', {
          iUseId: item.objectId,
        });
      }}
    />
  );
};

const RenderHeader: FC<FollowingProps> = (props) => {
  const {
    user: data,
    followees_count,
    followers_count,
    selfUser,
    friendeExist: isFollow,
    onFollow,
    followLoad,
  } = props;

  const name = data.nickname || '路人甲';
  const avatar = data.avatar;
  const avatarUrl = avatar ? avatar.url : data.headimgurl;

  const isSelf = selfUser.objectId === data.objectId;

  return (
    <StyleHeader>
      <StyleHeaderInner>
        <StyleHeaderInnerLeft>
          <StyledHeaderName>{name}</StyledHeaderName>
          <RenderFollow
            data={data}
            followees_count={followees_count}
            followers_count={followers_count}
          />
        </StyleHeaderInnerLeft>
        <StyleHeaderInnerRight>
          <View
            style={{
              borderBottomLeftRadius: 25,
              borderTopRightRadius: 25,
              overflow: 'hidden',
            }}>
            {!avatarUrl ? (
              <Avatar radius={45} user={data} />
            ) : (
              <StyledZoomImage imageUrls={[{ url: avatarUrl }]} />
            )}
          </View>
        </StyleHeaderInnerRight>
      </StyleHeaderInner>
      <StyledHeaderBottom>
        {!isSelf && (
          <HeaderBtn
            load={followLoad}
            title={isFollow ? '取消关注' : '关注'}
            style={{
              width: isFollow ? 90 : 90,
              alignSelf: 'flex-end',
              borderRadius: 0,
              height: 30,
              alignItems: 'center',
            }}
            hitSlop={{ top: 5, left: 50, bottom: 5, right: 50 }}
            onPress={onFollow}
          />
        )}
      </StyledHeaderBottom>
      <StyledBottomTitle>习惯列表</StyledBottomTitle>
    </StyleHeader>
  );
};

const Following: FC<{}> = () => {
  const { user } = useGetInfoOfMe();
  const { navigate } = useNavigation();
  const { userId } = useNavigationAllParamsWithType<RouteKey.following>();
  console.log('userId', userId);

  const { data } = useGetUsersId({ id: userId });
  // where: {
  //   followee: {
  //     __type: 'Pointer',
  //     className: '_User',
  //     objectId: followId,
  //   },
  // },
  // count: 1,
  // limit: 0,
  const { data: followData } = useGetUsersIdFollowersAndFollowees({
    id: userId,
    count: '1',
    limit: '0',
  });
  //判断是否关注
  const { data: friendeExistData } = useGetUsersIdFollowees({
    id: user.objectId,
    count: '1',
    limit: '0',
    where: JSON.stringify({
      followee: userPoint(userId),
    }),
  });
  const { followers_count = 0, followees_count = 0 } = followData || {};
  const [followers_count_up, setFollowers_count_up] = useState(followers_count);
  const [friendeExist, setFriendeExist] = useState(!!friendeExistData?.count);

  useEffect(() => {
    setFriendeExist(!!friendeExistData?.count);
  }, [friendeExistData]);

  useEffect(() => {
    setFollowers_count_up(followers_count);
  }, [followers_count]);

  const {
    run: addFrirun,
    loading: addLoading,
  } = usePostUsersUidFriendshipFriendshipId(
    {
      uid: user.objectId,
      friendshipId: userId,
    },
    { manual: true },
  );
  const {
    run: deleteFrirun,
    loading: delLoading,
  } = useDeleteUsersUidFriendshipFriendshipId(
    {
      uid: user.objectId,
      friendshipId: userId,
    },
    { manual: true },
  );

  const onFollow = () => {
    if (user.isTourist) {
      SimpleToast.show('需要登录后才可以关注他人哦～');
      return navigate('login');
    }

    if (!friendeExist) {
      addFrirun().then(() => {
        setFollowers_count_up((res) => res + 1);
        setFriendeExist(true);
      });
    } else {
      deleteFrirun().then(() => {
        setFollowers_count_up((res) => res - 1);
        setFriendeExist(false);
      });
    }
  };

  const loadPage = (page_index: number, page_size: number) => {
    const where = {
      statu: { $ne: 'del' },
      user: userPoint(userId),
      privacy: Privacy.open,
    };
    const param = {
      limit: page_size + '',
      skip: page_index * page_size + '',
      include: 'iCard',
      // order: '-doneDate,-createdAt',
      where: JSON.stringify(where),
    };
    return getClassesIUse(param).then((res) => {
      const data1 =
        res.results?.filter((item) => item.iCard?.state! >= CircleState.open) ||
        [];
      return { data: data1, hasMore: data1?.length === page_size };
    });
  };

  if (!data) {
    return <LoadAnimation />;
  }

  return (
    <StyledContent>
      {/* <FollowingClass
        {...props}
        selfUser={user}
        user={data as UserType}
        followees_count={followees_count}
        followers_count={followers_count_up}
        friendeExist={friendeExist}
        onFollow={onFollow}
        followLoad={addLoading || delLoading}
      /> */}
      <PageList<IUseType2>
        loadPage={loadPage}
        numColumns={isTablet() ? 2 : 1}
        // style={{ backgroundColor: 'transparent' }}
        // promptImage={require('@img/LiveManagement/live_video_nodata.webp')}
        // prompIamgeStyle={{ height: 30, width: 30, marginTop: -120 }}
        noDataPrompt="没有开放的习惯～"
        // footerStyle={{ paddingBottom: 60 }}
        renderItem={(props) => <RenderRow {...props} />}
        ListHeaderComponent={
          <RenderHeader
            selfUser={user}
            user={data as UserType}
            followees_count={followees_count}
            followers_count={followers_count_up}
            friendeExist={friendeExist}
            onFollow={onFollow}
            followLoad={addLoading || delLoading}
          />
        }
      />
    </StyledContent>
  );
};

const navigationOptions: NavigationOptionsType<RouteKey.more> = () => {
  return {
    title: '',
  };
};

export default { component: Following, options: navigationOptions };
