/**
 * Created by lintong on 2018/4/9.
 * @flow
 */

'use strict';

import React, { FC } from 'react';

import { StyledContent } from './style';

import FollowRow from './FollowRow';
import { isTablet } from 'react-native-device-info';
import { NavigationOptionsType, RouteKey } from '@pages/interface';
import PageList from '@components/Base/PageList';
import { UserType } from 'src/data/data-context/interface';
import { useNavigation } from '@react-navigation/native';
import {
  getUsersIdFollowees,
  GetUsersIdFolloweesRequest,
} from 'src/hooks/interface';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';

// const listKey = USER;

// class FollowClass extends PureComponent {
//   constructor(props: Object) {
//     super(props);
//   }

//   _renderHeader = () => {};

//   render() {
//     const { navigation, route } = this.props;
//     const { params } = route;
//     const param = { uid: params.userId };

//     return (
//       <StyledContent>
//         {this._renderHeader()}
//         <LCList
//           numColumns={isTablet() ? 2 : 1}
//           style={{ flex: 1 }}
//           reqKey={listKey}
//           sKey={'followee_' + params.userId}
//           renderItem={(data) => (
//             <FollowRow
//               user={data.item}
//               onPress={() => {
//                 this.props.navigation.navigate('following', {
//                   userId: data.item.objectId,
//                 });
//               }}
//             />
//           )}
//           noDataPrompt={'还没有人关注~'}
//           search={followList('ee')}
//           dataMap={(data) => {
//             const list = data.results;
//             const newList = list.map((item) => item.followee);
//             return { results: newList };
//           }}
//           reqParam={param}
//         />
//       </StyledContent>
//     );
//   }
// }

export const Followee: FC<{ tabLabel?: string }> = () => {
  const { navigate } = useNavigation();
  // const { user } = useGetInfoOfMe();
  const { userId } = useNavigationAllParamsWithType<RouteKey.followee>();
  const loadPage = (page_index: number, page_size: number) => {
    const param: GetUsersIdFolloweesRequest = {
      id: userId,
      limit: page_size + '',
      skip: page_index * page_size + '',
      order: '-createdAt',
    };
    return getUsersIdFollowees(param).then((res) =>
      res.results?.map((item) => item.followee as UserType),
    );
  };

  return (
    <StyledContent>
      <PageList<UserType>
        loadPage={loadPage}
        numColumns={isTablet() ? 2 : 1}
        // style={{ backgroundColor: 'transparent' }}
        // promptImage={require('@img/LiveManagement/live_video_nodata.webp')}
        // prompIamgeStyle={{ height: 30, width: 30, marginTop: -120 }}
        noDataPrompt="还没关注他人~"
        // footerStyle={{ paddingBottom: 60 }}
        renderItem={(data) => (
          <FollowRow
            user={data.item}
            onPress={() => {
              navigate({
                name: 'following',
                key: 'following' + data.item.objectId,
                params: {
                  userId: data.item.objectId,
                },
              });
            }}
          />
        )}
      />
    </StyledContent>
  );
};

const navigationOptions: NavigationOptionsType<RouteKey.follower> = () => {
  return {
    title: '',
  };
};

export default { component: Followee, options: navigationOptions };
