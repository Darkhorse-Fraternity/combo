/**
 * Created by lintong on 2017/9/26.
 * @flow
 */
'use strict';


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions,
    Image,
    Platform
} from 'react-native'
import { ICARD, IUSE, CARDLIST } from '../../redux/reqKeys'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/Button'

import { connect } from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';


const listKey = ICARD


@connect(
    state => ({
        data: state.normalizr.get(listKey)
    }),
    (dispatch, props) => ({})
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
            //title: '新建卡片',
        }
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    componentDidMount() {
    }

    renderRow({ item, index }: Object) {

        // console.log('test:', item);
        const source = item.img ? { uri: item.img.url } : require('../../../source/img/my/icon-60.png')
        return (
            <Button
                style={styles.item}
                onPress={() => {
                    this.props.navigation.navigate('CardInfo', { iCard: item })
                    // this.props.use(item)
                }}>
                {Platform.OS === 'ios' && <View style={styles.shadow}/>}
                <Image style={styles.itemImage} source={source}/>
                <View style={styles.row}>
                    <Text
                        // numberOfLines={1}
                        style={styles.title}>{item.title}</Text>
                    <Text style={styles.time}>人数:{item.useNum}</Text>
                </View>

            </Button>
        )
    }

    _listHeaderComponet = () => {
        return (
            <View style={styles.header}>
                <Button
                    style={[styles.itemAdd,styles.shadow]}
                    onPress={() => {
                        this.props.navigation.navigate('Creat')
                    }}>

                        <Icon name="md-add" size={50}/>
                        <Text style={styles.period}>新建卡片</Text>
                </Button>
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
                numColumns={2}
                columnWrapperStyle={{ padding: 5 }}
                renderItem={this.renderRow.bind(this)}
                dataMap={(data) => {
                    return { results: data.result }
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
        // backgroundColor: '#F5FCFF'
    },

    itemAdd: {
        width: (width -50) / 2,
        height: 150,
        // marginTop: 20,
        marginHorizontal: 10,
        marginTop:10,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        // backgroundColor: 'white',
        //height: width / 3 * 1.3,
        // marginTop: 20,
        // backgroundColor:'red',
        // borderRadius: 5,
        width:width/2 -15,
        marginHorizontal: 5,
        borderRadius: 10,
        backgroundColor: "#f9f9f9",
    },

    shadow: {
        backgroundColor: 'white',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: {
            height: 3,
            width: 3,
        },
        borderRadius: 10,
        elevation: 10,
        // margin: 10,
        // elevation: 10,
    },

    itemImage: {
        // backgroundColor: 'white',
        width: '100%',
        height: 250,
        borderRadius: 10,
    },
    row: {
        paddingHorizontal: 10,
        paddingVertical: 30,
    },
    list: {
        flex: 1,
    },
    title: {
        fontSize: 19,
        fontWeight:'600',
        lineHeight:30,
    },
    time: {
        marginTop: 30,
        fontSize: 15,
        // textAlign:'right',
        alignSelf:'flex-end',
        color: 'rgb(150,150,200)',


    },
    period: {
        marginTop: 5,

    },
    header: {
        // height: width / 3 * 1.4,
        // backgroundColor:'red',
        // paddingHorizontal: 10,
        // marginBottom: 10,
        alignItems:'center',
        justifyContent:'center'
    }


})




