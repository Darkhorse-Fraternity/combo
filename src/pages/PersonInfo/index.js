/* @flow */
'use strict';
import React from 'react';
import {} from 'react-native'
import { showImagePicker } from '../../components/ImagePicker/imagePicker'
import { connect } from 'react-redux'
import { uploadAvatar } from '../../redux/actions/util'
import {
    wechatBinding,
    qqBinding,
    breakBinding,
} from '../../redux/actions/user'
import {
    StyledContent,
    StyledButton,
    StyledAvatar,
    StyledArrow,
    StyledTitle,
    StyledRow,
    StyledDes
} from './style'

@connect(
    state => ({
        user: state.user.data,
    }),
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch)


        picker: async () => {

            /* 事件的默认动作已被取消*/
            const response = await showImagePicker({
                title: '修改头像',
                maxWidth: 500, // photos only
                maxHeight: 500, // photos only
            })
            if (response.uri) {
                dispatch(uploadAvatar(response.uri))
            }
            // dispatch(pickerImage())

        },
        wechatBinding: () => {
            dispatch(wechatBinding())
        },
        qqBinding: () => {
            dispatch(qqBinding())
        },
        mobilePhoneNumBinding: () => {

        },
        brekeBinding:(key)=>{
            dispatch(breakBinding(key))
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
        const source = this.props.user.avatar ?
            { uri: this.props.user.avatar.url } :
            my_head

        return (
            <StyledButton onPress={onPress}>
                <StyledTitle>修改头像</StyledTitle>
                <StyledRow>
                    <StyledAvatar
                        source={source}
                    />
                    <StyledArrow/>
                </StyledRow>
            </StyledButton>
        );
    }


    _renderRow(title: string, des: string, onPress: Function) {
        return (
            <StyledButton onPress={onPress}>
                <StyledTitle>{title}</StyledTitle>
                <StyledRow>
                    <StyledDes>
                        {des}
                    </StyledDes>
                    <StyledArrow/>
                </StyledRow>
            </StyledButton>
        );
    }


    _renderThirdLoginRow = (title: string, des: string, onPress: Function) => {
        return (
            <StyledButton onPress={onPress}>
                <StyledTitle>{title}</StyledTitle>
                <StyledRow>
                    <StyledDes>
                        {des}
                    </StyledDes>
                    <StyledArrow/>
                </StyledRow>
            </StyledButton>
        );
    }


    render() {

        const { user } = this.props
        const { authData, mobilePhoneVerified } = user
        const { weixin, qq } = authData || {}



        return (
            <StyledContent>
                {this._renderHeadRow(this.props.picker)}
                {this._renderRow('昵称', this.props.user.nickname, () => {
                    this.props.navigation.navigate("NickName");
                })}
                {this._renderRow('手机号码', mobilePhoneVerified ? '已绑定' : '点击绑定', () => {

                //     !!weixin ?this.props.mobilePhoneNumBinding()
                //         :this.props.mobilePhoneNumBinding()
                })}


                {this._renderRow('微信', !!weixin ? '解除绑定' : '点击绑定', () => {
                    !!weixin ?this.props.brekeBinding('weixin')
                        :this.props.wechatBinding()

                })}

                {this._renderRow('QQ', !!qq ? '解除绑定' : '点击绑定', ()=>{
                    !!qq ?this.props.brekeBinding('qq')
                        :this.props.qqBinding()
                })}


                {/*{this._renderRow('手机号码修改', this.props.user.nickname, () => {*/}
                {/*this.props.navigation.navigate("NickName");*/}
                {/*})}*/}
            </StyledContent>
        );
    }
}
