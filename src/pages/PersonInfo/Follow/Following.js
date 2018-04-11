/**
 * Created by lintong on 2018/4/10.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { FOLLOWRECORD, ICARD, IUSE } from '../../../redux/reqKeys'

import {
    StyleFolllow,
    StyleFollowText,
    StyleFollowDevide,
    StyledHeaderName,
} from '../PersonCenter/style'

import {
    StyleHeader,
    StyleHeaderInner,
    StyleHeaderInnerRight,
    StyledAvatar,
    StyledHeaderTop
} from './style'
import Icon from 'react-native-vector-icons/Ionicons'

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
            req(param, FRIENDNUM + userId)
        },
        loadfriendExist: () => {
            dispatch((dispatch, getState) => {
                const beFollowedUserId = props.navigation.state.params.user.objectId
                const state = getState()
                const userId = state.user.data.objectId

                const param = friendExist(userId, beFollowedUserId)
                req(param, FRIENDEXIST + beFollowedUserId)
            })
        },
        follow: (isExist, num) => {
            dispatch((dispatch, getState) => {
                const beFollowedUserId = props.navigation.state.params.user.objectId
                const state = getState()
                const userId = state.user.data.objectId

                if (isExist) {
                    const param = friendshipDelete(userId, beFollowedUserId)
                    req(param, FOLLOWING)
                    //取消关注，friendeExist 数据变更。
                    //friendNum 数据-1
                    dispatch(reqChangeData(FRIENDEXIST + beFollowedUserId,{ count: 0 }))
                    dispatch(reqChangeData(
                        FRIENDNUM + beFollowedUserId,
                        { followers_count: num - 1 }))

                } else {
                    const param = friendshipAdd(userId, beFollowedUserId)
                    req(param, FOLLOWING)
                    dispatch(reqChangeData(FRIENDEXIST + beFollowedUserId,{ count: 1 } ))
                    dispatch(reqChangeData(
                        FRIENDNUM + beFollowedUserId,
                        { followers_count: num - 1 }))

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
        const name = data.username !== data.mobilePhoneNumber ? data.username : '光芒'
        const avatar = data.avatar
        const avatarUrl = avatar && avatar.url
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
                                -{name}
                            </StyledHeaderName>
                        </StyledHeaderTop>
                        {this._renderFollow(
                            data,
                            followees_count,
                            followers_count)}
                    </StyleHeaderInner>
                    <StyledAvatar source={avatarSource}/>
                </StyleHeaderInnerRight>
                {!isSelf && (<HeaderBtn
                    load={load || this.props.followLoad}
                    title={isFollow ? "取消关注" : "关注"}
                    style={{
                        width: isFollow ? 100 : 60,
                        marginTop: 20,
                    }}
                    hitSlop={{ top: 5, left: 50, bottom: 5, right: 50 }}
                    onPress={() => {
                        this.props.follow(isFollow,followees_count)
                    }}/>)}
            </StyleHeader>
        );
    }

    _renderFollow = (data: Object,
                     followees_count: number,
                     followers_count: number) => {
        const { navigation } = this.props


        return (
            <StyleFolllow>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Followee', { userId: data.objectId });
                }}>
                    <StyleFollowText>
                        关注:{followees_count}
                    </StyleFollowText>
                </TouchableOpacity>
                <StyleFollowDevide/>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Follower', { userId: data.objectId });
                }}>
                    <StyleFollowText>
                        被关注：{followers_count}
                    </StyleFollowText>
                </TouchableOpacity>
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
        const days = iCard.period * (item.cycle ) + (item.time )
        return (
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                    const { navigation } = this.props;
                    const { state } = navigation;
                    const { params } = state;
                    const { user } = params
                    this.props.navigation.navigate('RecordDetail', {
                        data: item,
                        card: iCard,
                        user
                    })
                }}>
                <View style={styles.row}>
                    <View style={styles.subRow}>
                        <Icon style={styles.icon} name={"ios-walk"}
                              size={50}/>
                        <View style={styles.des}>
                            <Text style={styles.title}>{iCard.title}</Text>
                            <Text style={styles.time}>坚持了{days}天</Text>
                        </View>
                    </View>
                    <Text style={styles.time}>第{item.cycle + 1}组</Text>
                </View>
            </TouchableOpacity>
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
            },
            include: ICARD,
        }

        return (
            <LCList
                ListHeaderComponent={() => this._renderHeader(user)}
                style={{ flex: 1 }}
                reqKey={IUSE}
                sKey={FOLLOWRECORD + user.objectId}
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
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
    },
    subRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    des: {
        marginLeft: 15
    },
    title: {
        fontSize: 16,
    },
    time: {
        marginTop: 3,
        fontSize: 13,
    }

})