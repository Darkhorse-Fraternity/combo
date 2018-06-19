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
    Image,
    Easing
} from 'react-native'
import {IDO} from '../../redux/reqKeys'

import {iCard} from '../../request/LCModle'
import {connect} from 'react-redux'
import * as immutable from 'immutable';
import LCList from '../../components/Base/LCList';

import RecordRow from '../Record/RecordRow'

const listKey = IDO


@connect(
    (state, props) => ({}),
    (dispatch, props) => ({})
)

export default class Detail extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {
        iCard: PropTypes.object
    };

    static defaultProps = {
        iCard: {}
    };
    // static navigationOptions = props => {
    //     const {navigation} = props;
    //     const {state} = navigation;
    //     const {params} = state;
    //     return {
    //         title: params.iCard.title,
    //     }
    // };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }


    componentDidMount() {
        // const {navigation} = this.props;
        // navigation.setParams({refresh:this.__refresh})
    }

    componentWillReceiveProps(nextProps) {
        // console.log('test:', nextProps);


    }


    _renderHeader = () => {
        const {navigation} = this.props;
        const {state} = navigation;
        const {params} = state;

        // console.log('test:', params);
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{params.iCard.title}</Text>
            </View>
        )
    }


    renderRow({item, index}: Object) {

        // console.log('test:', item);
        const avatar = item.user.avatar
        const avatarUrl = avatar && avatar.url
        const avatarSource = avatarUrl ? {uri: avatarUrl} : require('../../../source/img/my/icon-60.png')
        return (
            <View>

                <View style={styles.top}>
                    <Image
                        style={styles.avatar}
                        source={avatarSource}/>
                    <Text style={styles.name}>
                        {item.user.nickname || '路人甲'}
                        完成了任务
                    </Text>
                </View>
                <RecordRow style={styles.row} item={item} navigation={this.props.navigation}/>
            </View>
        )
    }

    render() {

        const {navigation} = this.props;
        const {state} = navigation;
        const {params} = state;
        const param = {
            'where': {
                ...iCard(params.iCard.objectId),
            },
            include: 'user'
        }


        return (
            <LCList
                ListHeaderComponent={this._renderHeader}
                style={[this.props.style, styles.list]}
                reqKey={listKey}
                sKey={listKey + params.iCard.objectId}
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
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    text: {
        paddingVertical: 3,
        // paddingHorizontal: 5,
        fontSize: 16,
        color: 'rgb(50,50,50)'
    },
    date: {
        fontSize: 14,
        color: 'rgb(100,100,100)',
        paddingVertical: 3,
        // paddingHorizontal: 5,
    },
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingVertical: 2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
    },
    image: {
        width: '100%',
        height: 200,
    },
    top: {
        paddingVertical: 5,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginTop:10,
    },
    name: {
        marginLeft: 5,
        color: '#4e4e4e'
    },
    bottom: {
        marginTop: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 15,
    },
    headerBtn: {
        paddingHorizontal: 15,
    },
    header: {
        padding: 15,
    },
    headerTitle: {
        fontSize: 25,
    },

})




