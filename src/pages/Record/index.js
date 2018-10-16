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
  Alert,
  Image,
  Dimensions
} from 'react-native'

import { connect } from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';
import { IRECORD, ICARD, IUSE } from '../../redux/reqKeys'
import { selfUser } from '../../request/LCModle'
import Icon from 'react-native-vector-icons/Ionicons'
import { update, search } from '../../redux/module/leancloud'
import { claerByID } from '../../redux/actions/list'
import { addNormalizrEntity } from '../../redux/module/normalizr'

import CardRow from '../Habit/Cell'
import {
  StyledHeader,
  StyledHeaderTitle
} from './style'


@connect(
  state => ({
    data: state.list.get(IRECORD),
    iCard: state.normalizr.get(ICARD),
    user: state.user.data
  }),
  dispatch => ({

    delete: async (objectId, callBack) => {
      // await remove(objectId,IUSE)
      // 做伪删除

      const param = {
        statu: 'del'
      }
      const res = await dispatch(update(objectId, param, IUSE))
      const entity = {
        ...param,
        ...res
      }
      dispatch(addNormalizrEntity(IUSE, entity))

      dispatch(claerByID(IRECORD, objectId))
      callBack && callBack()

      //刷新首页的数据
      dispatch(search(false, {
        where: {
          ...dispatch(selfUser()),
          statu: 'start'
        },
        order: 'doneDate'


      }, IUSE))
    },
  })
)

export default class Record extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
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




  renderRow({ item, index }: Object) {
    // md-refresh

    const iCardId = item[ICARD]
    const card = this.props.iCard.get(iCardId)
    const iCard = card && card.toJS()
    // console.log('test:', item);

    if (!iCard) {
      console.log('iCardId:', iCardId, iCard);
      return <View/>
    }
    const days = item.time
    // const reflesh = item.time === iCard.period || item.statu === 'stop'
    // const cycle = parseInt(item.time / iCard.period)
    const { img } = iCard


    return (


      <CardRow
        data={item}
        iCard={iCard}
        onPress={() => {
          this.props.navigation.navigate('card', {
            iUseId: item.objectId,
            iCardId: iCard.objectId
          })
        }}/>
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




