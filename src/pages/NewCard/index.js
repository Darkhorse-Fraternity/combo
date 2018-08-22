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
import CardRow from './CardRow'
import {
    StyledTitleView,
    StyledTitleText
} from './style'



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


        return (
            <CardRow
                title={item.title}
                des={`人数:${item.useNum}`}
                img={item.img }
                onPress={() => {
                    this.props.navigation.navigate('CardInfo', { iCard: item })
                }}/>
        )

    }

    _listHeaderComponet = () => {
        return (
            <View style={styles.header}>
                <Button
                    style={[styles.itemAdd, styles.shadow]}
                    onPress={() => {
                        this.props.navigation.navigate('Creat')
                    }}>

                    <Icon name="md-add" size={50}/>
                    <Text style={styles.period}>新建卡片</Text>
                </Button>

                <StyledTitleView>
                    <StyledTitleText>
                        结伴同行
                    </StyledTitleText>
                </StyledTitleView>
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
        width: width / 2 - 15,
        height: 200,
        // marginTop: 20,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
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


    list: {
        flex: 1,
    },

    period: {
        marginTop: 5,

    },
    header: {
        // height: width / 3 * 1.4,
        // backgroundColor:'red',
        // paddingHorizontal: 10,
        // marginBottom: 10,
        // alignItems:'center',
        // justifyContent:'center'
    }


})




