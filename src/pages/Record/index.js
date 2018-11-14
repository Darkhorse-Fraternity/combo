/**
 * Created by lintong on 2017/7/14.
 * @flow
 */

'use strict';


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Alert
} from 'react-native'

import { connect } from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';
import { IRECORD, ICARD, IUSE } from '../../redux/reqKeys'
import { selfUser } from '../../request/LCModle'
import { update } from '../../redux/module/leancloud'

import CardRow from '../Habit/Cell'
import {
  StyledHeader,
  StyledHeaderTitle,
  StyledIcon,
  StyledDeleteBtn,
  StyledDeleteBtnText
} from './style'

import Swipeout from 'react-native-swipeout'

import { claerByID } from '../../redux/actions/list'
import { addNormalizrEntity } from '../../redux/module/normalizr'
import { addListNormalizrEntity } from '../../redux/actions/list'
import { classUpdate } from '../../request/leanCloud'
import { req } from '../../redux/actions/req'
import * as Animatable from 'react-native-animatable';

const Archive = IUSE + "archive"


@connect(
  state => ({
    data: state.list.get(IRECORD),
    iCard: state.normalizr.get(ICARD),
    user: state.user.data,
  }),
  dispatch => ({
    refresh: async (data, handleView) => {
      const id = data.objectId
      // const card = props.navigation.state.params.iCard

      // const isDone = data.time % card.period === 0

      const param = {
        // time: isDone ? 0 : data.time,
        statu: 'start',
        // cycle: isDone ? data.cycle + 1 : data.cycle,
      }


      const lParams = classUpdate(IUSE, id, param)
      const res = await dispatch(req(lParams, Archive))
      const entity = {
        ...param,
        ...res,
      }
       handleView && await handleView.fadeOutLeft(1000)
      dispatch(addListNormalizrEntity(IUSE, entity))
      await dispatch(claerByID(IRECORD, id))
       handleView && await handleView.fadeIn(300)
    },
    delete: async (objectId, handleView) => {
      // await remove(objectId,IUSE)
      // 做伪删除
      Alert.alert(
        '确定删除?',
        '删除后不可恢复~！',
        [{ text: '取消' }, {
          text: '确定', onPress: async () => {
            const param = {
              statu: 'del'
            }
            const res = await dispatch(update(objectId, param, IUSE))
            const entity = {
              ...param,
              ...res
            }
             handleView && await handleView.fadeOutLeft(1000)
            dispatch(addNormalizrEntity(IUSE, entity))
            await dispatch(claerByID(IUSE, objectId))
            await dispatch(claerByID(IRECORD, objectId))
             handleView && await handleView.fadeIn(300)
            return res;
          }
        }]
      )
    },
  })
)

export default class Record extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      openIndex: -1,
      scrollEnabled: true
    }
  }

  static propTypes = {};

  static defaultProps = {};
  static navigationOptions = props => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    return {
      // title: '我的记录',
    }
  };

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
  }


  _renderHeader = () => {
    return (
      <StyledHeader>
        <StyledHeaderTitle>
          已归档卡片
        </StyledHeaderTitle>
      </StyledHeader>
    )
  }

  _renderSwipeOutDeleteBtn = (title, color, name) => {
    return (
      <StyledDeleteBtn>
        <StyledIcon size={30} color={color} name={name}/>
        <StyledDeleteBtnText color={color}>
          {title}
        </StyledDeleteBtnText>
      </StyledDeleteBtn>
    )
  }

  handleViewRef = {}
  renderRow = ({ item, index }: Object) => {
    // md-refresh
    const self = this
    const iCardId = item[ICARD]
    const card = this.props.iCard.get(iCardId)
    const iCard = card && card.toJS()
    // console.log('test:', item);

    if (!iCard) {
      console.log('iCardId:', iCardId, iCard);
      return <View/>
    }
    // const days = item.time
    // const reflesh = item.time === iCard.period || item.statu === 'stop'
    // const cycle = parseInt(item.time / iCard.period)
    const { user } = iCard
    const isSelf = user === this.props.user.objectId

    return (
      <Animatable.View
        useNativeDriver
        ref={res => this.handleViewRef['habit' + index] = res}>
        <Swipeout
          backgroundColor='white'
          close={this.state.openIndex !== index}
          onOpen={() => {
            this.setState({ openIndex: index })
          }}
          right={[isSelf ? {
            type: 'secondary',
            onPress: () => {
              this.props.navigation.navigate('cardConfig', { iCardId: iCardId })
              this.setState({ openIndex: -1 })
              // this._deleteRow(item)
            },
            component: this._renderSwipeOutDeleteBtn('设置', '#388e3c', 'settings'),
            backgroundColor: '#e0f2f1'
          } : {
            type: 'secondary',
            onPress: () => {
              this.props.navigation.navigate('cardSetting',
                { iCardId, iUseId: item.objectId })
              this.setState({ openIndex: -1 })
              // this._deleteRow(item)
            },
            component: this._renderSwipeOutDeleteBtn('更多', '#388e3c', 'more-vert'),
            backgroundColor: '#e0f2f1'
          }, {
            type: 'delete',
            onPress: () => {
              // this._deleteRow(item)
              const handleView = self.handleViewRef['habit' + index]
              this.props.delete(item.objectId, handleView)

              this.setState({ openIndex: -1 })
            },
            component: this._renderSwipeOutDeleteBtn('删除', '#f44336', 'delete'),
            backgroundColor: '#ffebee'
          }, {
            type: 'primary',
            onPress: () => {
              // this._deleteRow(item)
              const handleView = self.handleViewRef['habit' + index]
              this.props.refresh(item, handleView)
              this.setState({ openIndex: -1 })
            },
            component: this._renderSwipeOutDeleteBtn('恢复', '#009afb', 'refresh'),
            backgroundColor: '#e3f2fd'
          }]}
        >

          <CardRow
            data={item}
            iCard={iCard}
            onPress={() => {
              this.props.navigation.navigate('card', {
                iUseId: item.objectId,
                iCardId: iCard.objectId
              })
            }}/>
        </Swipeout>
      </Animatable.View>
    )
  }

  render() {

    const { dispatch, state } = this.props.navigation
    const { params } = state
    const statu = params ? params.statu : { "$ne": 'del' }
    const param = {
      where: {
        ...dispatch(selfUser()),
        statu,
      },
      include: ICARD,
    }
    return (
      <LCList
        ListHeaderComponent={this._renderHeader}
        style={[this.props.style, styles.list]}
        reqKey={IUSE}
        sKey={IRECORD}
        renderItem={this.renderRow.bind(this)}
        //dataMap={(data)=>{
        //   return {[OPENHISTORYLIST]:data.list}
        //}}
        reqParam={param}
      />
    );
  }
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  wrap: {
    flex: 1,

  },
  list: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden',
  },

  text: {
    marginLeft: 5,
    fontSize: 16,
    color: 'rgb(150,150,150)'
  },
  subText: {
    // marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: 'rgb(200,200,200)'
  },
  date: {
    fontSize: 14,
    color: 'rgb(100,100,100)'
  },

  subRow: {
    flexDirection: 'row',
    // backgroundColor:'red',
    // alignItems: 'center'
  },
  des: {
    // marginLeft: 10

  },
  card: {
    // marginTop:10,
    // margin: 5,
    backgroundColor: "#f9f9f9",
    // backgroundColor:'red',
    // borderRadius: 5,
    width: width / 2 - 15,
    marginHorizontal: 5,
    borderRadius: 10,

  },
  row: {
    // backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 30,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',

  },

  img: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  arrowView: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderRightWidth: StyleSheet.hairlineWidth * 2,
    borderColor: '#8c8c85',
    transform: [{ rotate: '315deg' }],
    marginRight: 5,
    width: 10,
    height: 10,
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    fontSize: 13,
    marginRight: 5
  }

})




