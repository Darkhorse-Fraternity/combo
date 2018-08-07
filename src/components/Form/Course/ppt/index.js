/**
 * Created by lintong on 2018/8/1.
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Alert
} from 'react-native'
import PropTypes from 'prop-types';
import Button from '../../../Button'

import {
    StyledContent,
    StyledTitle,
    StyledSubTitle,
    StyledReportBtn,
    StyledReportText,
    StyledItem,
    StyledImg,
    StyledItemContent,
    StyledTextInput,
    StyledItemTop,
    StyledPagination,
    StyledIcon,
    StyledBottom,
    StyledTipButton,
    StyledTipButtonText
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { required } from "../../../../request/validation";
import { FieldArray, Field } from 'redux-form/immutable'
import { Map } from 'immutable';
import { connect } from 'react-redux'
import { showImagePicker } from '../../../../components/ImagePicker/imagePicker'

@connect(
    state => ({}),

    (dispatch, props) => ({
        picker: async () => {

            /* 事件的默认动作已被取消*/
            const response = await showImagePicker({
                title: '选择图片',
                maxWidth: 2000, // photos only
                maxHeight: 2000, // photos only
            })
            return response.uri

            // if (response.uri) {
            //
            // }
            // dispatch(pickerImage())

        },
    })
)

export default class ppt extends Component {
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


    renderTipButton = (fields, index) => {

        return (
            <StyledReportBtn onPress={async () => {
                const url = await this.props.picker()
                url && url.length > 0 &&
                fields.insert(index, new Map({ img: url }))
                this.handleViewRef['ppt' + index] &&
                this.handleViewRef['ppt' + index].root.fadeInRight(800)

            }}>
                <StyledReportText>
                    + 添加页面
                </StyledReportText>

            </StyledReportBtn>
        )

    }

    handleViewRef = {}
    renderPPT = ({ fields, meta: { error, submitFailed } }) => {

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
                            hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
                            onPress={() => {
                                Alert.alert(
                                    '确定删除?',
                                    '删除后不可恢复',
                                    [{ text: '取消' }, {
                                        text: '确定', onPress: async () => {
                                            self.handleViewRef['ppt' + index] &&
                                            await self.handleViewRef['ppt' + index].root.fadeOutLeft(800)
                                            fields.remove(index)
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
                        ref={res => this.handleViewRef['ppt' + index] = res}
                        // animation="fadeInRight"
                    >
                        <Field name={`${ppt}.img`}
                               component={props => [
                                   <StyledTipButton
                                       key={'button'}
                                       onPress={async () => {
                                           const url = await this.props.picker()
                                           url && url.length > 0 && url !== props.input.value
                                           && props.input.onChange(url)
                                       }}>
                                       <StyledTipButtonText>
                                           跟换图片
                                       </StyledTipButtonText>
                                   </StyledTipButton>,
                                   <StyledImg
                                       key={'img'}
                                       width={Dimensions.get('window').width - 30}
                                       source={{ uri: props.input.value }}/>
                               ]}/>


                        <StyledBottom>
                            <StyledTextInput
                                name={`${ppt}.text`}
                                maxLength={100}
                                placeholder={'添加文字 (选填)'}/>
                        </StyledBottom>
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


        return [
            <View
                key={'top'}
                style={{
                    flexDirection: 'row',
                    overflow: 'hidden',
                    alignItems: 'center',
                    padding: 15
                }}>
                <StyledTitle>
                    页面列表
                </StyledTitle>
                <StyledSubTitle>
                    点击卡片编辑单页内容
                </StyledSubTitle>

            </View>,
            <FieldArray
                key={'ppt'}
                name="ppt" component={this.renderPPT}/>

        ];
    }
}


