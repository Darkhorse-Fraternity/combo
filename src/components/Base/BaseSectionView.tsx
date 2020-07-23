/**
 * Created by lintong on 8/31/16.
 * @flow
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  InteractionManager,
  RefreshControl,
  ActivityIndicator,
  Text,
  Platform,
  Dimensions,
  FlatList,
  SectionList,
  FlatListProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageSourcePropType,
} from 'react-native';
import ExceptionView, {ExceptionType} from './ExceptionView';
import {ListLoadType} from './interface';

// const delay = () => new Promise((resolve) => InteractionManager.runAfterInteractions(resolve));

const LIST_FIRST_JOIN = 'LIST_FIRST_JOIN';
// export const LIST_NO_DATA = 'LIST_NO_DATA'
export const LIST_LOAD_DATA = 'LIST_LOAD_DATA';
export const LIST_LOAD_MORE = 'LIST_LOAD_MORE';
export const LIST_LOAD_NO_MORE = 'LIST_LOAD_NO_MORE';
export const LIST_LOAD_ERROR = 'LIST_LOAD_ERROR';
export const LIST_NORMAL = 'LIST_NORMAL';

export type BaseListBaseProps<T> = FlatListProps<T> & {
  noDataPrompt?: string;
  tipTap?: Function;
  keyId: string;
  noDataImg: ImageSourcePropType;
  tipBtnText: string;
  //   promptImage?: ImageSourcePropType;
  dropDownRefring?: boolean;
  //   listRef?: LegacyRef<FlatList<T>>;
  //   refreshPropsAndroid?: SmartRefreshLayoutProps;
  //   footerStyle?: StyleProp<ViewStyle>;
  //   onHeaderPulling?: (p: RefreshEvent) => void;
  showLoadingInView?: boolean;
};

export interface BaseListProps<T> extends BaseListBaseProps<T> {
  loadStatu: ListLoadType;
  loadData: Function;
  loadMore: Function;
}

interface IState {
  shouldShowloadMore: boolean;
}

export default class BaseSectionView<ItemT> extends PureComponent<
  BaseListProps<ItemT>,
  IState
> {
  constructor(props: BaseListProps<ItemT>) {
    super(props);
    this.state = {
      shouldShowloadMore: false,
    };
  }

  static propTypes = {
    loadData: PropTypes.func.isRequired,
    loadMore: PropTypes.func,
    loadStatu: PropTypes.string,
    needDelay: PropTypes.bool,
    noDataImg: PropTypes.number,
    noDataPrompt: PropTypes.string,
    noDataTips: PropTypes.string,
    tipTap: PropTypes.func,
  };

  static defaultProps = {
    loadStatu: LIST_FIRST_JOIN,
    needDelay: true,
    // noDataImg: require('../../../source/img/xy_course/xy_course.png'),
    noDataPrompt: '',
    type: 'list',
    data: [],
    sections: [],
  };

  onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const {nativeEvent} = e;
    const {contentSize, contentOffset, layoutMeasurement} = nativeEvent;
    const layoutMeasurementHeight = layoutMeasurement.height;

    const shouldShowloadMore =
      contentSize.height > layoutMeasurementHeight ||
      contentOffset.y > layoutMeasurementHeight - 100;

    // console.log('nativeEvent:', nativeEvent);

    // TODO 这样写会导致，已有数据时候，直接往下拉，会有一瞬间renderFooter，似乎是转化时间有问题
    this.state.shouldShowloadMore !== shouldShowloadMore &&
      this.setState({shouldShowloadMore});
    // console.log('test:', shouldShowloadMore);
    // console.log('nativeEvent:', nativeEvent);
    // console.log('shouldShowloadMore:', shouldShowloadMore);
    this.props.onScroll && this.props.onScroll(e);
  }

  componentDidMount() {
    this._handleRefresh();
  }

  _handleRefresh = () => {
    if (this.props.loadStatu === LIST_LOAD_DATA) {
      return;
    }
    this.props.loadData && this.props.loadData();
  };

  _handleloadMore = (info: {distanceFromEnd: number}) => {
    if (
      this.props.loadStatu === LIST_LOAD_MORE ||
      this.props.loadStatu === LIST_LOAD_NO_MORE ||
      this.props.loadStatu === LIST_LOAD_DATA ||
      this.props.loadStatu === LIST_LOAD_ERROR
    ) {
      return;
    }

    // console.log('distanceFromEnd:', info.distanceFromEnd);
    // console.log('loadStatu:', this.props.loadStatu);
    if (this.state.shouldShowloadMore) {
      this.props.loadMore && this.props.loadMore();
    }
  };

  renderFooter() {
    // console.log('loadStatu:', this.props.loadStatu);

    // console.log('this.shouldShowloadMore:', this.props.loadStatu == LIST_LOAD_NO_MORE && this.state.shouldShowloadMore);

    const {loadStatu, data} = this.props;

    const hasData = data && data.length > 0;

    // console.log('data:',this.props.data, hasData);

    if (this.state.shouldShowloadMore && hasData) {
      if (loadStatu === LIST_LOAD_NO_MORE) {
        return (
          <View style={styles.noMorefooter}>
            <Text style={{color: 'rgb(150,150,150)'}}>没有更多了</Text>
          </View>
        );
      }
      if (loadStatu === LIST_LOAD_MORE || loadStatu === LIST_NORMAL) {
        return (
          <View style={styles.footer}>
            <ActivityIndicator
              style={{marginTop: 8, marginBottom: 8}}
              size="small"
              animating
            />
          </View>
        );
      }
    }

    return <View style={{height: 50}} />;
  }

  _keyExtractor = (item: ItemT, index: number) => {
    const {keyId} = this.props;
    const id = typeof item === 'object' ? item[keyId || 'objectId'] : item;

    const key = id || index;
    return `${key}`;
  };

  openRefreshing = false;

  render() {
    // const refreshable = this.props.refreshable && this.props.loadData;

    const {
      data,
      loadStatu,
      tipTap,
      noDataImg,
      noDataPrompt,
      tipBtnText,
      style,
      ...otherProps
    } = this.props;

    // console.log('loadStatu:', loadStatu);

    const exceptionViewRefreshing = loadStatu === LIST_LOAD_DATA;
    const refreshing =
      loadStatu === LIST_LOAD_DATA &&
      this.openRefreshing &&
      data &&
      data.length > 0;

    // console.log('refreshing:', refreshing);

    // console.log('sections:', sections);

    return (
      <FlatList
        {...otherProps}
        data={data}
        // sections={sections}
        refreshing={refreshing}
        onScroll={this.onScroll.bind(this)}
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
            style={styles.exceptionViewStyle}
            refresh={exceptionViewRefreshing}
            tipBtnText={tipBtnText}
            exceptionType={
              exceptionViewRefreshing
                ? ExceptionType.Loading
                : ExceptionType.NoData
            }
            image={noDataImg}
            prompt={exceptionViewRefreshing ? '' : noDataPrompt}
            // otherTips={this.renderNoDataTips()}
            onRefresh={tipTap || this._handleRefresh}
            {...otherProps}
          />
        )}
        style={[styles.list, style]}
        onEndReachedThreshold={Platform.OS === 'ios' ? 0.1 : 0.1}
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
