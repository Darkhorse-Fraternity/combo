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
    TouchableOpacity,
    Text,
    Image,
    Alert,
    Easing
} from 'react-native'
import {IDO} from '../../redux/reqKeys'
import ZoomImage from 'react-native-zoom-image';
import {selfUser, iCard, iUse} from '../../request/LCModle'
import {mainColor} from '../../configure'
import {connect} from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'
import {update,} from '../../redux/module/leancloud'
import {addListNormalizrEntity} from '../../redux/actions/list'
import {ICARD, IUSE} from '../../redux/reqKeys'

const listKey = IDO


@connect(
    (state, props) => ({
        data: state.normalizr.get(IUSE).get(props.navigation.state.params.data.objectId)
    }),
    (dispatch, props) => ({
        refresh: async (data) => {
            const id = data.objectId
            const card = props.navigation.state.params.card

            const isDone = data.time == card.period

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
        const isDone = data.time == this.props.navigation.state.params.card.period
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

    componentWillReceiveProps(nextProps) {
        // console.log('test:', nextProps);
        // const {navigation} = this.props;
        // const item = nextProps.data.toJS()
        // const data = this.props.data.toJS()
        // const reflesh = item.time !== data.time || item.statu !== data.statu
        // if (reflesh) {
        //
        //     navigation.setParams({data: item})
        // }

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
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{card.title}</Text>
                {reflesh && (
                    <TouchableOpacity
                        style={styles.headerBtn}
                        onPress={() => {
                            // params.refresh(item)
                            this.__refresh(item)
                        }}>
                        <Text style={styles.headerBtnText}>再来一组</Text>
                    </TouchableOpacity>)}
            </View>
        )
    }

    renderRow({item, index}: Object) {

        // console.log('test:', item);
        const img = item.imgs && item.imgs[0] || null

        return (
            <View
                style={styles.row}
                onPress={() => {
                }}>
                {img && (
                    <ZoomImage
                        source={{uri: img}}
                        imgStyle={styles.image}
                        //style={styles.image}
                        //duration={200}
                        //enableScaling={true}
                        easingFunc={Easing.bounce}
                    />
                        // <Image style={styles.image} source={{uri: img}}/>
                )}
                <View style={styles.bottom}>
                    <View>
                        {item.recordText && (<Text style={styles.text}>{item.recordText}</Text>)}
                        <Text style={styles.date}>{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</Text>
                    </View>
                    {!item.recordText && (<Icon name="md-checkmark" size={30} color="green"/>)}
                </View>

                <View style={styles.line}/>
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
    imgStyle:{
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
        padding: 15,
    },
    headerTitle: {
        fontSize: 25,
    },
    headerBtn: {
        backgroundColor: 'black',
        paddingVertical: 3,
        paddingHorizontal: 5,
        marginTop: 10,
        width: 60,
    },
    headerBtnText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',

    }
})




