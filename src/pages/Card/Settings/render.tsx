/**
 * Created by lintong on 2018/4/13.
 * @flow
 */

import React, { FC } from 'react';
import {
  ImageSourcePropType,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {
  StyledContent,
  StyledBottomMenu,
  StyledBottomMenuText,
  StyledRowDes,
  StyledBottomMenuButton,
  StyledActivityIndicator,
  StyledHeader,
  StyledBtnImage,
} from './style';
import Toast from 'react-native-simple-toast';
import {
  StackActions,
  useNavigation,
  // useTheme,
} from '@react-navigation/native';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import {
  useGetIuseData,
  useMutateICardData,
  useMutateIuseData,
} from 'src/data/data-context/core';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import { putClassesICardId, usePutClassesIUseId } from 'src/hooks/interface';
import { CircleState } from '@configure/enum';
import { goBack } from '@components/Nav/navigators';

// const { width } = Dimensions.get('window');

interface RenderItemType {
  title: string;
  load?: boolean;
  source: ImageSourcePropType;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const RenderItem: FC<RenderItemType> = (props) => {
  const { title, load = false, onPress, source, style } = props;
  // const theme = useTheme();
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
        // <StyledBtnImage />
        <StyledBtnImage
          resizeMode={Platform.OS === 'ios' ? 'cover' : 'center'}
          source={source}
        />
      )}
      <StyledBottomMenuText>{title}</StyledBottomMenuText>
    </StyledBottomMenuButton>
  );
};

const Settings = () => {
  const { iUseId } = useNavigationAllParamsWithType<RouteKey.cardSetting>();
  const { user } = useGetInfoOfMe();
  const { data: iUse } = useGetIuseData(iUseId);
  const { update } = useMutateICardData();
  const iCard = iUse?.iCard;
  const { remove } = useMutateIuseData();
  const { dispatch, navigate } = useNavigation();
  const { run, loading } = usePutClassesIUseId(
    { id: iUseId, statu: 'stop' },
    { manual: true },
  );
  const { run: deleteRun, loading: deleteLoading } = usePutClassesIUseId(
    { id: iUseId, statu: 'del' },
    { manual: true },
  );
  const stopAction = async () => {
    // const params = { statu: 'stop' };
    const res = await run();
    res && remove(res.objectId);
    dispatch(StackActions.popToTop());
  };

  const deleteAction = async () => {
    const res = await deleteRun();
    res && remove(res.objectId);
    dispatch(StackActions.popToTop());
  };

  // const refreshAction = async () => {
  //   const params = { statu: 'start' };
  //   const res = await putClassesIUseId({ id: iUseId, ...params });
  //   res && add({ ...data, ...params });
  // };

  return (
    <StyledContent>
      <StyledHeader>
        <StyledRowDes>{iUse?.iCard.title}</StyledRowDes>
      </StyledHeader>
      <StyledBottomMenu>
        {iCard?.user.objectId === user.objectId &&
          iCard?.state !== -2 &&
          iUse?.statu !== 'del' && (
            <RenderItem
              source={require('@img/circle/card_setting.png')}
              onPress={() => {
                navigate(RouteKey.cardConfig, { iCardId: iCard.objectId });
              }}
              title="卡片配置"
            />
          )}
        {iCard?.user.objectId === user.objectId &&
          iCard?.state !== -2 &&
          iUse?.statu !== 'del' && (
            <RenderItem
              source={require('@img/circle/card_team.png')}
              onPress={async () => {
                // navigate(RouteKey.cardConfig, { iCardId: iCard.objectId });
                const circleState =
                  iCard.state === CircleState.close
                    ? CircleState.open
                    : CircleState.close;
                const state =
                  iCard.state === CircleState.close
                    ? CircleState.open
                    : CircleState.close;
                const { objectId } = await putClassesICardId({
                  id: iCard.objectId,
                  circleState,
                  state,
                });
                if (objectId) {
                  update({ state, circleState, objectId: iCard.objectId });
                  goBack();
                  Toast.show(
                    iCard.state === CircleState.close ? '打开小组' : '关闭小组',
                  );
                }
              }}
              title={
                iCard.state === CircleState.close ? '打开小组' : '关闭小组'
              }
            />
          )}
        <RenderItem
          load={loading}
          source={require('@img/circle/card_pause_flat.png')}
          onPress={stopAction}
          // Icon={StyledIcon}
          // name={!reflesh ? 'md-pause' : 'md-refresh'}
          title={'暂停打卡'}
        />
        <RenderItem
          source={require('@img/circle/card_delete.png')}
          style={{ marginRight: 0 }}
          onPress={deleteAction}
          load={deleteLoading}
          // name="md-trash"
          title="删除卡片"
        />
        {/* <SettingsClass user={user} iUse={data} iCard={data?.iCard} /> */}
      </StyledBottomMenu>
    </StyledContent>
  );
};

export default Settings;
