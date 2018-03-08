/**
 * Created by lintong on 2018/3/6.
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

import AgendaScreen from './agenda'



import { shouldComponentUpdate } from 'react-immutable-render-mixin';


@connect(
    state => ({}),
    dispatch => ({})
)


export default class CardDetail extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        const {navigation} = props;
        const {state} = navigation;
        const {params} = state;
        return {
            title: params.iCard.get('title'),
        }
    };


    render(): ReactElement<any> {
        return (
            <StyledContent>
               <AgendaScreen {...this.props}/>
            </StyledContent>
        );
    }
}


