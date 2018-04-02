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
    Image
} from 'react-native'
import { ICARD, IUSE, CARDLIST } from '../../redux/reqKeys'
import Icon from 'react-native-vector-icons/Ionicons'


import { mainColor } from '../../configure'
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
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    this.props.navigation.navigate('CardInfo', { iCard: item })
                    // this.props.use(item)
                }}>
                <View style={styles.shadow}/>
                <Image style={styles.itemImage} source={source}/>
                <View style={styles.itemTextView}>
                    <Text
                        numberOfLines={1}
                        style={styles.title}>
                        {item.title}
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }

    _listHeaderComponet = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.item,
                        styles.shadow,{marginLeft:15}]}
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
                columnWrapperStyle={{ paddingHorizontal: 10 }}
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
        backgroundColor: '#F5FCFF'
    },
    item: {
        backgroundColor: 'white',
        width: (width - 50) / 3,
        height: width / 3 * 1.3,
        marginTop: 20,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 10,
        justifyContent: 'center',

    },

    shadow: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left:0,
        right:0,
        bottom: 0,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: {
            height: 10,
            width: 0,
        },
        borderRadius: 10,
        // elevation: 10,
    },

    itemImage: {
        backgroundColor: 'white',
        width: (width - 50) / 3,
        height: width / 3 * 1.3,
        borderRadius: 10,
    },
    itemTextView:{
      width:"100%",
        position: 'absolute',
        bottom: 0,
        backgroundColor:'rgba(0,0,0,0.5)',
        alignItems:'center',
        justifyContent:'center',
        height:25,
        borderRadius:10,

    },
    list: {
        flex: 1,
    },
    title: {
        color: "white",
        fontSize: 16,

    },
    period: {
        marginTop: 5,

    },
    header: {
        height: width / 3 * 1.4,
        // backgroundColor:'red',
        paddingHorizontal: 10,
        marginBottom:10,
    }


})




