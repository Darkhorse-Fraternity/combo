/**
 * Created by lintong on 2018/3/6.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
  StyledContent,
  StyledInner,
  StyledTitleView,
  StyledTitleText,
  StyledRow,
  StyledRowText,
  StyledHeaderBtn,
} from './style'

import AgendaScreen from './agenda'

import { user, iUse } from '../../../request/LCModle'
import LCList from '../../../components/Base/LCList';
import { IDO, IUSE, IDOCALENDAR } from '../../../redux/reqKeys'
import { recordDiary } from '../Do/Diary'
import { updateByID } from '../../../redux/module/leancloud'
import { reqChangeData } from '../../../redux/actions/req'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import moment from 'moment'
import 'moment/locale/zh-cn'

const listKey = IDO

import RecordRow from './Row'


import { shouldComponentUpdate } from 'react-immutable-render-mixin';


@connect(
  state => ({ user: state.user.data }),
  (dispatch, props) => ({
    iDoDelete: async (item) => {


      const isDiary = (item.imgs && item.imgs.length > 0) ||
        (item.recordText && item.recordText.length > 0)
      if (isDiary) {
        props.navigation.navigate('rcomment',
          {
            iDoID: item.objectId,
            iUseId: props.iUse.get('objectId'),
            iCardId: props.iCard.get('objectId')
          })
      } else {
        //取消打卡
        // console.log('item:', item);

        Alert.alert(
          '删除打卡记录?',
          '删除后不可恢复',
          [{ text: '取消' },
            {
              text: '确定', onPress: async () => {

              const iDoID = item.objectId
              const param = { state: -1 }
              const res = await dispatch(updateByID(IDO, iDoID, param))
              const entity = {
                ...param,
                ...res,
              }
              dispatch(addNormalizrEntity(IDO, entity))
              const date = moment(item.createdAt).format("YYYY-MM-DD")
              dispatch(reqChangeData(IDOCALENDAR, {
                [date]: null
              }))

              if (item.type === 1) {
                return
              }
              // 打卡次数也需要修改。
              const iUse = props.iUse.toJS()
              const paramiUSE = { time: iUse.time - 1 }
              const before = moment(0, "HH")
              const after = moment(24, "HH")

              const momentIn = moment(item.createdAt).isBetween(before, after)
              // console.log('momentIn:', momentIn);
              if (momentIn) {
                paramiUSE.doneDate = {
                  "__type": "Date", "iso":
                    moment(item.createdAt).subtract(1, 'day').toISOString()
                }
              }
              const entityiUse = {
                ...paramiUSE,
                objectId: item.iUse.objectId
              }
              dispatch(addNormalizrEntity(IUSE, entityiUse))
            }
            }])


      }


      // Alert.alert(
      //   '确定取消打卡?',
      //   isDiary? '' : '',
      //   [{
      //     text: '取消',onPress: async () => {
      //
      //     }
      //   }, {
      //     text: '确定', onPress: async () => {
      //
      //     }
      //   }]
      // )
    },
    tipTap: recordDiary
  })
)


export default class Statistical extends PureComponent {
  constructor(props: Object) {
    super(props);


  }

  static propTypes = {};
  static defaultProps = {};


  componentDidMount() {
    // const key = 'done_' + this.props.iCard.get('objectId')
    // this.subscription =
    //     DeviceEventEmitter.addListener(key, this.refresh);
  }

  componentWillUnmount() {
    // this.subscription.remove();
  }

  // refresh = () => {
  //     this.refs['list'].selector.props.loadData()
  // }


  _renderRow = (title, des) => {
    return (
      <StyledRow>
        <StyledRowText>
          {title + ':'}
        </StyledRowText>
        <View style={{ width: 20 }}/>
        <StyledRowText>
          {des}
        </StyledRowText>
      </StyledRow>
    )
  }


  _renderHeader = () => {

    // const { navigation } = this.props;
    // const { state } = navigation;
    // const { params } = state;
    // const { iCard, iUse } = params
    // console.log('test:', iCard,iUse);
    const iCard = this.props.iCard.toJS()
    const iUse = this.props.iUse.toJS()

    const cardCreatedAt = moment(iCard.createdAt).format("YYYY-MM-DD")
    // const useCreatedAt = moment(iUse.createdAt).format("YYYY-MM-DD")
    const date1 = new Date();
    const date2 = new Date(iUse.createdAt);
    const date = ((date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000)).toFixed(1);

    const time = iUse.time
    moment.locale('zh-cn')
    const fromNow = moment(iUse.doneDate.iso).fromNow()

    const isSelf = this.props.user.objectId === iUse.user

    return (
      <StyledInner
        colors={['#ffffff', '#f1f6f9', '#ebf0f3', '#ffffff']}>
        <AgendaScreen
          {...this.props}
          onPress={(item) => {

            this.props.iDoDelete(item)
            // this.props.navigation.navigate('rcomment',
            //   {
            //     iDoID: item.objectId,
            //     iUseId: this.props.iUse.get('objectId'),
            //     iCardId: this.props.iCard.get('objectId')
            //   })
          }}
        />
        <StyledTitleView>
          <StyledTitleText>
            习惯统计
          </StyledTitleText>
        </StyledTitleView>
        <View style={{ height: 10 }}/>
        {this._renderRow('已完成周期', (time / iCard.period).toFixed(2) + '轮')}
        {this._renderRow('总打卡次数', time + '次')}
        {this._renderRow('上次打卡', fromNow)}
        {this._renderRow('加入天数', date + "天")}
        {this._renderRow('建立日期', cardCreatedAt)}
        <StyledTitleView>
          <StyledTitleText>
            习惯日记
          </StyledTitleText>
          {isSelf &&
          <StyledHeaderBtn
            // load={false}
            backgroundColor={this.props.color}
            // disabled={false}
            hitSlop={{ top: 5, left: 10, bottom: 5, right: 10 }}
            onPress={() => this.props.tipTap(this.props.iUse.toJS())}
            title={'添加'}/>}
        </StyledTitleView>
      </StyledInner>

    )
  }

  renderRow({ item, index }: Object) {

    // const img = item.imgs && item.imgs[0] || null

    return (
      <RecordRow
        item={item}
        color={this.props.color}
        onPress={() => {
          this.props.navigation.navigate('rcomment',
            {
              iDoID: item.objectId,
              iUseId: this.props.iUse.get('objectId'),
              iCardId: this.props.iCard.get('objectId')
            })
        }}/>
    )
  }

  render(): ReactElement<any> {

    const { navigation } = this.props;
    const { state } = navigation;
    // const { params } = state;
    // const iCard = this.props.iCard.toJS()
    const iUseM = this.props.iUse.toJS()

    const param = {
      'where': {
        ...user(iUseM.user),
        ...iUse(iUseM.objectId),
        $or: [
          { imgs: { $exists: true } },
          { recordText: { $exists: true } }
        ],
        state: { $ne: -1 }
      }
    }


    const isSelf = this.props.user.objectId === iUse.user

    const config = isSelf ? {
      noDataPrompt: '写一个日记吧~！',
      tipBtnText: '添加日记',
      tipTap: () => this.props.tipTap(this.props.iUse.toJS())
    } : {}
    return (
      <LCList
        ref={'list'}
        ListHeaderComponent={this._renderHeader}
        reqKey={listKey}
        style={{ flex: 1 }}
        sKey={listKey + iUseM.objectId}
        renderItem={this.renderRow.bind(this)}

        //dataMap={(data)=>{
        //   return {[OPENHISTORYLIST]:data.list}
        //}
        reqParam={param}
        {...config}
      />
    );
  }
}


