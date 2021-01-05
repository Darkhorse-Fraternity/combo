/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import React, { FC, useCallback } from 'react';

import {
  StyledHeader,
  StyledHeaderTitle,
  StyledItem,
  StyledItemImage,
  StyledItemTitle,
  StyledItemText,
  StyledItemCover,
} from './style';
import { isTablet } from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import { useOrientation, useScrollTitle } from '@components/util/hooks';
import PageList from '@components/Base/PageList';
import { postCallFbList, PostCallFbListResponse } from 'src/hooks/interface';
import { RouteKey } from '@pages/interface';
import { ListRenderItem, useWindowDimensions } from 'react-native';

type ItemType = NonNullable<PostCallFbListResponse['result']>[number];

const title = '副本任务';
const RenderHeader = () => (
  <StyledHeader>
    <StyledHeaderTitle>{title}</StyledHeaderTitle>
  </StyledHeader>
);

const RenderItem = ({
  item,
  numColumns,
}: {
  item: ItemType;
  index: number;
  numColumns: number;
}) => {
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();
  const {
    title,
    objectId,
    iCard,
    titleConfig,
    reward,
    rewardConfig,
    totalBonus,
  } = item;
  const { color = 'white', dColor = 'white', position = 'top' } = titleConfig;

  let discirb = '奖励:';
  if (reward === 'money') {
    discirb = `奖金池:${totalBonus.toFixed(1)}元`;
  } else if (reward === 'redo') {
    discirb = `完成奖励:补打卡${rewardConfig.redo}张`;
  }

  return (
    <StyledItem
      onPress={() => {
        navigate(RouteKey.flagDetail, {
          flagId: objectId,
          iCardId: iCard.objectId,
        });
      }}>
      <>
        <StyledItemImage
          width={width}
          numColumns={numColumns}
          source={{ uri: item.cover.url }}
        />
        <StyledItemCover position={position}>
          <StyledItemTitle color={color}>{title}</StyledItemTitle>
          <StyledItemText color={dColor}>{discirb}</StyledItemText>
        </StyledItemCover>
      </>
    </StyledItem>
  );
};

const Render: FC<{}> = () => {
  const onScroll = useScrollTitle(title);
  const ori = useOrientation();
  const numColumns = isTablet() ? (ori === 'LANDSCAPE' ? 3 : 2) : 1;

  const loadPage = useCallback((page_index: number, page_size: number) => {
    const param = {
      limit: page_size + '',
      skip: page_index * page_size + '',
    };
    return postCallFbList(param).then((res) => res.result);
  }, []);

  const renderItem: ListRenderItem<ItemType> = useCallback(
    (props) => <RenderItem {...props} numColumns={numColumns} />,
    [numColumns],
  );

  return (
    <PageList<ItemType>
      loadPage={loadPage}
      // style={{ overflow: 'visible' }}
      removeClippedSubviews={false}
      numColumns={numColumns}
      key={numColumns} // https://stackoverflow.com/questions/44291781/dynamically-changing-number-of-columns-in-react-native-flat-list
      onScroll={onScroll}
      renderItem={renderItem}
      ListHeaderComponent={RenderHeader}
    />
  );
};
export default Render;
