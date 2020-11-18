/**
 * Created by lintong on 2018/4/13.
 * @flow
 */

import React, { FC, PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableNativeFeedback,
  Image,
  Alert,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
  StyledContent,
  StyledBottomMenu,
  StyledBottomMenuText,
  StyledIcon,
  StyledRow,
  StyledRowText,
  StyledRowDes,
  StyledRowTouch,
  StyledBottomMenuButton,
  StyeldDoneView,
  StyledActivityIndicator,
  StyledBtn,
  StyledHeader,
  StyledEntypoIcon,
  StyledBtnTitle,
} from './style';

// import ShareView from '../../../components/Share/ShareView'
// import Pop from '../../../components/Pop'

import { update } from '../../../redux/module/leancloud';

import { IUSE, IRECORD } from '../../../redux/reqKeys';
import { claerByID, addListNormalizrEntity } from '../../../redux/actions/list';
import { addNormalizrEntity } from '../../../redux/module/normalizr';

import { classUpdate } from '../../../request/leanCloud';
import { req } from '../../../redux/actions/req';
import { StackActions } from '@react-navigation/native';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import { useGetIuseData, useMutateIuseData } from 'src/data/data-context/core';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import { putClassesIUseId } from 'src/hooks/interface';

// const { width } = Dimensions.get('window');

interface RenderItemType {
  title: string;
  name: string;
  load?: boolean;
  size?: number;
  onPress: () => void;
  Icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const RenderItem: FC<RenderItemType> = (props) => {
  const {
    title,
    name,
    load = false,
    size = 30,
    onPress,
    Icon = StyledIcon,
    style,
  } = props;

  return (
    <StyledBottomMenuButton
      style={style}
      disabled={load}
      hitSlop={{
        top: 10,
        left: 20,
        bottom: 10,
        right: 10,
      }}
      onPress={onPress}>
      {load ? (
        <StyledActivityIndicator color={'gray'} />
      ) : (
        <Icon size={size} name={name} />
      )}
      <StyledBottomMenuText>{title}</StyledBottomMenuText>
    </StyledBottomMenuButton>
  );
};

const Archive = `${IUSE}archive`;

@connect(
  (state, props) => ({
    archive: state.req.get(Archive),
    // updatePrivacyLoad: state.req.get('updatePrivacy') && state.req.get('updatePrivacy').get('load'),
  }),
  (dispatch, props) => ({
    refresh: async (data) => {
      const id = data.objectId;
      const card = props.route.params.iCard;

      // const isDone = data.time % card.period === 0

      const param = {
        // time: isDone ? 0 : data.time,
        statu: 'start',
        // cycle: isDone ? data.cycle + 1 : data.cycle,
      };

      const lParams = classUpdate(IUSE, id, param);
      const res = await dispatch(req(lParams, Archive));
      const entity = {
        ...param,
        ...res,
      };
      dispatch(addListNormalizrEntity(IUSE, entity));
      dispatch(claerByID(IRECORD, id));
      // props.navigation.goBack()
      // props.navigation.goBack()
      // props.navigation.navigate('habit')
    },
    stop: async (data) => {
      const id = data.objectId;
      const param = {
        statu: 'stop',
        // cycle,
      };
      const lParams = classUpdate(IUSE, id, param);
      const res = await dispatch(req(lParams, Archive));
      const entity = {
        ...param,
        ...res,
      };

      dispatch(addNormalizrEntity(IUSE, entity));
      dispatch(claerByID(IUSE, id));
      props.navigation.dispatch(StackActions.popToTop());
    },
    delete: async (objectId, isFb) => {
      // await remove(objectId,IUSE)
      // 做伪删除
      if (isFb) {
        Alert.alert(
          '主人，我正参与副本活动，不可以被删除哦～！',
          '等活动结束后再来吧。',
          [{ text: '知道了' }],
        );
        return;
      }

      Alert.alert('确定删除?', '删除后不可恢复~！', [
        { text: '取消' },
        {
          text: '确定',
          onPress: async () => {
            const param = {
              statu: 'del',
            };
            const res = await dispatch(update(objectId, param, IUSE));
            const entity = {
              ...param,
              ...res,
            };
            dispatch(addNormalizrEntity(IUSE, entity));
            dispatch(claerByID(IUSE, objectId));
            dispatch(claerByID(IRECORD, objectId));
            // props.navigation.goBack()
            props.navigation.dispatch(StackActions.popToTop());
          },
        },
      ]);
    },
  }),
)
class SettingsClass extends PureComponent {
  _renderRresh = (reflesh, iUse) => {
    const text = !reflesh ? '暂停打卡' : '继续打卡';
    const archiveLoad = this.props.archive && this.props.archive.get('load');

    return (
      <RenderItem
        load={archiveLoad}
        onPress={() => {
          !reflesh ? this.props.stop(iUse) : this.props.refresh(iUse);
        }}
        Icon={StyledIcon}
        name={!reflesh ? 'md-pause' : 'md-refresh'}
        title={text}
      />
    );
  };

  render() {
    const iCard = this.props.iCard;
    const iUse = this.props.iUse;
    const { navigation, user } = this.props;

    // const pUse = this.props.iUse && this.props.iUse.toJS()
    // iUse = pUse || iUse

    const reflesh = iUse.statu === 'stop';

    return (
      <>
        {iCard.user === user.objectId &&
          iCard.state !== -2 &&
          iUse.statu !== 'del' && (
            <RenderItem
              onPress={() => {
                navigation.navigate('cardConfig', { iCardId: iCard.objectId });
              }}
              name="md-settings"
              title="卡片配置"
            />
          )}
        {this._renderRresh(reflesh, iUse)}

        <RenderItem
          style={{ marginRight: 0 }}
          onPress={() => {
            this.props.delete(iUse.objectId, iUse.isFb);
          }}
          load={this.props.iUseLoad}
          name="md-trash"
          title="删除卡片"
        />
        {/* <View style={{ width: (Dimensions.get('window').width - 85) / 3 }} /> */}
      </>
    );
  }

  // row = (title, des) => (
  //   <StyledRow>
  //     <StyledRowText>{title}</StyledRowText>
  //     <StyledRowDes>{des}</StyledRowDes>
  //   </StyledRow>
  // );

  // rowTouch = (title, des, onPress) => (
  //   <StyledRowTouch onPress={onPress}>
  //     {/* <StyledRowText> */}
  //     {/* {title} */}
  //     {/* </StyledRowText> */}
  //     <StyledRowDes>{des}</StyledRowDes>
  //     {/* <StyledRowInner> */}

  //     {/* <StyledArrow/> */}
  //     {/* </StyledRowInner> */}
  //   </StyledRowTouch>
  // );
}

const Settings = () => {
  const { iUseId } = useNavigationAllParamsWithType<RouteKey.cardSetting>();
  const { user } = useGetInfoOfMe();
  const { data } = useGetIuseData(iUseId);
  const { remove, add } = useMutateIuseData();
  const stopAction = async () => {
    const params = { statu: 'stop' };
    const res = await putClassesIUseId({ id: iUseId, ...params });
    res && remove(res.objectId);
  };

  const refreshAction = async () => {
    const params = { statu: 'start' };
    const res = await putClassesIUseId({ id: iUseId, ...params });
    res && add({ ...data, ...params });
  };

  return (
    <StyledContent>
      <StyledHeader>
        <StyledRowDes>{data?.iCard.title}</StyledRowDes>
      </StyledHeader>
      <StyledBottomMenu>
        <SettingsClass user={user} iUse={data} iCard={data?.iCard} />
      </StyledBottomMenu>
    </StyledContent>
  );
};

export default Settings;
