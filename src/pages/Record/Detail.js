/**
 * Created by lintong on 2017/8/31.
 * @flow
 */
'use strict';


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    Alert,
} from 'react-native'
import { user as UserModle, iUse } from '../../request/LCModle'
import { connect } from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';
import { update, } from '../../redux/module/leancloud'
import { addListNormalizrEntity } from '../../redux/actions/list'
import { IUSE,IDO,USER } from '../../redux/reqKeys'
import { claerByID } from '../../redux/actions/list'
import { addNormalizrEntity } from '../../redux/module/normalizr'
import HeaderBtn from '../../components/Button/HeaderBtn'
import RecordRow from './RecordRow'

const listKey = IDO


@connect(
    (state, props) => ({
        data: state.normalizr.get(IUSE).get(props.navigation.state.params.data.objectId),
        load: state.req.get(IUSE).get('load'),
        user: state.normalizr.get(USER).get(props.navigation.state.params.data.user),

    }),
    (dispatch, props) => ({
        refresh: async (data) => {
            const id = data.objectId
            const card = props.navigation.state.params.card

            // const isDone = data.time / card.period === 0

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

export default class Detail extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {
        data: PropTypes.object
    };

    static defaultProps = {
        data: {}
    };


    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }




    componentDidMount() {
        // const {navigation} = this.props;
        // navigation.setParams({refresh: this.__refresh})
    }


    _renderHeader = (user,iUse) => {
        const { navigation } = this.props;
        const { state } = navigation;
        const { params } = state;
        // console.log('this.props.data:', params);


        //只有当为自己的时候，才会用到以下数据。
        const data = this.props.data && this.props.data.toJS && this.props.data.toJS()
        const item = data || params.data
        const { card } = params

        // const isSelf = this.props.user.objectId === user.objectId

        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{card.title}</Text>
                 <HeaderBtn
                    style={styles.headerBtn}
                    title={'查看'}
                    onPress={() => {
                        navigation.navigate('cardInfo', {
                            iCardId: card.objectId
                        })
                    }}/>
            </View>
        )
    }

    renderRow({ item, index }: Object) {

        // console.log('test:', item);
        // const img = item.imgs && item.imgs[0] || null

        return (
                <RecordRow style={[styles.row,{ paddingVertical: 10}]}
                           item={item}
                           navigation={this.props.navigation}/>
        )
    }

    render() {

        const { navigation } = this.props;
        const { state } = navigation;
        const { params } = state;
        const { data } = params
        const userNoNull = this.props.user

        // console.log('userNoNull:', userNoNull);
        // console.log('data:', data);

        const param = {
            'where': {
                ...UserModle(userNoNull.get('objectId')),
                ...iUse(data.objectId)
            }
        }


        return (
            <LCList
                ListHeaderComponent={()=>this._renderHeader(userNoNull,data)}
                style={[this.props.style, styles.list]}
                reqKey={listKey}
                sKey={listKey + params.data.objectId}
                renderItem={this.renderRow.bind(this)}
                noDataPrompt={'还没有记录'}
                //dataMap={(data)=>{
                //   return {[OPENHISTORYLIST]:data.list}
                //}}
                reqParam={param}
            />
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    list: {
        flex: 1,
        backgroundColor: 'white'
    },

    text: {
        // paddingVertical: 3,
        // paddingHorizontal: 5,
        fontSize: 16,
        color: 'rgb(50,50,50)'
    },
    subText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        color: 'rgb(200,200,200)'
    },
    date: {
        fontSize: 14,
        color: 'rgb(100,100,100)',
        marginTop: 5,
        // paddingVertical: 3,
        // paddingHorizontal: 5,
    },
    row: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingVertical: 2,

    },


    image: {
        width: '100%',
        height: 200,
    },
    imgStyle: {
        width: '100%',
        height: 200,
    },
    bottom: {
        marginTop: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 15,
    },
    header: {
        padding: 20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    headerTitle: {
        fontSize: 25,
    },
    headerBtn: {
    },
    headerBtnText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',

    }
})




