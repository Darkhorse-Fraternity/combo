/**
 * Created by lintong on 2017/7/3.
 */

import React, { FC, useRef, useState } from 'react';
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

const RenderNoData = (refreshLoad: boolean) => {
  const { navigate } = useNavigation();
  return (
    <ExceptionView
      style={{ height: Dimensions.get('window').height / 1.6 }}
      exceptionType={refreshLoad ? ExceptionType.Loading : ExceptionType.NoData}
      tipBtnText="添加卡片"
      // prompt={refreshLoad ? '正在加载' : '暂无数据'}
      onRefresh={() => {
        navigate('newCard');
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
  index: number;
  onSwipeableWillOpen: (
    ref: React.MutableRefObject<AppleStyleSwipeableRow | undefined>,
    index: number,
  ) => void;
  onSwipeableWillClose: (index: number) => void;
}> = (props) => {
  const { item, index, onSwipeableWillOpen, onSwipeableWillClose } = props;
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
    handleViewRef.current?.remove();
    const res = await putClassesIUseId({ id: item.objectId, ...params });
    res && remove(res.objectId);
    await handleViewRef.current?.reset();
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
          handleViewRef.current?.remove();
          const res = await putClassesIUseId({ id: item.objectId, ...params });
          res && remove(res.objectId);
          await handleViewRef.current?.reset();
        },
      },
    ]);
  };

  return (
    <StyledAnimationRow ref={handleViewRef as never}>
      <AppleStyleSwipeableRow
        // rowID={index}
        // autoClose={true}
        ref={swipeRef as never}
        // close={this.state.openIndex !== index}
        onSwipeableWillOpen={onSwipeableWillOpen.bind(
          undefined,
          swipeRef,
          index,
        )}
        onSwipeableWillClose={onSwipeableWillClose.bind(undefined, index)}
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
                backgroundColor: '#fdfbfb',
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
                backgroundColor: '#fdfbfb',
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
            backgroundColor: '#fdfbfb',
          },
          {
            type: 'primary',
            onPress: stopAction,
            component: _renderSwipeOutDeleteBtn('暂停', '#009afb', 'pause'),
            backgroundColor: '#fdfbfb',
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
  CMP = StyledIcon,
) => (
  <StyledDeleteBtn>
    <CMP size={25} color={color} name={name} />
    <StyledDeleteBtnText color={color}>{title}</StyledDeleteBtnText>
  </StyledDeleteBtn>
);

const _keyExtractor = (item: IUseType) => {
  return item.objectId;
};

const Habit = () => {
  // const { user } = useGetInfoOfMe();
  const { data, run, loading } = useGetIuseData();
  const [openIndex, setOpenIndex] = useState(-1);
  const onScroll = useScrollTitle('日常习惯');

  const onSwipeableWillOpen = (
    ref: React.MutableRefObject<AppleStyleSwipeableRow | undefined>,
    index: number,
  ) => {
    if (index === openIndex) {
      return;
    }
    if (openIndex !== -1) {
      // const swipeRef = this.swipeRefs[`swipe${openIndex}`];
      ref.current?.close();
    }
    setOpenIndex(index);
  };

  const onSwipeableWillClose = (index: number) => {
    if (index === openIndex) {
      setOpenIndex(-1);
    }
  };

  return (
    <StyledList<IUseType>
      numColumns={isTablet() ? 2 : 1}
      onScroll={onScroll}
      scrollEnabled={openIndex === -1}
      refreshing={false}
      onRefresh={() => {
        setOpenIndex(-1);
        run();
      }}
      data={data}
      // removeClippedSubviews={true}
      // pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <RenderCell
          item={item}
          index={index}
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
