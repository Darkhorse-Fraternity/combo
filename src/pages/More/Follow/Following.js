/**
 * Created by lintong on 2018/4/10.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import Button from '../../../components/Button'
import PropTypes from 'prop-types';
import { FOLLOWRECORD, ICARD, IUSE } from '../../../redux/reqKeys'
import ZoomImage from '../../../components/ZoomImage/ZoomImage'
import { Privacy } from '../../../configure/enum'
import {
    StyleFolllow,
    StyleFollowText,
    StyleFollowDevide,
} from '../style'

import {
    StyleHeader,
    StyleHeaderInner,
    StyleHeaderInnerRight,
    StyledAvatar,
    StyledHeaderTop,
    StyledHeaderBottom,
    StyledHeaderName
} from './style'
import Icon from 'react-native-vector-icons/Ionicons'
import CardRow from '../../NewCard/CardRow'


import { user as userModel } from '../../../request/LCModle'

import HeaderBtn from '../../../components/Button/HeaderBtn'
import LCList from '../../../components/Base/LCList';

import { shouldComponentUpdate } from 'react-immutable-render-mixin';

import {
    friendExist,
    friendshipAdd,
    friendshipDelete,
    friendNum,
} from '../../../request/leanCloud'

import { req, reqChangeData } from '../../../redux/actions/req'
import {
    FRIENDNUM,
    FRIENDEXIST,
    FOLLOWING
} from '../../../redux/reqKeys'

@connect(
    (state, props) => ({
        data: state.list.get(FOLLOWRECORD + props.navigation.state.params.user.objectId),
        iCard: state.normalizr.get(ICARD),
        user: state.user.data,
        friendNum: state.req.get(FRIENDNUM + props.navigation.state.params.user.objectId),
        friendeExist: state.req.get(FRIENDEXIST + props.navigation.state.params.user.objectId),
        followLoad: state.req.get(FOLLOWING).get('load')
    }),
    (dispatch, props) => ({
        loadFriendNum: () => {
            const userId = props.navigation.state.params.user.objectId
            const param = friendNum(userId)
            // console.log('test000:', userId);
          dispatch(req(param, FRIENDNUM + userId))
        },
        loadfriendExist: () => {
            dispatch((dispatch, getState) => {
                const beFollowedUserId = props.navigation.state.params.user.objectId
                const state = getState()
                const userId = state.user.data.objectId

                const param = friendExist(userId, beFollowedUserId)
              dispatch(req(param, FRIENDEXIST + beFollowedUserId))
            })
        },
        follow: (isExist, num) => {
            dispatch((dispatch, getState) => {
                const beFollowedUserId = props.navigation.state.params.user.objectId
                const state = getState()
                const userId = state.user.data.objectId

                let selfNum = state.req.get(FRIENDNUM + userId)
                if (selfNum) {
                    selfNum = selfNum.get('data').get('followees_count')
                }
                // const selfNum = state.req.get(FRIENDNUM + userId).get('data').get('followees_count')

                if (isExist) {
                    const param = friendshipDelete(userId, beFollowedUserId)
                     dispatch(req(param, FOLLOWING))
                    //取消关注，friendeExist 数据变更。
                    //friendNum 数据-1
                    dispatch(reqChangeData(FRIENDEXIST + beFollowedUserId, { count: 0 }))
                    dispatch(reqChangeData(
                        FRIENDNUM + beFollowedUserId,
                        { followers_count: num - 1 }))
                    //自己
                    selfNum > 0 && dispatch(reqChangeData(
                        FRIENDNUM + userId,
                        { followees_count: selfNum - 1 }))

                } else {
                    const param = friendshipAdd(userId, beFollowedUserId)
                    dispatch(req(param, FOLLOWING))
                    dispatch(reqChangeData(FRIENDEXIST + beFollowedUserId, { count: 1 }))
                    dispatch(reqChangeData(
                        FRIENDNUM + beFollowedUserId,
                        { followers_count: num + 1 }))
                    //自己
                    selfNum !== undefined && dispatch(reqChangeData(
                        FRIENDNUM + userId,
                        { followees_count: selfNum + 1 }))

                }


            })
        }
    })
)


export default class Following extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '',
        }
    };

    componentDidMount() {
        this.props.loadFriendNum()
        this.props.loadfriendExist()
    }

    _renderHeader(data: Object) {
        // let {grade_str,connect_phone} = data;
        // console.log('test111:',data.avatar.url)
        const name = data.nickname || '路人甲'
        const avatar = data.avatar
        const avatarUrl = avatar ? avatar.url : data.headimgurl
        const avatarSource = avatarUrl ? { uri: avatarUrl } :
            require('../../../../source/img/my/icon-60.png')
        const isSelf = this.props.user.objectId === data.objectId

        const { friendNum } = this.props
        const friendeExist = this.props.friendeExist && this.props.friendeExist.toJS()
        let isFollow = true
        let load = true
        if (friendeExist) {
            isFollow = friendeExist.data && friendeExist.data.count !== 0
            load = friendeExist.load
        }

        let followers_count = 0, followees_count = 0
        const friendNumData = friendNum && friendNum.toJS()

        if (friendNumData && friendNumData.data) {

            followers_count = friendNumData.data.followers_count
            followees_count = friendNumData.data.followees_count
        }


        return (
            <StyleHeader>
                <StyleHeaderInnerRight>
                    <StyleHeaderInner>
                        <StyledHeaderTop>
                            <StyledHeaderName>
                                {name}
                            </StyledHeaderName>
                        </StyledHeaderTop>
                        {this._renderFollow(
                            data,
                            followees_count,
                            followers_count)}
                        {!isSelf && (<HeaderBtn
                            load={load || this.props.followLoad}
                            title={isFollow ? "取消关注" : "关注"}
                            style={{
                                width: isFollow ? 100 : 80,
                                marginTop: 20,
                            }}
                            hitSlop={{ top: 5, left: 50, bottom: 5, right: 50 }}
                            onPress={() => {
                                this.props.follow(isFollow, followers_count)
                            }}/>)}
                    </StyleHeaderInner>
                    {!avatarUrl ? <StyledAvatar source={avatarSource}/> :
                        <ZoomImage
                            height={80}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                            }} imageUrls={[{ url: avatarUrl }]}/>}

                </StyleHeaderInnerRight>
                <StyledHeaderBottom>

                </StyledHeaderBottom>
            </StyleHeader>
        );
    }

    _renderFollow = (data: Object,
                     followees_count: number,
                     followers_count: number) => {
        const { navigation } = this.props


        return (
            <StyleFolllow>
                <Button innerView onPress={() => {
                    navigation.navigate('followee', { userId: data.objectId });
                }}>
                    <StyleFollowText>
                        关注: {followees_count}
                    </StyleFollowText>
                </Button>
                <StyleFollowDevide/>
                <Button innerView onPress={() => {
                    navigation.navigate('follower', { userId: data.objectId });
                }}>
                    <StyleFollowText>
                        被关注：{followers_count}
                    </StyleFollowText>
                </Button>
            </StyleFolllow>
        )
    }


    renderRow({ item, index }: Object) {
        const iCardId = item[ICARD]
        const card = this.props.iCard.get(iCardId)
        const iCard = card && card.toJS()

        if (!iCard) {
            console.log('iCardId:', iCardId, iCard);
            return <View/>
        }
        const days = item.time
        const cycle = parseInt(item.time / iCard.period)

        const { img } = iCard
        const source = img ? { uri: img.url } :
            require('../../../../source/img/my/icon-60.png')


        return (
            <CardRow
                title={iCard.title}
                des={`已打卡${days}次`}
                img={img}
                onPress={() => {
                    this.props.navigation.navigate('recordDetail', {
                        iUseId: item.objectId,
                        iCardId: iCard.objectId,
                    })
                }}/>
        )

    }

    render(): ReactElement<any> {
        const { navigation } = this.props;
        const { state } = navigation;
        const { params } = state;
        const { user } = params

        const param = {
            where: {
                ...userModel(user.objectId),
                statu: { "$ne": 'del' },
                privacy: Privacy.open
            },
            include: ICARD,
        }

        return (
            <LCList
                ListHeaderComponent={() => this._renderHeader(user)}
                style={{ flex: 1 }}
                reqKey={IUSE}
                sKey={FOLLOWRECORD + user.objectId}
                numColumns={2}
                columnWrapperStyle={{ padding: 10 }}
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
    row: {
        paddingHorizontal: 10,
        paddingVertical: 30,
    },
    subRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    des: {
        marginLeft: 15
    },


})