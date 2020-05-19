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
  DeviceEventEmitter,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import {
  IDO,
  REPORT,
  COURSE
} from '../../../redux/reqKeys'




import {
  StyledHeader,
  StyledTitleView,
  StyledTitleText,
  StyledReportBtn,
  StyledReportText

} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import Toast from 'react-native-simple-toast'
import ImagesViewModal from '../../../components/ZoomImage/ImagesViewModal'
import Info from '../../Course/Info'
// import CourseRowList from '../../Course/Info/CourseRowList'

import CourseRow from '../../Course/Info/CourseRow'


import {
  classCreatNewOne,
  existSearch
} from '../../../request/leanCloud';
import { req } from '../../../redux/actions/req'
import { selfUser, iCard } from '../../../request/LCModle'

@connect(
  (state, props) => ({
    user: state.user.data,
    course: state.normalizr.get(COURSE).get(props.iCard.get('course'))

  }),
  (dispatch, props) => ({
    report: () => {
      Alert.alert(
        '确定举报该卡片吗?',
        '举报该卡片',
        [{ text: '取消' }, {
          text: '确定', onPress: async () => {
            const where = {
              ...dispatch(selfUser()),
              ...iCard(props.iCard.get('objectId')),

            }

            const exParams = existSearch(REPORT, {
              where
            })
            const res = await dispatch(req(exParams))
            if (res.count > 0) {
              return Toast.show('已经举报了~!')
            }

            const params = classCreatNewOne(REPORT, where)
            await  dispatch(req(params))
            Toast.show('我们已受理!')
          }
        }]
      )
    }
  })
)


export default class Course extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      visible: false,
      index:0
    }
  }

  static propTypes = {};
  static defaultProps = {};




  __renderHeader = () => {


    const courseId = this.props.iCard.get('course')
    const user = this.props.iCard.get('user')
    const selfUser = this.props.user.objectId
    const isSelf = user === selfUser

    return (
      <StyledHeader
        colors={['#ffffff', '#f1f6f9', '#ebf0f3', '#ffffff']}>
        {courseId && <StyledReportBtn onPress={this.props.report}>
          <StyledReportText>
            举报
          </StyledReportText>
        </StyledReportBtn>}
        <Info {...this.props}
              iCardID={this.props.iCard.get('objectId')}
              isSelf={isSelf}
              showNoOpen
              courseId={courseId}/>
        {/*{courseId && <CourseRowList courseId={courseId}/>}*/}
      </StyledHeader>


    )


  }

  renderRow({ item, index }: Object) {
    return (
      <CourseRow
        onPress={()=>{
          this.setState({ visible: true,index:index })
        }}
        key={index}
        item ={item} />
    )
  }

  _keyExtractor = (item, index) => {
    const key = item.objectId || index;
    return key + '';
  }


  render(): ReactElement<any> {

    const { course } = this.props
    let ppt = course.get('ppt')
    ppt = ppt && ppt.toJS()
    // console.log('ppt:', ppt);

    const urlList = ppt && ppt.map(item => {
      return {
        url: item.img.url
      }
    }) || []

    return [
      <ImagesViewModal
        key={'ImagesViewModal'}
        visible={this.state.visible}
        index={this.state.index}
        closeCallBack={() => {
          this.setState({ visible: false,index:0 })
        }}
        imageUrls={ [...urlList]}/>,
      <FlatList
        key={'list'}
        data={ppt}
        ListHeaderComponent={this.__renderHeader}
        style={[this.props.style, styles.list]}
        renderItem={this.renderRow.bind(this)}
        keyExtractor={this._keyExtractor}
      />
    ];
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },


})

