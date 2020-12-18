/**
 * Created by lintong on 2018/4/13.
 * @flow
 */

import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import {
  StyledContent,
  StyledBottomMenu,
  StyledBottomMenuText,
  StyledIcon,
  StyledRowDes,
  StyledBottomMenuButton,
  StyledActivityIndicator,
  StyledHeader,
} from './style';

import {
  StackActions,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import { useGetIuseData, useMutateIuseData } from 'src/data/data-context/core';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import { usePutClassesIUseId } from 'src/hooks/interface';

// const { width } = Dimensions.get('window');

interface RenderItemType {
  title: string;
  name: string;
  load?: boolean;
  size?: number;
  onPress: () => void;
  Icon?: typeof StyledIcon;
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
  const IconIN = Icon || StyledIcon;
  const theme = useTheme();
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
        <IconIN size={size} name={name} color={theme.colors.text} />
      )}
      <StyledBottomMenuText>{title}</StyledBottomMenuText>
    </StyledBottomMenuButton>
  );
};

const Settings = () => {
  const { iUseId } = useNavigationAllParamsWithType<RouteKey.cardSetting>();
  const { user } = useGetInfoOfMe();
  const { data: iUse } = useGetIuseData(iUseId);
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
              onPress={() => {
                navigate(RouteKey.cardConfig, { iCardId: iCard.objectId });
              }}
              name="md-settings"
              title="卡片配置"
            />
          )}
        <RenderItem
          load={loading}
          onPress={stopAction}
          Icon={StyledIcon}
          // name={!reflesh ? 'md-pause' : 'md-refresh'}
          name={'md-pause'}
          title={'暂停打卡'}
        />
        <RenderItem
          style={{ marginRight: 0 }}
          onPress={deleteAction}
          load={deleteLoading}
          name="md-trash"
          title="删除卡片"
        />
        {/* <SettingsClass user={user} iUse={data} iCard={data?.iCard} /> */}
      </StyledBottomMenu>
    </StyledContent>
  );
};

export default Settings;
