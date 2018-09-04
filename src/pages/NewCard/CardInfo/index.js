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
    Platform,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux';
// import styled from 'styled-components';
import ImagesViewModal from '../../../components/ZoomImage/ImagesViewModal'
import {
    ICARD,
    USER,
    IUSE,
    IUSEExist,
    COURSE
} from '../../../redux/reqKeys'
import { getUserByID, classSearch } from '../../../request/leanCloud'
import { req, requestSucceed } from '../../../redux/actions/req'
import { selfUser, iCard, user,pointModel } from '../../../request/LCModle'
import Toast from 'react-native-simple-toast';
import { add } from '../../../redux/module/leancloud'
import { addListNormalizrEntity } from '../../../redux/actions/list'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import moment from 'moment'
import { user as UserEntity, schemas } from '../../../redux/scemes'
import Button from '../../../components/Button'

import {
    StyledContent,
    StyledRow,
    StyledRowText,
    StyledRowDes,
    StyledArrow,
    StyledRowInner,
    StyledTitleView,
    StyledTitleText,
    StyledCourseView,
    StyledKeysView,
    StyledDescirbe,
    StyledImg,
    StyledIcon
} from './style'

import {
    StyledHeaderCover,
    StyledHeaderImage,
    StyledHeaderTitle,
    StyledHeaderInner,
    StyledHeaderInnerLeft,
    StyledHeaderInnerRight,
    StyledNickName,
    StyledSubTitle,
    StyledReadNum,
    StyledAvatar,
    StyledFollowBtnText,

} from '../../Course/Info/style'

import { Privacy } from '../../../configure/enum'
import FlipButton from '../../../components/Button/FlipButton'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { findByID } from '../../../redux/module/leancloud'
import PayForm, { FormID } from '../../../components/Form/Pay'
import { formValueSelector } from 'redux-form/immutable'
import { pay } from '../../../redux/module/pay'
import Pop from '../../../components/Pop'
import { ORDER } from '../../../redux/reqKeys'

const selector = formValueSelector(FormID) // <-- same as form name

@connect(
    (state, props) => {
        const iCard = state.normalizr.get(ICARD).get(props.navigation.state.params.iCard.objectId)

        return {
            //data:state.req.get()
            iCard,
            user: state.normalizr.get(USER).get(props.navigation.state.params.iCard.user),
            userLoad: state.req.get(USER).get('load'),
            useExist: state.req.get(IUSEExist),
            data: state.normalizr.get(IUSE).get(state.req.get(IUSEExist).get('data').get('0')),
            dataId: state.req.get(IUSEExist).get('data').get('0'),
            course: state.normalizr.get(COURSE).get(iCard.get('course')),
            selfUse: state.user.data
        }
    },
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch),
        loadCourse: (course) => {
            if (course && !course.get('title')) {
                const id = course.get('objectId')
                findByID(COURSE, id)
            }
        },
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
                },
            })
            req(params, IUSEExist, { sceme: schemas[IUSE] })
        },
        onSubmit: (iCardData) => {
            dispatch(async (dispatch, getState) => {
                const { price, title, objectId, } = iCardData
                console.log('iCardData:', iCardData);
                const userId = iCardData.user
                const state = getState()
                let radio = selector(state, 'PayRadio')
                radio = radio && radio.toJS && radio.toJS()
                if (radio) {
                    const ItemId = radio.ItemId
                    const types = {
                        "alipay": 'alipay_app',
                        'wechat': 'weixin_app',
                        'cash': 'cash',

                    }
                    const Atanisi = Math.floor(Math.random() * 999999);
                    const tradeId = new Date().getTime() + Atanisi + ''

                    const description = '圈子_' + title + '的加入费用'
                    await add({
                        description,
                        amount: price,
                        ...pointModel('beneficiary',userId,'_User'),
                        payType: types[ItemId],
                        tradeId: Number(tradeId),
                        ...selfUser(),
                        ...iCard(objectId),
                    }, ORDER)

                    const res = await dispatch(
                        pay(types[ItemId],
                            tradeId,
                            price,
                            "",
                            description))
                    console.log('res:', res);
                    // 最后通知服务端，付款状态



                }


            })

        }

    })
)
export default class CardInfo extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.state = {
            visible: false,
            index: 0,

        }
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
        this.props.loadCourse(this.props.course)
    }

    // shouldComponentUpdate(nextProps: Object) {
    //     return !immutable.is(this.props, nextProps)
    // }


    row = (title, des) => (
        <StyledRow>
            <StyledRowText>
                {title}
            </StyledRowText>
            <View style={{ width: 20 }}/>
            <StyledRowDes>
                {des}
            </StyledRowDes>
        </StyledRow>
    )


    rowTouch = (title, des, onPress) => (
        <Button onPress={onPress}>
            <StyledRow>

                <StyledRowText>
                    {title}
                </StyledRowText>

                <StyledRowInner>
                    <StyledRowDes>
                        {des}
                    </StyledRowDes>
                    <StyledArrow/>
                </StyledRowInner>
            </StyledRow>
        </Button>

    )


    _renderCourse = (course) => {
        // console.log('course:', course);
        return (
            <StyledCourseView>

            </StyledCourseView>
        )

    }

    render(): ReactElement<any> {


        const { selfUse, onSubmit } = this.props

        const iCard = this.props.iCard.toJS()
        const iCardUser = this.props.user.toJS()



        const avatar = iCardUser.avatar

        // console.log('iCardUser:', iCardUser);

        const avatarUrl = avatar ? avatar.url : iCardUser.headimgurl
        const avatarSource = avatarUrl ? { uri: avatarUrl } :
            require('../../../../source/img/my/icon-60.png')


        const cover = iCard.img ? { uri: iCard.img.url } :
            require('../../../../source/img/my/icon-60.png')


        const exist = this.props.useExist.get('data').size >= 1
        const load = this.props.useExist.get('load')
        const nickName = iCardUser.nickname
        const keys = iCard.keys
        const { describe } = iCard
        const iUseData = this.props.data && this.props.data.toJS()

        const userLoad = this.props.userLoad


        let { course } = this.props
        course = course && course.toJS()

        const imgs = iCard && iCard.imgs

        const urlList = imgs && imgs.map(item => {
            return {
                url: item.img.url
            }
        }) || []


        const isSelf = selfUse.objectId === iCard.user

        // console.log('iCard.img:', iCard.img);

        return (
            <StyledContent
                colors={['#ffffff', '#f1f6f9', '#ebf0f3', '#ffffff']}
                forceInset={{ top: 'never' }}>

                {iCard.img && <ImagesViewModal
                    visible={this.state.visible}
                    index={this.state.index}
                    closeCallBack={() => {
                        this.setState({ visible: false, index: 0 })
                    }}
                    imageUrls={[{ url: iCard.img.url }, ...urlList]}/>}
                <FlipButton
                    faceText={'马上\n参与'}
                    backText={'已参与'}
                    load={load}
                    flip={exist}
                    animation={Platform.OS === 'ios' ? 'bounceIn' : 'bounceInRight'}
                    onPress={() => {

                        Pop.show(<PayForm
                            onSubmit={ async () => await onSubmit(iCard)}
                            balance={selfUse.amount}
                            price={iCard.price}/>, {
                            animationType: 'slide-up',
                            wrapStyle: {
                                justifyContent: 'flex-end',
                            }
                        })


                        // if (exist && iUseData) {
                        //     this.props.navigation.navigate('CardDetail', {
                        //         iUseId: iUseData.objectId,
                        //         iCardId: iCard.objectId
                        //     })
                        //
                        // } else {
                        //
                        //     if (iCard.price > 0 && !isSelf) {
                        //         Pop.show(<PayForm
                        //             onSubmit={onSubmit}
                        //             balance={selfUse.amount}
                        //             price={iCard.price}/>, {
                        //             animationType: 'slide-up',
                        //             wrapStyle: {
                        //                 justifyContent: 'flex-end',
                        //             }
                        //         })
                        //     } else {
                        //         this.props.use(iCard)
                        //     }
                        //
                        // }
                    }}
                    containStyle={styles.containStyle}
                    style={styles.flip}/>
                <ScrollView
                    // removeClippedSubviews={true}
                    style={[this.props.style, styles.wrap]}>
                    <StyledHeaderCover onPress={() => {
                        this.setState({ visible: true })
                    }}>
                        <StyledHeaderImage
                            source={cover}/>
                    </StyledHeaderCover>

                    <StyledHeaderTitle style={{ marginTop: 50 }}>
                        {iCard.title}
                    </StyledHeaderTitle>
                    <StyledHeaderInner>
                        <StyledHeaderInnerLeft>
                            {iCard.subtitle && <StyledSubTitle>
                                {iCard.subtitle}
                            </StyledSubTitle>}



                            {keys && <StyledKeysView>
                                {keys.map(key => {
                                    return '#' + key
                                }).join(' ')}


                            </StyledKeysView>}


                            <Button
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={() => {
                                    !userLoad && this.props.navigation.navigate('CardUse', { iCard: iCard })
                                }}>
                                <StyledReadNum>
                                    参与人数：{iCard.useNum}
                                </StyledReadNum>
                                <StyledIcon
                                    size={15}
                                    name="ios-arrow-forward"/>
                            </Button>

                        </StyledHeaderInnerLeft>
                        <StyledHeaderInnerRight>
                            <Button
                                style={{ alignItems: 'center'}}
                                onPress={() => {
                                this.props.navigation.navigate('Following',
                                    { user: iCardUser })

                            }}>
                                <StyledAvatar source={avatarSource}/>
                                {nickName && <StyledNickName>
                                    {nickName}
                                </StyledNickName>}
                            </Button>
                            {/*{this.__renderFocusOn()}*/}
                        </StyledHeaderInnerRight>
                    </StyledHeaderInner>

                    <View style={{ height: 50 }}/>

                    <StyledTitleView>
                        <StyledTitleText>
                            卡片介绍
                        </StyledTitleText>
                    </StyledTitleView>

                    {this.row('加入费用:', iCard.price === 0 ? '免费'
                        : iCard.price + '元')}
                    {this.row('卡片周期:', iCard.period + '次')}
                    {this.row('记录模式:', iCard.record.join("+") || '无')}
                    {/*{this.row('关键字:', iCard.keys.join("+"))}*/}
                    {this.row('提醒时间:', iCard.notifyTime)}
                    {this.row('创建时间:', moment(iCard.createdAt).format("YYYY-MM-DD"))}
                    {/*{this.rowTouch('使用人数:', iCard.useNum + '人', () => [])}*/}
                    {course && course.title && this._renderCourse(course)}


                    {describe && <StyledDescirbe>
                        {'\t'}{describe}
                    </StyledDescirbe>}

                    {imgs && imgs.map((item, index) => {
                        return (
                            <TouchableHighlight
                                key={item.img.url + index}
                                onPress={() => [
                                    this.setState({ visible: true, index: index + 1 })
                                ]}>
                                <StyledImg
                                    width={Dimensions.get('window').width - 30}
                                    source={{ uri: item.img.url }}/>
                            </TouchableHighlight>
                        )
                    })}
                    <View style={{ height: 200 }}/>
                </ScrollView>
            </StyledContent>
        );
    }
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        padding: 15,
        overflow: 'hidden',
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
    },
    flip: {
        position: 'absolute',
        zIndex: 100,
        bottom: 50,
        right: 15,
    },
    containStyle: {
        width: 70,
        height: 70,
        borderRadius: 35,
    }
})
