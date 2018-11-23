/**
 * Created by lintong on 8/31/16.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  SectionList,
  InteractionManager,
  RefreshControl,
  ActivityIndicator,
  Text,
  Platform,
  FlatList,
  Dimensions
} from 'react-native'
import ExceptionView, { ExceptionType } from './ExceptionView';
import { is } from 'immutable';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

const delay = () => new Promise((resolve) => InteractionManager.runAfterInteractions(resolve));

const LIST_FIRST_JOIN = 'LIST_FIRST_JOIN'
// export const LIST_NO_DATA = 'LIST_NO_DATA'
export const LIST_LOAD_DATA = 'LIST_LOAD_DATA'
export const LIST_LOAD_MORE = 'LIST_LOAD_MORE'
export const LIST_LOAD_NO_MORE = 'LIST_LOAD_NO_MORE'
export const LIST_LOAD_ERROR = 'LIST_LOAD_ERROR'
export const LIST_NORMAL = 'LIST_NORMAL'

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
    noDataPrompt: "空空如也~",
    type: 'list',
    data: [],
    sections: [],
  };


  onScroll(e: Object) {
    let nativeEvent = e.nativeEvent;
    const shouldShowloadMore = nativeEvent.contentSize.height >
      nativeEvent.layoutMeasurement.height;

    this.state.shouldShowloadMore !== shouldShowloadMore &&
    this.setState({ shouldShowloadMore })
    // console.log('test:', shouldShowloadMore);
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

    const { loadStatu, data, sections } = this.props

    const hasData = sections.length > 0 || data.length > 0

    // console.log('data:',this.props.data, hasData);


    if (loadStatu === LIST_LOAD_MORE) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator style={{ marginTop: 8, marginBottom: 8 }} size='small'
                             animating={true}/>
        </View>
      );
    } else if (hasData && loadStatu === LIST_LOAD_NO_MORE &&
      this.state.shouldShowloadMore) {

      return (
        <View style={styles.footer}>
          <Text style={{ color: 'rgb(150,150,150)' }}>没有更多了</Text>
        </View>
      );
    } else {
      return null;
    }
  }


  _keyExtractor = (item, index) => {
    const key = item.id || index;
    return key + '';
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
    }= this.props
    const TableView = sections.length>0 ? SectionList : FlatList

    // console.log('data:', data);

    const exceptionViewRefreshing = loadStatu === LIST_LOAD_DATA
    const refreshing = loadStatu === LIST_LOAD_DATA
      && this.openRefreshing && (sections.length > 0 || data.length > 0)

    // console.log('refreshing:', refreshing);


    return (
      <TableView
        {...otherProps}
        data={data}
        sections={sections}
        refreshing={refreshing}
        onScroll={this.onScroll.bind(this)}
        onRefresh={() => {
          this.openRefreshing = true;
          this._handleRefresh()
        }}
        onEndReached={this._handleloadMore}
        keyExtractor={this._keyExtractor}
        removeClippedSubviews={true}
        ListFooterComponent={this.renderFooter.bind(this)}
        ListEmptyComponent={() => (
          <ExceptionView
            styles={styles.exceptionViewStyle}
            refresh={exceptionViewRefreshing}
            tipBtnText={tipBtnText}
            exceptionType={
              exceptionViewRefreshing ? ExceptionType.Loading :
                ExceptionType.NoData}
            image={noDataImg}
            prompt={exceptionViewRefreshing ?
              '正在加载~' :
              noDataPrompt}
            // otherTips={this.renderNoDataTips()}
            onRefresh={tipTap ? tipTap : this._handleRefresh}
            {...this.props}
          />

        )}
        style={[styles.list,style]}
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

})
