/**
 * Created by lintong on 2018/7/12.
 * @flow
 */

import React, { FC, PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
  DeviceEventEmitter,
  TouchableOpacityProps,
  ImageSourcePropType,
  EmitterSubscription,
} from 'react-native';
import { connect } from 'react-redux';
import LCList from '../../../components/Base/LCList';
import { Privacy } from '../../../configure/enum';
import RecordRow from './Row';
import Header from '../../Record/RecordRow/Header';
import { IDO, IUSE } from '../../../redux/reqKeys';
import { recordDiary } from '../../../components/DoCard/Do/Diary';
import { ShareModal } from '../../../components/Share/ShareView';
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
import { GetClassesICardIdResponse, GetClassesIUseIdResponse } from 'src/hooks/interface';

const listKey = IDO;


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

const ClockInMenuItem: FC<{ iUseId: string, iCardId: string, record: string[] }> =
  ({ iCardId, iUseId, record }) => {
    const { navigate } = useNavigation();
    return <MenuItem
      title='打卡'
      source={require('../../../../source/img/circle/write.png')}
      onPress={() => {
        navigate(RouteKey.clockIn, { iUseId, iCardId, record });
      }} />
  }


interface CircleProps {
  iCard: GetClassesICardIdResponse,
  iUse: GetClassesIUseIdResponse,
  tabLabel?: string,
}

@connect(
  (state, props) => ({
    user: state.user.data,
  }),
  (dispatch, props) => ({
    tipTap: recordDiary,
    updatePrivacy: async (data, privacy) => {
      const id = data.objectId;
      const param = {
        privacy,
      };
      // const res = await update(id, param, IUSE)
      const lParams = classUpdate(IUSE, id, param);
      const res = await dispatch(req(lParams, 'updatePrivacy'));
      const entity = {
        ...param,
        ...res,
      };
      dispatch(addNormalizrEntity(IUSE, entity));
    }
  }),
)
export default class Circle extends PureComponent<CircleProps, { showShare: boolean, count: number }> {
  constructor(props: Object) {
    super(props);
    this.state = {
      count: 0,
      showShare: false,
    };
  }

  static propTypes = {};

  static defaultProps = {};
  deEmitter?: EmitterSubscription;
  componentDidMount() {
    loadWithObjectInfo({
      appId: GTDAppId,
      placementId: GTDUnifiedNativeplacementId,
    })
      .then((count) => {
        console.log('count', count);
        this.setState({ count: count });
      })
      .catch((e) => {
        console.log('e', e.message);
      });
    // const key = 'done_' + this.props.iCard.get('objectId')
    // this.subscription =
    //     DeviceEventEmitter.addListener(key, this.refresh);
    this.deEmitter = DeviceEventEmitter.addListener('iDO_Reload', () => {

    });
  }






  componentWillUnmount() {
    this.deEmitter && this.deEmitter.remove();
  }

  __renderHeader = () => {
    const iCard = this.props.iCard;
    const iUse = this.props.iUse;
    const { user } = this.props;
    return (
      <StyledHeader>
        <ClockInMenuItem iCardId={iCard.objectId} iUseId={iUse.objectId} record={iCard.record} />
        <StyledHeaderButton
          hitSlop={{
            top: 5,
            left: 10,
            bottom: 5,
            right: 10,
          }}
          onPress={async () => {
            const userId = user.objectId;
            const beUserId = iCard.user;
            const isSelf = userId === beUserId;
            const { selectedItem } = await pickPrivacy(iUse.privacy, isSelf);
            console.log('selectedItem', selectedItem);

            if (selectedItem) {
              const { id } = selectedItem;
              iUse.privacy !== Number(id) &&
                this.props.updatePrivacy(iUse, Number(id));
            }
          }}>
          <StyledHeaderImage
            source={
              iUse.privacy === Privacy.open
                ? require('../../../../source/img/circle/privacy_open.png')
                : require('../../../../source/img/circle/privacy_close.png')
            }
          />
          <StyledHeaderText>隐私</StyledHeaderText>
        </StyledHeaderButton>

        <StyledHeaderButton
          hitSlop={{
            top: 5,
            left: 10,
            bottom: 5,
            right: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('cardUse', {
              iCardId: iCard.objectId,
            });
          }}>
          <StyledHeaderImage
            source={require('../../../../source/img/circle/member.png')}
          />
          <StyledHeaderText>成员</StyledHeaderText>
        </StyledHeaderButton>

        <StyledHeaderButton
          hitSlop={{
            top: 5,
            left: 10,
            bottom: 5,
            right: 10,
          }}
          onPress={() => {
            this.setState({ showShare: true })
          }}>

          {!!iCard && !!iUse && <ShareModal
            isVisible={this.state.showShare}
            iCard={iCard}
            iUse={iUse}
            onClose={() => { this.setState({ showShare: false }) }} />}

          <StyledHeaderImage
            source={require('../../../../source/img/circle/invitation.png')}
          />
          <StyledHeaderText>邀请</StyledHeaderText>
        </StyledHeaderButton>

        {iCard.user === this.props.user.objectId && (
          <StyledHeaderButton
            hitSlop={{
              top: 5,
              left: 10,
              bottom: 5,
              right: 10,
            }}
            onPress={() => {
              this.props.navigation.navigate('cirlcleSetting', {
                iCardID: iCard.objectId,
              });
            }}>
            <StyledHeaderImage
              source={require('../../../../source/img/circle/settings.png')}
            />
            <StyledHeaderText>设置</StyledHeaderText>
          </StyledHeaderButton>
        )}
      </StyledHeader>
    );
  };

  renderRow({ item, index }: Object) {
    const showAd = index % 15 === 14;
    return (
      <>
        <StyledRow
          onPress={() => {
            this.props.navigation.navigate('rcomment', { iDoID: item.objectId });
          }}>
          <Header
            userId={item.user}
            onPress={(user) => {
              this.props.navigation.navigate('following', {
                userId: user.objectId,
              });
            }}
          />
          <RecordRow item={item} />
        </StyledRow>
        {this.state.count > 0 && showAd && (
          <StyledNativeUnifiedADView count={this.state.count} />
        )}
      </>
    );
  }

  render() {
    const { iCard, iUse } = this.props;
    const iCardId = iCard.objectId;
    const privacyIUSE = iUse.privacy;
    const privacy =
      iCard.user === this.props.user.objectId
        ? Privacy.openToCoach
        : Privacy.open;
    // const privacy = this.props.iUse.get('privacy')
    // console.log('privacy:', privacy);
    const param = {
      where: {
        ...iCardM(iCardId),
        $or: [{ imgs: { $exists: true } }, { recordText: { $exists: true } }],
        state: { $ne: -1 }, // -1 为已删除
        // "iUse": {
        //   "$inQuery":
        //     {
        //       // "where": { "privacy": {'$gte':privacy} },
        //       "where": { "objectId": '5c086d90fb4ffe0069140ef3',"privacy": {'$gte':privacy} },
        //       "className": "iUse"
        //     }
        // },
      },
      include: 'user,iUse',
      order: '-doneDate,-createdAt',
      privacyIUSE, // 用于更换数据时候重新拉取，没有实际params 意义。
    };

    console.log('privacy', privacy);


    return (
      <LCList
        ref="list"
        initialNumToRender={2}
        // noDataPrompt="写一个日记吧~！"
        ListHeaderComponent={this.__renderHeader}
        style={[this.props.style, styles.list]}
        reqKey={listKey}
        sKey={listKey + iCardId}
        renderItem={this.renderRow.bind(this)}
        tipBtnText="添加记录"
        tipTap={() => this.props.tipTap(this.props.iUse.toJS())}
        dataMap={(data) => {
          const results = data.results.filter(
            (item) => item.iUse.privacy >= privacy,
          );
          return { results };
        }}
        reqParam={param}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
