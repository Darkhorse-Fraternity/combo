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
import { followList } from '../../../redux/module/leancloud'

import {
    StyledContent,
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import  FollowRow  from './FollowRow'
import {USER} from "../../../redux/reqKeys";

const listKey = USER


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
        const param = {uid:params.userId}

        return (
            <StyledContent>
                {this._renderHeader()}
                <LCList
                    style={{flex:1}}
                    reqKey={listKey}
                    sKey={"followee_" + params.userId}
                    renderItem={(data)=>(<FollowRow data={data} navigation={navigation}/>)}
                    noDataPrompt={'还没有人关注~'}
                    search={followList('ee')}
                    dataMap={(data) => {
                        const list = data['results']
                        const newList = list.map(item => item.followee)
                        return { results: newList }
                    }}
                    reqParam={param}
                />
            </StyledContent>
        );
    }
}


