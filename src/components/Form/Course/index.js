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
    StyleImageSelect
} from './style'


export const FormID = 'CourseForm'
const selector = formValueSelector(FormID) // <-- same as form name

@connect(
    (state, props) => {
        const title = selector(state, 'title');
        const subtitle = selector(state, 'subtitle');
        const cover = selector(state, 'cover');
        const config = [title, cover]
        // console.log('imgs:', imgs);
        const isEmpty = value => value === undefined || value === null ||
            value === '';

        return {
            enableSumbmit: config.findIndex(isEmpty) === -1,
            initialValues: props.initialValues
        }
    },
    dispatch => ({})
)
@reduxForm({
    form: FormID,
})

@immutableRenderDecorator

export default class CourseForm extends Component {


    static propTypes = {
        handleImage:PropTypes.func,
        imageLoad:PropTypes.bool
    };
    static defaultProps = {
        imageLoad:false
    };


    render(): ReactElement<any> {

        const { handleSubmit, onSubmit, load, disabled, pristine, enableSumbmit, ...rest } = this.props
        const { submitting, invalid } = rest


        return (
            <Form
                behavior={'padding'}
                keyboardVerticalOffset={65}
            >


                <StyledHeader>
                    <StyledTitle>
                        创建课程
                    </StyledTitle>
                    <StyledHeaderBtn
                        load = {load}
                        disabled={!enableSumbmit}
                        hitSlop={{ top: 5, left: 50, bottom: 5, right: 50 }}
                        onPress={onSubmit && handleSubmit(onSubmit)}
                        title='发布'/>
                </StyledHeader>
                <StyledContent>
                    <StyleImageSelect
                        imageLoad={this.props.imageLoad}
                        handleImage={this.props.handleImage}
                        name='cover'/>

                    <StyledHearderTitle
                        name='title'
                        ref='title'
                        maxLength={37}
                        style={{ height: 60 }}
                        underlineColorAndroid='transparent'
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            this.refs['subtitle'].root.focus()
                        }}
                        placeholderTextColor='rgb(100,100,100)'
                        placeholder='点此输入标题'/>

                    <StyledHearderTitle
                        name='subtitle'
                        ref='subtitle'
                        maxLength={37}
                        style={{ fontSize: 17 }}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='rgb(200,200,200)'
                        placeholder='点此输入副标题(选填)'/>

                    <View style={{ height: 200 }}/>
                </StyledContent>
            </Form>
        );
    }
}


