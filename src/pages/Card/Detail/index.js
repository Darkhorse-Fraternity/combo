/**
 * Created by lintong on 2018/3/6.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
    StyledContent,
    StyledInner,
    StyledTitleView,
    StyledTitleText,
    StyledRow,
    StyledRowText,
    StyledBottomMenu,
    StyledBottomMenuText,
    StyledIcon
} from './style'

import AgendaScreen from './agenda'

import { selfUser, iUse } from '../../../request/LCModle'
import LCList from '../../../components/Base/LCList';
import { IDO ,IUSE} from '../../../redux/reqKeys'


const listKey = IDO

import RecordRow from '../../Record/RecordRow'
import ShareView from '../../../components/Share/ShareView'
import Pop from '../../../components/Pop'
import {update,} from '../../../redux/module/leancloud'
import {claerByID} from '../../../redux/actions/list'
import {addNormalizrEntity} from '../../../redux/module/normalizr'
import moment from 'moment'


import { shouldComponentUpdate } from 'react-immutable-render-mixin';


@connect(
    state => ({ user: state.user.data }),
    (dispatch,props) => ({
        stop:  () => {
            Alert.alert(
                '放弃当前打卡?',
                '',
                [{text: '取消'},
                 {text: '确定', onPress:async () => {

                     const { navigation } = props;
                     const { state } = navigation;
                     const { params } = state;
                     const data = params.iUse
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
                     dispatch(claerByID(IUSE,id))
                     props.navigation.goBack()

                }}]
            )



        },
    })
)


export default class CardDetail extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        const { navigation } = props;
        const { state } = navigation;
        const { params } = state;
        return {
            title: params.iCard.title,
        }
    };


    _renderRow = (title, des) => {
        return (
            <StyledRow>
                <StyledRowText>
                    {title}
                </StyledRowText>
                <StyledRowText>
                    {des}
                </StyledRowText>
            </StyledRow>
        )
    }


    _renderBottomMenu = (params) => {

        const { iCard, iUse } = params
        const { navigation } = this.props;



        return (
            <StyledBottomMenu>

                <TouchableOpacity
                    hitSlop={{ top: 10, left: 10, bottom: 10, right: 20 }}
                    onPress={() => {

                        Pop.show(<ShareView/>, {
                            animationType: 'slide-up',
                            wrapStyle: {
                                justifyContent: 'flex-end',
                            }
                        })

                    }}>
                    <StyledIcon name={'md-share'} size={30} color={'white'}/>
                </TouchableOpacity>
                {iCard.user === this.props.user.objectId &&
                (<TouchableOpacity
                    hitSlop={{ top: 10, left: 20, bottom: 10, right: 20 }}
                    onPress={() => {
                        navigation.navigate('PublishDetail',
                            {iCardID:iCard.objectId, data:iCard})
                    }}>
                    <StyledIcon name={'md-settings'} size={30} color={'white'}/>
                </TouchableOpacity>)}
                <TouchableOpacity
                    hitSlop={{ top: 10, left: 20, bottom: 10, right: 10 }}
                    onPress={this.props.stop}>
                    <StyledIcon name={'md-trash'} size={30} color={'white'}/>
                </TouchableOpacity>
            </StyledBottomMenu>
        )

    }


    _renderHeader = () => {

        const { navigation } = this.props;
        const { state } = navigation;
        const { params } = state;
        const { iCard, iUse } = params
        // console.log('test:', iCard,iUse);

        const cardCreatedAt = moment(iCard.createdAt).format("YYYY-MM-DD")
        // const useCreatedAt = moment(iUse.createdAt).format("YYYY-MM-DD")
        const date1 = new Date();
        const date2 = new Date(iUse.createdAt);
        const date =  ((date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000)).toFixed(1);

        const time = iUse.cycle * iCard.period + iUse.time
        return (
            <StyledInner>
                <AgendaScreen {...this.props}/>
                <StyledTitleView>
                    <StyledTitleText>
                        习惯统计
                    </StyledTitleText>
                </StyledTitleView>
                {this._renderRow('已完成周期', iUse.cycle+'轮')}
                {this._renderRow('总打卡次数', time + '次')}
                {this._renderRow('加入天数', date+"天")}
                {this._renderRow('建立日期', cardCreatedAt)}
                <StyledTitleView>
                    <StyledTitleText>
                        打卡记录
                    </StyledTitleText>
                </StyledTitleView>
            </StyledInner>

        )
    }

    renderRow({ item, index }: Object) {

        // const img = item.imgs && item.imgs[0] || null

        return (
            <View
                style={styles.row}
                onPress={() => {
                }}>
                <RecordRow item={item} navigation={this.props.navigation}/>
                {/*<View style={styles.line}/>*/}
            </View>
        )
    }

    render(): ReactElement<any> {

        const { navigation } = this.props;
        const { state } = navigation;
        const { params } = state;


        const param = {
            'where': {
                ...selfUser(),
                ...iUse(params.iUse.objectId)
            }
        }

        return (
            <StyledContent>
                <LCList
                    ListHeaderComponent={this._renderHeader}
                    reqKey={listKey}
                    style={{ flex: 1 }}
                    sKey={listKey + params.iUse.objectId}
                    renderItem={this.renderRow.bind(this)}
                    noDataPrompt={'还没有记录'}
                    //dataMap={(data)=>{
                    //   return {[OPENHISTORYLIST]:data.list}
                    //}}
                    reqParam={param}
                />

                {this._renderBottomMenu(params)}
            </StyledContent>
        );
    }
}


const styles = StyleSheet.create({
    row: {
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
    },
})