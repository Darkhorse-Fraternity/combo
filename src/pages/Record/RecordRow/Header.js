/**
 * Created by lintong on 2018/7/27.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Avatar from '../../../components/Avatar/Avatar2'

import {
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import Button  from '../../../components/Button'

@connect(
    (state, props) => ({
        user: state.normalizr.get('user').get(props.userId)
    }),
    dispatch => ({})
)


export default class Header extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {
        userId: PropTypes.string.isRequired,
        onPress: PropTypes.func
    };
    static defaultProps = {};


    render(): ReactElement<any> {

        let { onPress, user } = this.props
        user = user && user.toJS() || {}

        //缩略图
        return (
            <Button
                onPress={()=>onPress && onPress(user)}
                style={styles.top}>
                <Avatar radius={10} user={user}/>
                <Text style={styles.name}>
                    {user.nickname || '路人甲'}
                </Text>
            </Button>
        );
    }
}


const styles = StyleSheet.create({
    top: {
        marginTop:15,
        paddingVertical: 5,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'red'
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor:'rgba(0,0,0,0.3)'
    },
    name: {
        marginLeft: 5,
        color: '#4e4e4e',
    },


})