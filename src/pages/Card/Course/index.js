/**
 * Created by lintong on 2018/7/12.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import LCList from '../../../components/Base/LCList';
import { Privacy } from '../../../configure/enum'
import RecordRow from '../../Record/RecordRow'
import { iCard } from '../../../request/LCModle'
import { IDO } from '../../../redux/reqKeys'

const listKey = IDO

import {
    StyledHeader,
    StyledTitleView,
    StyledTitleText,


} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';

import Info from '../../Course/Info'

@connect(
    (state, props) => ({
        user: state.user.data,

    }),
    (dispatch, props) => ({

    })
)


export default class Course extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};



    __renderHeader = () => {


        const  courseId  = this.props.iCard.get('course')
        return (
            <StyledHeader>

                <Info {...this.props} courseId={courseId}/>
                <StyledTitleView>
                    <StyledTitleText>
                        打卡记录
                    </StyledTitleText>
                </StyledTitleView>
            </StyledHeader>


        )


    }

    renderRow({ item, index }: Object) {

        // console.log('test:', item);
        const avatar = item.user.avatar
        const avatarUrl = avatar && avatar.url
        const avatarSource = avatarUrl ? { uri: avatarUrl } :
            require('../../../../source/img/my/icon-60.png')
        return (
            <View>
                <View style={styles.top}>
                    <Image
                        style={styles.avatar}
                        source={avatarSource}/>
                    <Text style={styles.name}>
                        {item.user.nickname || '路人甲'}
                        完成了任务
                    </Text>
                </View>
                <RecordRow style={styles.row} item={item} navigation={this.props.navigation}/>
            </View>
        )
    }


    render(): ReactElement<any> {

        const iCardId = this.props.iCard.get('objectId')

        const privacy = this.props.iCard.get('user') === this.props.user.objectId ?
            Privacy.openToCoach : Privacy.open
        const param = {
            'where': {
                ...iCard(iCardId),
            },
            include: 'user',
            privacy: { "$gte": privacy },//为0的时候只有自己可以查看
        }
        return (
            <LCList
                ListHeaderComponent={this.__renderHeader}
                style={[this.props.style, styles.list]}
                reqKey={listKey}
                sKey={listKey + iCardId}
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
    list: {
        flex: 1,
    },
    text: {
        paddingVertical: 3,
        // paddingHorizontal: 5,
        fontSize: 16,
        color: 'rgb(50,50,50)'
    },
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingVertical: 2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
    },
    image: {
        width: '100%',
        height: 200,
    },
    top: {
        paddingVertical: 5,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    name: {
        marginLeft: 5,
        color: '#4e4e4e',
    },


})

