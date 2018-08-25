/**
 * Created by lintong on 2018/7/10.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
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
    StyledSubTitle,
    StyleImageSelect
} from './style'

import PPT from './ppt'

import Toast from 'react-native-simple-toast'
export const FormID = 'CourseForm'
const selector = formValueSelector(FormID) // <-- same as form name

@connect(
    (state, props) => {
        const title = selector(state, 'title');
        const subtitle = selector(state, 'subtitle');
        const cover = selector(state, 'cover');
        const ppt = selector(state, 'ppt');
        const config = [title, cover,ppt]
        const { cance,initialValues } = props
        // console.log('imgs:', imgs);
        const isEmpty = value => value === undefined || value === null ||
            value === '' || value.length === 0;

        return {
            enableSumbmit: config.findIndex(isEmpty) === -1 || cance,
            initialValues: initialValues
        }
    },
    (dispatch,props) => ({
        onSaveLocal: () => {
            dispatch((dispatch,getState)=>{
                const state = getState()
                const title = selector(state, 'title');
                const subtitle = selector(state, 'subtitle');
                const cover = selector(state, 'cover')
                const ppt = selector(state, 'ppt')
                const initialValues = { title, subtitle, cover, ppt }
                // console.log('initialValues:', initialValues);

                // console.log('props:', props.course.get('objectId'));
                const id = props.course.get('objectId')
                storage.save({
                    key: "course",
                    id,  //注意:请不要在key中使用_下划线符号!
                    data: initialValues,
                });
                Toast.show('保存成功')
            })

        }
    })
)
@reduxForm({
    form: FormID,
})

@immutableRenderDecorator

export default class CourseForm extends Component {


    static propTypes = {
        handleImage: PropTypes.func,
        imageLoad: PropTypes.bool
    };
    static defaultProps = {
        imageLoad: false
    };


    render(): ReactElement<any> {

        const {
            handleSubmit,
            onSubmit,
            load,
            disabled,
            pristine,
            enableSumbmit,
            cance,
            onSaveLocal,
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
                        创建课程
                    </StyledTitle>


                    <View style={{ flexDirection: 'row' }}>
                        <StyledHeaderBtn
                            load={false}
                            style={{ marginRight: 10 }}
                            disabled={false}
                            hitSlop={{ top: 5, left: 50, bottom: 5, right: 10 }}
                            onPress={onSaveLocal}
                            title={'保存'}/>
                        <StyledHeaderBtn
                            load={load}
                            disabled={!enableSumbmit}
                            hitSlop={{ top: 5, left: 10, bottom: 5, right: 50 }}
                            onPress={onSubmit && handleSubmit(onSubmit)}
                            title={cance ? '取消发布' : '发布'}/>
                    </View>
                </StyledHeader>
                <StyledContent removeClippedSubviews={true}>
                    <View style={{ overflow: 'hidden' }}>
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

                    </View>
                    <PPT {...this.props} maxIndex={20}/>
                    <View style={{ height: 200, overflow: 'hidden' }}/>


                </StyledContent>
            </Form>
        );
    }
}


