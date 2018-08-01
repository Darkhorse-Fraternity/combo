/**
 * Created by lintong on 2018/8/1.
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
    View,
    Dimensions,

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
    StyledBottom
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { required } from "../../../../request/validation";
import { FieldArray } from 'redux-form/immutable'
import { Map } from 'immutable';
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


    renderTipButton = (fields) => {

        return (
            <StyledReportBtn onPress={() => {
                fields.push(new Map())
            }}>
                <StyledReportText>
                    + 添加页面
                </StyledReportText>

            </StyledReportBtn>
        )

    }


    renderPPT = ({ fields, meta: { error, submitFailed } }) => {

        console.log('test:', fields, error, submitFailed);
        const source = require('../../../../../source/img/my/icon-60.png')
        return (
            <View>
                {fields.map((ppt, index) => (
                    <StyledItem key={'ppt'+index}>
                        {this.renderTipButton(fields)}
                        <StyledItemTop>
                            <Button onPress={()=>{
                                fields.remove(index)
                            }}>
                                <StyledIcon size={30} name={'ios-close'}/>
                            </Button>
                            <StyledPagination>
                                {`${index+1}/${fields.length}`}
                            </StyledPagination>
                        </StyledItemTop>
                        <StyledItemContent>
                            <StyledImg
                                width={Dimensions.get('window').width - 30}
                                source={source}/>
                            <StyledBottom>
                                <StyledTextInput
                                    name={`${ppt}.text`}
                                    maxLength={100}
                                    placeholder={'添加文字 (选填)'}/>
                            </StyledBottom>
                        </StyledItemContent>
                    </StyledItem>
                ))}
                <StyledItem>
                    {this.renderTipButton(fields)}
                </StyledItem>
            </View>
        )
    }




    render(): ReactElement<any> {


        return (
            <StyledContent>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
                    <StyledTitle>
                        页面列表
                    </StyledTitle>
                    <StyledSubTitle>
                        点击卡片编辑单页内容
                    </StyledSubTitle>

                </View>
                {/*{this.__rederItem()}*/}
                <FieldArray name="ppt" component={this.renderPPT}/>

            </StyledContent>
        );
    }
}


