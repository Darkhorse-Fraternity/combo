/**
 * Created by lintong on 2017/8/31.
 * @flow
 */
'use strict';


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    Alert,
} from 'react-native'
import {IDO} from '../../redux/reqKeys'
import {selfUser, iUse} from '../../request/LCModle'
import {mainColor} from '../../configure'
import {connect} from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';
import {update,} from '../../redux/module/leancloud'
import {addListNormalizrEntity} from '../../redux/actions/list'
import {IUSE} from '../../redux/reqKeys'
import {claerByID} from '../../redux/actions/list'
import {addNormalizrEntity} from '../../redux/module/normalizr'
import HeaderBtn from '../../components/Button/HeaderBtn'
import RecordRow from './RecordRow'
const listKey = IDO


@connect(
    (state, props) => ({
        data: state.normalizr.get(IUSE).get(props.navigation.state.params.data.objectId),
        load: state.req.get(IUSE).get('load')
    }),
    (dispatch, props) => ({
        refresh: async (data) => {
            const id = data.objectId
            const card = props.navigation.state.params.card

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
            dispatch(claerByID(IUSE,id))
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
    // static navigationOptions = props => {
    //     const {navigation} = props;
    //     const {state} = navigation;
    //     const {params} = state;
    //     const item = params.data
    //     const card = params.card
    //     const reflesh = item.time == card.period || item.statu == 'stop'
    //     return {
    //         headerRight: reflesh && (
    //             <TouchableOpacity
    //                 style={styles.headerBtn}
    //                 onPress={() => {
    //                     params.refresh(item)
    //
    //                 }}>
    //                 <Icon style={styles.icon} name={reflesh ? 'ios-refresh' : "ios-walk"} size={30}/>
    //             </TouchableOpacity>)
    //     }
    // };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }


    __refresh = (data) => {
        const isDone = data.time === this.props.navigation.state.params.card.period
        Alert.alert(
            isDone ? '再来一组?' : '重新开启',
            '',
            [{text: '取消'}, {text: '确定', onPress: () => this.props.refresh(data)}]
        )
    }

    componentDidMount() {
        // const {navigation} = this.props;
        // navigation.setParams({refresh: this.__refresh})
    }





    _renderHeader = () => {
        const {navigation} = this.props;
        const {state} = navigation;
        const {params} = state;
        const data = this.props.data && this.props.data.toJS()
        const item = data || params.data
        const card = params.card
        const reflesh = item.time === Number(card.period) || item.statu === 'stop'

        // console.log('test:', item);
        let text = item.time === Number(card.period) ?
            "再来一组" :
            "继续打卡"
        if(!reflesh){
            text = "暂停打卡"
        }
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{card.title}</Text>
                <HeaderBtn
                    style={styles.headerBtn}
                    load={this.props.load}
                    title={text}
                    onPress={() => {
                        // params.refresh(item)
                        if (reflesh) {
                            this.__refresh(item)
                        } else {
                            this.props.stop(item)
                        }
                    }}/>
            </View>
        )
    }

    renderRow({item, index}: Object) {

        // console.log('test:', item);
        // const img = item.imgs && item.imgs[0] || null

        return (
            <View
                style={styles.row}
                onPress={() => {
                }}>
               <RecordRow item={item}  navigation={this.props.navigation}/>
                {/*<View style={styles.line}/>*/}
            </View>
        )
    }

    render() {

        const {navigation} = this.props;
        const {state} = navigation;
        const {params} = state;
        const param = {
            'where': {
                ...selfUser(),
                ...iUse(params.data.objectId)
            }
        }


        return (
            <LCList
                ListHeaderComponent={this._renderHeader}
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
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
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
    },
    headerTitle: {
        fontSize: 25,
    },
    headerBtn: {
        marginTop: 10,
        width: 85,
    },
    headerBtnText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',

    }
})




