/**
 * Created by lintong on 2018/3/6.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  DeviceEventEmitter
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
import { IDO, IUSE } from '../../../redux/reqKeys'
import { recordDiary } from '../Do/Diary'
const listKey = IDO

import RecordRow from '../../Record/RecordRow'

import { update, } from '../../../redux/module/leancloud'
import { claerByID } from '../../../redux/actions/list'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import moment from 'moment'


import { shouldComponentUpdate } from 'react-immutable-render-mixin';


@connect(
  state => ({ user: state.user.data }),
  (dispatch, props) => ({
    stop: () => {
      Alert.alert(
        '放弃当前打卡?',
        '',
        [{ text: '取消' },
          {
            text: '确定', onPress: async () => {

            const { navigation } = props;
            const { state } = navigation;
            const { params } = state;
            const data = params.iUse
            const id = data.objectId
            const param = {
              statu: 'stop',
            }
            const res = await dispatch(update(id, param, IUSE))
            const entity = {
              ...param,
              ...res,
            }

            dispatch(addNormalizrEntity(IUSE, entity))
            dispatch(claerByID(IUSE, id))
            props.navigation.goBack()

          }
          }]
      )


    },
    tipTap: recordDiary
  })
)


export default class Agenda extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);


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

    const { navigation } = this.props;
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


    const isSelf = this.props.user.objectId === iUse.user

    return (
      <StyledInner
        colors={['#ffffff', '#f1f6f9', '#ebf0f3', '#ffffff']}>
        <AgendaScreen
          {...this.props}/>
        <StyledTitleView>
          <StyledTitleText>
            习惯统计
          </StyledTitleText>
        </StyledTitleView>
        <View style={{ height: 10 }}/>
        {this._renderRow('已完成周期', (time / iCard.period).toFixed(2) + '轮')}
        {this._renderRow('总打卡次数', time + '次')}
        {this._renderRow('加入天数', date + "天")}
        {this._renderRow('建立日期', cardCreatedAt)}
        <StyledTitleView>
          {!isSelf?<StyledTitleText>
            习惯日记
          </StyledTitleText>:
            <StyledHeaderBtn
            // load={false}
            backgroundColor={this.props.color}
            // disabled={false}
            hitSlop={{ top: 5, left: 10, bottom: 5, right: 10 }}
            onPress={()=>this.props.tipTap(this.props.iUse.toJS())}
            title={'添加日记'}/>}
        </StyledTitleView>
      </StyledInner>

    )
  }

  renderRow({ item, index }: Object) {

    // const img = item.imgs && item.imgs[0] || null

    return (
      <RecordRow style={[styles.row, { paddingVertical: 10 }]}
                 item={item}
                 navigation={this.props.navigation}/>
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
      }
    }


    const isSelf = this.props.user.objectId === iUse.user

    const config = isSelf?{
      noDataPrompt:'写一个日记吧~！',
      tipBtnText:'添加日记',
      tipTap:()=>this.props.tipTap(this.props.iUse.toJS())
    }:{}
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


const styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e4e4e4',
  },
})