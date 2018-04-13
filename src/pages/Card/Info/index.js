/**
 * Created by lintong on 2018/4/13.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import {
    StyledContent,
    StyledBottomMenu,
    StyledIcon
} from './style'







import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import ShareView from '../../../components/Share/ShareView'
import Pop from '../../../components/Pop'



@connect(
    state => ({}),
    dispatch => ({})
)


export default class Info extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};



    _renderBottomMenu = (params) => {

        const { iCard, iUse } = params
        const { navigation } = this.props;



        return (
            <StyledBottomMenu>
                <TouchableOpacity
                    hitSlop={{ top: 10, left: 10, bottom: 10, right: 20 }}
                    onPress={() => {
                        Pop.show(<ShareView iCard={iCard} iUse={iUse} />, {
                            animationType: 'slide-up',
                            wrapStyle: {
                                justifyContent: 'flex-end',
                            }
                        })
                    }}>
                    <StyledIcon name={'md-share'} size={30} color={'white'}/>
                </TouchableOpacity>
                {iCard.user === this.props.user.objectId && iUse.statu !== 'del' &&
                (<TouchableOpacity
                    hitSlop={{ top: 10, left: 20, bottom: 10, right: 20 }}
                    onPress={() => {
                        navigation.navigate('PublishDetail',
                            {iCardID:iCard.objectId, data:iCard})
                    }}>
                    <StyledIcon name={'md-settings'} size={30} color={'white'}/>
                </TouchableOpacity>)}
                <TouchableOpacity
                    hitSlop={{ top: 10, left: 20, bottom: 10, right: 10 }}
                    onPress={this.props.stop}>
                    <StyledIcon name={'md-trash'} size={30} color={'white'}/>
                </TouchableOpacity>
            </StyledBottomMenu>
        )

    }

    render(): ReactElement<any> {

        const { navigation } = this.props;
        const { state } = navigation;
        const { params } = state;


        return (
            <StyledContent>
                {this._renderBottomMenu(params)}
            </StyledContent>
        );
    }
}


