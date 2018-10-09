/**
 * Created by lintong on 2017/9/26.
 * @flow
 */
'use strict';


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  TouchableNativeFeedback
} from 'react-native'
import { ICARD } from '../../redux/reqKeys'

import { selfUser } from '../../request/LCModle'
import { connect } from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';
import Button from '../../components/Button'
import CardRow from '../NewCard/CardRow'

const listKey = ICARD


import {
  StyledHeader,
  StyledHeaderTitle
} from './style'

@connect(
  state => ({
    data: state.normalizr.get(listKey)
  }),
  dispatch => ({})
)

export default class Publish extends Component {
  constructor(props: Object) {
    super(props);

  }

  static propTypes = {};

  static defaultProps = {};
  static navigationOptions = props => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    return {
      // title: '我的发布',
    }
  };

  shouldComponentUpdate(nextProps: Object) {
    return !immutable.is(this.props, nextProps)
  }

  componentDidMount() {
  }


  _renderHeader = () => {
    return (
      <StyledHeader>
        <StyledHeaderTitle>
          共享卡片管理
        </StyledHeaderTitle>
      </StyledHeader>
    )
  }


  renderRow({ item, index }: Object) {


    return (
      <CardRow
        title={item.title}
        des={`人数:${item.useNum}`}
        img={item.img}
        onPress={() => {
          this.props.navigation.navigate('publishDetail',
            { iCardID: item.objectId, data: item })
        }}/>
    )
  }


  render() {

    //state 不为-1的时候


    const {dispatch} = this.props.navigation
    const param = {
      'where': {
        ...dispatch(selfUser()),
        $or: [
          { state: 1, },
          { useNum: { "$gt": 1 } }
        ],
      }
    }
    return (
      <LCList
        ListHeaderComponent={this._renderHeader}
        style={[this.props.style, styles.list]}
        reqKey={listKey}
        numColumns={2}
        columnWrapperStyle={{ padding: 5 }}
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
  item: {
    width: width / 2 - 15,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    // elevation: 10,
  },
  list: {
    flex: 1,
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    lineHeight: 30,
  },
  time: {
    marginTop: 30,
    fontSize: 15,
    // textAlign:'right',
    alignSelf: 'flex-end',
    color: 'rgb(150,150,150)',


  },
  period: {
    marginTop: 5,

  },


  itemImage: {
    // backgroundColor: 'white',
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
})




