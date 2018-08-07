/**
 * Created by lintong on 2018/8/7.
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
    StyledTitle,
    StyledHeaderView,
    StyledTextInputDes
} from './style'

import HeaderBtn from '../../../Button/HeaderBtn'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';


@connect(
    state => ({}),
    dispatch => ({})
)


export default class PPTDescribe extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.state = {
            text:''
        }
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

        const { input } = this.props.navigation.state.params


        return (
            <StyledContent>
                <StyledHeaderView>
                    <StyledTitle>
                        编辑描述
                    </StyledTitle>
                    <HeaderBtn
                        onPress={() => {
                            input.onChange(this.state.text)
                            this.props.navigation.goBack()
                        }}
                        title={"完成"}
                        style={{ paddingHorizontal: 10 }}/>
                </StyledHeaderView>
                <StyledTextInputDes
                    onChangeText={text=>this.setState({text:text})}
                    multiline={true}
                    defaultValue={input.value}
                    maxLength={140}
                    placeholder={'添加文字限140字内'}
                    clearButtonMode='while-editing'
                    enablesReturnKeyAutomatically={true}
                />
            </StyledContent>
        );
    }
}


