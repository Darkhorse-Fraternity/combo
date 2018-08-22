/**
 * Created by lintong on 2018/8/22.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form/immutable'
import {formValueSelector} from 'redux-form/immutable'
import {
    StyledContent,
    StyledInput
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
export const FormID = 'CashForm'
const selector = formValueSelector(FormID)

@connect(
    state => {
        const amount = selector(state, amount)
        const name = selector(state, name)
        return {
            enableSumbmit: amount && amount.length > 0 && name && name.length > 0 ,
        }
    },
    dispatch => ({})
)

@reduxForm({
    form: FormID,
})

export default class CashForm extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};


    render(): ReactElement<any> {


        return (
            <StyledContent>
                <StyledInput
                    name='amount'
                    ref='amount'
                    maxLength={50}
                    underlineColorAndroid='transparent'
                    placeholderTextColor='rgb(200,200,200)'
                    placeholder='最小提现金额为10元'/>
                <StyledInput
                    name='name'
                    ref='name'
                    maxLength={50}
                    underlineColorAndroid='transparent'
                    placeholderTextColor='rgb(200,200,200)'
                    placeholder='请输入你的真实姓名'/>

            </StyledContent>
        );
    }
}


