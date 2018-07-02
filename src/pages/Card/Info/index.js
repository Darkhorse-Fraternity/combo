/**
 * Created by lintong on 2018/4/13.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    ActivityIndicator,
    TouchableNativeFeedback,
    Image
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types';
import ZoomImage from '../../../components/ZoomImage/ZoomImage'


import {
    StyledContent,
    StyledBottomMenu,
    StyledBottomMenuText,
    StyledIcon,
    StyledRow,
    StyledRowText,
    StyledRowDes,
    StyledArrow,
    StyledRowInner,
    StyledRowTouch,
    StyledBottomMenuButton,
    StyledTitleView,
    StyledTitleText,
    StyeldDoneView
} from './style'


import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import ShareView from '../../../components/Share/ShareView'
import Pop from '../../../components/Pop'

const width = Dimensions.get('window').width

import { update, } from '../../../redux/module/leancloud'
import { IUSE } from '../../../redux/reqKeys'
import { claerByID } from '../../../redux/actions/list'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import { addListNormalizrEntity } from '../../../redux/actions/list'


@connect(
    (state, props) => ({
        user: state.user.data,
        iCardUser: state.normalizr.get('user').get(props.navigation.state.params.iCard.user),
        iUse: state.normalizr.get('iUse').get(props.navigation.state.params.iUse.objectId),
        iUseLoad: state.req.get(IUSE).get('load'),
    }),
    (dispatch, props) => ({
        refresh: async (data) => {
            const id = data.objectId
            const card = props.navigation.state.params.iCard

            const isDone = data.time === card.period

            const param = {
                time: isDone ? 0 : data.time,
                statu: 'start',
                cycle: isDone ? data.cycle + 1 : data.cycle,
            }

            const res = await update(id, param, IUSE)
            const entity = {
                ...param,
                ...res,
            }
            // dispatch(addEntities({
            //     [ICARD]: {
            //         [entity.objectId]: entity
            //     }
            // }))
            dispatch(addListNormalizrEntity(IUSE, entity))
        },
        stop: async (data) => {
            const id = data.objectId
            const param = {
                statu: 'stop',
                //cycle,
            }
            const res = await update(id, param, IUSE)
            const entity = {
                ...param,
                ...res,
            }

            dispatch(addNormalizrEntity(IUSE, entity))
            dispatch(claerByID(IUSE, id))
        },
    })
)


export default class Info extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};


    _renderDoneView = (done, over) => {
        return (
            <StyeldDoneView/>
        )
    }

    _renderBottomMenu = (params) => {

        let { iCard, iUse } = params
        const { navigation } = this.props;
        const pUse = this.props.iUse && this.props.iUse.toJS()
        iUse = pUse || iUse


        const reflesh = iUse.time === Number(iCard.period) || iUse.statu === 'stop'

        // console.log('test:', item);
        let text = iUse.time === Number(iCard.period) ?
            "再来一组" :
            "继续打卡"
        if (!reflesh) {
            text = "暂停打卡"
        }

        const background = TouchableNativeFeedback.SelectableBackgroundBorderless &&
            TouchableNativeFeedback.SelectableBackgroundBorderless()
        return (
            <StyledBottomMenu>
                {iCard.user === this.props.user.objectId && iUse.statu !== 'del' &&
                (<StyledBottomMenuButton
                    background={background}
                    hitSlop={{ top: 10, left: 20, bottom: 10, right: 20 }}
                    onPress={() => {
                        navigation.navigate('PublishDetail',
                            { iCardID: iCard.objectId, data: iCard })
                    }}>
                    <StyledIcon name={'md-settings'} size={30}/>
                    <StyledBottomMenuText>
                        圈子管理
                    </StyledBottomMenuText>
                </StyledBottomMenuButton>)}
                {this.props.iUseLoad ? <ActivityIndicator style={{ padding: 40 }}/> :
                    <StyledBottomMenuButton
                        background={background}
                        hitSlop={{ top: 10, left: 20, bottom: 10, right: 10 }}
                        onPress={() => {
                            !reflesh ? this.props.stop(iUse) : this.props.refresh(iUse)
                        }}>
                        <StyledIcon name={!reflesh ?
                            'md-trash' : 'md-refresh'}
                                    size={30}/>
                        <StyledBottomMenuText>
                            {text}
                        </StyledBottomMenuText>
                    </StyledBottomMenuButton>}
                <StyledBottomMenuButton
                    background={background}
                    hitSlop={{ top: 10, left: 10, bottom: 10, right: 20 }}
                    onPress={() => {
                        Pop.show(<ShareView iCard={iCard} iUse={iUse}/>, {
                            animationType: 'slide-up',
                            wrapStyle: {
                                justifyContent: 'flex-end',
                            }
                        })
                    }}>
                    <StyledIcon name={'md-share'} size={30}/>
                    <StyledBottomMenuText>
                        点击分享
                    </StyledBottomMenuText>
                </StyledBottomMenuButton>
                <StyledBottomMenuButton
                    background={background}
                    hitSlop={{ top: 10, left: 10, bottom: 10, right: 20 }}
                    onPress={() => {
                        Pop.show(<ShareView iCard={iCard} iUse={iUse}/>, {
                            animationType: 'slide-up',
                            wrapStyle: {
                                justifyContent: 'flex-end',
                            }
                        })
                    }}>
                    <StyledIcon name={'md-share'} size={30}/>
                    <StyledBottomMenuText>
                        隐私设置
                    </StyledBottomMenuText>
                </StyledBottomMenuButton>
            </StyledBottomMenu>
        )

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

            {/*<StyledRowText>*/}
                {/*{title}*/}
            {/*</StyledRowText>*/}
            <StyledRowDes>
                {des}
            </StyledRowDes>
            <StyledRowInner>

                <StyledArrow/>
            </StyledRowInner>
        </StyledRowTouch>

    )

    render(): ReactElement<any> {

        const { navigation, iCardUser, user } = this.props;
        const { state } = navigation;
        const { params } = state;

        //TODO 这个iCard 需要实时 要从store中取。
        const { iCard, iUse } = params

        const iCardUserData = iCardUser && iCardUser.toJS()


        const done = moment(2, "HH").isBefore(iUse.doneDate.iso)
        const over = iUse.time === Number(iCard.period)

        const {img} = iCard
        const source = img ? { uri: img.url }
        : require('../../../../source/img/my/icon-60.png')

        return (
            <StyledContent>
                {this._renderDoneView(done, over)}
                {!!iCard.img ?(<ZoomImage
                    height={width * 0.7}
                    style={{
                        width: '100%',
                        height: width * 0.7
                    }} imageUrls={[{ url: iCard.img.url }]}/>):
                    (<Image style={{ alignSelf: 'center'}} resizeMode={'center'} source={source}/>)}
                {this.rowTouch('卡片名称:', iCard.title , () => {
                     this.props.navigation.navigate('CardInfo', { iCard: iCard })
                })}
                {/*{this.row('卡片周期:', iCard.period + '次')}*/}
                {/*{this.row('记录模式:', iCard.record.join("+") || '无')}*/}
                {/*/!*{this.row('关键字:', iCard.keys.join("+"))}*!/*/}
                {/*{this.row('提醒时间:', iCard.notifyTime)}*/}
                {/*{this.row('使用人数:', iCard.useNum + '人')}*/}
                {/*{iCardUserData.objectId !== user.objectId &&*/}
                {/*this.rowTouch('拥有人:', iCardUserData.nickname + '', () => {*/}
                    {/*// console.log('iCardUserData:', iCardUserData);*/}
                    {/*this.props.navigation.navigate('Following', { user: iCardUserData })*/}
                {/*})}*/}

                {/*<StyledTitleView>*/}
                    {/*<StyledTitleText>*/}
                        {/*卡片功能*/}
                    {/*</StyledTitleText>*/}
                {/*</StyledTitleView>*/}
                {this._renderBottomMenu(params)}
            </StyledContent>
        );
    }
}


