/**
 * Created by lintong on 2017/7/3.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
  SectionList,
  AsyncStorage,
  Alert
} from 'react-native'
import { FlatList, } from 'react-navigation'
import { connect } from 'react-redux'
import moment from 'moment'
import { ICARD, IUSE, IDO, FLAG,FLAGRECORD } from '../../redux/reqKeys'
import { search, } from '../../redux/module/leancloud'
import { doCardWithNone } from '../../components/Button/DoCardButton/doCardWithNone'
import ExceptionView, { ExceptionType } from '../../components/Base/ExceptionView/index'
import { selfUser } from '../../request/LCModle'
import DeviceInfo from 'react-native-device-info'
import {
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledSectionHeader,
  StyledSectionHeaderTitle,
  StyledAdd,
  StyledIonicons
} from './style'
import { strings } from '../../../locales/i18n';
import Item from './Item'
import Rate, { AndroidMarket } from 'react-native-rate'
import _ from 'lodash'

let hasTryRate = false

@connect(
  state => ({
    data: state.list.get(IUSE),
    iUse: state.normalizr.get(IUSE),
    iCard: state.normalizr.get(ICARD),
    flagRecord:state.normalizr.get(FLAGRECORD),
    refreshLoad: state.req.get(IUSE).get("load"),
    load: state.req.get(IDO).get("load"),
    user: state.user.data
  }),
  (dispatch, props) => ({
    //...bindActionCreators({},dispatch)

    fbSearch: () => {
      return dispatch(search(false, {
        where: {
          ...dispatch(selfUser()),
          doneDate: {"$exists":false},
          endDate: {"$gte":{"__type":"Date","iso":moment().toISOString()}}
        },
        include: FLAG
      }, FLAGRECORD))
    },
    search: () => {

      //cloude 中加入',iCard.course' 反而完全没有信息了，很奇怪
      return dispatch(search(false, {
        where: {
          ...dispatch(selfUser()),
          statu: 'start'
        },
        order: '-time',
        include: FLAG + "," + ICARD + ',iCard.user'
      }, IUSE))
    },
    done: async (data) => {

      //评价
      if (!hasTryRate && !__DEV__) {
        hasTryRate = true
        if (Platform.OS === 'ios') {
          Rate.rate({
            AppleAppID: "1332546993",
            preferInApp: true,
            inAppDelay: 5.0,
            openAppStoreIfInAppFails: false,
          }, () => {
          })
        } else {
          //TODO 给Android 做一个评论智能跳出。
          //做出时间判断。取消的话，就20天一次提醒，确定的话，就2月一次提醒
          //提取这一次提醒时间，
          const key = 'AndroidRateTime'
          const time = await AsyncStorage.getItem(key);

          //如果time 不存在或者当前时间大于time 则提醒
          if (!time || moment().isAfter(moment(time))) {
            Alert.alert(
              '给我们一个好评吧!',
              'Thanks♪(･ω･)ﾉ',
              [{
                text: '取消', onPress: async () => {
                  //存一个20天后提醒的时间
                  const nextTime = moment().add(3, 'weeks').toISOString()
                  await AsyncStorage.setItem(key, nextTime);
                }
              }, {
                text: '确定', onPress: () => {

                  const url = 'market://details?id=' + DeviceInfo.getBundleId()
                  // Linking.openURL(url)
                  const options = {
                    preferredAndroidMarket: AndroidMarket.Other,
                    OtherAndroidURL: url,
                    fallbackPlatformURL: "https://icard.leanapp.cn/",
                  }

                  Rate.rate(options, async (success) => {
                    if (success) {
                      //存一个两月后提醒的时间
                      const nextTime = moment().add(9, 'weeks').toISOString()
                      await AsyncStorage.setItem(key, nextTime);
                    } else {
                      //存一个20天后提醒的时间
                      const nextTime = moment().add(3, 'weeks').toISOString()
                      await AsyncStorage.setItem(key, nextTime);
                    }
                  })
                }
              }])
          }

        }
      }
      return dispatch(doCardWithNone(data))
    },
  })
)
export default class Punch extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      frMap:{}
    }
  }

  static propTypes = {};
  static defaultProps = {};


  static navigationOptions = props => {
    // const { navigation } = props;
    // const { state } = navigation;
    // const { params } = state;
    // console.log('test:', params,localLoad);
    return {
      // gesturesEnabled: false,
      header: null
      // title:strings('app.name')

    }
  };

  componentDidMount() {
    this.props.fbSearch()
    const loadStatu = this.props.data.get('loadStatu')
    loadStatu === 'LIST_FIRST_JOIN' && this.props.search()
    // this.props.exist()
    // console.log('this.refs.list:', this.refs.list.scrollToOffset);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.objectId &&
      nextProps.user.objectId !== this.props.user.objectId) {
      this.props.search()
    }
    if(this.props.flagRecord !== nextProps.flagRecord){
      const flagRecordModal = nextProps.flagRecord.toJS()
      const frValue = Object.values(flagRecordModal)
      const frMap = {}
      frValue && frValue.forEach(item => {
        frMap[item.iCard] = item
      })

      this.setState({frMap})
    }
  }


  __renderNoData = (statu) => {


    const refreshLoad = statu === 'LIST_FIRST_JOIN' || statu === 'LIST_LOAD_DATA'
    return (
      <ExceptionView
        style={{ height: Dimensions.get('window').height / 2 }}
        exceptionType={refreshLoad ?
          ExceptionType.Loading : ExceptionType.NoData}
        tipBtnText={'添加卡片111'}
        refresh={refreshLoad}
        prompt={refreshLoad ? '正在加载' : '暂无数据~'}
        onRefresh={() => {
          this.props.navigation.navigate('newCard')
        }}/>
    )
  }

  _keyExtractor = (item, index) => {
    const key = item.objectId || index;
    return key + '';
  }


  _renderHeader = () => {
    return (
      <StyledHeader>
        <StyledHeaderTitle>
          {strings('app.name')}
        </StyledHeaderTitle>
        <StyledAdd
          onPress={() => {
            this.props.navigation.navigate('newCard')
          }}
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
          <StyledIonicons
            // color={'#39ba98'}
            size={25}
            name={'plus-circle'}/>
        </StyledAdd>
      </StyledHeader>
    )
  }

  _renderSectionHeader = (info) => {
    if (info.section.title.length === 0) return <View style={{ height: 30 }}/>
    return (
      <StyledSectionHeader>
        <StyledSectionHeaderTitle numberOfLines={1}>
          {info.section.title}
        </StyledSectionHeaderTitle>
      </StyledSectionHeader>

    )

  }

  __renderItem = (data) => {

    // return (<View/>)



    // const
    const views = data.item.map((item, index) => {
      const data = item
      // const flag = this.props.Flag.get(item.Flag)

      // if (flag) {
      //   const flagEndDate = flag.get('endDate') ? moment(flag.get('endDate').get('iso'))
      //     : moment('24:00', 'HH:mm')
      //   showFB = moment().isBefore(flagEndDate)
      //   // console.log('endDate:', flag.get('endDate'));
      // }

      // console.log('flag:', flag);
      // console.log('data:', data);
      const iCardId = data[ICARD]
      let iCard = this.props.iCard.get(iCardId)
      let showFB = !!this.state.frMap[iCardId]

      if(showFB){
        //TODO,这边感觉有点不安全。
        const fr = this.state.frMap[iCardId]
        const {objectId ,startDate, endDate} = fr
        const before = moment(startDate.iso)
        const after = moment(endDate.iso)
        const momentIn = moment().isBetween(before, after)
        if(momentIn) {
          data.fr = objectId
        }
      }

      const done = moment(0, "HH").isBefore(data.doneDate.iso)
      let iconAndColor = iCard.get('iconAndColor')
      iconAndColor = iconAndColor ? iconAndColor.toJS() : {}
      return (<Item
        showFB={showFB}
        key={index + iCard.get('title')}
        name={iconAndColor.name}
        color={iconAndColor.color}
        done={done}
        title={iCard.get('title')}
        discrib={data.unSatisfyDiscrib || data.time + '次'}
        onPress={async (flip, doIt) => {
          // const iCardM = iCard.toJS()
          //如果没有强制打卡类型，则直接翻转
          if (!flip && data.satisfy) {
            iCard.get('record').size === 0 && doIt()
            if (!this.props.load && !done) {
              await this.props.done(data)

            }
          } else {
            this.props.navigation.navigate('card', {
              iUseId: item.objectId,
              iCardId: iCardId
            })
          }


        }}
      />)
    })

    return (
      <View style={{ flexDirection: 'row' }}>
        {views}
      </View>
    )

  }


  render(): ReactElement<any> {

    const statu = this.props.data.get('loadStatu')

    let data = this.props.data.toJS().listData


    //按条件分类

    const satisfy = []
    const unSatisfy = []
    const sections = []
    if (data.length > 0) {
      for (let i = 0, j = data.length; i < j; i++) {
        const mData = this.props.iUse.get(data[i]).toJS()
        const iCard = this.props.iCard.get(mData.iCard).toJS()
        const week = new Date().getDay() === 0 ? 7 : new Date().getDay()
        const recordDay = iCard.recordDay.sort((a, b) => a - b > 0)

        if (recordDay.indexOf(week) !== -1) {
          const limitTimes = iCard.limitTimes || ['00:00', "24:00"]
          const before = moment(limitTimes[0], "HH")
          const after = moment(limitTimes[1], "HH")
          const now = moment(new Date())
          const momentIn = moment(now).isBetween(before, after)
          if (momentIn) {
            mData.satisfy = true
            satisfy.push(mData)
          } else {
            mData.satisfy = false
            if (now.isBefore(before)) {
              mData.unSatisfyDiscrib = limitTimes[0]
            } else if (now.isAfter(after)) {
              mData.unSatisfyDiscrib = limitTimes[1] + '前'
            }
            unSatisfy.push(mData)
          }

        } else {
          let unSatisfyDiscrib = '一周后'
          //算出正向上满足条件的下一天
          let unSatisfyRecordDay = recordDay.filter(a => a - week > 0)
          let nextDoDay = unSatisfyRecordDay[0]
          //相差几天
          let days = nextDoDay - week
          if (unSatisfyRecordDay.length === 0) {
            //如果一周内没有大于当天的打卡要求，则必然在下周的第一个要求中
            nextDoDay = recordDay[0]
            days = nextDoDay + 7 - week
          }


          if (days < 4) {
            unSatisfyDiscrib = ['明天', '后天', '大后天'][days - 1]
          } else {
            unSatisfyDiscrib = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'][nextDoDay - 1]
          }
          //算出离今天最近的下一次打卡时间
          // console.log('week:', recordDay, week);


          mData.satisfy = false
          // const fromNow = moment().to(moment().add(2, 'days'))
          mData.unSatisfyDiscrib = unSatisfyDiscrib
          unSatisfy.push(mData)
        }
      }
      satisfy.length > 0 && sections.push({
        title: unSatisfy.length > 0 ? "进行中" : '',
        data: _.chunk(satisfy, 3)
      })
      unSatisfy.length > 0 && sections.push({ title: "等待中", data: _.chunk(unSatisfy, 3) })
    }


    // data = data && data.reverse()
    return (
      <StyledContent>
        {/*<StyledContent*/}
        {/*style={this.props.style}>*/}

        <SectionList
          refreshing={false}
          onRefresh={() => {
            this.props.search()
          }}
          // data={data}
          sections={sections}
          numColumns={3}
          style={{ flex: 1 }}
          renderSectionHeader={this._renderSectionHeader}
          // removeClippedSubviews={true}
          // pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={this.__renderItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={data.length > 0 && <View style={{ height: 120 }}/>}
          ListEmptyComponent={() => this.__renderNoData(statu)}
        />
      </StyledContent>
    );
  }
}



