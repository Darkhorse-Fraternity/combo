/**
 * Created by lintong on 2018/7/12.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
  DeviceEventEmitter
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import LCList from '../../../components/Base/LCList';
import { Privacy } from '../../../configure/enum'
import RecordRow from '../../Record/RecordRow'
import Header from '../../Record/RecordRow/Header'
import { IDO, REPORT } from '../../../redux/reqKeys'
import Button from '../../../components/Button'


const listKey = IDO


import {
  StyledHeader,
  StyledTitleView,
  StyledTitleText,
  StyledReportBtn,
  StyledReportText

} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import Toast from 'react-native-simple-toast'

import Info from '../../Course/Info'
import CourseRowList from '../../Course/Info/CourseRowList'

import {
  classCreatNewOne,
  existSearch
} from '../../../request/leanCloud';
import { req } from '../../../redux/actions/req'
import { selfUser, iCard } from '../../../request/LCModle'

@connect(
  (state, props) => ({
    user: state.user.data,

  }),
  (dispatch, props) => ({})
)


export default class Circle extends Component {
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

  refresh = () => {
    this.refs['list'].selector.props.loadData()
  }


  __renderHeader = () => {


    return (
      <StyledHeader>
        <StyledTitleView>
          <StyledTitleText>
            圈子日记
          </StyledTitleText>
        </StyledTitleView>
      </StyledHeader>


    )


  }

  renderRow({ item, index }: Object) {
    return (
      <View>
        <Header
          userId={item.user}
          onPress={(user) => {
            this.props.navigation.navigate('following',
              { user })
          }}/>
        <RecordRow style={styles.row} item={item} navigation={this.props.navigation}/>
      </View>
    )
  }


  render(): ReactElement<any> {

    const iCardId = this.props.iCard.get('objectId')

    const privacy = this.props.iCard.get('user') === this.props.user.objectId ?
      Privacy.openToCoach : Privacy.open
    const param = {
      'where': {
        ...iCard(iCardId),
        $or: [
          { imgs: { $exists: true } },
          { recordText: { $exists: true } }
        ],
      },
      include: 'user',
      privacy: { "$gte": privacy },//为0的时候只有自己可以查看
    }
    return (
      <LCList
        ref={'list'}
        ListHeaderComponent={this.__renderHeader}
        style={[this.props.style, styles.list]}
        reqKey={listKey}
        sKey={listKey + iCardId}
        renderItem={this.renderRow.bind(this)}
        //dataMap={(data)=>{
        //   return {[OPENHISTORYLIST]:data.list}
        //}}
        reqParam={param}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  text: {
    paddingVertical: 3,
    // paddingHorizontal: 5,
    fontSize: 16,
    color: 'rgb(50,50,50)'
  },
  row: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e4e4e4',
  },
  image: {
    width: '100%',
    height: 200,
  },
  top: {
    marginTop: 15,
    paddingVertical: 5,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  name: {
    marginLeft: 5,
    color: '#4e4e4e',
  },


})

