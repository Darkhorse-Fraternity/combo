/**
 * Created by lintong on 2018/7/10.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Alert,
    Dimensions
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
    StyledDescribe,
    StyledItem,
    StyledItemContent,
    StyledImg,
    StyledItemTop,
    StyledPagination,
    StyledTipButton,
    StyledTipButtonText,
    StyledReportBtn,
    StyledReportText,
    StyledIcon
} from './style'
import { FieldArray, Field } from 'redux-form/immutable'
import Button from '../../Button'

export const FormID = 'CardPublishForm'
const selector = formValueSelector(FormID) // <-- same as form name

import { Map } from 'immutable';
import { showImagePicker } from '../../../components/ImagePicker/imagePicker'
import { uploadImages } from '../../../redux/actions/util'
import { PopIndicator } from '../../PopIndicator'
import Toast from 'react-native-simple-toast'

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
    (dispatch, props) => ({
        picker: async () => {

            /* 事件的默认动作已被取消*/
            const response = await showImagePicker({
                title: '选择图片',
                maxWidth: 2000, // photos only
                maxHeight: 2000, // photos only
            })

            const { uri } = response

            if (uri) {
                PopIndicator()
                const res = await dispatch(uploadImages([uri],
                    'uploadImages'))
                PopIndicator(false)
                const img = res.payload[0]
                if (img) {
                    return { id: img.id, url: img.attributes.url }
                }

            }
        },
        onSaveLocal: () => {
            dispatch((dispatch,getState)=>{
                const state = getState()
                const keys = selector(state, 'keys');
                const describe = selector(state, 'describe');
                const cover = selector(state, 'cover')
                const imgs = selector(state, 'imgs')
                const initialValues = { describe, keys, cover, imgs }
                // console.log('initialValues:', initialValues);

                // console.log('props:', props.course.get('objectId'));
                const id = props.iCardId
                storage.save({
                    key: "CardPublish"+id,  //注意:请不要在key中使用_下划线符号!
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

export default class CardPublishForm extends Component {


    static propTypes = {
        handleImage: PropTypes.func,
        imageLoad: PropTypes.bool
    };
    static defaultProps = {
        imageLoad: false
    };


    renderTipButton = (fields, index) => {

        const { maxIndex } = this.props
        return (
            <StyledReportBtn onPress={async () => {

                if (fields.length < maxIndex) {
                    let img = await this.props.picker()
                    if (img && img.id) {
                        img = new Map(img)
                        fields.insert(index, new Map({ img }))
                        this.handleViewRef['ppt' + index] &&
                        this.handleViewRef['ppt' + index].root.fadeInRight(800)
                    }

                } else {
                    Toast.show('已达到最大图片数' + maxIndex)
                }


            }}>
                <StyledReportText>
                    + 添加图片
                </StyledReportText>

            </StyledReportBtn>
        )

    }


    handleViewRef = {}
    renderImgs = ({ fields, meta: { error, submitFailed } }) => {

        // console.log('test:', fields, error, submitFailed);
        // const source = require('../../../../../source/img/my/icon-60.png')

        const self = this

        return [
            ...fields.map((ppt, index) => (
                <StyledItem
                    animation="fadeIn"
                    key={'ppt' + index}>
                    {this.renderTipButton(fields, index)}
                    <StyledItemTop>
                        <Button
                            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                            onPress={() => {
                                Alert.alert(
                                    '确定删除?',
                                    '删除后不可恢复',
                                    [{ text: '取消' }, {
                                        text: '确定', onPress: async () => {
                                            self.handleViewRef['ppt' + index] &&
                                            await self.handleViewRef['ppt' + index].root.fadeOutLeft(800)
                                            await fields.remove(index)

                                            self.handleViewRef['ppt' + index] && self.handleViewRef['ppt' + index].root.fadeInUp(800)
                                        }
                                    }]
                                )
                            }}>
                            <StyledIcon size={30} name={'ios-close'}/>
                        </Button>
                        <StyledPagination>
                            {`${index + 1}/${fields.length}`}
                        </StyledPagination>
                    </StyledItemTop>
                    <StyledItemContent
                        useNativeDriver
                        ref={res => this.handleViewRef['ppt' + index] = res}
                        // animation="fadeInRight"
                    >
                        <Field name={`${ppt}.img`}
                               component={props => [
                                   <StyledTipButton
                                       key={'button'}
                                       onPress={async () => {
                                           const img = await this.props.picker()
                                           img && img.id && img.id !== props.input.value.id
                                           && props.input.onChange(new Map(img))
                                       }}>

                                       <StyledTipButtonText>
                                           更换图片
                                       </StyledTipButtonText>
                                   </StyledTipButton>,
                                   <StyledImg
                                       key={'img'}
                                       width={Dimensions.get('window').width - 30}
                                       source={{
                                           uri: props.input.value.get &&
                                           props.input.value.get('url')
                                       }}/>
                               ]}/>

                    </StyledItemContent>
                </StyledItem>
            ))
            ,
            <StyledItem key={'bottom'}>
                {this.renderTipButton(fields, fields.length)}
            </StyledItem>
        ]
    }


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
                        {title}
                    </StyledTitle>
                    <View style={{ flexDirection: 'row' }}>
                        <StyledHeaderBtn
                            load={false}
                            style={{ marginRight: 10 }}
                            disabled={false}
                            hitSlop={{ top: 5, left: 50, bottom: 5, right: 5 }}
                            onPress={onSaveLocal}
                            title={'保存'}/>
                        <StyledHeaderBtn
                            load={load}
                            disabled={!enableSumbmit}
                            hitSlop={{ top: 5, left: 5, bottom: 5, right: 50 }}
                            onPress={onSubmit && handleSubmit(onSubmit)}
                            title={state === 0 ? '发布' : '取消发布'}/>
                    </View>
                </StyledHeader>
                <StyledContent removeClippedSubviews={true}>
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


                    <FieldArray
                        key={'imgs'}
                        name="imgs" component={this.renderImgs}/>

                    <View style={{ height: 200 }}/>
                </StyledContent>
            </Form>
        );
    }
}


