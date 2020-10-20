/**
 * Created by lintong on 2017/7/3.
 * @flow
 */

import React, { Component, FC } from 'react';
import { View, Dimensions, SectionList, Alert, DeviceEventEmitter, EmitterSubscription } from 'react-native';
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
import { listReq } from '../../redux/actions/list';
import { PrivacyModal } from '@components/modal/privacy';
import { isLandscapeSync, isTablet } from 'react-native-device-info';
import Orientation from 'react-native-orientation';
import { RouteKey } from '@pages/interface';
import { GetClassesICardIdResponse, GetClassesIUseIdResponse, postClassesIDo } from 'src/hooks/interface';
import { useNavigation } from '@react-navigation/native';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { point } from '@request/LCModle';
import { getUerInfo, useGetUserInfo } from 'src/data/data-context';
import SimpleToast from 'react-native-simple-toast';
import { ListLoadType } from '@components/Base/interface';

interface StateType {
  frMap: Object;
  numColumns: number;
}




type ItemType = GetClassesIUseIdResponse & { satisfy: boolean, unSatisfyDiscrib: string, isFb: boolean }

interface CellProps {
  iCard: GetClassesICardIdResponse;
  iUse: ItemType
  numColumns: number;
  load: boolean
}


const RenderCell: FC<CellProps> = ({ iCard, iUse, numColumns, load }) => {
  // const showFB = iUse.isFb;
  const { isFb, unSatisfyDiscrib, time, satisfy, objectId } = iUse;
  const done = moment(0, 'HH').isBefore(iUse.doneDate.iso);
  const { iconAndColor = {}, sound, title, record, objectId: iCardId } = iCard;
  const { width, height } = Dimensions.get('window')
  const user = useGetUserInfo()
  const { navigate } = useNavigation();



  const doCard = async (doIt: () => void) => {

    doIt();
    try {
      const { objectId: id } = await postClassesIDo({
        user: point('_User', user?.objectId || ''),
        type: 0,
        iCard: point('iCard', iCardId),
        iUse: point('iUse', objectId),
        doneDate: { "__type": "Date", iso: new Date().toISOString() },
      })
      if (!id) {
        doIt();
      }
      console.log('id', id);
    } catch (error) {
      console.log('error', error);
      SimpleToast.show(error.message)
      doIt();
    }
  }

  return (
    <Item
      numColumns={numColumns}
      showFB={isFb}
      openSound={sound?.open ?? false}
      soundsKey={sound?.item.key}
      key={title}
      name={iconAndColor.name}
      scWidth={numColumns === 7 ? Math.max(width, height) : Math.min(width, height)}
      color={iconAndColor.color}
      done={done}
      title={title}
      discrib={unSatisfyDiscrib || `第${time}日`}
      onPress={async (flip, doIt) => {
        // const iCardM = iCard.toJS()
        // 如果没有强制打卡类型，则直接翻转

        if (!flip && satisfy) {


          // record?.length === 0 && doIt();
          if (!load && !done) {

            if (record?.length === 0) {
              rate();
              //直接打卡
              doCard(doIt);
            } else {
              navigate(RouteKey.clockIn, { iUseId: objectId, iCardId, record });
            }

            // await this.props.done(item);
          }
        } else {
          navigate('card', {
            iUseId: objectId,
            iCardId,
          });
        }
      }}
    />
  );

}


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
export default class Punch extends Component<any, StateType> {
  constructor(props: Object) {
    super(props);
    this.state = {
      frMap: {},
      numColumns: isTablet() ? isLandscapeSync() ? 7 : 5 : 3
    };
  }

  static propTypes = {};

  static defaultProps = {};
  deEmitter?: EmitterSubscription;
  componentDidMount() {
    // this.props.search();
    // this.props.fbSearch();
    // this.props.getiUse();
    // const loadStatu = this.props.data.get('loadStatu');
    // loadStatu === 'LIST_FIRST_JOIN' && this.props.search();
    // this.props.exist()
    // console.log('this.refs.list:', this.refs.list.scrollToOffset);
    isTablet() && Orientation.addOrientationListener(this._orientationDidChange);

    this.deEmitter = DeviceEventEmitter.addListener('iDO_Reload', () => {
      this.props.search()
    });
  }

  componentWillUnmount() {
    isTablet() && Orientation.removeOrientationListener(this._orientationDidChange);
    this.deEmitter && this.deEmitter.remove();
  }

  _orientationDidChange = (orientation: string) => {
    if (orientation === 'LANDSCAPE') {
      this.setState({ numColumns: 7, })
      // do something with landscape layout
    } else {
      this.setState({ numColumns: 5 })
      // do something with portrait layout
    }
  }

  openSmallTitle = false;

  componentWillReceiveProps(nextProps: any) {
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
      statu === ListLoadType.LIST_FIRST_JOIN || statu === ListLoadType.LIST_LOAD_DATA;
    return (
      <ExceptionView
        style={{ height: Dimensions.get('window').height / 1.6 }}
        exceptionType={
          refreshLoad ? ExceptionType.Loading : ExceptionType.NoData
        }
        tipBtnText="重新加载"
        // prompt={refreshLoad ? '正在加载～' : '暂无数据~'}
        onRefresh={() => {
          this.props.search()
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

  _renderSectionHeader = (info: any) => {
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

  __renderItem = (data: { item: ItemType[] }) => {
    // return (<View/>)
    // const
    const views = data.item.map((item, index) => {
      const iCardId = item[ICARD];
      const iCard = this.props.iCard.get(iCardId);

      return (
        <RenderCell
          key={item.objectId}
          numColumns={this.state.numColumns}
          iUse={item}
          iCard={iCard.toJS()}
          load={this.props.load}
        />
      );
    });

    return <View style={{ flexDirection: 'row' }}>{views}</View>;
  };

  render() {
    const statu = this.props.data.get('loadStatu');

    const data = this.props.data.toJS().listData as GetClassesIUseIdResponse[];
    // 按条件分类

    const satisfy = [];
    const unSatisfy = [];
    const sections = [];
    if (data.length > 0) {
      for (let i = 0, j = data.length; i < j; i++) {
        const mData = this.props.iUse.get(data[i]).toJS() as ItemType;
        const iCard = this.props.iCard.get(mData.iCard).toJS() as GetClassesICardIdResponse;
        const week = new Date().getDay() === 0 ? 7 : new Date().getDay();
        const recordDay = iCard.recordDay.sort((a, b) => a - b);

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
          data: _.chunk(satisfy, this.state.numColumns),
        });
      unSatisfy.length > 0 &&
        sections.push({ title: '等待中', data: _.chunk(unSatisfy, this.state.numColumns) });
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
          // numColumns={numColumns}
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
            data.length > 0 ? <View style={{ height: 120 }} /> : null
          }
          ListEmptyComponent={() => this.__renderNoData(statu)}
        />
      </StyledContent>
    );
  }
}
