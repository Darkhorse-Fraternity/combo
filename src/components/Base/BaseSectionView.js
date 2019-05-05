/**
 * Created by lintong on 8/31/16.
 * @flow
 */


import React, { Component } from 'react';
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
  FlatList as FlatListAndroid
} from 'react-native';
import { SectionList, FlatList as FlatListIOS, } from 'react-navigation';
import { is } from 'immutable';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import ExceptionView, { ExceptionType } from './ExceptionView';

// const delay = () => new Promise((resolve) => InteractionManager.runAfterInteractions(resolve));

const LIST_FIRST_JOIN = 'LIST_FIRST_JOIN';
// export const LIST_NO_DATA = 'LIST_NO_DATA'
export const LIST_LOAD_DATA = 'LIST_LOAD_DATA';
export const LIST_LOAD_MORE = 'LIST_LOAD_MORE';
export const LIST_LOAD_NO_MORE = 'LIST_LOAD_NO_MORE';
export const LIST_LOAD_ERROR = 'LIST_LOAD_ERROR';
export const LIST_NORMAL = 'LIST_NORMAL';

export default class BaseSectionView extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      shouldShowloadMore: false,
      joinTime: 0,
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
    tipTap: PropTypes.func
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


  onScroll(e: Object) {
    const { nativeEvent } = e;
    const { contentSize, contentOffset, layoutMeasurement } = nativeEvent;
    const layoutMeasurementHeight = layoutMeasurement.height;

    const shouldShowloadMore = contentSize.height > layoutMeasurementHeight
      || contentOffset.y > layoutMeasurementHeight - 100;


    // console.log('nativeEvent:', nativeEvent);

    // TODO 这样写会导致，已有数据时候，直接往下拉，会有一瞬间renderFooter，似乎是转化时间有问题
    this.state.shouldShowloadMore !== shouldShowloadMore
    && this.setState({ shouldShowloadMore });
    // console.log('test:', shouldShowloadMore);
    // console.log('nativeEvent:', nativeEvent);
    // console.log('shouldShowloadMore:', shouldShowloadMore);
    this.props.onScroll && this.props.onScroll(arguments);
  }

  componentDidMount() {
    this._handleRefresh();
  }


  // componentWillUnmount() {
  //   this.joinTime = 0
  //     console.log('componentWillUnmount:', this.joinTime);
  // }
  joinTime = 0;

  _scrollView
  // componentWillReceiveProps(nextProps) {
  //     if (nextProps.loadStatu !== LIST_FIRST_JOIN && this.state.joinTime < 2) {
  //
  //         // this.joinTime++
  //         this.setState({joinTime:this.state.joinTime+1})
  //     }
  // }


  // shouldComponentUpdate(nextProps: Object, nextState: Object) {
  //     return !is(this.props, nextProps) || !is(this.state, nextState)
  // }

  // shouldComponentUpdate(nextProps: Object, nextState: Object) {
  //     return nextProps.loadStatu !== this.props.loadStatu || !is(this.state, nextState)
  // }

  _handleRefresh = () => {
    if (this.props.loadStatu === LIST_LOAD_DATA) {
      return;
    }
    this.props.loadData && this.props.loadData();
  };

  _handleloadMore = (info: { distanceFromEnd: number }) => {
    if (this.props.loadStatu === LIST_LOAD_MORE
      || this.props.loadStatu === LIST_LOAD_NO_MORE
      || this.props.loadStatu === LIST_LOAD_DATA
      || this.props.loadStatu === LIST_LOAD_ERROR) {
      return;
    }


    // console.log('distanceFromEnd:', info.distanceFromEnd);
    // console.log('loadStatu:', this.props.loadStatu);
    if (this.state.shouldShowloadMore
    ) {
      this.props.loadMore && this.props.loadMore();
    }
  };


  renderFooter() {
    // console.log('loadStatu:', this.props.loadStatu);

    // console.log('this.shouldShowloadMore:', this.props.loadStatu == LIST_LOAD_NO_MORE && this.state.shouldShowloadMore);

    const { loadStatu, data, sections } = this.props;

    const hasData = sections.length > 0 || data.length > 0;

    // console.log('data:',this.props.data, hasData);

    if (this.state.shouldShowloadMore && hasData) {
      if (loadStatu === LIST_LOAD_NO_MORE) {
        return (
          <View style={styles.footer}>
            <Text style={{ color: 'rgb(150,150,150)' }}>没有更多了</Text>
          </View>
        );
      }
      if (loadStatu === LIST_LOAD_MORE || loadStatu === LIST_NORMAL) {
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
    }


    return <View style={{ height: 50 }} />;
  }


  _keyExtractor = (item, index) => {
    const id = typeof item === 'object' ? item.objectId : item;

    const key = id || index;
    return `${key}`;
  }


  openRefreshing = false

  render() {
    // const refreshable = this.props.refreshable && this.props.loadData;

    const {
      sections,
      data,
      loadStatu,
      tipTap,
      noDataImg,
      noDataPrompt,
      tipBtnText,
      style,
      ...otherProps
    } = this.props;
    const FlatList = Platform.os === 'ios' ? FlatListIOS : FlatListAndroid;
    const TableView = sections.length > 0 ? SectionList : FlatList;

    // console.log('loadStatu:', loadStatu);

    const exceptionViewRefreshing = loadStatu === LIST_LOAD_DATA;
    const refreshing = loadStatu === LIST_LOAD_DATA
      && this.openRefreshing && (sections.length > 0 || data.length > 0);

    // console.log('refreshing:', refreshing);

    // console.log('sections:', sections);

    return (
      <TableView
        {...otherProps}
        data={data}
        sections={sections}
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
            styles={styles.exceptionViewStyle}
            refresh={exceptionViewRefreshing}
            tipBtnText={tipBtnText}
            exceptionType={
              exceptionViewRefreshing ? ExceptionType.Loading
                : ExceptionType.NoData}
            image={noDataImg}
            prompt={exceptionViewRefreshing
              ? ''
              : noDataPrompt}
            // otherTips={this.renderNoDataTips()}
            onRefresh={tipTap || this._handleRefresh}
            {...this.props}
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
    height: 30,
    margin: 12
  },

});
