/* @flow */

import React, { FC, useEffect, useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as WeChat from 'react-native-wechat';
import DeviceInfo from 'react-native-device-info';

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

import { WECHATLOGIN, QQLOGIN, UPDATENICKNAME } from '../../../redux/reqKeys';
import {
  add_Leancloud_Thumbnail_Suffix,
  appChannel,
} from '../../../../helps/util';
import { AvatarPicker } from '@components/Avatar/avatar-picker';
import { useGetUserInfo } from 'src/data/data-context';
import { UserType } from 'src/data/data-context/interface';
import { StackActions, useNavigation } from '@react-navigation/native';
import { putUsersId, usePutUsersId } from 'src/hooks/interface';
import { uploadFilesByLeanCloud } from '@request/uploadAVImage';
import { updateLocation, useGetInfoOfMe } from 'src/data/data-context/user';

@connect(
  (state) => ({
    wechatLoad: state.req.get(WECHATLOGIN).get('load'),
    qqLoad: state.req.get(QQLOGIN).get('load'),
    loadAvatar: state.util.get('loadAvatar'),
  }),
  (dispatch, props) => ({
    wechatBinding: () => {
      dispatch(wechatBinding(WECHATLOGIN));
    },
    qqBinding: () => {
      dispatch(qqBinding(QQLOGIN));
    },
    brekeBinding: (key, loadKey, dbNum) => {
      if (dbNum > 1) {
        dispatch(breakBinding(key, loadKey));
      } else {
        Alert.alert('解除后,一旦退出将无法找回', null, [{ text: '取消' }]);
      }
    },
  }),
)
class AccountClass extends React.Component<{
  // loadAvatar: boolean;
  user: UserType;
  isWXAppInstalled: boolean;
}> {
  render() {
    const { user, isWXAppInstalled } = this.props;
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
      <>
        {isWXAppInstalled && (
          <RenderRow
            title="微信"
            des={weixin ? '解除绑定' : '点击绑定'}
            onPress={() => {
              weixin
                ? this.props.brekeBinding('weixin', WECHATLOGIN, dbNum)
                : this.props.wechatBinding();
            }}
            load={this.props.wechatLoad}
          />
        )}
        <RenderRow
          title="QQ"
          des={qq ? '解除绑定' : '点击绑定'}
          onPress={() => {
            qq
              ? this.props.brekeBinding('qq', QQLOGIN, dbNum)
              : this.props.qqBinding();
          }}
          load={this.props.qqLoad}
        />
      </>
    );
  }
}

const RenderRow: FC<{
  title: string;
  des: string;
  onPress: () => void;
  load?: boolean;
}> = ({ title, des, onPress, load = false }) => {
  return (
    <StyledButton disabled={load} onPress={onPress}>
      <StyledTitle>{title}</StyledTitle>
      <StyledRow>
        <StyledDes>{des}</StyledDes>
        {load ? <StyledActivityIndicator /> : <View />}
      </StyledRow>
    </StyledButton>
  );
};

const RenderHeadRow: FC<{}> = (props) => {
  // const { upload, update } = props;
  // const { nickname } = this.state;
  // const { data, dispatch } = useContext(DataContext);
  const { user, updateMe } = useGetInfoOfMe();
  // const user = data.user;
  const [nickname, setNickname] = useState(user.nickname || '');
  const { avatar, headimgurl } = user || {};
  let avatarUrl = avatar ? avatar.url : headimgurl;
  const radius = 80;
  avatarUrl = !avatarUrl
    ? avatarUrl
    : add_Leancloud_Thumbnail_Suffix(avatarUrl, radius * 8, radius * 8);
  const [loading, setLoading] = useState(false);
  // const { data: avatarData, loading, run } = usePutUsersId(
  //   {
  //     id: user.objectId,
  //     avatar: { __type: 'File', id: '' },
  //   },
  //   { manual: true },
  // );

  const upload = async (uri: string) => {
    // 上传头像
    // run();
    setLoading(true);
    const imgs = await uploadFilesByLeanCloud([uri]);
    const imageData = imgs[0];
    const res = await putUsersId({
      id: user.objectId,
      avatar: { __type: 'File', id: imageData.id || '' },
    });
    res.objectId &&
      updateMe({
        avatar: {
          ...user.avatar,
          objectId: imageData.id,
          url: imageData.url(),
        },
      });
    setLoading(false);
  };

  const update = async () => {
    //修改nickname
    const res = await putUsersId({ nickname, id: user.objectId });
    res.objectId &&
      updateMe({
        nickname,
      });
  };

  return (
    <StyledHeader>
      {/* <StyledTitle>修改头像</StyledTitle> */}
      <AvatarPicker
        upload={upload}
        source={{ uri: avatarUrl }}
        load={loading}
      />

      {/* <StyledArrow/> */}

      <StyledInput
        placeholder="请输入昵称"
        onChangeText={(text) => {
          setNickname(text);
        }}
        maxLength={30}
        blurOnSubmit
        onSubmitEditing={() => {
          update();
        }}
        underlineColorAndroid="transparent"
        defaultValue={nickname}
        enablesReturnKeyAutomatically
        returnKeyType="done"
      />
    </StyledHeader>
  );
};

const RenderAppInfo: FC<{}> = () => {
  const [appInfoShow, setAppInfoShow] = useState(false);
  const user = useGetUserInfo();
  const { navigate } = useNavigation();

  return (
    <StyledAppInfo>
      <TouchableOpacity
        onLongPress={async () => {
          setAppInfoShow((res) => !res);
        }}
        activeOpacity={1}>
        <StyledAppPrivacyPolicyView>
          <TouchableOpacity
            onPress={() => {
              navigate('web', {
                url: 'https://icourage.cn/userAgreement',
              });
              // https://icourage.cn/privacyAgreement
            }}>
            <StyledAppPrivacyPolicyText>服务协议</StyledAppPrivacyPolicyText>
          </TouchableOpacity>
          <StyledAppPrivacyLine />
          <TouchableOpacity
            onPress={() => {
              navigate('web', {
                url: 'https://icourage.cn/privacyAgreement',
              });
              // https://icourage.cn/privacyAgreement
            }}>
            <StyledAppPrivacyPolicyText>隐私政策</StyledAppPrivacyPolicyText>
          </TouchableOpacity>
        </StyledAppPrivacyPolicyView>
        <StyledAppVersionText>
          {!appInfoShow
            ? `APP VERSION: ${DeviceInfo.getVersion()}`
            : '用于截屏反馈BUG\n' +
              `UserID: ${user.objectId}\n` +
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
};

const Account = () => {
  const { user, logout } = useGetInfoOfMe();
  const { dispatch } = useNavigation();
  const [isWXAppInstalled, setIsWXAppInstalled] = useState(false);
  useEffect(() => {
    WeChat.isWXAppInstalled().then((is) => {
      setIsWXAppInstalled(is);
    });
  }, []);
  const logoutWithAlert = () => {
    Alert.alert('确定退出吗?', '', [
      {
        text: '取消',
        onPress: () => {},
      },
      {
        text: '确定',
        onPress: () => {
          logout();
          dispatch(StackActions.replace('AuthLoading'));
        },
      },
    ]);
  };

  return (
    <StyledSafeAreaView>
      <RenderHeadRow />
      <StyledContent>
        <AccountClass user={user} isWXAppInstalled={isWXAppInstalled} />
        <RenderRow title="退出登录" des="" onPress={logoutWithAlert} />
      </StyledContent>
      <RenderAppInfo />
    </StyledSafeAreaView>
  );
};

export default Account;
