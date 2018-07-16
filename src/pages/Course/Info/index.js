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
    StyledFollowBtnText
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import {
    COURSE,
    USER,
    FRIENDEXIST,
    FOLLOWING,
    FRIENDNUM
} from '../../../redux/reqKeys'
import { findByID } from '../../../redux/module/leancloud'
import Button from '../../../components/Button'
import { req, reqChangeData } from '../../../redux/actions/req'
import {
    friendExist,
    friendshipAdd,
    friendshipDelete,
    friendNum
} from '../../../request/leanCloud'

@connect(
    (state, props) => {
        const users = state.normalizr.get(USER)
        const course = state.normalizr.get(COURSE).get(props.courseId)

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
        dataLoad: () => {
            props.courseId && findByID(COURSE, props.courseId)
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
                req(param, FRIENDEXIST + beFollowedUserId)
            })
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
                    await req(param, FOLLOWING)
                    //取消关注，friendeExist 数据变更。
                    //friendNum 数据-1
                    dispatch(reqChangeData(FRIENDEXIST + beFollowedUserId, { count: 0 }))

                } else {

                    const param = friendshipAdd(userId, beFollowedUserId)
                    await req(param, FOLLOWING)
                    dispatch(reqChangeData(FRIENDEXIST + beFollowedUserId, { count: 1 }))

                }

                const param = friendNum(userId)
                req(param, FRIENDNUM + userId)



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

    componentDidMount() {

        !this.props.friendeExist && this.props.loadfriendExist()

        this.props.course && !this.props.course.get('title')
        && this.props.dataLoad()


        // console.log('this.props.friendeExist:', this.props.friendeExist);


    }

    __renderFocusOn = () => {

        let {  user, selfUser } = this.props
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
            <View style={{height:45}}>
                {!myLoad && !isSelf && <Button onPress={() => {
                    this.props.follow(isFollow)
                }}>
                    <StyledFollowBtnText>
                        {isFollow ? '已关注' : '关注'}
                    </StyledFollowBtnText>
                </Button>}
                {myLoad && <StyledIndicator/>}
            </View>
        )
    }

    render(): ReactElement<any> {

        let { load, user, course } = this.props
        course = course && course.toJS()
        user = user && user.toJS()



        // console.log('isSelf:', isSelf);

        return (
            <StyledContent>
                {load &&
                <StyledHeaderContent style={{ justifyContent: 'center' }}>
                    <StyledIndicator/>
                </StyledHeaderContent>
                }

                {!load && !course &&
                <StyledHeaderContent style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <StyledHeaderTipText>
                        还没有开启
                    </StyledHeaderTipText>
                </StyledHeaderContent>}


                {!load && course && course.title && <StyledHeaderContent>
                    <StyledHeaderCover>
                        <StyledHeaderImage source={{ uri: course.cover.url }}/>
                    </StyledHeaderCover>
                    <StyledHeaderTitle>
                        {course.title}
                    </StyledHeaderTitle>
                    <StyledHeaderInner>
                        <StyledHeaderInnerLeft>
                            <StyledNickName>
                                作者: {user.nickname}
                            </StyledNickName>
                            <StyledSubTitle>
                                {course.subtitle}
                            </StyledSubTitle>
                            <StyledReadNum>
                                阅读人数：100
                            </StyledReadNum>
                        </StyledHeaderInnerLeft>
                        <StyledHeaderInnerRight>
                            <Button onPress={() => {
                                this.props.navigation.navigate('Following', { user: user })

                            }}>
                                <StyledAvatar source={{ uri: user.avatar.url }}/>
                            </Button>
                            {this.__renderFocusOn()}
                        </StyledHeaderInnerRight>
                    </StyledHeaderInner>
                </StyledHeaderContent>}


            </StyledContent>
        );
    }
}


