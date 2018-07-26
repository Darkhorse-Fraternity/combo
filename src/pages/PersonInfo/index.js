/* @flow */
'use strict';
import React from 'react';
import {
} from 'react-native'
import imagePicker from '../../components/ImagePicker/imagePicker'
import { connect } from 'react-redux'
import { uploadAvatar } from '../../redux/actions/util'

import {
    StyledContent,
    StyledButton,
    StyledAvatar,
    StyledArrow,
    StyledTitle,
    StyledRow,
    StyledDes
}from './style'





@connect(
    state => ({
        userData: state.user.data,
    }),
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch)


        picker: (e) => {


                /* 事件的默认动作已被取消*/
                imagePicker({
                    title: '修改头像',
                    maxWidth: 500, // photos only
                    maxHeight: 500, // photos only
                }, (response) => {
                    // console.log('Response = ', response);
                    if (response.uri) {
                        dispatch(uploadAvatar(response.uri))
                    }
                })
            // dispatch(pickerImage())

        }
    })
)

export default class PersonInfo extends React.Component {

    constructor(props: Object) {
        super(props);
        this.state = {}
    }


    _renderHeadRow(onPress: Function = () => {
    }) {
        const my_head = require('../../../source/img/my/my_head.png');
        const source = this.props.userData.avatar ? { uri: this.props.userData.avatar.url } : my_head

        return (
            <StyledButton onPress={onPress} >
                <StyledTitle >修改头像</StyledTitle>
                <StyledRow >
                    <StyledAvatar
                        source={source}
                    />
                    <StyledArrow />
                </StyledRow>
            </StyledButton>
        );
    }


    _renderRow(title: string, des: string, onPress: Function) {
        return (
                <StyledButton onPress={onPress}>
                        <StyledTitle >{title}</StyledTitle>
                        <StyledRow >
                            <StyledDes >
                                {des}
                            </StyledDes>
                            <StyledArrow />
                        </StyledRow>
                </StyledButton>
        );
    }


    _renderThirdLoginRow = (title: string, des: string, onPress: Function)=> {
        return (
            <StyledButton onPress={onPress}>
                <StyledTitle >{title}</StyledTitle>
                <StyledRow >
                    <StyledDes >
                        {des}
                    </StyledDes>
                    <StyledArrow />
                </StyledRow>
            </StyledButton>
        );
    }


    render() {


        return (
            <StyledContent >
                {this._renderHeadRow(this.props.picker)}
                {this._renderRow('昵称', this.props.userData.nickname, () => {
                    this.props.navigation.navigate("NickName");
                })}

                {this._renderRow('微信', '点击绑定', () => {

                })}

                {this._renderRow('QQ', '已绑定', () => {

                })}

                {/*{this._renderRow('手机号码修改', this.props.userData.nickname, () => {*/}
                {/*this.props.navigation.navigate("NickName");*/}
                {/*})}*/}
            </StyledContent>
        );
    }
}
