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
    Text,
    Alert,
    DeviceEventEmitter
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import LCList from '../../../components/Base/LCList';
import { Privacy } from '../../../configure/enum'
import RecordRow from '../../Record/RecordRow'
import Header from '../../Record/RecordRow/Header'
import { IDO, REPORT } from '../../../redux/reqKeys'
import Button from '../../../components/Button'


const listKey = IDO


import {
    StyledHeader,
    StyledTitleView,
    StyledTitleText,
    StyledReportBtn,
    StyledReportText

} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import Toast from 'react-native-simple-toast'

import Info from '../../Course/Info'
import CourseRowList from '../../Course/Info/CourseRowList'

import {
    classCreatNewOne,
    existSearch
} from '../../../request/leanCloud';
import { req } from '../../../redux/actions/req'
import { selfUser, iCard } from '../../../request/LCModle'

@connect(
    (state, props) => ({
        user: state.user.data,

    }),
    (dispatch, props) => ({
        report: () => {
            Alert.alert(
                '确定举报该卡片吗?',
                '举报该卡片',
                [{ text: '取消' }, {
                    text: '确定', onPress: async () => {
                        const where = {
                            ...selfUser(),
                            ...iCard(props.iCard.get('objectId')),

                        }

                        const exParams = existSearch(REPORT, {
                            where
                        })
                        const res = await req(exParams)
                        if (res.count > 0) {
                            return Toast.show('已经举报了~!')
                        }

                        const params = classCreatNewOne(REPORT, where)
                        await  req(params)
                        Toast.show('我们已受理!')
                    }
                }]
            )
        }
    })
)


export default class Course extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};


    componentDidMount() {
        const key = 'done_' + this.props.iCard.get('objectId')
        this.subscription =
            DeviceEventEmitter.addListener(key, this.refresh);
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    refresh = () => {
        this.refs['list'].selector.props.loadData()
    }


    __renderHeader = () => {


        const courseId = this.props.iCard.get('course')
        const user = this.props.iCard.get('user')
        const selfUser = this.props.user.objectId
        const isSelf = user === selfUser

        return (
            <StyledHeader
                colors={['#ffffff', '#f1f6f9', '#ebf0f3', '#ffffff']}>
                {courseId && <StyledReportBtn onPress={this.props.report}>
                    <StyledReportText>
                        举报
                    </StyledReportText>
                </StyledReportBtn>}
                <Info {...this.props}
                      iCardID={this.props.iCard.get('objectId')}
                      isSelf={isSelf}
                      showNoOpen
                      courseId={courseId}/>
                {courseId && <CourseRowList courseId={courseId}/>}
                <StyledTitleView>
                    <StyledTitleText>
                        圈子记录
                    </StyledTitleText>
                </StyledTitleView>
            </StyledHeader>


        )


    }

    renderRow({ item, index }: Object) {
        return (
            <View>
                <Header
                    userId={item.user}
                    onPress={(user) => {
                        this.props.navigation.navigate('following',
                            { user })
                    }}/>
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
                ref={'list'}
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
        marginTop: 15,
        paddingVertical: 5,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'red'
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

