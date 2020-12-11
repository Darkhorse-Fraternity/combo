/**
 * Created by lintong on 8/31/16.
 * @flow
 */

import React, { LegacyRef, PureComponent } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Platform,
  Dimensions,
  FlatList,
  FlatListProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import ExceptionView, {
  ExceptionType,
  ExceptionViewProps,
} from './ExceptionView';
import { ListLoadType } from './interface';

// const delay = () => new Promise((resolve) => InteractionManager.runAfterInteractions(resolve));

// const LIST_FIRST_JOIN = 'LIST_FIRST_JOIN';
// // export const LIST_NO_DATA = 'LIST_NO_DATA'
// export const LIST_LOAD_DATA = 'LIST_LOAD_DATA';
// export const LIST_LOAD_MORE = 'LIST_LOAD_MORE';
// export const LIST_LOAD_NO_MORE = 'LIST_LOAD_NO_MORE';
// export const LIST_LOAD_ERROR = 'LIST_LOAD_ERROR';
// export const LIST_NORMAL = 'LIST_NORMAL';

export type LoadMoreListprops<T extends {}> = FlatListProps<T> &
  ExceptionViewProps & {
    noDataPrompt?: string;
    tipTap?: Function;
    keyId?: keyof T;
    // noDataImg?: ImageSourcePropType;
    tipBtnText?: string;
    listRef?: LegacyRef<FlatList<T>>;
    footerStyle?: StyleProp<ViewStyle>;

    showLoadingInView?: boolean;
  };

export interface BaseListProps<T> extends LoadMoreListprops<T> {
  // loadStatu: ListLoadType;
  refresh: () => void;
  loadMore: () => void;
  noMore?: boolean;
  loading: boolean;
  loadingMore: boolean;
}

interface IState {
  shouldShowloadMore: boolean;
}

export default class LoadMoreList<
  ItemT extends { objectId?: string }
> extends PureComponent<BaseListProps<ItemT>, IState> {
  constructor(props: BaseListProps<ItemT>) {
    super(props);
    this.state = {
      shouldShowloadMore: false,
    };
  }

  static defaultProps = {
    loadStatu: ListLoadType.LIST_FIRST_JOIN,
    noDataPrompt: '',
    data: [],
  };

  onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const { nativeEvent } = e;
    const { contentSize, contentOffset, layoutMeasurement } = nativeEvent;
    const layoutMeasurementHeight = layoutMeasurement.height;

    const shouldShowloadMore =
      contentSize.height > layoutMeasurementHeight ||
      contentOffset.y > layoutMeasurementHeight - 100;

    // console.log('nativeEvent:', nativeEvent);

    // TODO 这样写会导致，已有数据时候，直接往下拉，会有一瞬间renderFooter，似乎是转化时间有问题
    this.state.shouldShowloadMore !== shouldShowloadMore &&
      this.setState({ shouldShowloadMore });
    // console.log('test:', shouldShowloadMore);
    // console.log('nativeEvent:', nativeEvent);
    // console.log('shouldShowloadMore:', shouldShowloadMore);
    this.props.onScroll && this.props.onScroll(e);
  }

  componentDidMount() {
    this.firstJoin = false;
  }

  _handleRefresh = () => {
    if (this.props.loading) {
      return;
    }

    this.props.refresh && this.props.refresh();
  };

  _handleloadMore = () => {
    const { loadMore, noMore, loadingMore } = this.props;
    const { shouldShowloadMore } = this.state;
    if (!noMore && !loadingMore && shouldShowloadMore && loadMore) {
      loadMore();
    }
  };

  renderFooter() {
    const { data, footerStyle, noMore } = this.props;
    const hasData = data && data.length > 0;

    // console.log('data:',this.props.data, hasData);

    if (this.state.shouldShowloadMore && hasData) {
      if (noMore) {
        return (
          <View style={[styles.footer, footerStyle]}>
            <Text style={{ color: 'rgb(150,150,150)' }}>没有更多了</Text>
          </View>
        );
      }

      return (
        <View style={styles.footer}>
          <ActivityIndicator
            style={{ marginTop: 8, marginBottom: 8 }}
            size="small"
            animating
          />
        </View>
      );
    }

    return <View style={{ height: 50 }} />;
  }

  _keyExtractor = (item: ItemT, index: number) => {
    const { keyId = 'objectId' } = this.props;
    const id = typeof item === 'object' ? item[keyId] : item;

    const key = id || index;
    return `${key}`;
  };

  openRefreshing = false;
  firstJoin = true;
  render() {
    const { props, firstJoin } = this;
    const {
      data,
      // loadStatu,
      loading,
      tipTap,
      noDataPrompt,
      tipBtnText,
      style,
      listRef,
      showLoadingInView = true,
      ...otherProps
    } = props;

    // console.log('loadStatu:', loadStatu);

    const exceptionViewRefreshing = loading;
    const refreshing = loading && this.openRefreshing;
    const exceptionType =
      (exceptionViewRefreshing || firstJoin) &&
      !this.openRefreshing &&
      showLoadingInView
        ? ExceptionType.Loading
        : ExceptionType.NoData;

    return (
      <FlatList<ItemT>
        data={data}
        ref={listRef}
        refreshing={refreshing}
        onRefresh={() => {
          this.openRefreshing = true;
          this._handleRefresh();
        }}
        onEndReached={this._handleloadMore}
        keyExtractor={this._keyExtractor}
        removeClippedSubviews
        ListFooterComponent={this.renderFooter.bind(this)}
        ListEmptyComponent={() => (
          <ExceptionView
            {...otherProps}
            style={styles.exceptionViewStyle}
            tipBtnText={tipBtnText}
            exceptionType={
              exceptionViewRefreshing || firstJoin
                ? ExceptionType.Loading
                : ExceptionType.NoData
            }
            prompt={
              exceptionType !== ExceptionType.Loading
                ? noDataPrompt
                : '加载中～'
            }
            // otherTips={this.renderNoDataTips()}
            onRefresh={tipTap || this._handleRefresh}
            {...otherProps}
          />
        )}
        style={[styles.list, style]}
        onEndReachedThreshold={Platform.OS === 'ios' ? 0.1 : 0.1}
        {...otherProps}
        onScroll={this.onScroll.bind(this)}
      />
    );
  }
}
const styles = StyleSheet.create({
  exceptionViewStyle: {
    height: Dimensions.get('window').height / 1.5,
  },

  list: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
  },

  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  noMorefooter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    margin: 12,
    marginBottom: 30,
  },
});
