/**
 * Created by lintong on 2017/7/3.
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, SectionList, Alert } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { ICARD, IUSE, IDO, FLAG, FLAGRECORD } from '../../redux/reqKeys';
// import { search, } from '../../redux/module/leancloud';
import doCardWithNone from '../../components/DoCard/doCardWithNone';
import ExceptionView, {
  ExceptionType,
} from '../../components/Base/ExceptionView/index';
// import { selfUser } from '../../request/LCModle';
import {
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledSectionHeader,
  StyledSectionHeaderTitle,
  StyledAdd,
  StyledIonicons,
} from './style';
import { strings } from '../../../locales/i18n';
import Item from './Item';
import rate from '../../../helps/rate';
import { iUseList as iUseListParams } from '../../request/leanCloud';
import { addNormalizrEntities } from '../../redux/module/normalizr';
import { listReq } from '../../redux/actions/list';
import { PrivacyModal } from '@components/ModalUtil/Privacy';
import { isTablet } from 'react-native-device-info';

const numColumns = isTablet() ? 5 : 3;

@connect(
  (state) => ({
    data: state.list.get(IUSE),
    iUse: state.normalizr.get(IUSE),
    iCard: state.normalizr.get(ICARD),
    flagRecord: state.normalizr.get(FLAGRECORD),
    refreshLoad: state.req.get(IUSE).get('load'),
    load: state.req.get(IDO).get('load'),
    user: state.user.data,
  }),
  (dispatch, props) => ({
    // ...bindActionCreators({},dispatch)

    // fbSearch: () => dispatch(search(false, {
    //   where: {
    //     ...dispatch(selfUser()),
    //     doneDate: { $exists: false },
    //     endDate: { $gte: { __type: 'Date', iso: moment().toISOString() } }
    //   },
    //   include: FLAG
    // }, FLAGRECORD)),
    // search1: () => dispatch(search(false, {
    //   where: {
    //     ...dispatch(selfUser()),
    //     statu: 'start'
    //   },
    //   order: '-time',
    //   include: `${ICARD},iCard.user`
    // }, IUSE)),
    search: () => {
      dispatch(
        listReq(IUSE, iUseListParams(), false, {
          dataMap: (data) => {
            const { iUseList } = data.result;
            // 添加副本
            // console.log('fbList', fbList);

            // dispatch(addNormalizrEntities(FLAGRECORD, { results: fbList }));

            // 通过本地时间验证,判断今日是否已经打卡
            const newIUseList = iUseList.sort((a, b) => {
              const aDone = moment(0, 'HH').isBefore(a.doneDate.iso);
              const bDone = moment(0, 'HH').isBefore(b.doneDate.iso);
              if (aDone && bDone) {
                return false;
              }
              return aDone;
            });
            return { results: newIUseList };
          },
        }),
      );
    },
    done: async (data) => {
      // 评价
      rate();
      return dispatch(doCardWithNone(data));
    },
  }),
)
export default class Punch extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      frMap: {},
    };
  }

  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {
    // this.props.search();
    // this.props.fbSearch();
    // this.props.getiUse();
    // const loadStatu = this.props.data.get('loadStatu');
    // loadStatu === 'LIST_FIRST_JOIN' && this.props.search();
    // this.props.exist()
    // console.log('this.refs.list:', this.refs.list.scrollToOffset);
  }

  openSmallTitle = false;

  componentWillReceiveProps(nextProps) {
    // console.log('000');
    const { user, search } = this.props;
    if (nextProps.user.objectId && nextProps.user.objectId !== user.objectId) {
      search();
      // this.props.fbSearch();
    }
    // console.log('1111');

    // if (flagRecord !== nextProps.flagRecord) {
    //   const flagRecordModal = nextProps.flagRecord.toJS();
    //   console.log('flagRecordModal', flagRecordModal);
    //   const frValue = Object.values(flagRecordModal);
    //   const frMap = {};
    //   if (frValue) {
    //     frValue.forEach((item) => {
    //       // if (item.user && item.user.objectId === user.objectId) {
    //       frMap[item.iCard] = item;
    //       // }
    //     });
    //   }
    //   this.setState({ frMap });
    // }
  }

  __renderNoData = (statu) => {
    const refreshLoad =
      statu === 'LIST_FIRST_JOIN' || statu === 'LIST_LOAD_DATA';
    return (
      <ExceptionView
        style={{ height: Dimensions.get('window').height / 2 }}
        exceptionType={
          refreshLoad ? ExceptionType.Loading : ExceptionType.NoData
        }
        tipBtnText="添加卡片"
        refresh={refreshLoad}
        prompt={refreshLoad ? '正在加载' : '暂无数据~'}
        onRefresh={() => {
          this.props.navigation.navigate('newCard');
        }}
      />
    );
  };

  _keyExtractor = (item, index) => {
    const key = item.objectId || index;
    return `${key}`;
  };

  _renderHeader = () => (
    <StyledHeaderTitle>{strings('app.name')}</StyledHeaderTitle>
  );

  _renderSectionHeader = (info) => {
    // if (info.section.title.length === 0) {
    //   return <View style={{height: 30}} />;
    // }
    return (
      <StyledSectionHeader>
        <StyledSectionHeaderTitle numberOfLines={1}>
          {info.section.title}
        </StyledSectionHeaderTitle>
      </StyledSectionHeader>
    );
  };

  __renderItem = (data) => {
    // return (<View/>)
    // const
    const views = data.item.map((item, index) => {
      const iCardId = item[ICARD];
      const iCard = this.props.iCard.get(iCardId);
      const showFB = item.isFb;

      // if (showFB) {
      //   // TODO,这边感觉有点不安全。
      //   const fr = this.state.frMap[iCardId];
      //   const { objectId } = fr;
      //   // const before = moment(startDate.iso);
      //   // const after = moment(endDate.iso);
      //   // const momentIn = moment().isBetween(before, after);
      //   // if (momentIn) {
      //   data.fr = objectId;
      //   // }
      // }

      const done = moment(0, 'HH').isBefore(item.doneDate.iso);
      let iconAndColor = iCard.get('iconAndColor');
      iconAndColor = iconAndColor ? iconAndColor.toJS() : {};

      let sound = iCard.get('sound');
      sound = sound && sound.toJS && sound.toJS();
      return (
        <Item
          numColumns={numColumns}
          showFB={showFB}
          openSound={sound?.open ?? false}
          soundsKey={sound?.item.key}
          key={index + iCard.get('title')}
          name={iconAndColor.name}
          color={iconAndColor.color}
          done={done}
          title={iCard.get('title')}
          discrib={item.unSatisfyDiscrib || `第${item.time}日`}
          onPress={async (flip, doIt) => {
            // const iCardM = iCard.toJS()
            // 如果没有强制打卡类型，则直接翻转

            if (!flip && item.satisfy) {
              iCard.get('record').size === 0 && doIt();
              if (!this.props.load && !done) {
                await this.props.done(item);
              }
            } else {
              this.props.navigation.navigate('card', {
                iUseId: item.objectId,
                iCardId,
              });
            }
          }}
        />
      );
    });

    return <View style={{ flexDirection: 'row' }}>{views}</View>;
  };

  render(): ReactElement<any> {
    const statu = this.props.data.get('loadStatu');

    const data = this.props.data.toJS().listData;

    // 按条件分类

    const satisfy = [];
    const unSatisfy = [];
    const sections = [];
    if (data.length > 0) {
      for (let i = 0, j = data.length; i < j; i++) {
        const mData = this.props.iUse.get(data[i]).toJS();
        const iCard = this.props.iCard.get(mData.iCard).toJS();
        const week = new Date().getDay() === 0 ? 7 : new Date().getDay();
        const recordDay = iCard.recordDay.sort((a, b) => a - b > 0);

        if (recordDay.indexOf(week) !== -1) {
          const limitTimes = iCard.limitTimes || ['00:00', '24:00'];
          const before = moment(limitTimes[0], 'HH');
          const after = moment(limitTimes[1], 'HH');
          const now = moment(new Date());
          const momentIn = moment(now).isBetween(before, after);
          if (momentIn) {
            mData.satisfy = true;
            satisfy.push(mData);
          } else {
            mData.satisfy = false;
            if (now.isBefore(before)) {
              mData.unSatisfyDiscrib = limitTimes[0];
            } else if (now.isAfter(after)) {
              mData.unSatisfyDiscrib = `${limitTimes[1]}前`;
            }
            unSatisfy.push(mData);
          }
        } else {
          let unSatisfyDiscrib = '一周后';
          // 算出正向上满足条件的下一天
          const unSatisfyRecordDay = recordDay.filter((a) => a - week > 0);
          let nextDoDay = unSatisfyRecordDay[0];
          // 相差几天
          let days = nextDoDay - week;
          if (unSatisfyRecordDay.length === 0) {
            // 如果一周内没有大于当天的打卡要求，则必然在下周的第一个要求中
            nextDoDay = recordDay[0];
            days = nextDoDay + 7 - week;
          }

          if (days < 4) {
            unSatisfyDiscrib = ['明天', '后天', '大后天'][days - 1];
          } else {
            unSatisfyDiscrib = [
              '周一',
              '周二',
              '周三',
              '周四',
              '周五',
              '周六',
              '周天',
            ][nextDoDay - 1];
          }
          // 算出离今天最近的下一次打卡时间
          // console.log('week:', recordDay, week);

          mData.satisfy = false;
          // const fromNow = moment().to(moment().add(2, 'days'))
          mData.unSatisfyDiscrib = unSatisfyDiscrib;
          unSatisfy.push(mData);
        }
      }
      satisfy.length > 0 &&
        sections.push({
          title: unSatisfy.length > 0 ? '进行中' : '',
          data: _.chunk(satisfy, numColumns),
        });
      unSatisfy.length > 0 &&
        sections.push({ title: '等待中', data: _.chunk(unSatisfy, 3) });
    }

    return (
      <StyledContent>
        {/* <StyledContent */}
        {/* style={this.props.style}> */}
        <PrivacyModal />
        <SectionList
          refreshing={false}
          onScroll={(event) => {
            const y = event.nativeEvent.contentOffset.y;
            if (!this.openSmallTitle && y > 35) {
              this.openSmallTitle = true;
              this.props.navigation.setOptions({ title: '小改变' });
            }
            if (this.openSmallTitle && y < 35) {
              this.openSmallTitle = false;
              this.props.navigation.setOptions({ title: '' });
            }
          }}
          onRefresh={() => {
            this.props.search();
          }}
          // data={data}
          sections={sections}
          numColumns={numColumns}
          style={{ flex: 1 }}
          renderSectionHeader={this._renderSectionHeader}
          // removeClippedSubviews={true}
          // pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={this.__renderItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={
            data.length > 0 && <View style={{ height: 120 }} />
          }
          ListEmptyComponent={() => this.__renderNoData(statu)}
        />
      </StyledContent>
    );
  }
}
