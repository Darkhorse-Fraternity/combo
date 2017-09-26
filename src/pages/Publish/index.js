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
    Dimensions
} from 'react-native'
import {ICARD} from '../../redux/reqKeys'

import {selfUser} from '../../request/LCModle'
import {mainColor} from '../../configure'
import {connect} from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';

const listKey = ICARD


@connect(
    state =>({
        data: state.normalizr.get(listKey)
    }),

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
            title: '我的发布',
        }
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    componentDidMount() {
    }

    renderRow({item, index}: Object) {

        // console.log('test:', item);
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={()=>{
                    this.props.navigation.navigate('PublishDetail',{iCardID:item.objectId,title:item.title})
            }}>
                <Text
                    numberOfLines={1}
                    style={styles.title}>
                    {item.title}
                    </Text>
                <Text style={styles.period}>周期:{item.period}天</Text>
            </TouchableOpacity>
        )
    }

    render() {

        const param = {
            'where': selfUser()
        }
        return (
            <LCList
                renderHeader={this._renderHeader}
                style={[this.props.style,styles.list]}
                reqKey={listKey}
                numColumns={3}
                columnWrapperStyle={{paddingHorizontal:10}}
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
    item:{
        backgroundColor:'white',
        width:(width-50)/3,
        height:width/3*1.3,
        marginTop:10,
        marginHorizontal:5,
        borderRadius:10,
        alignItems:'center',
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            height: 0.5,
            width: 0.1,
        },
        elevation:10,
    },
    list: {
        flex: 1,
    },
    title:{
        color:"black",
        marginTop:10,
        fontSize:16,
        maxWidth:width/3-20

    },
    period:{
        marginTop:5,

    }




})




