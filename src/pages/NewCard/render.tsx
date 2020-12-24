/**
 * Created by lintong on 2017/9/26.
 * @flow
 */

import React, { Fragment, FC, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ListRenderItem,
} from 'react-native';
import CardCell from './CardCell';
import {
  StyledTitleView,
  StyledTitleText,
  StyledTop,
  StyledHerderButton,
  StyledHeaderText,
  StyledContent,
} from './style';
import CardTemplate from './CardTemplate';
import { habits } from '../../configure/habit';
import { useNavigation } from '@react-navigation/native';
import { ICardType } from 'src/data/data-context/interface';
import {
  PostCallCardListResponse,
  usePostCallCardList,
} from 'src/hooks/interface';
import { RouteKey } from '@pages/interface';
import LoadMoreList from '@components/Base/LoadMoreList';
import { useCanceWhenLeave } from 'src/hooks/util';

//适配安卓
const style = Platform.OS === 'ios' ? {} : { height: 1062 };

const ListHeaderComponet = () => {
  const { navigate } = useNavigation();

  const habitTemplate = Object.keys(habits).map((name) => (
    <Fragment key={name}>
      <StyledTitleView>
        <StyledTitleText>{name}</StyledTitleText>
      </StyledTitleView>
      <CardTemplate
        key={`template ${name}`}
        data={habits[name]}
        onPress={(habit) => {
          navigate(RouteKey.creat, { habit });
        }}
      />
    </Fragment>
  ));

  return (
    <StyledTop style={style}>
      <StyledHeaderText>
        「 种一棵树最好的时间是十年前，其次是现在。 」
      </StyledHeaderText>
      <View style={{ paddingHorizontal: 20 }}>
        <StyledHerderButton
          // style={styles.headerBtn}
          title="自建习惯卡片"
          onPress={() => {
            navigate(RouteKey.creat);
          }}
        />
      </View>

      {habitTemplate}

      <StyledTitleView key="bottom">
        <StyledTitleText>小组推荐</StyledTitleText>
      </StyledTitleView>
    </StyledTop>
  );
};

const renderRow: ListRenderItem<ICardType> = ({ item }) => {
  return <RenderRow {...item} />;
};

const RenderRow: FC<ICardType> = (props) => {
  const { iconAndColor, title, notifyText, objectId } = props;

  const { name } = iconAndColor || { name: 'sun', color: '#b0d2ee' };
  const { navigate } = useNavigation();

  return (
    <CardCell
      key={title}
      title={title}
      name={name || ''}
      // color={'white'}
      des={notifyText}
      onPress={() => {
        navigate(RouteKey.cardInfo, { iCardId: objectId });
      }}
    />
  );
};

// const useLoadMoreWithLCConfig = <T extends {}>(limit: number = 20) => {
//   const skipRef = useRef(0);
//   const params = { limit: limit + '', skip: skipRef.current + '' };
//   const option: LoadMoreOptionsWithFormat<
//     LoadMoreFormatReturn,
//     { result: T[] }
//   > = {
//     loadMore: true,
//     formatResult: (res) => ({
//       list: res.result,
//     }),
//     isNoMore: (nData) => !nData?.list?.length || nData?.list?.length < limit,
//     onSuccess: (data, params) => {
//       console.log('params', params);

//       return (skipRef.current = data?.list.length || 0);
//     },
//   };
//   return { params, option };
// };

// 上拉加载数据请求与管理

const useLoadMore = () => {
  const limit = 80;
  const {
    data,
    cancel,
    loading,
    loadingMore,
    // noMore,
    ...rest
  } = usePostCallCardList<{
    list: NonNullable<PostCallCardListResponse['result']>;
  }>((res) => ({ limit: limit + '', skip: res?.list?.length || 0 }), {
    loadMore: true,
    isNoMore: (nData) =>
      !nData?.['result']?.length || nData?.['result']?.length < limit,
    formatResult: (res) => ({
      list: res?.result ?? [],
      ...res,
    }),
    onSuccess: (data1) => {
      lastDataRef.current = data1.list;
    },
    cacheKey: 'postCallCardList',
    staleTime: 100 * 60 * 60 * 24,
    cacheTime: 100 * 60 * 60 * 24,
  });
  const lastDataRef = useRef(data?.list);

  useCanceWhenLeave(cancel, loading || loadingMore);

  // console.log('noMore', noMore);

  return {
    data: loading ? lastDataRef.current : data?.list,
    loading,
    loadingMore,
    ...rest,
  };
};

const NewCard: FC<{}> = () => {
  const lm = useLoadMore();

  return (
    <StyledContent>
      <LoadMoreList<ICardType>
        ListHeaderComponent={ListHeaderComponet}
        style={styles.list}
        columnWrapperStyle={styles.columnWrapperStyle}
        numColumns={4}
        // footerStyle={{ paddingBottom: 60 }}
        renderItem={renderRow}
        {...lm}
      />
    </StyledContent>
  );
};

export default NewCard;

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  list: {
    flex: 1,
    overflow: 'hidden',
  },
  columnWrapperStyle: {
    padding: 0,
  },
  itemAdd: {
    width: width / 2 - 15,
    height: 200,
    // marginTop: 20,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shadow: {
    backgroundColor: 'white',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    borderRadius: 10,
    elevation: 10,
    // margin: 10,
    // elevation: 10,
  },

  period: {
    marginTop: 5,
  },
});
