/**
 * Created by lintong on 2017/11/20.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux';
// import styled from 'styled-components/native';
import {ICARD, USER, IUSE, IUSEExist} from '../../redux/reqKeys'
import {getUserByID, existSearch} from '../../request/leanCloud'
import {req,requestSucceed,DATA} from '../../redux/actions/req'
import {user} from '../../redux/scemes'
import {selfUser, iCard} from '../../request/LCModle'
import Toast from 'react-native-simple-toast';
import {add} from '../../redux/module/leancloud'
import {addListNormalizrEntity} from '../../redux/actions/list'
import {addNormalizrEntity} from '../../redux/module/normalizr'
import moment from 'moment'
//static displayName = CardInfo
@connect(
    (state, props) => ({
        //data:state.req.get()
        iCard: state.normalizr.get(ICARD).get(props.navigation.state.params.iCard.objectId),
        user: state.normalizr.get(USER).get(props.navigation.state.params.iCard.user),
        useExist: state.req.get(IUSEExist)
    }),
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch),
        loadUser: (iCardUser) => {


            if (!iCardUser.username && iCardUser.objectId) {

                const param = getUserByID(iCardUser.objectId)
                req(param, USER, {normalizr: true, sceme: user})

            }
        },
        use: async (card) => {

            const param = {
                cycle: 0,
                time: 0,
                // notifyTime:option&&option.notifyTime||"20.00",
                doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
                ...selfUser(),
                ...iCard(card.objectId)
            }
            const res = await add(param, IUSE)
            const entity = {
                ...param,
                ...res
            }
            dispatch(addListNormalizrEntity(IUSE, entity))
            dispatch(addNormalizrEntity(ICARD, {
                ...card,
                useNum:card.useNum +1,
            }))
            dispatch(requestSucceed(IUSEExist, {
                [DATA]:{ count:1}
            }))
            // props.navigation.goBack()
            Toast.show('你接受了一个卡片' + card.title)
        },
        exist: async (id) => {
            const params = existSearch(IUSE, {
                where: {
                    ...iCard(id),
                    ...selfUser()
                }
            })
            req(params, IUSEExist)
        }

    })
)
export default class CardInfo extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {}
    };


    componentDidMount() {
        this.props.loadUser(this.props.user.toJS())
        this.props.exist(this.props.navigation.state.params.iCard.objectId)
    }

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }


    row = (title, des) => (
        <View style={styles.row}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.des}>
                {des}
            </Text>
        </View>
    )


    render(): ReactElement<any> {
        const iCard = this.props.iCard.toJS()
        const iCardUser = this.props.user.toJS()
        const avatar = iCardUser.avatar
        const avatarUrl = avatar && avatar.url
        const avatarSource = avatarUrl ? {uri: avatarUrl} : require('../../../source/img/my/icon-60.png')
        const useExist = this.props.useExist.toJS().data
        const exist = useExist.results && useExist.results.count >= 1
        const load = this.props.useExist.load
        // color: '#F3AC41',
        //     activityColor: '#F0C98B',
        return (
            <View style={{flex: 1}}>
                <ScrollView style={[this.props.style, styles.wrap]}>
                    <Image source={{uri: iCard.img.url}} style={styles.img}/>
                    <View style={styles.row}>
                        <Image source={avatarSource} style={styles.avatar}/>
                        <Text style={styles.name}>
                            {iCardUser.username || '.'}
                        </Text>
                    </View>
                    {this.row('名字:', iCard.title)}
                    {this.row('周期:', iCard.period)}
                    {this.row('记录模式:', iCard.record.join("+"))}
                    {this.row('关键字:', iCard.keys.join("+"))}
                    {this.row('使用人数:', iCard.useNum)}
                    {this.row('提醒时间:', iCard.notifyTime)}

                </ScrollView>
                <TouchableOpacity onPress={() => {
                    this.props.use(iCard)
                }}
                                  disabled={exist || load}
                                  style={[styles.btn,{backgroundColor:!exist?"#F3AC41":"#F0C98B"}]}>


                    {load ? <ActivityIndicator/> :
                        <Text style={[styles.btnText]}>
                            {exist ? '已经参与' : "马上参与"}
                        </Text>}
                </TouchableOpacity>
            </View>
        );
    }
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: 'white',
    },
    img: {

        width: width,
        height: width * 0.7,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        marginLeft: 18,
        fontSize:17,
        color: 'rgb(100,100,100)'
    },
    btn: {
        // marginBottom: 7，
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#F3AC41',
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    row: {
        paddingHorizontal: 15,
        paddingVertical: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
    },
    btnText: {
        color: 'white',
        fontSize:17,
    },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderRightWidth: StyleSheet.hairlineWidth * 2,
        borderColor: '#8c8c85',
        transform: [{rotate: '315deg'}],
        marginRight: 5,
        width: 10,
        height: 10,
    },
    title: {
        color: 'rgb(50,50,50)',
        fontSize: 18,
    },
    des: {
        color: 'rgb(50,50,50)',
        fontSize: 19,
    }
})
