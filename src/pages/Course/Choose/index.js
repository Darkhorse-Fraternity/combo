/**
 * Created by lintong on 2018/7/9.
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
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';


@connect(
    state => ({}),
    dispatch => ({})
)


export default class CourseChoose extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '',
        }
    };


    render(): ReactElement<any> {


        return (
            <StyledContent>

            </StyledContent>
        );
    }
}


