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
import { IDO } from '../../../redux/reqKeys'


const listKey = IDO

import RecordRow from '../../Record/RecordRow'


import { shouldComponentUpdate } from 'react-immutable-render-mixin';


@connect(
    state => ({user:state.user.data}),
    dispatch => ({})
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

                <TouchableOpacity onPress={() => {

                }}>
                    <StyledIcon name={'md-share'} size={30} color={'white'}/>
                </TouchableOpacity>
                {iCard.user ===this.props.user.objectId &&
                (<TouchableOpacity onPress={() => {
                    navigation.navigate('',{})
                }}>
                    <StyledIcon name={'md-settings'} size={30} color={'white'}/>
                </TouchableOpacity>)}
                <TouchableOpacity onPress={() => {

                }}>
                    <StyledIcon name={'md-trash'} size={30} color={'white'}/>
                </TouchableOpacity>
            </StyledBottomMenu>
        )

    }


    _renderHeader = () => {
        return (
            <StyledInner>
                <AgendaScreen {...this.props}/>
                <StyledTitleView>
                    <StyledTitleText>
                        习惯统计
                    </StyledTitleText>
                </StyledTitleView>
                {this._renderRow('总共加入天数', '125.6d')}
                {this._renderRow('已完成周期', '6轮')}
                {this._renderRow('建立日期', '2015-5-17')}
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
        console.log('param:', params);


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
                    style={{flex:1}}
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