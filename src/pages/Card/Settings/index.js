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
    Image,
    Alert
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
    StyledRowTouch,
    StyledBottomMenuButton,
    StyeldDoneView,
    StyledActivityIndicator,
    StyledBtn,
    StyledHeader,
    StyledEntypoIcon
} from './style'


import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import ShareView from '../../../components/Share/ShareView'
import Pop from '../../../components/Pop'

const width = Dimensions.get('window').width

import { update, search } from '../../../redux/module/leancloud'

import { IUSE } from '../../../redux/reqKeys'
import { claerByID } from '../../../redux/actions/list'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import { addListNormalizrEntity } from '../../../redux/actions/list'
import { Privacy } from '../../../configure/enum'
import { classUpdate } from '../../../request/leanCloud'
import { req } from '../../../redux/actions/req'
import Dialog from '../../../components/Dialog'
import { selfUser } from '../../../request/LCModle'

@connect(
    (state, props) => ({
        user: state.user.data,
        iCard: state.normalizr.get('iCard').get(props.navigation.state.params.iCardId),
        iUse: state.normalizr.get('iUse').get(props.navigation.state.params.iUseId),
        // iCardUser: state.normalizr.get('user').get(props.navigation.state.params.iCard.user),
        // iUse: state.normalizr.get('iUse').get(props.navigation.state.params.iUseId),
        // iCard: state.normalizr.get('iCard').get(props.navigation.state.params.iCardId),
        iUseLoad: state.req.get(IUSE).get('load'),
        updatePrivacyLoad: state.req.get('updatePrivacy') && state.req.get('updatePrivacy').get('load'),
    }),
    (dispatch, props) => ({
        refresh: async (data) => {
            const id = data.objectId
            const card = props.navigation.state.params.iCard

            // const isDone = data.time % card.period === 0

            const param = {
                // time: isDone ? 0 : data.time,
                statu: 'start',
                // cycle: isDone ? data.cycle + 1 : data.cycle,
            }

            const res = await update(id, param, IUSE)
            const entity = {
                ...param,
                ...res,
            }
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
        updatePrivacy: async (data, privacy) => {
            const id = data.objectId
            const param = {
                privacy,
            }
            // const res = await update(id, param, IUSE)
            const lParams = classUpdate(IUSE, id, param)
            const res = await req(lParams, 'updatePrivacy')
            const entity = {
                ...param,
                ...res,
            }
            dispatch(addNormalizrEntity(IUSE, entity))
        },
        delete: async (objectId) => {
            // await remove(objectId,IUSE)
            // 做伪删除

            Alert.alert(
                '确定删除?',
                '删除后不可恢复~！',
                [{ text: '取消' }, {
                    text: '确定', onPress: async () => {
                        const param = {
                            statu: 'del'
                        }
                        const res = await update(objectId, param, IUSE)
                        const entity = {
                            ...param,
                            ...res
                        }
                        dispatch(addNormalizrEntity(IUSE, entity))
                        dispatch(claerByID(IUSE, objectId))
                        props.navigation.goBack()
                    }
                }]
            )
        },
        pickPrivacy: async (iUse) =>{
            return Dialog.showPicker('隐私设置', null, {
                negativeText: '取消',
                type: Dialog.listRadio,
                selectedId: iUse.privacy + "",
                items: [
                    { label: '不对外开放', id: '0' },
                    { label: '仅对教练开放', id: '1' },
                    { label: '对外开放', id: '2' }
                ]
            });
        }
    })
)


export default class Settings extends Component {
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





    _renderItem = (props)=> {

        const {title,
            name,
            load = false,
            size= 30,
            onPress,
            Icon = StyledIcon} = props
        return (
            <StyledBottomMenuButton
                disabled={load}
                hitSlop={{ top: 10, left: 20, bottom: 10, right: 10 }}
                onPress={onPress}>
                {load?<StyledActivityIndicator/>:<Icon size={size} name={name}/>}
                <StyledBottomMenuText>
                    {title}
                </StyledBottomMenuText>
            </StyledBottomMenuButton>
        )
    }

    _renderRresh = (reflesh, params) => {
        const { iCard, iUse } = params
        let text = !reflesh ?
            "卡片归档" :
            "继续打卡"
        return (
            <this._renderItem
                load={this.props.iUseLoad}
                onPress={() => {
                    !reflesh ? this.props.stop(iUse) : this.props.refresh(iUse)
                }}
                Icon={!reflesh ? StyledEntypoIcon:StyledIcon}
                name={!reflesh ?
                    'archive' : 'md-refresh'}
                title={text}/>
        )


    }

    _renderBottomMenu = (params) => {

        const { iCard, iUse } = params
        const { navigation } = this.props;
        // const pUse = this.props.iUse && this.props.iUse.toJS()
        // iUse = pUse || iUse


        const reflesh = iUse.statu === 'stop'


        return (
            <StyledBottomMenu>

                <this._renderItem
                    onPress={() => {
                        navigation.navigate('OptionView', { iCardId: iCard.objectId })
                    }}
                    name={'md-settings'}
                    title={'卡片配置'}/>
                { this._renderRresh(reflesh, params)}


                {iCard.user === this.props.user.objectId &&
                iCard.state !== -2
                && iUse.statu !== 'del' &&
                ( <this._renderItem
                    onPress={() => {
                        navigation.navigate('PublishDetail',
                            { iCardID: iCard.objectId, data: iCard })
                    }}
                    Icon={StyledEntypoIcon}
                    size={28}
                    name={'picasa'}
                    title={' 圈子管理'}/>)}


                 <this._renderItem
                    onPress={async () => {
                        const { selectedItem } = await this.props.pickPrivacy(iUse)
                        if (selectedItem) {
                            const { id } = selectedItem;
                            iUse.privacy !== Number(id) &&
                            this.props.updatePrivacy(iUse, Number(id))
                        }
                    }}
                    load={this.props.updatePrivacyLoad}
                    name={iUse.privacy ===
                    Privacy.open ? 'md-unlock' :
                        'md-lock'}
                    title={'隐私设置'}/>

                <this._renderItem
                    onPress={() => {
                        this.props.delete(iUse.objectId)
                    }}
                    load={this.props.iUseLoad}
                    name={'md-trash'}
                    title={'删除卡片'}/>

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
            {/*<StyledRowInner>*/}

            {/*<StyledArrow/>*/}
            {/*</StyledRowInner>*/}
        </StyledRowTouch>

    )

    render(): ReactElement<any> {

        const { navigation, iCardUser, user } = this.props;
        // const { state } = navigation;
        // const { params } = state;

        const iCard = this.props.iCard.toJS()
        const iUse = this.props.iUse.toJS()
        // const { iCard, iUse } = params

        // const iCardUserData = iCardUser && iCardUser.toJS()


        const done = moment(2, "HH").isBefore(iUse.doneDate.iso)
        const over = iUse.time % Number(iCard.period) === 0

        const { img } = iCard
        const source = img ? { uri: img.url }
            : require('../../../../source/img/my/icon-60.png')

        return (
            <StyledContent
                colors={['#ffffff', '#f1f6f9', '#ebf0f3', '#ffffff']}>
                <StyledHeader>
                    <StyledRowDes>
                        {iCard.title}
                    </StyledRowDes>
                    <StyledBtn
                        title="查看"
                        hitSlop={{ top: 5, left: 50, bottom: 5, right: 50 }}
                        onPress={() => {
                            this.props.navigation.navigate('CardInfo', { iCard: iCard })
                        }}/>
                </StyledHeader>
                {this._renderBottomMenu({ iCard, iUse })}
            </StyledContent>
        );
    }
}


