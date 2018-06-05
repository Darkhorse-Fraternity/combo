/* @flow */
'use strict';

import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    RefreshControl,
} from 'react-native'
import Button from '../../../components/Button'

import { connect } from 'react-redux'
import {
    StyledContent,
    StyleFolllow,
    StyleFollowText,
    StyleFollowDevide,
    StyleHeader,
    StyledHeaderTop,
    StyledHeaderName,
    StyledHeaderSubText
} from './style'
import { req, } from '../../../redux/actions/req'
import {
    FRIENDNUM,
} from '../../../redux/reqKeys'
import {
    friendNum,
} from '../../../request/leanCloud'

@connect(
    state => ({
        avatar: state.util.get('loadAvatar').toObject(),
        user: state.user,
        friendNum: state.req.get(FRIENDNUM + state.user.data.objectId),
    }),
    dispatch => ({
        loadFriendNum: () => {
            dispatch((dispatch,getState)=>{
                const userId = getState().user.data.objectId
                const param = friendNum(userId)
                req(param, FRIENDNUM + userId)
            })

        },
    })
)

export default class PersonCenter extends Component {


    constructor(props: Object) {
        super(props);

    }

    static navigationOptions = props => {
        const { navigation } = props;
        const { state } = navigation;
        const { params } = state;
        const isLogin = params ? params.isLogin : false
        // console.log('test:', params,localLoad);
        return {
            // header: isLogin ? undefined : ()=>(<View style={{height:64,backgroundColor:'#F5FCFF'}}/>),
            gesturesEnabled: false,
            header: null

        }
    };

    componentDidMount() {
        this.props.loadFriendNum()
    }

    _renderHeadRow(data: Object, onPress: Function = () => {
    }) {
        // let {grade_str,connect_phone} = data;
        // console.log('test111:',data.avatar.url)
        const name = data.nickname  ||  '陌生人'
        const tip =  '点击查看或编辑个人资料'
        return (
            <StyleHeader>
                <StyledHeaderTop onPress={onPress}>
                        <StyledHeaderName >
                            -{name}
                        </StyledHeaderName>
                        <StyledHeaderSubText >{tip}</StyledHeaderSubText>
                </StyledHeaderTop>
                {this._renderFollow()}
            </StyleHeader>
        );
    }
    _renderFollow = () => {

        const { friendNum,navigation } = this.props
        let followers_count = 0, followees_count = 0
        const friendNumData = friendNum && friendNum.toJS()

        if (friendNumData && friendNumData.data) {

            followers_count = friendNumData.data.followers_count
            followees_count = friendNumData.data.followees_count
        }

        return (
            <StyleFolllow>
                <Button
                    innerView
                    onPress={()=>{
                    navigation.navigate('Followee',{userId:this.props.user.data.objectId});
                }}>
                    <StyleFollowText>
                        关注: {followees_count}
                    </StyleFollowText>
                </Button>
                <StyleFollowDevide/>
                <Button innerView onPress={()=>{
                    navigation.navigate('Follower',{userId:this.props.user.data.objectId});
                }}>
                    <StyleFollowText>
                        被关注：{followers_count}
                    </StyleFollowText>
                </Button>
            </StyleFolllow>
        )
    }



    __renderLoginRow() {
        const navigation = this.props.navigation
        return (
            <View>
                {this._renderRow('我的记录', styles.group, true, () => {
                    navigation.navigate('Record');
                })}
                {this._renderRow('我的卡片', styles.group, true, () => {
                    navigation.navigate('Publish');
                })}

                {/*{this._renderRow('我的服务', styles.group, true, () => {*/}
                {/*navigation.navigate('iServe');*/}
                {/*})}*/}

                {/*{this._renderRow('我的收藏', styles.group, true, () => {*/}
                {/*navigation.navigate('iCollect');*/}
                {/*})}*/}


                {/*{this._renderRow('我的收藏', styles.group, true, () => {*/}

                {/*})}*/}
                {this._renderRow('设置', styles.group, true, () => {
                    navigation.navigate('Setting');
                })}

            </View>
        )
    }

    render() {
        // let leftCourseTime = this.state.userCenterData.left_course_time || 0;
        // let courseTimeStr = '剩余课时: '+leftCourseTime+'课时';
        const isLogin = this.props.user.isLogin
        const navigation = this.props.navigation
        return (
            <StyledContent>
                {this._renderHeadRow(this.props.user.data, () => {
                    isLogin ? navigation.navigate('PersonInfo') : navigation.navigate('RegPhone')

                })}


                {isLogin && this.__renderLoginRow()}

            </StyledContent>
        );
    }



    _renderRow(title: string, style: any, isArraw: bool = false, onPress: Function = () => {
    }, description: any = null) {
        return (
            <Button onPress={onPress} style={style}>
                <View style={styles.row}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        {/*<Image
                         resizeMode='contain'
                         source={source}
                         style={styles.imageNail}
                         />*/}
                        <Text style={styles.rowText}>
                            {title}
                        </Text>
                    </View>
                    <View style={styles.row2}>
                        {description ? <Text style={styles.description}>{description}</Text> : null}
                        {isArraw ? <View style={styles.arrowView}/> : null}
                    </View>
                </View>
            </Button>
        );
    }



}

const styles = StyleSheet.create({

    group: {
        // marginBottom: 7，
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
    },
    head: {
        marginBottom: 7,
        flexDirection: 'row',
        height: 170,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    emptyPageText: {
        margin: 10,
    },
    list: {
        flex: 1,
        backgroundColor: 'white',
    },
    bottomLine: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
    },
    row: {
        paddingHorizontal: 15,
        paddingVertical: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageNail: {
        // marginTop: 13,
        // marginBottom: 13,
        marginLeft: 10,
        width: 20,
        height: 20,
    },

    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    rowNote: {
        fontSize: 17,
    },
    rowText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#333333',
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

    headerStyle: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    description: {
        marginRight: 12,
        fontSize: 13,
        color: '#333333'
    },


    headViewText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    headViewSubText: {
        marginTop: 10,
        fontSize: 13,
    },
});



