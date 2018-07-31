/**
 * Created by lintong on 2018/4/12.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import HeaderBtn from '../../../components/Button/HeaderBtn'


import {
    StyledRowContent,
    StyledInnerView,
    StyledSmallAvatar,
    StyledInnerRight,
    StyledName,
    StyledArrow,
    StyledDiscrib
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import moment from 'moment'

@connect(
    state => ({}),
    dispatch => ({})
)


export default class FollowRow extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {
        data: PropTypes.object.isRequired
    };
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

        const { data, navigation } = this.props
        const { item, index } = data
        const { avatar, headimgurl, nickname } = item

        const avatarUrl = avatar ? avatar.url : headimgurl
        const avatarSource = avatarUrl ? { uri: avatarUrl } :
            require('../../../../source/img/my/icon-60.png')
        const name = nickname || '路人甲'
        return (
            <StyledRowContent onPress={() => {
                navigation.navigate('Following', { user: item })
            }}>
                <StyledInnerView>
                    <StyledSmallAvatar source={avatarSource}/>
                    <StyledInnerRight>
                        <StyledName>
                            {name}
                        </StyledName>
                        <StyledDiscrib>
                            加入时间:{moment(item.createdAt).format("YYYY-MM-DD")}
                        </StyledDiscrib>
                    </StyledInnerRight>
                </StyledInnerView>
                <StyledArrow/>
            </StyledRowContent>
        );
    }
}


