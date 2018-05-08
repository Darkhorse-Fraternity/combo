/**
 * Created by lintong on 2017/7/14.
 * @flow
 */
'use strict';


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    Alert
} from 'react-native'

import { mainColor } from '../../configure'
import { connect } from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';
import { IRECORD, ICARD, IUSE } from '../../redux/reqKeys'
import { selfUser } from '../../request/LCModle'
import Icon from 'react-native-vector-icons/Ionicons'
import { update, search } from '../../redux/module/leancloud'
import { SwipeAction } from 'antd-mobile'
import { claerByID } from '../../redux/actions/list'
import { addNormalizrEntity } from '../../redux/module/normalizr'
import Button from '../../components/Button'
import * as Animatable from 'react-native-animatable';

const heightZoomIn = {
    from: {
        height: 100,
        translateX: 500,
    },
    to: {
        height: 0,
        translateX: 500,
    },
}
Animatable.initializeRegistryWithDefinitions({ heightZoomIn })
@connect(
    state => ({
        data: state.list.get(IRECORD),
        iCard: state.normalizr.get(ICARD),
        user: state.user.data
    }),
    dispatch => ({

        delete: async (objectId, callBack) => {
            // await remove(objectId,IUSE)
            // 做伪删除

            const param = {
                statu: 'del'
            }
            const res = await update(objectId, param, IUSE)
            const entity = {
                ...param,
                ...res
            }
            dispatch(addNormalizrEntity(IUSE, entity))

            dispatch(claerByID(IRECORD, objectId))
            callBack && callBack()

            //刷新首页的数据
            dispatch(search(false, {
                where: {
                    ...selfUser(),
                    statu: 'start'
                },
                order: 'doneDate'


            }, IUSE))
        },
    })
)

export default class Record extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            scrollEnabled: true
        }
    }

    static propTypes = {};

    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            // title: '我的记录',
        }
    };

    shouldComponentUpdate(nextProps: Object, nextState: Object) {
        return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
    }


    __delete = (index, objectId) => {
        const self = this
        Alert.alert(
            '确定删除?',
            '删除后不可恢复~！',
            [{ text: '取消' }, {
                text: '确定', onPress: async () => {
                    const last = self.props.data.get('listData').size - 1 === index
                    const itemView = this.rows[index]
                    ///因为view 是根据key 复用的，所以最后需要还原，否则会出错

                    await itemView.fadeOutLeft(500)
                    const endState = await itemView.heightZoomIn(500)
                    endState.finished && self.props.delete(objectId, () => {
                        !last && itemView.bounce(1)
                    })
                }
            }]
        )
    }
    rows = []

    renderRow({ item, index }: Object) {
        // md-refresh

        const iCardId = item[ICARD]
        const card = this.props.iCard.get(iCardId)
        const iCard = card && card.toJS()
        // console.log('test:', item);

        if (!iCard) {
            console.log('iCardId:', iCardId, iCard);
            return <View/>
        }
        const days = iCard.period * (item.cycle ) + (item.time )
        const reflesh = item.time === iCard.period || item.statu === 'stop'
        return (
            <Animatable.View
                ref={(row) => this.rows[index] = row}
            >
                <SwipeAction
                    style={styles.card}
                    autoClose
                    right={[
                        {
                            text: '删除',
                            onPress: () => this.__delete(index, item.objectId),
                            style: { backgroundColor: '#F4333C', color: 'white', fontSize: 17 },
                        },
                    ]}
                    // onOpen={() => console.log('global open')}
                    // onClose={() => console.log('global close')}
                >
                    <Button
                        style={{ flex: 1 }}
                        onPress={() => {
                            // this.props.navigation.navigate('RecordDetail',{data:item,card:iCard})

                            this.props.navigation.navigate('CardDetail', {
                                iUse: item,
                                iCard: iCard
                            })

                        }}>
                        <View style={styles.row}>
                            <View style={styles.subRow}>
                                <Icon style={styles.icon}
                                      name={reflesh ? 'ios-refresh' : "ios-walk"} size={50}/>
                                <View style={styles.des}>
                                    <Text style={styles.title}>{iCard.title}</Text>
                                    <Text style={styles.time}>坚持了{days}天</Text>
                                </View>
                            </View>
                            <Text style={styles.time}>第{item.cycle + 1}组</Text>
                        </View>
                    </Button>
                </SwipeAction>
            </Animatable.View>
        )
    }

    render() {

        const param = {
            where: {
                ...selfUser(),
                statu: { "$ne": 'del' },
            },
            include: ICARD,
        }
        return (
            <LCList
                style={[this.props.style, styles.list]}
                reqKey={IUSE}
                sKey={IRECORD}
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
    wrap: {
        flex: 1,

    },
    list: {
        flex: 1,
        backgroundColor: 'white',
    },

    text: {
        marginLeft: 5,
        fontSize: 16,
        color: 'rgb(150,150,150)'
    },
    subText: {
        // marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        color: 'rgb(200,200,200)'
    },
    date: {
        fontSize: 14,
        color: 'rgb(100,100,100)'
    },
    row: {
        // backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
    },
    subRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    des: {
        marginLeft: 15
    },
    card: {
        // marginTop:10,
        // margin: 5,
        backgroundColor: "#fff",
        borderRadius: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0.3,
        }
    },
    title: {
        fontSize: 16,
    },
    time: {
        marginTop: 3,
        fontSize: 13,
    }

})




