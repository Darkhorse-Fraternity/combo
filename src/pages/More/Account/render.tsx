/* @flow */

import React, { FC, useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import * as WeChat from 'react-native-wechat';
import DeviceInfo from 'react-native-device-info';

import {
  StyledContent,
  StyledButton,
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

import {
  add_Leancloud_Thumbnail_Suffix,
  appChannel,
} from '../../../../helps/util';
import { AvatarPicker } from '@components/Avatar/avatar-picker';
import { useGetUserInfo } from 'src/data/data-context';
import { StackActions, useNavigation } from '@react-navigation/native';
import { putUsersId } from 'src/hooks/interface';
import { uploadFilesByLeanCloud } from '@request/uploadAVImage';
import {
  breakBinding,
  qqBinding,
  useGetInfoOfMe,
  wechatBinding,
} from 'src/data/data-context/user';

// @connect(
//   () => ({
//     // wechatLoad: state.req.get(WECHATLOGIN).get('load'),
//     // qqLoad: state.req.get(QQLOGIN).get('load'),
//     // loadAvatar: state.util.get('loadAvatar'),
//   }),
//   (dispatch, props) => ({
//     wechatBinding: () => {
//       wechatBinding(props.user);
//     },
//     qqBinding: () => {
//       dispatch(qqBinding(props.user));
//     },
//     brekeBinding: (key, loadKey, dbNum) => {
//       if (dbNum > 1) {
//         dispatch(breakBinding(key, loadKey));
//       } else {
//         Alert.alert('解除后,一旦退出将无法找回', null, [{ text: '取消' }]);
//       }
//     },
//   }),
// )

type KeyType = 'weixin' | 'qq';

const AccountClass: FC<{ isWXAppInstalled: boolean }> = (props) => {
  const { isWXAppInstalled } = props;
  const { user, updateMe } = useGetInfoOfMe();
  const [wxLoad, setWXLoad] = useState(false);
  const [qqLoad, setQQLoad] = useState(false);
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

  const onBreke = async (key: KeyType) => {
    if (dbNum > 1) {
      const loadAction = {
        weixin: setWXLoad,
        qq: setQQLoad,
      }[key];
      try {
        loadAction(true);
        const res = await breakBinding(key, user);
        if (res) {
          updateMe(res);
        }
        loadAction(false);
      } catch (error) {
        loadAction(false);
      }
    } else {
      Alert.alert('解除后,一旦退出将无法找回', '', [{ text: '取消' }]);
    }
  };

  const onBanding = async (key: KeyType) => {
    const action = {
      weixin: wechatBinding,
      qq: qqBinding,
    }[key];
    const loadAction = {
      weixin: setWXLoad,
      qq: setQQLoad,
    }[key];
    // const action = actions[key];
    loadAction(true);
    try {
      const res = await action(user);
      if (res) {
        updateMe(res);
      }
      loadAction(false);
    } catch (error) {
      loadAction(false);
    }
  };

  const onUpdate = async (key: KeyType) => {
    if (authData[key]) {
      onBreke(key);
    } else {
      onBanding(key);
    }
  };

  return (
    <>
      {isWXAppInstalled && (
        <RenderRow
          title="微信"
          des={weixin ? '解除绑定' : '点击绑定'}
          heighLight={!weixin}
          onPress={onUpdate.bind(undefined, 'weixin')}
          load={wxLoad}
        />
      )}
      <RenderRow
        title="QQ"
        des={qq ? '解除绑定' : '点击绑定'}
        heighLight={!qq}
        onPress={onUpdate.bind(undefined, 'qq')}
        load={qqLoad}
      />
    </>
  );
};

const RenderRow: FC<{
  title: string;
  des: string;
  onPress: () => void;
  load?: boolean;
  heighLight?: boolean;
}> = ({ title, des, onPress, load = false, heighLight = false }) => {
  return (
    <StyledButton disabled={load} onPress={onPress}>
      <StyledTitle>{title}</StyledTitle>
      <StyledRow>
        {load ? (
          <StyledActivityIndicator />
        ) : (
          <StyledDes heighLight={heighLight}>{des}</StyledDes>
        )}
      </StyledRow>
    </StyledButton>
  );
};

const RenderHeadRow: FC<{}> = () => {
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
  const { logout } = useGetInfoOfMe();
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
        <AccountClass isWXAppInstalled={isWXAppInstalled} />
        <RenderRow title="退出登录" des="" onPress={logoutWithAlert} />
      </StyledContent>
      <RenderAppInfo />
    </StyledSafeAreaView>
  );
};

export default Account;
