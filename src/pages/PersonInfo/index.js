/* @flow */
'use strict';
import React from 'react';
import { View ,Alert} from 'react-native'
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
  StyledDes,
  StyledActivityIndicator,
  StyledIcon,
  StyledCaramerBackView,
  StyledHeaderRow,
  StyledInput,
  StyledHeader
} from './style'
import * as WeChat from 'react-native-wechat';
import { updateNickName } from '../../request/leanCloud'
import { updateUserData } from '../../redux/actions/user'
import Toast from 'react-native-simple-toast';
import { req } from '../../redux/actions/req'
import {
  WECHATLOGIN,
  QQLOGIN,
  UPDATENICKNAME
} from '../../redux/reqKeys'
import Button from "../../components/Button";
import { logout } from '../../redux/actions/user'

@connect(
  state => ({
    user: state.user.data,
    wechatLoad: state.req.get(WECHATLOGIN).get('load'),
    qqLoad: state.req.get(QQLOGIN).get('load')
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
      dispatch(wechatBinding(WECHATLOGIN))
    },
    qqBinding: () => {
      dispatch(qqBinding(QQLOGIN))
    },
    mobilePhoneNumBinding: () => {

    },
    brekeBinding: (key, loadKey) => {
      dispatch(breakBinding(key, loadKey))
    },
    update: (nickname) => {

      dispatch(async (dispatch, getState) => {

        const user = getState().user.data
        const params = updateNickName(user.objectId, nickname);

        await req(params, UPDATENICKNAME)


        Toast.show('修改成功');
        //修改store
        dispatch(updateUserData({ nickname }))
        // props.navigation.goBack()


      })

    },
    logout: () => {

      Alert.alert(
        '确定退出吗?',
        null,
        [{
          text: '取消', onPress: () => {
          },
        }, {
          text: '确定', onPress: () => {
            dispatch(logout());
          },
        }]
      )

    },

  })
)

export default class PersonInfo extends React.Component {

  constructor(props: Object) {
    super(props);
    this.state = {
      isWXAppInstalled: false,
      nickname: props.user.nickname
    }
    WeChat.isWXAppInstalled().then(isWXAppInstalled => {
      this.setState({ isWXAppInstalled })
    })
  }


  _renderHeadRow(onPress: Function = () => {
  }) {
    const my_head = require('../../../source/img/my/my_head.png');
    const { avatar, headimgurl } = this.props.user
    const avatarUrl = avatar ? avatar.url : headimgurl
    const source = avatarUrl ? { uri: avatarUrl } : my_head

    return (
      <StyledHeader>
        <Button onPress={onPress}>
          {/*<StyledTitle>修改头像</StyledTitle>*/}
          <StyledHeaderRow>
            <StyledAvatar
              source={source}
            />
            <StyledCaramerBackView>
              <StyledIcon
                color={'white'}
                size={15}
                name={'camera'}/>
            </StyledCaramerBackView>
            {/*<StyledArrow/>*/}
          </StyledHeaderRow>
        </Button>

        <StyledInput
          ref="nameInput"
          placeholder={'请输入昵称'}
          onChangeText={(text) => {
            this.setState({ nickname: text })
          }}
          maxLength={30}
          blurOnSubmit={true}
          onSubmitEditing={() => {
            this.props.update(this.state.nickname)
          }}
          underlineColorAndroid='transparent'
          defaultValue={this.props.user.nickname}
          enablesReturnKeyAutomatically={true}
          returnKeyType='done'
        />
      </StyledHeader>
    );
  }


  _renderRow(title: string,
             des: string,
             onPress: Function,
             load: bool) {
    return (
      <StyledButton
        disabled={load}
        onPress={onPress}>
        <StyledTitle>{title}</StyledTitle>
        <StyledRow>
          <StyledDes>
            {des}
          </StyledDes>
          {load ? <StyledActivityIndicator/> : <View/>}
        </StyledRow>
      </StyledButton>
    );
  }


  _renderThirdLoginRow = (title: string,
                          des: string,
                          onPress: Function) => {
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

    // console.log('authData:', authData);


    return (
      <StyledContent>
        {this._renderHeadRow(this.props.picker)}
        {/*{this._renderRow('昵称', this.props.user.nickname, () => {*/}
        {/*this.props.navigation.navigate("NickName");*/}
        {/*})}*/}
        {/*{this._renderRow('手机号码', mobilePhoneVerified ? '已绑定' : '点击绑定', () => {*/}

        {/*//     !!weixin ?this.props.mobilePhoneNumBinding()*/}
        {/*//         :this.props.mobilePhoneNumBinding()*/}
        {/*})}*/}


        {this.state.isWXAppInstalled && this._renderRow('微信', !!weixin ? '解除绑定' : '点击绑定', () => {
          !!weixin ? this.props.brekeBinding('weixin', WECHATLOGIN)
            : this.props.wechatBinding()

        }, this.props.wechatLoad)}

        {this._renderRow('QQ', !!qq ? '解除绑定' : '点击绑定', () => {
          !!qq ? this.props.brekeBinding('qq', QQLOGIN)
            : this.props.qqBinding()
        }, this.props.qqLoad)}


        {this._renderRow('退出登录', '', () => {
          this.props.logout()
        }, false)}

        {/*{this._renderRow('手机号码修改', this.props.user.nickname, () => {*/}
        {/*this.props.navigation.navigate("NickName");*/}
        {/*})}*/}
      </StyledContent>
    );
  }
}
