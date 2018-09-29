/**
 * Created by lintong on 2018/5/8.
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
import FollowRow from '../../More/Follow/FollowRow'
import { IUSE,USER } from "../../../redux/reqKeys";
import {iCard} from "../../../request/LCModle";

import {
    StyledContent,
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';

const listKey = IUSE

@connect(
    state => ({
        users:state.normalizr.get('user')
    }),
    dispatch => ({})
)


export default class CardUse extends Component {
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


    _renderItem = (data)=>{
        const nData = {
            index:data.index,
            item:this.props.users.get(data.item.user).toJS()
        }
        return (
            <FollowRow data={nData} navigation={this.props.navigation}/>
        )
    }

    render(): ReactElement<any> {

        const {params} = this.props.navigation.state;

        const pCard = params && params.iCard
        if(!pCard){return null}
        const param = {
            where: {
                ...iCard(pCard.objectId),
                statu: { "$ne": 'del' },

            },
            include: USER
        }




        return (
            <StyledContent>
                <LCList
                    style={{ flex: 1 }}
                    reqKey={listKey}
                    sKey={"CardUse"+ pCard.objectId}
                    renderItem={this._renderItem}
                    noDataPrompt={'还没有人关注~'}
                    //search={followList('ee')}
                    // dataMap={(data) => {
                    //     console.log('data:', data);
                    //     const list = data['results']
                    //     return { results: list }
                    // }}
                    reqParam={param}
                />
            </StyledContent>
        );
    }
}


