/**
 * Created by lintong on 2017/11/20.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    Easing,
    Modal,
} from 'react-native'
import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux';
// import styled from 'styled-components/native';
import ZoomImage from '../../../components/ZoomImage/ZoomImage'
import { ICARD, USER, IUSE, IUSEExist } from '../../../redux/reqKeys'
import { getUserByID, classSearch } from '../../../request/leanCloud'
import { req, requestSucceed, DATA } from '../../../redux/actions/req'
import { entityFromCode } from '../../../redux/scemes'
import { selfUser, iCard } from '../../../request/LCModle'
import Toast from 'react-native-simple-toast';
import { add } from '../../../redux/module/leancloud'
import { addListNormalizrEntity } from '../../../redux/actions/list'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import moment from 'moment'
import { user as UserEntity, schemas } from '../../../redux/scemes'
import Button from '../../../components/Button/index'
//static displayName = CardInfo

import {
    StyledContent,
    StyledRow,
    StyledRowText,
    StyledRowDes,
    StyledArrow,
    StyledRowInner,
    StyledRowTouch,
    StyeldDoneView
} from './style'
import {Privacy} from '../../../configure/enum'

@connect(
    (state, props) => ({
        //data:state.req.get()
        iCard: state.normalizr.get(ICARD).get(props.navigation.state.params.iCard.objectId),
        user: state.normalizr.get(USER).get(props.navigation.state.params.iCard.user),
        userLoad: state.req.get(USER).get('load'),
        useExist: state.req.get(IUSEExist),
        data: state.normalizr.get(IUSE).get(state.req.get(IUSEExist).get('data').get('0')),
        dataId: state.req.get(IUSEExist).get('data').get('0')
    }),
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch),
        loadUser: (iCardUser) => {


            if (!iCardUser.nickname && iCardUser.objectId) {

                const param = getUserByID(iCardUser.objectId)
                req(param, USER, { sceme: UserEntity })

            }
        },
        use: async (card) => {

            const param = {
                // cycle: 0,
                time: 0,
                privacy: Privacy.open,//对外开放
                // notifyTime:option&&option.notifyTime||"20.00",
                doneDate: { "__type": "Date", "iso": moment('2017-03-20') },
                ...selfUser(),
                ...iCard(card.objectId),
                // include: 'avatar'
            }
            const res = await add(param, IUSE)
            const entity = {
                ...param,
                ...res
            }
            dispatch(addListNormalizrEntity(IUSE, entity))
            dispatch(addNormalizrEntity(ICARD, {
                ...card,
                useNum: card.useNum + 1,
            }))
            dispatch(requestSucceed(IUSEExist, [res.objectId]))
            // props.navigation.goBack()
            Toast.show('你接受了一个卡片' + card.title)
        },
        exist: async (id) => {
            const params = classSearch(IUSE, {
                where: {
                    ...iCard(id),
                    ...selfUser(),
                    statu: { "$ne": 'del' },
                }
            })
            req(params, IUSEExist, { sceme: schemas[IUSE] })
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
        <StyledRow>
            <StyledRowText>
                {title}
            </StyledRowText>
            <StyledRowDes>
                {des}
            </StyledRowDes>
        </StyledRow>
    )


    rowTouch = (title, des, onPress) => (
        <StyledRowTouch onPress={onPress}>

            <StyledRowText>
                {title}
            </StyledRowText>

            <StyledRowInner>
                <StyledRowDes>
                    {des}
                </StyledRowDes>
                <StyledArrow/>
            </StyledRowInner>
        </StyledRowTouch>

    )


    render(): ReactElement<any> {


        const iCard = this.props.iCard.toJS()
        const iCardUser = this.props.user.toJS()


        const avatar = iCardUser.avatar

        // console.log('iCardUser:', iCardUser);

        const avatarUrl = avatar && avatar.url
        const avatarSource = avatarUrl ? { uri: avatarUrl } :
            require('../../../../source/img/my/icon-60.png')
        const exist = this.props.useExist.get('data').size >= 1
        const load = this.props.useExist.get('load')
        const nickName = iCardUser.nickname
        const iUseData = this.props.data && this.props.data.toJS()

        const userLoad = this.props.userLoad
        // console.log('userLoad:', userLoad);


        return (
            <StyledContent  forceInset={{ top: 'never' }}>
                <ScrollView style={[this.props.style, styles.wrap]}>
                    {iCard.img && <ZoomImage
                        height={width * 0.7}
                        style={styles.img} imageUrls={[{ url: iCard.img.url }]}/>}
                    <Button
                        disabled={userLoad}
                        onPress={() => {
                            this.props.navigation.navigate('Following', { user: iCardUser })
                        }}
                        style={styles.row}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={avatarSource} style={styles.avatar}/>
                            <Text style={styles.name}>
                                {nickName||"路人甲"}
                            </Text>
                        </View>
                        {userLoad ? <ActivityIndicator size="small"/> :
                            <View style={styles.arrowView}/>}
                    </Button>
                    {this.row('卡片名称:', iCard.title)}
                    {this.row('卡片周期:', iCard.period + '次')}
                    {this.row('记录模式:', iCard.record.join("+") || '无')}
                    {/*{this.row('关键字:', iCard.keys.join("+"))}*/}
                    {this.row('提醒时间:', iCard.notifyTime)}
                    {this.row('创建时间:', moment(iCard.createdAt).format("YYYY-MM-DD"))}
                    {this.rowTouch('使用人数:', iCard.useNum + '人',()=>[
                        this.props.navigation.navigate('CardUse', { iCard: iCard })
                    ])}
                </ScrollView>
                <Button onPress={() => {
                    if (exist && iUseData) {
                        this.props.navigation.navigate('CardDetail', {
                            iUse: iUseData,
                            iCard: iCard
                        })

                    } else {
                        this.props.use(iCard)
                    }
                }}
                        disabled={load}
                        style={[styles.btn, { backgroundColor: !load ? "#F3AC41" : "#F0C98B" }]}>


                    {load ? <ActivityIndicator color={"white"}/> :
                        <Text style={[styles.btnText]}>
                            {exist ? '已经参与' : "马上参与"}
                        </Text>}
                </Button>
            </StyledContent>
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

        width: '100%',
        height: width * 0.7,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        marginLeft: 18,
        fontSize: 17,
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
        fontSize: 17,
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
    title: {
        color: 'rgb(50,50,50)',
        fontSize: 18,
    },
    des: {
        color: 'rgb(50,50,50)',
        fontSize: 19,
    }
})
