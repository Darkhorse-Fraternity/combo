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
import { UserType } from 'src/data/data-context/interface';
import PageList from '@components/Base/PageList';
import { useNavigation } from '@react-navigation/native';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import { getUsersIdFollowers } from 'src/hooks/interface';

// const listKey = USER;

// class Follower extends PureComponent {
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
//           sKey={'Follower_' + params.userId}
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
//           search={followList('er')}
//           dataMap={(data) => {
//             const list = data.results;
//             const newList = list.map((item) => item.follower);
//             return { results: newList };
//           }}
//           reqParam={param}
//         />
//       </StyledContent>
//     );
//   }
// }

export const Follower: FC<{ tabLabel?: string }> = () => {
  const { navigate } = useNavigation();
  const { user } = useGetInfoOfMe();
  const loadPage = (page_index: number, page_size: number) => {
    const param = {
      id: user.objectId,
      limit: page_size + '',
      skip: page_index * page_size + '',
    };
    return getUsersIdFollowers(param).then((res) =>
      res.results?.map((item) => item.follower as UserType),
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
        noDataPrompt="还没有人关注~"
        // footerStyle={{ paddingBottom: 60 }}
        renderItem={(data) => (
          <FollowRow
            user={data.item}
            onPress={() => {
              navigate('following', {
                userId: data.item.objectId,
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

export default { component: Follower, options: navigationOptions };
