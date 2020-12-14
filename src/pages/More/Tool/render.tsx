import React, { FC } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import {
  StyledHeader,
  StyledHeaderTitle,
  StyledRow,
  StyledRowTitle,
  StyledRowDiscrib,
  StyledIcon,
  StyledRowInner,
} from './style';
import { isTablet } from 'react-native-device-info';
import {
  useGetInfoOfMe,
  useUpdateMeFromRemote,
} from 'src/data/data-context/user';

type ItemT = number;

const renderHeader = () => (
  <StyledHeader>
    <StyledHeaderTitle>我的道具</StyledHeaderTitle>
  </StyledHeader>
);

const renderRedoRow: ListRenderItem<ItemT> = ({ item }) => (
  <StyledRow num={isTablet() ? 2 : 1}>
    <StyledRowInner>
      <StyledRowTitle>
        补签卡 <StyledRowTitle style={{ fontSize: 30 }}>x</StyledRowTitle>
        <StyledRowTitle style={{ fontSize: 25, fontWeight: '400' }}>
          {item}
        </StyledRowTitle>
      </StyledRowTitle>
      <StyledRowDiscrib>点击卡片日历进行补签</StyledRowDiscrib>
    </StyledRowInner>
    <StyledIcon name="calendar-check" size={50} color="white" />
  </StyledRow>
);

const _keyExtractor = (_: ItemT, index: number) => {
  // const id = typeof item === 'object' ? item[keyId || 'objectId'] : item;

  // const key = id || index;
  return `${index}`;
};

const Tool: FC<{}> = () => {
  const { user } = useGetInfoOfMe();
  useUpdateMeFromRemote();

  const { toolConfig } = user;
  const { redo = 0 } = toolConfig;

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      numColumns={isTablet() ? 2 : 1}
      keyExtractor={_keyExtractor}
      data={[redo]}
      renderItem={renderRedoRow}
    />
  );
};

export default Tool;
