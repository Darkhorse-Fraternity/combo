/**
 * Created by lintong on 2018/7/10.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { formValueSelector } from 'redux-form/immutable'
import { reduxForm } from 'redux-form/immutable'
import {
    Form,
    StyledContent,
    StyledHeader,
    StyledTitle,
    StyledHeaderBtn,
    StyledHearderTitle,
    StyleImageSelect,
    StyledDescribe
} from './style'


export const FormID = 'CardPublishForm'
const selector = formValueSelector(FormID) // <-- same as form name

@connect(
    (state, props) => {
        // const title = selector(state, 'keys');
        // const subtitle = selector(state, 'subtitle');
        const cover = selector(state, 'cover');
        const config = [cover]
        // console.log('imgs:', imgs);
        const isEmpty = value => value === undefined || value === null ||
            value === '';

        const CardState = props.state

        return {
            enableSumbmit: CardState === 0 || config.findIndex(isEmpty) === -1,
            initialValues: props.initialValues
        }
    },
    dispatch => ({})
)
@reduxForm({
    form: FormID,
})

@immutableRenderDecorator

export default class CardPublishForm extends Component {


    static propTypes = {
        handleImage:PropTypes.func,
        imageLoad:PropTypes.bool
    };
    static defaultProps = {
        imageLoad:false
    };


    render(): ReactElement<any> {

        const {
            handleSubmit,
            onSubmit,
            load,
            disabled,
            pristine,
            enableSumbmit,
            state,
            title,
            ...rest
        } = this.props
        const { submitting, invalid } = rest




        return (
            <Form
                behavior={'padding'}
                keyboardVerticalOffset={65}
            >


                <StyledHeader>
                    <StyledTitle>
                        {title}
                    </StyledTitle>
                    <StyledHeaderBtn
                        load = {load}
                        disabled={!enableSumbmit}
                        hitSlop={{ top: 5, left: 50, bottom: 5, right: 50 }}
                        onPress={onSubmit && handleSubmit(onSubmit)}
                        title={state === 0 ?'发布':'取消发布'}/>
                </StyledHeader>
                <StyledContent>
                    <StyleImageSelect
                        imageLoad={this.props.imageLoad}
                        handleImage={this.props.handleImage}
                        name='cover'/>

                    {/*<StyledHearderTitle*/}
                        {/*name='title'*/}
                        {/*ref='title'*/}
                        {/*maxLength={37}*/}
                        {/*style={{ height: 60 }}*/}
                        {/*underlineColorAndroid='transparent'*/}
                        {/*returnKeyType='next'*/}
                        {/*onSubmitEditing={() => {*/}
                            {/*this.refs['subtitle'].root.focus()*/}
                        {/*}}*/}
                        {/*placeholderTextColor='rgb(100,100,100)'*/}
                        {/*placeholder='点此输入标题'/>*/}

                    <StyledHearderTitle
                        name='keys'
                        ref='keys'
                        maxLength={37}
                        style={{ fontSize: 15 }}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='rgb(200,200,200)'
                        placeholder='点此输入关键字,多个之间以 ","相隔离'/>


                    <StyledDescribe
                        name='describe'
                        ref='describe'
                        maxLength={500}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='rgb(200,200,200)'
                        placeholder='圈子描述'/>
                    <View style={{ height: 200 }}/>
                </StyledContent>
            </Form>
        );
    }
}


