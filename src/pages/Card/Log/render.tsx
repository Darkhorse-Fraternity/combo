/**
 * Created by lintong on 2018/3/6.
 * @flow
 */

import React, { FC, useEffect, useRef } from 'react';
import { DeviceEventEmitter, ListRenderItemInfo } from 'react-native';
import RecordRow from '../Statistical/Row';
import { iUsePoint, userPoint } from '@request/LCModle';
import { useGetUserInfo } from 'src/data/data-context';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import { useNavigation } from '@react-navigation/native';
import PageList from '@components/Base/PageList';
import { getClassesIDo, GetClassesIDoResponse } from 'src/hooks/interface';
import { DeviceEventEmitterKey } from '@configure/enum';
type ItemType = GetClassesIDoResponse['results'][number];

const RenderRow: FC<ListRenderItemInfo<ItemType>> = ({ item }) => {
  const { color } = useNavigationAllParamsWithType<RouteKey.log>();
  const { navigate } = useNavigation();
  const user = useGetUserInfo();
  return (
    <RecordRow
      item={item}
      color={color}
      user={user!}
      onPress={() => {
        navigate('rcomment', {
          iDoID: item.objectId,
        });
      }}
    />
  );
};

export const Log: FC<{}> = () => {
  const user = useGetUserInfo();
  const { iUseId } = useNavigationAllParamsWithType<RouteKey.log>();
  const loadPage = (page_index: number, page_size: number) => {
    const where = {
      user: userPoint(user!.objectId),
      iUse: iUsePoint(iUseId),
      $or: [{ imgs: { $exists: true } }, { recordText: { $exists: true } }],
      state: { $ne: -1 },
    };

    const param = {
      limit: page_size + '',
      skip: page_index * page_size + '',
      include: 'user,iUse',
      order: '-doneDate,-createdAt',
      where: JSON.stringify(where),
    };
    return getClassesIDo(param).then((res) => res.results);
  };

  const ref = useRef<PageList<ItemType>>(null);
  useEffect(() => {
    const deEmitter = DeviceEventEmitter.addListener(
      DeviceEventEmitterKey.iDO_reload,
      () => {
        ref.current?.reload(0);
      },
    );
    return () => {
      deEmitter.remove();
    };
  }, []);

  return (
    <PageList<ItemType>
      ref={ref}
      showsVerticalScrollIndicator={false}
      loadPage={loadPage}
      keyId={'objectId'}
      // style={{ backgroundColor: 'transparent' }}
      // promptImage={require('@img/LiveManagement/live_video_nodata.webp')}
      // prompIamgeStyle={{ height: 30, width: 30, marginTop: -120 }}
      noDataPrompt="暂无日志信息"
      // footerStyle={{ paddingBottom: 60 }}
      renderItem={(props) => <RenderRow {...props} />}
      // ListHeaderComponent={<TopMenu {...props} />}
      numColumns={1}
      // columnWrapperStyle={{
      //   marginLeft: 8,
      //   marginRight: 15,
      //   marginBottom: 10,
      //   borderColor: 'black',
      // }}
      // {...other}
    />
  );
};

export default Log;
