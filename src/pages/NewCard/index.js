/**
 * Created by lintong on 2017/9/26.
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
    Dimensions,
    Image
} from 'react-native'
import {ICARD, IUSE, CARDLIST} from '../../redux/reqKeys'
import Icon from 'react-native-vector-icons/Ionicons'

import {selfUser, iCard} from '../../request/LCModle'
import {mainColor} from '../../configure'
import {connect} from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';
import Toast from 'react-native-simple-toast';
import {add} from '../../redux/module/leancloud'
import {addListNormalizrEntity} from '../../redux/actions/list'

import moment from 'moment'

const listKey = ICARD


@connect(
    state => ({
        data: state.normalizr.get(listKey)
    }),
    (dispatch, props) => ({
        use: async (card) => {

            const param = {
                cycle: 0,
                time: 0,
                // notifyTime:option&&option.notifyTime||"20.00",
                doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
                ...selfUser(),
                ...iCard(card.objectId)
            }
            const res = await add(param, IUSE)
            const entity = {
                ...param,
                ...res
            }
            dispatch(addListNormalizrEntity(IUSE, entity))
            props.navigation.goBack()
            Toast.show('你接受了一个卡片' + card.title)
        }

    })
)

export default class Publish extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};

    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            // title: '选择卡片',
        }
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    componentDidMount() {
    }

    renderRow({item, index}: Object) {

        // console.log('test:', item);
        const source = item.img ? {uri: item.img.url} : require('../../../source/img/my/icon-60.png')
        return (
            <TouchableOpacity
                onPress={() => {
                    // this.props.navigation.navigate('PublishDetail', {iCardID: item.objectId, data: item})
                    // this.props.use(item)
                }}>
                <Image style={styles.item} source={source}/>
                <Text
                    numberOfLines={1}
                    style={styles.title}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        )
    }

    _listHeaderComponet = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.item, {justifyContent: 'center'}]}
                    onPress={() => {
                        this.props.navigation.navigate('Creat')
                    }}>
                    <Icon name="md-add" size={50}/>
                    <Text style={styles.period}>新建卡片</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {

        return (
            <LCList
                ListHeaderComponent={this._listHeaderComponet}
                style={[this.props.style, styles.list]}
                reqKey={listKey} //在normalizr 中的位置
                sKey={CARDLIST}  //在list 中的位置
                callPath={CARDLIST} //表示走云函数,并告知云函数的路径
                numColumns={3}
                columnWrapperStyle={{paddingHorizontal: 10}}
                renderItem={this.renderRow.bind(this)}
                dataMap={(data) => {
                    return {results: data.result}
                }}
                reqParam={{}}
            />
        );
    }
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    item: {
        backgroundColor: 'white',
        width: (width - 50) / 3,
        height: width / 3 * 1.3,
        marginTop: 10,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            height: 0.5,
            width: 0.1,
        },
        // elevation:10,
    },
    list: {
        flex: 1,
    },
    title: {
        color: "black",
        marginTop: 10,
        fontSize: 16,
        maxWidth: width / 3 - 20,
        alignSelf: 'center'

    },
    period: {
        marginTop: 5,

    },
    header: {
        height: width / 3 * 1.4,
        // backgroundColor:'red',
        paddingHorizontal: 10
    }


})




