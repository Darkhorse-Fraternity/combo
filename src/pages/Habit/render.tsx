/**
 * Created by lintong on 2017/7/3.
 */

import React, { FC, useRef } from 'react';
import { Dimensions, Alert } from 'react-native';
import Cell from './Cell';

import {
  StyledIcon,
  StyledDeleteBtn,
  StyledDeleteBtnText,
  StyledHeader,
  StyledHeaderTitle,
  StyledAntDesign,
  StyledList,
  StyledAnimationRow,
} from './style';
import ExceptionView, {
  ExceptionType,
} from '@components/Base/ExceptionView/index';
import AppleStyleSwipeableRow from '@components/Swipeable';

import { useNavigation } from '@react-navigation/native';
import { isTablet } from 'react-native-device-info';
import { IUseType } from 'src/data/data-context/interface';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import { useGetIuseData, useMutateIuseData } from 'src/data/data-context/core';
import { useScrollTitle } from '@components/util/hooks';
import AnimationRow from '@components/AnimationRow';
import { putClassesIUseId } from 'src/hooks/interface';
import { RouteKey } from '@pages/interface';

const RenderNoData = (refreshLoad: boolean) => {
  const { navigate } = useNavigation();
  return (
    <ExceptionView
      style={{ height: Dimensions.get('window').height / 1.6 }}
      exceptionType={refreshLoad ? ExceptionType.Loading : ExceptionType.NoData}
      tipBtnText="添加卡片"
      // prompt={refreshLoad ? '正在加载' : '暂无数据'}
      onRefresh={() => {
        navigate(RouteKey.newCard);
      }}
    />
  );
};

const RenderHeader = () => (
  <StyledHeader>
    <StyledHeaderTitle>日常习惯</StyledHeaderTitle>
  </StyledHeader>
);

const RenderCell: FC<{
  item: IUseType;
  onSwipeableWillOpen: (
    ref: React.MutableRefObject<AppleStyleSwipeableRow | undefined>,
  ) => void;
  onSwipeableWillClose: (
    ref: React.MutableRefObject<AppleStyleSwipeableRow | undefined>,
  ) => void;
}> = (props) => {
  const { item, onSwipeableWillOpen, onSwipeableWillClose } = props;
  const { navigate } = useNavigation();
  const data = item;

  const { user } = useGetInfoOfMe();
  const { remove } = useMutateIuseData();
  // console.log('data:', data);
  // const iCardId = data[ICARD];
  const iCard = item.iCard;
  const isSelf = iCard.user?.objectId === user.objectId;
  const iCardId = iCard.objectId;
  const handleViewRef = useRef<AnimationRow>();
  const swipeRef = useRef<AppleStyleSwipeableRow>();

  const stopAction = async () => {
    const params = { statu: 'stop' };
    await handleViewRef.current?.remove();
    const res = await putClassesIUseId({ id: item.objectId, ...params });
    res && remove(res.objectId);
    handleViewRef.current?.reset();
  };
  const deleteAction = () => {
    // this.props.delete(item, handleViewRef, data.isFb);
    if (item.isFb) {
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
          const params = {
            statu: 'del',
          };
          await handleViewRef.current?.remove();
          const res = await putClassesIUseId({ id: item.objectId, ...params });
          res && remove(res.objectId);
          await handleViewRef.current?.reset();
        },
      },
    ]);
  };

  const backgroundColor = 'transparent';

  return (
    <StyledAnimationRow ref={handleViewRef as never}>
      <AppleStyleSwipeableRow
        // rowID={index}
        // autoClose={true}
        ref={swipeRef as never}
        // close={this.state.openIndex !== index}
        onSwipeableWillOpen={onSwipeableWillOpen.bind(undefined, swipeRef)}
        onSwipeableWillClose={onSwipeableWillClose.bind(undefined, swipeRef)}
        right={[
          isSelf
            ? {
                type: 'secondary',
                onPress: () => {
                  navigate('cardConfig', { iCardId });
                  // this.setState({ openIndex: -1 })
                },
                component: _renderSwipeOutDeleteBtn(
                  '设置',
                  '#388e3c',
                  'settings',
                ),
                backgroundColor: backgroundColor,
              }
            : {
                type: 'secondary',
                onPress: () => {
                  // this.props.navigation.navigate('cardSetting',
                  //   { iCardId, iUseId: item })
                  navigate('cardInfo', { iCardId });
                  // this.setState({ openIndex: -1 })
                },
                component: _renderSwipeOutDeleteBtn('查看', '#388e3c', 'info'),
                backgroundColor: backgroundColor,
              },
          {
            type: 'delete',
            onPress: deleteAction,
            component: _renderSwipeOutDeleteBtn(
              '删除',
              '#f44336',
              'delete',
              StyledAntDesign,
            ),
            backgroundColor: backgroundColor,
          },
          {
            type: 'primary',
            onPress: stopAction,
            component: _renderSwipeOutDeleteBtn('暂停', '#009afb', 'pause'),
            backgroundColor: backgroundColor,
          },
        ]}>
        <Cell
          // refreshLoad={this.props.refreshLoad}
          // onLongPress={() => {
          //     !this.props.load &&
          //     !done &&
          //     this.props.done(data)
          //
          // }}
          onPress={() => {
            navigate('card', {
              iUseId: data.objectId,
              iCardId: iCard.objectId,
            });
          }}
          data={data}
          iCard={iCard}
        />
      </AppleStyleSwipeableRow>
    </StyledAnimationRow>
  );
};

const _renderSwipeOutDeleteBtn = (
  title: string,
  color: string,
  name: string,
  Cmp = StyledIcon,
) => (
  <StyledDeleteBtn>
    <Cmp size={25} color={color} name={name} />
    <StyledDeleteBtnText color={color}>{title}</StyledDeleteBtnText>
  </StyledDeleteBtn>
);

const _keyExtractor = (item: IUseType) => {
  return item.objectId;
};

const Habit = () => {
  // const { user } = useGetInfoOfMe();
  const { data, loading } = useGetIuseData();
  const onScroll = useScrollTitle('日常习惯');

  const handleRef = useRef<AppleStyleSwipeableRow>();

  const onSwipeableWillOpen = (
    ref: React.MutableRefObject<AppleStyleSwipeableRow | undefined>,
  ) => {
    if (handleRef.current === ref.current) {
      return;
    }
    if (handleRef) {
      // const swipeRef = this.swipeRefs[`swipe${openIndex}`];
      handleRef.current?.close();
    }
    handleRef.current = ref.current;
  };

  const onSwipeableWillClose = (
    ref: React.MutableRefObject<AppleStyleSwipeableRow | undefined>,
  ) => {
    if (handleRef.current === ref.current) {
      handleRef.current = undefined;
    }
  };

  return (
    <StyledList<IUseType>
      numColumns={isTablet() ? 2 : 1}
      onScroll={onScroll}
      // scrollEnabled={!!handleRef.current}
      refreshing={false}
      // onRefresh={() => {
      //   if (handleRef.current) {
      //     handleRef.current?.close();
      //     handleRef.current = undefined;
      //   }
      //   run();
      // }}
      data={data}
      // removeClippedSubviews={true}
      // pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={(props) => (
        <RenderCell
          {...props}
          onSwipeableWillOpen={onSwipeableWillOpen}
          onSwipeableWillClose={onSwipeableWillClose}
        />
      )}
      keyExtractor={_keyExtractor}
      ListHeaderComponent={RenderHeader}
      // ListFooterComponent={data.length > 0 && <View style={{ height: 100 }} />}
      ListEmptyComponent={RenderNoData.bind(undefined, loading)}
    />
  );
};

export default Habit;
