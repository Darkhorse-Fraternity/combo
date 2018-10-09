/**
 * Created by lintong on 2018/7/13.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import {
  StyledContent,
  StyledHeaderContent,
  StyledIndicator,
  StyledHeaderCover,
  StyledHeaderImage,
  StyledHeaderTipText,
  StyledHeaderTitle,
  StyledHeaderInner,
  StyledHeaderInnerLeft,
  StyledHeaderInnerRight,
  StyledNickName,
  StyledSubTitle,
  StyledReadNum,
  StyledAvatar,
  StyledFollowBtnText,
  StyledHeaderConverTip,
  StyledTriangle,
  StyledReportBtn,
  StyledReportText
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import {
  COURSE,
  USER,
  FRIENDEXIST,
  FOLLOWING,
  FRIENDNUM
} from '../../../redux/reqKeys'
import {  find } from '../../../redux/module/leancloud'
import Button from '../../../components/Button'
import { req, reqChangeData,get } from '../../../redux/actions/req'
import { courseReadNumAdd } from '../../../request/leanCloud'
import {
  friendExist,
  friendshipAdd,
  friendshipDelete,
  friendNum
} from '../../../request/leanCloud'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import Toast from 'react-native-simple-toast'
import { classSearch } from '../../../request/leanCloud'
import { list, entitys } from '../../../redux/scemes'

const hasReadmap = {}

@connect(
  (state, props) => {
    const users = state.normalizr.get(USER)
    const course = state.normalizr.get(COURSE).get(props.courseId)

    if (!props.courseId) {
      return {}
    }

    // console.log('course:', course.toJS() );
    // console.log('user:', course && users.get(course.get(USER)));

    return {
      load: state.req.get(COURSE).get('load'),
      course,
      user: course && users.get(course.get(USER)),
      selfUser: state.user.data,
      friendeExist: state.req.get(FRIENDEXIST + course.get(USER)),
      followLoad: state.req.get(FOLLOWING).get('load')
    }
  },
  (dispatch, props) => ({
    dataLoad: async () => {
      if (props.courseId) {
        const params = {
          include: 'user',
          where: {
            objectId: props.courseId
          },
        }
        await dispatch(find(COURSE, params, { sceme: list(entitys[COURSE]) }))
      }

    },
    loadfriendExist: () => {
      dispatch((dispatch, getState) => {

        const state = getState()
        const course = state.normalizr.get(COURSE).get(props.courseId)
        const beFollowedUserId = course.get(USER)

        if (!beFollowedUserId) {
          return
        }

        const userId = state.user.data.objectId

        const param = friendExist(userId, beFollowedUserId)
        dispatch(req(param, FRIENDEXIST + beFollowedUserId))
      })
    },
    increaseReadNum: async (num, objectId) => {

      const hasReadmapKey = props.courseId + objectId
      if (props.courseId && !hasReadmap[hasReadmapKey] && num !== undefined) {
        await get(courseReadNumAdd(props.courseId))
        const entity = {
          readNum: ++num,
          objectId,
        }
        num < 1000 && dispatch(addNormalizrEntity(COURSE, entity))
        hasReadmap[hasReadmapKey] = true
      }

    },
    follow: (isExist) => {
      dispatch(async (dispatch, getState) => {
        const state = getState()
        const course = state.normalizr.get(COURSE).get(props.courseId)
        const beFollowedUserId = course.get(USER)

        if (!beFollowedUserId) {
          return
        }

        const userId = state.user.data.objectId
        // const selfNum = state.req.get(FRIENDNUM + userId).get('data').get('followees_count')
        if (isExist) {
          const param = friendshipDelete(userId, beFollowedUserId)
          await dispatch(req(param, FOLLOWING))
          //取消关注，friendeExist 数据变更。
          //friendNum 数据-1
          dispatch(reqChangeData(FRIENDEXIST + beFollowedUserId, { count: 0 }))

        } else {

          const param = friendshipAdd(userId, beFollowedUserId)
          await dispatch(req(param, FOLLOWING))
          dispatch(reqChangeData(FRIENDEXIST + beFollowedUserId, { count: 1 }))

        }

        const param = friendNum(userId)
        dispatch(req(param, FRIENDNUM + userId))

      })
    }
  })
)


export default class Info extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

  }

  static propTypes = {};
  static defaultProps = {};


  load = async () => {
    let { user, selfUser } = this.props

    const isSelf = user && user.get('objectId') === selfUser.objectId
    const { course } = this.props
    const flag = course && !course.get('title')
    flag && await this.props.dataLoad()
    course && course.get('title') &&
    this.props.increaseReadNum(course.get('readNum'),
      this.props.selfUser.objectId)
    if (!isSelf) {
      !this.props.friendeExist && await this.props.loadfriendExist()
    }


  }

  componentDidMount() {

    if (this.props.courseId) {
      this.load()
    }


    // console.log('this.props.friendeExist:', this.props.friendeExist);


  }

  __renderFocusOn = () => {

    let { user, selfUser } = this.props
    user = user && user.toJS()


    const friendeExist = this.props.friendeExist && this.props.friendeExist.toJS()


    const isSelf = user && user.objectId === selfUser.objectId
    let isFollow = false
    let friendeExistLoad = false
    if (friendeExist) {
      isFollow = friendeExist.data && friendeExist.data.count !== 0
      friendeExistLoad = friendeExist.load
    }

    const myLoad = friendeExistLoad || this.props.followLoad


    return (
      !isSelf && <View style={{ height: 45 }}>
        {!myLoad && !isSelf && <Button onPress={() => {
          this.props.follow(isFollow)
        }}>
          <StyledFollowBtnText>
            {isFollow ? '已关注' : '关注'}
          </StyledFollowBtnText>
        </Button>}
        {myLoad && !isSelf && <StyledIndicator/>}
      </View>
    )
  }


  render(): ReactElement<any> {

    let {
      load,
      user,
      course,
      isSelf,
      navigation,
      iCardID,
      showNoOpen
    } = this.props

    course = course && course.toJS()


    if (load) {
      return (
        <StyledContent>
          {load &&
          <StyledHeaderContent style={{ justifyContent: 'center' }}>

            <StyledIndicator/>

          </StyledHeaderContent>}
        </StyledContent>
      )

    }


    if (!this.props.courseId || !course || !course.title) {
      if (!showNoOpen) {
        return null
      }
      return (
        <StyledContent>

          <StyledHeaderContent style={{ justifyContent: 'center', alignItems: 'center' }}>
            <StyledHeaderTipText>
              课程还没有开启
            </StyledHeaderTipText>
            {isSelf && <StyledReportBtn onPress={() => {
              navigation.navigate('courseRelease', { iCardID })
            }}>
              <StyledReportText>
                点击开启
              </StyledReportText>
            </StyledReportBtn>}
          </StyledHeaderContent>
        </StyledContent>
      )
    }

    user = user && user.toJS() || {}


    const readNum = course.readNum < 1000 ? course.readNum : (course.readNum / 1000).toFixed(1) + 'k'

    // console.log('course:', course);
    const { avatar, headimgurl, } = user
    const avatarUrl = avatar ? avatar.url : headimgurl
    const avatarSource = avatarUrl ? { uri: avatarUrl } :
      require('../../../../source/img/my/icon-60.png')

    return (
      <StyledContent>
        <StyledHeaderContent>
          <StyledHeaderCover
            disabled={true}
            onPress={() => {
              Toast.show('设计中~')
            }}>
            {/*<StyledHeaderConverTip>*/}
            {/*<StyledTriangle/>*/}
            {/*</StyledHeaderConverTip>*/}
            {!!course.cover && <StyledHeaderImage
              width={200}
              source={{ uri: course.cover.url }}/>}
          </StyledHeaderCover>
          <StyledHeaderTitle>
            {course.title}
          </StyledHeaderTitle>
          <StyledHeaderInner>
            <StyledHeaderInnerLeft>
              {!!course.subtitle &&course.subtitle.length >0 &&
              <StyledSubTitle>
                {course.subtitle}
              </StyledSubTitle>}
              <StyledNickName>
                作者: {user.nickname}
              </StyledNickName>

              <StyledReadNum>
                阅读数：{readNum}
              </StyledReadNum>
            </StyledHeaderInnerLeft>
            <StyledHeaderInnerRight>
              <Button onPress={() => {
                this.props.navigation.navigate('following', { user: user })
              }}>
                <StyledAvatar source={avatarSource}/>
              </Button>
              {this.__renderFocusOn()}
            </StyledHeaderInnerRight>
          </StyledHeaderInner>
        </StyledHeaderContent>


      </StyledContent>
    );
  }
}


