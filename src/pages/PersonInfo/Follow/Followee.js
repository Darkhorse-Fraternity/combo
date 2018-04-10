/**
 * Created by lintong on 2018/4/9.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import LCList from '../../../components/Base/LCList';


import {
    StyledContent,
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { followRow } from './FollowRow'

const listKey = ''


@connect(
    state => ({}),
    dispatch => ({})
)


export default class Follow extends Component {
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

    _renderHeader = () => {

    }

    render(): ReactElement<any> {


        const { navigation } = this.props;
        const { state } = navigation;
        const { params } = state;
        const param = {
            'where': {
                ...selfUser(),
                ...iUse(params.data.objectId)
            }
        }

        return (
            <StyledContent>
                {this._renderHeader()}
                <LCList
                    style={{}}
                    reqKey={listKey}
                    sKey={listKey + params.userId}
                    renderItem={followRow}
                    noDataPrompt={'还没有人关注~'}
                    //dataMap={(data)=>{
                    //   return {[OPENHISTORYLIST]:data.list}
                    //}}
                    reqParam={param}
                />
            </StyledContent>
        );
    }
}


