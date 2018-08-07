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
    Alert,
    Image,
    Dimensions
} from 'react-native'

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
import { sliderWidth } from "../Card/Cell/style";
import CardRow from '../NewCard/CardRow'


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


    _renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    打卡记录
                </Text>
            </View>
        )
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
        const days = item.time
        // const reflesh = item.time === iCard.period || item.statu === 'stop'
        // const cycle = parseInt(item.time / iCard.period)
        const { img } = iCard


        return (


            <CardRow
                title={iCard.title}
                des={`人数:${iCard.useNum}`}
                img={iCard.img}
                onPress={() => {
                    this.props.navigation.navigate('RecordDetail', {
                        data: item,
                        card: iCard
                    })
                }}/>
        )
    }

    render() {


        const { params } = this.props.navigation.state
        const statu = params ? params.statu : { "$ne": 'del' }
        const param = {
            where: {
                ...selfUser(),
                statu,
            },
            include: ICARD,
        }
        return (
            <LCList
                ListHeaderComponent={this._renderHeader}
                style={[this.props.style, styles.list]}
                reqKey={IUSE}
                sKey={IRECORD}
                numColumns={2}
                columnWrapperStyle={{ padding: 5 }}
                renderItem={this.renderRow.bind(this)}
                //dataMap={(data)=>{
                //   return {[OPENHISTORYLIST]:data.list}
                //}}
                reqParam={param}
            />
        );
    }
}

const width = Dimensions.get('window').width

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

    subRow: {
        flexDirection: 'row',
        // backgroundColor:'red',
        // alignItems: 'center'
    },
    des: {
        // marginLeft: 10

    },
    card: {
        // marginTop:10,
        // margin: 5,
        backgroundColor: "#f9f9f9",
        // backgroundColor:'red',
        // borderRadius: 5,
        width: width / 2 - 15,
        marginHorizontal: 5,
        borderRadius: 10,

    },
    row: {
        // backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 30,
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',

    },

    header: {
        padding: 15,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
    },

    img: {
        width: '100%',
        height: 250,
        borderRadius: 10,
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
    rightView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowText: {
        fontSize: 13,
        marginRight: 5
    }

})




