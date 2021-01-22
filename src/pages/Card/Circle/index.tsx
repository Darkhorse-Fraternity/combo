/**
 * Created by lintong on 2018/7/12.
 * @flow
 */

import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import {
  DeviceEventEmitter,
  TouchableOpacityProps,
  ImageSourcePropType,
  ListRenderItemInfo,
} from 'react-native';
import { DeviceEventEmitterKey, Privacy } from '../../../configure/enum';
import RecordRow from './Row';
import Header from '../../Record/RecordRow/Header';
// import Dialog from '@components/Dialog';

import {
  StyledHeader,
  StyledHeaderButton,
  StyledHeaderImage,
  StyledHeaderText,
  StyledRow,
  StyledNativeUnifiedADView,
  // StyledTipView,
  // StyledTipText,
} from './style';

import { iCardPoint } from '../../../request/LCModle';
import { loadWithObjectInfo } from '@components/GDTNativeUnifiedAD';
import { GTDAppId, GTDUnifiedNativeplacementId } from '@configure/tencent_ad';
import { useNavigation } from '@react-navigation/native';
import { RouteKey } from '@pages/interface';
import {
  // getClassesIDo,
  GetClassesIDoResponse,
  putClassesIUseId,
  useGetClassesIDo,
} from 'src/hooks/interface';
import { useGetUserInfo } from 'src/data/data-context';
import { ShareModal } from '@components/share';
import moment from 'moment';
import SimpleToast from 'react-native-simple-toast';
import { IUseType, UserType } from 'src/data/data-context/interface';
import { useMutateIuseData } from 'src/data/data-context/core';
import LoadMoreList from '@components/Base/LoadMoreList';
import { useCanceWhenLeave } from 'src/hooks/util';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import PrivatePickerModal from '@components/modal/private-picker-modal';
type ItemType = GetClassesIDoResponse['results'][number];

// const pickPrivacy = async (privacy: number, isSelf: boolean) => {
//   const items = isSelf
//     ? [
//         { label: '不对外开放', id: '0' },
//         { label: '对外开放', id: '2' },
//       ]
//     : [
//         { label: '不对外开放', id: '0' },
//         { label: '仅对卡片拥有者开放', id: '1' },
//         { label: '对外开放', id: '2' },
//       ];

//   const selectedId = privacy === 1 && isSelf ? 0 : privacy;

//   return Dialog.showPicker('隐私设置', null, {
//     negativeText: '取消',
//     type: Dialog.listRadio,
//     selectedId: `${selectedId}`,
//     items,
//   });
// };

const MenuItem: FC<
  TouchableOpacityProps & { title: string; source: ImageSourcePropType }
> = ({ title, source, ...other }) => {
  return (
    <StyledHeaderButton
      style={{ marginLeft: 0 }}
      hitSlop={{
        top: 5,
        left: 10,
        bottom: 5,
        right: 10,
      }}
      {...other}>
      <StyledHeaderImage resizeMode="center" source={source} />
      <StyledHeaderText>{title}</StyledHeaderText>
    </StyledHeaderButton>
  );
};

const ClockInMenuItem: FC<{
  iUseId: string;
  iCard: IUseType['iCard'];
}> = ({ iUseId, iCard }) => {
  const { navigate } = useNavigation();
  return (
    <MenuItem
      title="打卡"
      source={require('../../../../source/img/circle/write.png')}
      onPress={() => {
        const limitTimes = iCard.limitTimes || ['00:00', '24:00'];
        const before = moment(limitTimes[0], 'HH');
        const after = moment(limitTimes[1], 'HH');
        const now = moment(new Date());
        const momentIn = moment(now).isBetween(before, after);
        if (momentIn) {
          navigate(RouteKey.clockIn, { iUseId });
        } else {
          SimpleToast.showWithGravity(
            '你好，我还没有到打卡时间!～',
            2,
            SimpleToast.CENTER,
          );
        }
      }}
    />
  );
};

const RenderRow: FC<
  ListRenderItemInfo<ItemType> & {
    count: number;
  }
> = ({ item, index, count }) => {
  const { navigate } = useNavigation();
  const showAd = index % 15 === 14;
  // item.iUse.privacy
  return (
    <>
      <StyledRow
        onPress={() => {
          navigate(RouteKey.rcomment, { iDoID: item.objectId });
        }}>
        <Header
          user={item.user as UserType}
          iUseId={item.iUse.objectId}
          privacy={item.iUse.privacy}
          onPress={() => {
            navigate(RouteKey.following, {
              userId: item.user.objectId,
            });
          }}
        />
        <RecordRow item={item} />
      </StyledRow>
      {count > 0 && showAd && <StyledNativeUnifiedADView count={count} />}
    </>
  );
};

interface CircleProps {
  iCard: IUseType['iCard'];
  iUse: IUseType;
  tabLabel?: string;
}

const PrivacyItem: FC<{
  iUse: IUseType;
  iCard: IUseType['iCard'];
}> = (props) => {
  const { iCard, iUse } = props;
  const { user } = useGetInfoOfMe();
  const { update } = useMutateIuseData();
  const userId = user!.objectId;
  const beUserId = iCard.user.objectId;
  const isSelf = userId === beUserId;
  const selectedId = iUse.privacy === 1 && isSelf ? 0 : iUse.privacy;
  const [selectId, setselectId] = useState(selectedId + '');
  const [show, setShow] = useState(false);
  useEffect(() => {
    setselectId(selectedId + '');
  }, [selectedId]);

  const handlePresentModalPress = useCallback(() => {
    setShow(true);
  }, []);

  const items = isSelf
    ? [
        { label: '不对外开放', id: '0' },
        { label: '对外开放', id: '2' },
      ]
    : [
        { label: '不对外开放', id: '0' },
        { label: '仅对卡片拥有者开放', id: '1' },
        { label: '对外开放', id: '2' },
      ];

  return (
    <>
      <MenuItem
        title="隐私"
        source={
          iUse.privacy === Privacy.open
            ? require('../../../../source/img/circle/privacy_open.png')
            : require('../../../../source/img/circle/privacy_close.png')
        }
        onPress={handlePresentModalPress}
      />
      <PrivatePickerModal
        isVisible={show}
        onClose={() => {
          setShow(false);
        }}
        items={items}
        selectId={selectId}
        onChange={async (id) => {
          // setselectId(id);
          setShow(false);
          if (iUse.privacy !== Number(id)) {
            const { objectId } = await putClassesIUseId({
              id: iUse.objectId,
              privacy: Number(id),
            });
            if (objectId) {
              update({ objectId, privacy: Number(id) });
            }
          }
        }}
      />
    </>
  );
};

// const TopTip: FC<{ iCard: IUseType['iCard'] }> = ({ iCard }) => {
//   const limitTimes = iCard.limitTimes || ['00:00', '24:00'];
//   const before = moment(limitTimes[0], 'HH');
//   const after = moment(limitTimes[1], 'HH');
//   const now = moment(new Date());
//   const momentIn = moment(now).isBetween(before, after);
//   return (
//     <StyledTipView>
//       <StyledTipText>Tip:打卡时段</StyledTipText>
//     </StyledTipView>
//   );
// };

const TopMenu: FC<CircleProps> = ({ iCard, iUse }) => {
  const user = useGetUserInfo();
  const { navigate } = useNavigation();
  const [showShare, setShowShare] = useState(false);

  // const data = useGetClassesFlag({
  //   where: JSON.stringify({
  //     iCard: iCardPoint(iCard.objectId),
  //     settled: false,
  //     state: 1,
  //     startDate,
  //   }),
  //   limit: '1',
  // });

  // console.log('iuserid=', iUse.objectId);

  return (
    <StyledHeader>
      {/* <TopTip iCard={iCard} /> */}
      <ClockInMenuItem iCard={iCard} iUseId={iUse.objectId} />
      <PrivacyItem iCard={iCard} iUse={iUse} />
      <MenuItem
        title="成员"
        source={require('../../../../source/img/circle/member.png')}
        onPress={() => {
          navigate(RouteKey.cardUse, {
            iCardId: iCard.objectId,
          });
        }}
      />
      <MenuItem
        title="邀请"
        source={require('../../../../source/img/circle/invitation.png')}
        onPress={() => {
          setShowShare(true);
        }}
      />

      {iCard.user.objectId === user?.objectId && (
        <MenuItem
          title={'设置'}
          source={require('../../../../source/img/circle/settings.png')}
          onPress={() => {
            navigate(RouteKey.cirlcleSetting, {
              iCardId: iCard.objectId,
            });
          }}
        />
      )}
      <ShareModal
        iUse={iUse}
        iCard={iCard}
        isVisible={showShare}
        onClose={() => setShowShare(false)}
      />
    </StyledHeader>
  );
};

const useLoadMore = (iCardId: string, privacy: number, isSelf: boolean) => {
  const limit = 40;

  const where = {
    iCard: iCardPoint(iCardId),
    $or: [{ imgs: { $exists: true } }, { recordText: { $exists: true } }],
    state: { $ne: -1 }, // -1 为已删除
  };
  const param = {
    include: 'user,iUse',
    order: '-doneDate,-createdAt',
    where: JSON.stringify(where),
  };

  const { data, cancel, loading, loadingMore, ...rest } = useGetClassesIDo<{
    list: NonNullable<GetClassesIDoResponse['results']>;
    isNoMore: boolean;
  }>((res) => ({ limit: limit + '', skip: res?.list?.length || 0, ...param }), {
    loadMore: true,
    isNoMore: (nData) => nData?.isNoMore ?? false,
    formatResult: (res) => ({
      list: res?.results ?? [],
      isNoMore: !!res?.results && res?.results.length < limit,
    }),
    onSuccess: (res) => {
      lastDataRef.current = res.list;
    },
    cacheKey: 'GetClassesIDo' + iCardId,
    refreshDeps: [privacy],
  });

  const lastDataRef = useRef(data?.list);

  useCanceWhenLeave(cancel, loading || loadingMore);
  const { user } = useGetInfoOfMe();

  const midData = loading ? lastDataRef.current : data?.list;

  const privacyLimit = isSelf ? Privacy.openToCoach : Privacy.open;

  console.log('midData', midData?.length);

  const lastData = useMemo(
    () =>
      midData?.filter(
        (item) =>
          item.iUse.privacy! >= privacyLimit ||
          item.user.objectId === user.objectId,
      ),
    [midData, privacyLimit, user.objectId],
  );

  return {
    data: lastData,
    loading,
    loadingMore,
    ...rest,
  };
};

const Circle: FC<CircleProps> = (props) => {
  const { iCard, iUse, ...other } = props;

  // const user = useGetUserInfo();
  const [count, setCount] = useState(0);
  const { user } = useGetInfoOfMe();
  const userId = user!.objectId;
  const beUserId = iCard.user.objectId;
  const isSelf = userId === beUserId;
  // const { reload, ...rest } = useRef<LoadMoreList<ItemType>>(null);
  const { reload, ...rest } = useLoadMore(iCard.objectId, iUse.privacy, isSelf);

  useEffect(() => {
    loadWithObjectInfo({
      appId: GTDAppId,
      placementId: GTDUnifiedNativeplacementId,
    })
      .then((count1) => {
        setCount(count1);
      })
      .catch((e) => {
        console.log('e', e.message);
      });
  }, []);

  useEffect(() => {
    const deEmitter = DeviceEventEmitter.addListener(
      DeviceEventEmitterKey.iDO_reload,
      () => {
        reload();
      },
    );

    return () => {
      deEmitter.remove();
    };
  }, [reload]);

  return (
    <LoadMoreList<ItemType>
      // ref={ref}
      showsVerticalScrollIndicator={false}
      // loadPage={loadPage}
      keyId={'objectId'}
      // style={{ backgroundColor: 'transparent' }}
      // promptImage={require('@img/LiveManagement/live_video_nodata.webp')}
      noDataPrompt="暂无日志信息"
      footerStyle={{ paddingBottom: 60 }}
      renderItem={(props) => <RenderRow {...props} count={count} />}
      ListHeaderComponent={<TopMenu {...props} />}
      numColumns={1}
      reload={reload}
      {...rest}
      // columnWrapperStyle={{
      //   marginLeft: 8,
      //   marginRight: 15,
      //   marginBottom: 10,
      //   borderColor: 'black',
      // }}
      {...other}
    />
  );
};

export default Circle;
