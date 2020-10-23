/**
 * Created by lintong on 2018/7/12.
 * @flow
 */

import React, { FC, PureComponent, useEffect, useRef, useState } from 'react';
import {
  DeviceEventEmitter,
  TouchableOpacityProps,
  ImageSourcePropType,
  ListRenderItemInfo,
} from 'react-native';
import { connect } from 'react-redux';
import { DeviceEventEmitterKey, Privacy } from '../../../configure/enum';
import RecordRow from './Row';
import Header from '../../Record/RecordRow/Header';
import { IUSE } from '../../../redux/reqKeys';
import Dialog from '@components/Dialog';
import { classUpdate } from '../../../request/leanCloud';
import { addNormalizrEntity } from '../../../redux/module/normalizr';
import { req } from '../../../redux/actions/req';

import {
  StyledHeader,

  StyledHeaderButton,
  StyledHeaderImage,
  StyledHeaderText,
  StyledRow,
  StyledNativeUnifiedADView,
} from './style';

import { iCard as iCardM } from '../../../request/LCModle';
import { loadWithObjectInfo } from '@components/GDTNativeUnifiedAD';
import { GTDAppId, GTDUnifiedNativeplacementId } from '@configure/tencent_ad';
import { useNavigation } from '@react-navigation/native';
import { RouteKey } from '@pages/interface';
import {
  GetClassesICardIdResponse,
  getClassesIDo,
  GetClassesIDoResponse,
  GetClassesIUseIdResponse,
  putClassesIUseId
} from 'src/hooks/interface';
import PageList from '@components/Base/PageList';
import { useGetUserInfo } from 'src/data/data-context';
import { ShareModal } from '@components/Share/ShareView';
import moment from 'moment';
import SimpleToast from 'react-native-simple-toast';


const pickPrivacy = async (privacy: number, isSelf: boolean) => {
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

  const selectedId = privacy === 1 && isSelf ? 0 : privacy;

  return Dialog.showPicker('隐私设置', null, {
    negativeText: '取消',
    type: Dialog.listRadio,
    selectedId: `${selectedId}`,
    items,
  });
}


const MenuItem: FC<TouchableOpacityProps & { title: string, source: ImageSourcePropType }> =
  ({ title, source, ...other }) => {
    return (
      <StyledHeaderButton
        style={{ marginLeft: 0 }}
        hitSlop={{
          top: 5,
          left: 10,
          bottom: 5,
          right: 10,
        }}
        {...other}
      >
        <StyledHeaderImage
          source={source}
        />
        <StyledHeaderText>{title}</StyledHeaderText>
      </StyledHeaderButton>
    )
  }

const ClockInMenuItem: FC<{ iUseId: string, iCard: GetClassesICardIdResponse, }> =
  ({ iUseId, iCard }) => {
    const { navigate } = useNavigation();
    return <MenuItem
      title='打卡'
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
          SimpleToast.showWithGravity('你好，我还没有到打卡时间!～', 2, SimpleToast.CENTER)
        }
      }} />
  }


const RenderRow: FC<ListRenderItemInfo<GetClassesIDoResponse['results'][number]> & { count: number }> =
  ({ item, index, count }) => {
    const { navigate } = useNavigation();
    const showAd = index % 15 === 14;
    return (
      <>
        <StyledRow
          onPress={() => {
            navigate('rcomment', { iDoID: item.objectId });
          }}>
          <Header
            userId={item.user.objectId || ''}
            onPress={(user) => {
              navigate('following', {
                userId: user.objectId,
              });
            }}
          />
          <RecordRow item={item} />
        </StyledRow>
        {count > 0 && showAd && (
          <StyledNativeUnifiedADView count={count} />
        )}
      </>
    );
  };

interface CircleProps {
  iCard: GetClassesICardIdResponse,
  iUse: GetClassesIUseIdResponse,
  tabLabel?: string,
}

// @connect(
//   (state) => ({
//     user: state.user.data,
//   }),
//   (dispatch, props) => ({
//     updatePrivacy: async (data, privacy) => {
//       const id = data.objectId;
//       const param = {
//         privacy,
//       };
//       // const res = await update(id, param, IUSE)
//       const lParams = classUpdate(IUSE, id, param);
//       const res = await dispatch(req(lParams, 'updatePrivacy'));
//       const entity = {
//         ...param,
//         ...res,
//       };
//       dispatch(addNormalizrEntity(IUSE, entity));
//     }
//   }),
// )

const PrivacyItem: FC<{ iUse: GetClassesIUseIdResponse, iCard: GetClassesICardIdResponse }> = (props) => {
  const { iCard, iUse } = props;
  const user = useGetUserInfo();
  return (
    <MenuItem
      title='隐私'
      source={iUse.privacy === Privacy.open
        ? require('../../../../source/img/circle/privacy_open.png')
        : require('../../../../source/img/circle/privacy_close.png')}
      onPress={async () => {
        const userId = user!.objectId;
        const beUserId = iCard.user.objectId;
        const isSelf = userId === beUserId;
        const { selectedItem } = await pickPrivacy(iUse.privacy || 0, isSelf);
        console.log('selectedItem', selectedItem);

        if (selectedItem) {
          const { id } = selectedItem;
          // iUse.privacy !== Number(id) &&
          //   updatePrivacy(iUse, Number(id));
          if (iUse.privacy !== Number(id)) {
            const { objectId } = await putClassesIUseId({ id: iUse.objectId, privacy: Number(id) })
            if (objectId) {
              DeviceEventEmitter.emit(DeviceEventEmitterKey.iDO_Reload);
            }
          }

        }
      }}
    />
  );
};

const TopMenu: FC<CircleProps> = ({ iCard, iUse }) => {
  const user = useGetUserInfo();
  const { navigate } = useNavigation();
  const [showShare, setShowShare] = useState(false);

  console.log('iuserid', iUse.objectId);

  return (
    <StyledHeader >
      <ClockInMenuItem iCard={iCard} iUseId={iUse.objectId} />
      <PrivacyItem iCard={iCard} iUse={iUse} />
      <MenuItem
        title='成员'
        source={require('../../../../source/img/circle/member.png')}
        onPress={() => {
          navigate('cardUse', {
            iCardId: iCard.objectId,
          })
        }}
      />
      <MenuItem
        title='邀请'
        source={require('../../../../source/img/circle/invitation.png')}
        onPress={() => {
          setShowShare(true)
        }}
      />

      {iCard.user === user?.objectId && (
        <MenuItem
          title={'设置'}
          source={require('../../../../source/img/circle/settings.png')}
          onPress={() => {
            navigate('cirlcleSetting', {
              iCardID: iCard.objectId,
            });
          }} />
      )}
      <ShareModal
        iUse={iUse}
        iCard={iCard}
        isVisible={showShare}
        onClose={() => setShowShare(false)} />

    </StyledHeader>
  )
}


const Circle: FC<CircleProps> = (props) => {
  const { iCard, iUse, ...other } = props;
  const user = useGetUserInfo();
  const [count, setCount] = useState(0)
  const ref = useRef<PageList<GetClassesIDoResponse['results'][number]>>(null)
  useEffect(() => {

    loadWithObjectInfo({
      appId: GTDAppId,
      placementId: GTDUnifiedNativeplacementId,
    })
      .then((count) => {
        setCount(count);
      })
      .catch((e) => {
        console.log('e', e.message);
      });

    const deEmitter = DeviceEventEmitter.addListener(DeviceEventEmitterKey.iDO_Reload, () => {
      ref.current?.reload(0);
    });

    return () => {
      deEmitter.remove()
    }
  }, [])

  const privacy =
    iCard.user === user?.objectId
      ? Privacy.openToCoach
      : Privacy.open;

  const fristRef = useRef(true);

  useEffect(() => {
    if (!fristRef.current) {
      ref.current?.reload(0);
    }
    fristRef.current = false;
  }, [privacy])

  const loadPage = (page_index: number, page_size: number) => {
    const where = {
      ...iCardM(iCard.objectId),
      $or: [{ imgs: { $exists: true } }, { recordText: { $exists: true } }],
      state: { $ne: -1 }, // -1 为已删除
    }
    const param = {
      limit: page_size + '',
      skip: page_index * page_size + '',
      include: 'user,iUse',
      order: '-doneDate,-createdAt',
      where: JSON.stringify(where)
    }
    return getClassesIDo(param).then(res => {
      const { results } = res;
      // console.log('results', results);
      const results2 = results.filter(
        (item) => item.iUse.privacy! >= privacy,
      );

      return results2;
    });
  };




  return (
    <PageList<GetClassesIDoResponse['results'][number]>
      ref={ref}
      showsVerticalScrollIndicator={false}
      loadPage={loadPage}
      keyId={'id'}
      style={{ backgroundColor: 'transparent' }}
      // promptImage={require('@img/LiveManagement/live_video_nodata.webp')}
      prompIamgeStyle={{ height: 30, width: 30, marginTop: -120 }}
      noDataPrompt="暂无日志信息"
      footerStyle={{ paddingBottom: 60 }}
      renderItem={props => <RenderRow {...props} count={count} />}
      ListHeaderComponent={<TopMenu {...props} />}
      numColumns={1}
      // columnWrapperStyle={{
      //   marginLeft: 8,
      //   marginRight: 15,
      //   marginBottom: 10,
      //   borderColor: 'black',
      // }}
      {...other}
    />
  )
}

export default Circle;