/**
 * Created by lintong on 2018/6/26.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import {
    StyledContent,
    StyledText
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { withNavigation } from 'react-navigation';

@connect(
    state => ({}),
    dispatch => ({})
)

@withNavigation

export default class BackBtn extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {
        onBackPress :PropTypes.func
    };
    static defaultProps = {};


    render(): ReactElement<any> {

        return (
            <StyledContent onPress={()=>{
                this.props.onBackPress?
                    this.props.onBackPress(this.props.navigation.goBack):
                    this.props.navigation.goBack()
            }}>
                <StyledText>返回</StyledText>
            </StyledContent>
        );
    }
}


