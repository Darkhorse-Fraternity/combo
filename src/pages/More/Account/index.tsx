/* @flow */

import React from 'react';
import { View, Alert, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as WeChat from 'react-native-wechat';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import { showImagePicker } from '../../../components/ImagePicker/imagePicker';
import { uploadAvatar } from '../../../redux/actions/util';
import {
  wechatBinding,
  qqBinding,
  breakBinding,
} from '../../../redux/actions/user';
import {
  StyledContent,
  StyledButton,
  StyledArrow,
  StyledTitle,
  StyledRow,
  StyledDes,
  StyledActivityIndicator,
  StyledInput,
  StyledHeader,
  StyledAppInfo,
  StyledAppVersionText,
  StyledSafeAreaView,
  StyledAppPrivacyPolicyText,
  StyledAppPrivacyPolicyView,
  StyledAppPrivacyLine,
} from './style';
import { updateNickName } from '../../../request/leanCloud';
import { updateUserData } from '../../../redux/actions/user';
import { req } from '../../../redux/actions/req';
import { WECHATLOGIN, QQLOGIN, UPDATENICKNAME } from '../../../redux/reqKeys';
import { logout } from '../../../redux/actions/user';
import { appChannel } from '../../../../helps/util';
import { AvatarPicker } from '@components/Avatar/avatar-picker';

@connect(
  (state) => ({
    user: state.user.data,
    wechatLoad: state.req.get(WECHATLOGIN).get('load'),
    qqLoad: state.req.get(QQLOGIN).get('load'),
    loadAvatar: state.util.get('loadAvatar'),
  }),
  (dispatch, props) => ({
    // ...bindActionCreators({},dispatch)

    picker: async () => {
      /* 事件的默认动作已被取消 */
      const response = await showImagePicker({
        title: '修改头像',
        maxWidth: 1000, // photos only
        maxHeight: 1000, // photos only
        allowsEditing: true,
      });
      if (response.uri) {
        const avatar = await dispatch(uploadAvatar(response.uri));
        return dispatch(updateUserData({ avatar }));
      }
      // dispatch(pickerImage())
    },
    wechatBinding: () => {
      dispatch(wechatBinding(WECHATLOGIN));
    },
    qqBinding: () => {
      dispatch(qqBinding(QQLOGIN));
    },
    mobilePhoneNumBinding: () => { },
    brekeBinding: (key, loadKey, dbNum) => {
      if (dbNum > 1) {
        dispatch(breakBinding(key, loadKey));
      } else {
        Alert.alert('解除后,一旦退出将无法找回', null, [{ text: '取消' }]);
      }
    },
    update: (nickname) => {
      dispatch(async (dispatch, getState) => {
        const user = getState().user.data;
        const params = updateNickName(user.objectId, nickname);

        await dispatch(req(params, UPDATENICKNAME));

        Toast.show('修改成功');
        // 修改store
        dispatch(updateUserData({ nickname }));
        // props.navigation.goBack()
      });
    },
    logout: () => {
      Alert.alert('确定退出吗?', null, [
        {
          text: '取消',
          onPress: () => { },
        },
        {
          text: '确定',
          onPress: () => {
            dispatch(logout(props.navigation));
          },
        },
      ]);
    },
  }),
)
export default class Account extends React.Component<{ loadAvatar: boolean, user: object }> {
  constructor(props: Object) {
    super(props);
    this.state = {
      isWXAppInstalled: false,
      nickname: props.user.nickname,
      appInfoShow: false,
    };
    WeChat.isWXAppInstalled().then((isWXAppInstalled) => {
      this.setState({ isWXAppInstalled });
    });
  }

  _renderHeadRow() {
    const { user, picker } = this.props

    const { avatar, headimgurl, } = user || {}
    const avatarUrl = (avatar ? avatar.url : headimgurl)

    return (
      <StyledHeader>
        {/* <StyledTitle>修改头像</StyledTitle> */}
        <AvatarPicker source={{ uri: avatarUrl }} load={this.props.loadAvatar} />

        {/* <StyledArrow/> */}

        <StyledInput
          ref="nameInput"
          placeholder="请输入昵称"
          onChangeText={(text) => {
            this.setState({ nickname: text });
          }}
          maxLength={30}
          blurOnSubmit
          onSubmitEditing={() => {
            this.props.update(this.state.nickname);
          }}
          underlineColorAndroid="transparent"
          defaultValue={this.props.user.nickname}
          enablesReturnKeyAutomatically
          returnKeyType="done"
        />
      </StyledHeader>
    );
  }

  _renderRow(title: string, des: string, onPress: Function, load: boolean) {
    return (
      <StyledButton disabled={load} onPress={onPress}>
        <StyledTitle>{title}</StyledTitle>
        <StyledRow>
          <StyledDes>{des}</StyledDes>
          {load ? <StyledActivityIndicator /> : <View />}
        </StyledRow>
      </StyledButton>
    );
  }

  _renderThirdLoginRow = (title: string, des: string, onPress: Function) => (
    <StyledButton onPress={onPress}>
      <StyledTitle>{title}</StyledTitle>
      <StyledRow>
        <StyledDes>{des}</StyledDes>
        <StyledArrow />
      </StyledRow>
    </StyledButton>
  );

  _renderAppInfo = () => (
    <StyledAppInfo>
      <TouchableOpacity
        onLongPress={async () => {
          this.setState({ appInfoShow: !this.state.appInfoShow });
        }}
        activeOpacity={1}>
        <StyledAppPrivacyPolicyView>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('web', {
                url: 'https://icourage.cn/userAgreement',
              });
              // https://icourage.cn/privacyAgreement
            }}>
            <StyledAppPrivacyPolicyText>服务协议</StyledAppPrivacyPolicyText>
          </TouchableOpacity>
          <StyledAppPrivacyLine />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('web', {
                url: 'https://icourage.cn/privacyAgreement',
              });
              // https://icourage.cn/privacyAgreement
            }}>
            <StyledAppPrivacyPolicyText>隐私政策</StyledAppPrivacyPolicyText>
          </TouchableOpacity>
        </StyledAppPrivacyPolicyView>
        <StyledAppVersionText>
          {!this.state.appInfoShow
            ? `APP VERSION: ${DeviceInfo.getVersion()}`
            : '用于截屏反馈BUG\n' +
            `UserID: ${this.props.user.objectId}\n` +
            `App Channel: ${appChannel}\n` +
            `App version: ${DeviceInfo.getVersion()}\n` +
            `App Build: ${DeviceInfo.getBuildNumber()}\n` +
            `Brand: ${DeviceInfo.getBrand()}\n` +
            // `DeviceCountry: ${DeviceInfo.getDeviceCountry()}\n` +
            `FreeDiskStorage: ${DeviceInfo.getFreeDiskStorageSync()}\n` +
            `Model: ${DeviceInfo.getModel()}\n` +
            `SystemVersion: ${DeviceInfo.getSystemVersion()}\n` +
            `APILevel: ${DeviceInfo.getApiLevelSync()}`}
        </StyledAppVersionText>
      </TouchableOpacity>
    </StyledAppInfo>
  );

  render() {
    const { user } = this.props;
    const { authData, mobilePhoneVerified } = user;
    const { weixin, qq } = authData || {};
    let dbNum = 0;
    if (mobilePhoneVerified) {
      dbNum += 1;
    }
    if (weixin) {
      dbNum += 1;
    }
    if (qq) {
      dbNum += 1;
    }

    // weixin && ++bindingNum;
    // qq && ++bindingNum;
    // console.log("dbNum:", dbNum);

    return (
      <StyledSafeAreaView forceInset={{ top: 'never' }}>
        <StyledContent>
          {this._renderHeadRow()}
          {/* {this._renderRow('昵称', this.props.user.nickname, () => { */}
          {/* this.props.navigation.navigate("NickName"); */}
          {/* })} */}
          {/* {this._renderRow('手机号码', mobilePhoneVerified ? '已绑定' : '点击绑定', () => { */}

          {/* //     !!weixin ?this.props.mobilePhoneNumBinding() */}
          {/* //         :this.props.mobilePhoneNumBinding() */}
          {/* })} */}

          {this.state.isWXAppInstalled &&
            this._renderRow(
              '微信',
              weixin ? '解除绑定' : '点击绑定',
              () => {
                weixin
                  ? this.props.brekeBinding('weixin', WECHATLOGIN, dbNum)
                  : this.props.wechatBinding();
              },
              this.props.wechatLoad,
            )}

          {this._renderRow(
            'QQ',
            qq ? '解除绑定' : '点击绑定',
            () => {
              qq
                ? this.props.brekeBinding('qq', QQLOGIN, dbNum)
                : this.props.qqBinding();
            },
            this.props.qqLoad,
          )}

          {this._renderRow(
            '退出登录',
            '',
            () => {
              this.props.logout();
            },
            false,
          )}
        </StyledContent>
        {this._renderAppInfo()}
        {/* {this._renderRow('手机号码修改', this.props.user.nickname, () => { */}
        {/* this.props.navigation.navigate("NickName"); */}
        {/* })} */}
      </StyledSafeAreaView>
    );
  }
}
