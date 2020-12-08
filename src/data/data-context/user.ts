import * as Keychain from 'react-native-keychain';
import {
  GetUsersIdResponse,
  getUsersMe,
  GetUsersMeResponse,
  postBatch,
  PostBatchResponse,
  postCallUserExsitJudge,
  postUsers,
  postUsersByMobilePhone,
  PostUsersByMobilePhoneResponse,
  PostUsersResponse,
  postVerifySmsCodeCode,
  putUsersId,
  PutUsersIdRequest,
  useGetUsersMe,
  usePutUsersId,
} from 'src/hooks/interface';
import { AuthDataKey, UserType } from './interface';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {
  classCreatNewOne,
  QQUserInfo,
  wechatInfo,
  wechatUserInfo,
} from '@request/leanCloud';
import moment from 'moment';
// import { get } from '@redux/actions/req';
// @ts-ignore: Unreachable code error
import md5 from 'react-native-md5';
import { setLeanCloudSession } from '@configure/reqConfigs';
import { useCallback, useContext, useRef, useState } from 'react';
import DataContext from './index';

const secret = '00e7625e8d2fdd453ac54e83f2de153c';
const wechatAppID = 'wx637e6f35f8211c6d';

// @ts-ignore: Unreachable code error
import * as QQAPI from 'react-native-qq';
import * as WeChat from 'react-native-wechat';
import { get } from '@redux/actions/req';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

export const useUpdateMeFromRemote = (manual: boolean = false) => {
  const { replaceMe } = useGetInfoOfMe();
  const { run } = useGetUsersMe(
    {},
    {
      manual,
      onSuccess: (me) => replaceMe(me),
      cacheKey: 'GetInfoOfMe',
    },
  );
  return { run };
};

export async function userInfoFromLocal() {
  // const uuid =  DeviceInfo.getUniqueID()

  try {
    const credentials = await Keychain.getGenericPassword();
    if (typeof credentials === 'object') {
      const userString = credentials.password;
      // const sessionToken = await storage.load({ key: sessionTokenkey, })
      const user = JSON.parse(userString) as UserType;
      const { sessionToken } = user;
      if (sessionToken) {
        // 更新用户数据
        return user;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function updateFromRemote() {
  //   const params = usersMe();
  //   const res = await get(params);

  const res = await getUsersMe();
  updateLocation(res);
  //   return updateUserData(res);
}

export function updateLocation(user: GetUsersMeResponse | GetUsersIdResponse) {
  const { username = '', sessionToken } = user;
  const userString = JSON.stringify(user);

  if (sessionToken) {
    Keychain.setGenericPassword(username, userString);
  }
}

export const useGetInfoOfMe = () => {
  const { data, dispatch } = useContext(DataContext);
  // 这样写是为了避免在同一个方法内连续调用update，此时如果直接在usecallback 内调用data, data 是不可变的。并且无法被插件识别。
  const userRef = useRef(data);
  userRef.current = data;
  const updateMe = useCallback(
    (info: Partial<GetUsersIdResponse | GetUsersMeResponse>) => {
      updateLocation({
        ...userRef.current.user,
        ...info,
      });

      dispatch({
        type: 'update_user_info',
        user: {
          ...userRef.current.user,
          ...(info as UserType),
        },
      });
    },
    [dispatch],
  );

  const replaceMe = useCallback(
    (
      info:
        | GetUsersIdResponse
        | GetUsersMeResponse
        | PostUsersByMobilePhoneResponse,
    ) => {
      updateLocation(info as never);
      setLeanCloudSession(info.sessionToken);
      dispatch({
        type: 'update_user_info',
        user: info as never,
      });
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    Keychain.resetGenericPassword();
    // console.log('logoutxxxx');

    setLeanCloudSession('');
    dispatch({
      type: 'logout',
    });
  }, [dispatch]);

  return { user: data.user, updateMe, replaceMe, logout };
};

export const anonymousUser = async () => {
  let uniqueId = DeviceInfo.getUniqueId();
  // console.log('uniqueId', uniqueId);
  if (Platform.OS === 'ios') {
    const md5String = md5.hex_md5(uniqueId, 'md5');
    uniqueId = md5String.substring(8, 24);
  }
  const anonymousConfig = { id: uniqueId };
  try {
    // const userInfoParmas = thirdLogin('anonymous', anonymousConfig);
    // const user = await get(userInfoParmas);
    // await dispatch(_loginSucceed(user));

    const user = await postUsers({ authData: { anonymous: anonymousConfig } });
    setLeanCloudSession(user.sessionToken || ''); //需要提前加，否则addSample 会出错。
    await addSample(user);

    return user as UserType;
    // console.log('user:', user);
  } catch (e) {
    SimpleToast.show(e.message);
    console.log('anonymousUser error:', e.message);
    // const userInfoParmas = thirdLogin('anonymous', anonymousConfig);
    // dispatch(_loginFailed());
    // const user = await anonymousUser();
    // return user;
    const user = postUsers({ authData: { anonymous: anonymousConfig } });
    return (user as unknown) as UserType;
  }
};

// 预设示例
const addSample = async (user: PostUsersResponse) => {
  const { createdAt, updatedAt, objectId } = user;
  const createdAtTime = new Date(createdAt).getTime();
  const updatedAtTime = new Date(updatedAt).getTime();
  // console.log('time:', updatedAtTime,createdAtTime);
  if (updatedAtTime - createdAtTime < 5000) {
    // 生成一个icard
    const iCards = iCardSample(objectId);
    const iCardsReq = iCards.map((item) => classCreatNewOne('iCard', item));
    const iCardsRes = await postBatch({ requests: iCardsReq });
    // const iCardsBatch = classBatch(iCardsReq);
    // const iCardsRes = await get(iCardsBatch);
    const iUseReq: ReturnType<typeof classCreatNewOne>[] = [];

    //@ts-expect-error
    const values = Object.values<PostBatchResponse['number']>(iCardsRes);

    values.forEach((item) => {
      if (item?.success) {
        const iUseParam = iUseSample(objectId, item?.success.objectId);
        iUseReq.push(classCreatNewOne('iUse', iUseParam));
      }
    });
    // 添加圈子示例
    const iUseParam = iUseSample(objectId, '5be8f3f0ee920a00668767bc');
    iUseReq.push(classCreatNewOne('iUse', iUseParam));

    postBatch({ requests: iUseReq });

    // const iUseBatch = classBatch(iUseReq);

    // await get(iUseBatch);
  }
};

// 绑定
export function useBindingAuthData() {
  const { user, updateMe } = useGetInfoOfMe();
  const userId = user.objectId;

  const { run, loading } = usePutUsersId((res) => res);
  const updateBinding = useCallback(
    (
      authData: PutUsersIdRequest['authData'],
      exData?: Omit<PutUsersIdRequest, 'id' | 'authData'>,
    ) => {
      const params = {
        authData: { ...user.authData, ...authData },
        ...exData,
      };
      run({
        id: userId,
        ...params,
      }).then((res) => {
        updateMe({
          ...res,
          ...params,
        });
      });
    },
    [run, updateMe, user.authData, userId],
  );

  return { update: updateBinding, loading };
}

// 解除绑定
export function useBreakBindingAuthData(key: AuthDataKey) {
  const { update: updateBinding, loading } = useBindingAuthData();
  const breakUpdate = () => {
    if (key === 'anonymous') {
      updateBinding({ [key]: { __op: 'Delete' } });
    } else {
      updateBinding({ [key]: null });
    }
  };

  return { update: breakUpdate, loading };
}

// export function useQQBinding = ()=>{
//   const qqConfig = await QQAPI.login();

//   const { access_token, oauth_consumer_key, openid } = qqConfig;

//   // 获取微信用户信息
//   let exData = {};

//   if (!user.headimgurl) {
//     const params = QQUserInfo(access_token, oauth_consumer_key, openid);
//     const info = await get(params);
//     const userInfo = JSON.parse(info);

//     let { nickname, figureurl_2, figureurl_qq_2 } = userInfo;

//     nickname = user.nickname || nickname;
//     exData = {
//       nickname,
//       headimgurl: figureurl_qq_2,
//     };
//   }
// }

export const iCardSample = (objectId: string) => [
  {
    title: '示例：早睡',
    period: '7',
    record: [],
    recordDay: [1, 2, 3, 4, 5, 6, 7],
    iconAndColor: {
      name: 'sleepBoy',
      color: '#F08200',
    },
    notifyText: '早睡早起身体好!',
    notifyTimes: ['22:00'],
    limitTimes: ['20:00', '24:00'],
    price: 0,
    state: 0,
    // doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
    user: {
      __type: 'Pointer',
      className: '_User',
      objectId,
    },
  },
  {
    title: '示例：记单词',
    period: '7',
    record: [],
    recordDay: [1, 2, 3, 4, 5, 6, 7],
    iconAndColor: {
      name: 'homework',
      color: '#FFC076',
    },
    notifyText: '坚持鸭!',
    notifyTimes: ['20:00'],
    limitTimes: ['00:00', '24:00'],
    price: 0,
    state: 0,
    // doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
    user: {
      __type: 'Pointer',
      className: '_User',
      objectId,
    },
  },
];

export const iUseSample = (objectId: string, iCardId: string) => ({
  time: 0,
  // notifyTime:option&&option.notifyTime||"20.00",
  doneDate: { __type: 'Date', iso: moment('2017-03-20').toISOString() },
  user: {
    __type: 'Pointer',
    className: '_User',
    objectId,
  },
  iCard: {
    __type: 'Pointer',
    className: 'iCard',
    objectId: iCardId,
  },
  statu: 'start',
  privacy: 2,
});

export const usePhoneLogin = () => {
  const [loading, setLoading] = useState(false);
  const { updateMe, replaceMe } = useGetInfoOfMe();
  const run = useCallback(
    async (phone: string, code: string) => {
      setLoading(true);
      // 判断用户是否存在
      try {
        const userExsit = await postCallUserExsitJudge({
          type: 'phoneNumber',
          id: phone,
        });

        //如果不存在，则绑定手机号码并删除匿名者标记,否则则直接换账号。
        if (!userExsit.error && userExsit.result?.userExsit === false) {
          const mobilePhoneVerifyRes = await postVerifySmsCodeCode({
            code: code,
            mobilePhoneNumber: phone,
          });
          if (mobilePhoneVerifyRes && !mobilePhoneVerifyRes.error) {
            updateMe({
              mobilePhoneNumber: phone,
              authData: {
                anonymous: { __op: 'Delete' },
              },
            });
          }
        } else {
          // 直接换账号。
          const user = await postUsersByMobilePhone({
            mobilePhoneNumber: phone,
            smsCode: code,
          });
          replaceMe(user);
        }
        return setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [replaceMe, updateMe],
  );

  return { run, loading };
};

export async function wechatBinding(user: UserType) {
  // try {
  const weConfig = await WeChat.sendAuthRequest('snsapi_userinfo');
  const { code } = weConfig;

  // 获取openid
  const wechatInfoParam = wechatInfo(wechatAppID, secret, code || '');
  const weInfo = await get(wechatInfoParam);
  const { access_token, openid } = weInfo;

  // 获取微信用户信息
  let exData = {};
  if (openid && !user.headimgurl) {
    const userInfoParams = wechatUserInfo(access_token, openid);
    const userInfo = await get(userInfoParams);
    let { nickname, headimgurl } = userInfo;

    nickname = user.nickname || nickname;
    exData = {
      nickname,
      headimgurl,
    };
  }

  return bindingAuthData('weixin', user, weInfo, exData);
  // } catch (e) {
  //   if (e instanceof WeChat.WechatError) {
  //     const errObj = {
  //       '-1': '普通错误类型',
  //       '-2': '取消',
  //       '-3': '发送失败',
  //       '-4': '授权失败',
  //       '-5': '微信不支持',
  //     };
  //     Toast.show(errObj[`${e.code}`]);
  //   } else {
  //     Toast.show(e.message);
  //   }
  // }

  // const res2 = req(params)
}

export async function qqBinding(user: UserType) {
  // try {
  const qqConfig = await QQAPI.login();

  const { access_token, oauth_consumer_key, openid } = qqConfig;

  // 获取微信用户信息
  let exData = {};

  if (!user.headimgurl) {
    const params = QQUserInfo(access_token, oauth_consumer_key, openid);
    const info = await get(params);
    const userInfo = JSON.parse(info);

    let { nickname, figureurl_qq_2 } = userInfo;

    nickname = user.nickname || nickname;
    exData = {
      nickname,
      headimgurl: figureurl_qq_2,
    };
  }

  return bindingAuthData('qq', user, qqConfig, exData);
  // } catch (e) {
  //   Toast.show(e.message);
  // }

  // const res2 = req(params)
}

export function breakBinding(key: string, user: UserType) {
  return bindingAuthData(key, user, null);
}

export async function bindingAuthData(
  key: string,
  user: UserType,
  authData: {} | null,
  exData?: Omit<PutUsersIdRequest, 'id' | 'authData'>,
) {
  const params: Omit<PutUsersIdRequest, 'id'> = {
    authData: { [key]: authData },
    ...exData,
  };
  const res = await putUsersId({
    id: user.objectId,
    ...params,
  });
  if (res.objectId) {
    return {
      ...params,
      ...res,
    };
  }
  return null;
}

export const useWechatLogin = () => {
  const [loading, setLoading] = useState(false);
  const { user, replaceMe, updateMe } = useGetInfoOfMe();
  const run = useCallback(async () => {
    try {
      setLoading(true);
      const weConfig = await WeChat.sendAuthRequest('snsapi_userinfo');
      if (!weConfig) {
        return setLoading(false);
      }
      const { code } = weConfig;

      // 获取openid
      const wechatInfoParam = wechatInfo(wechatAppID, secret, code || '');
      const weInfo = await get(wechatInfoParam);
      const { access_token, openid } = weInfo;
      // console.log('weInfo:', weInfo);

      const userExsit = await getUserExsitJudge('weixin', openid);
      // let user = getState().user.data;
      let user1 = user;
      if (userExsit === false) {
        const params = {
          authData: {
            ...user.authData,
            anonymous: { __op: 'Delete' },
            weixin: weInfo,
          },
        };
        putUsersId({ id: user.objectId, ...params });
        updateMe(params);
      } else {
        // 如果存在，则直接登录老账号
        // const userInfoParmas = thirdLogin('weixin', weInfo);

        user1 = (await postUsers({ authData: { weixin: weInfo } })) as UserType;

        if (user1.sessionToken) {
          // await dispatch(_loginSucceed(user));
          replaceMe(user1);
          // await dispatch(addSample(user));
        } else {
          SimpleToast.show(JSON.stringify(weConfig));
        }
      }

      setLoading(false);
      // 获取微信用户信息

      // let exData = {};
      if (user1.sessionToken && !user1.headimgurl) {
        const userInfoParams = wechatUserInfo(access_token, openid);
        const userInfo = await get(userInfoParams);
        let { nickname, headimgurl } = userInfo;

        nickname = user.nickname || nickname;
        updateMe({
          nickname,
          headimgurl,
        });
      }
      // return dispatch(bindingAuthData('weixin', KEY, weInfo,exData))
    } catch (e) {
      setLoading(false);
      // @ts-ignore: Unreachable code error
      if (e instanceof WeChat.WechatError) {
        const errObj = {
          '-1': '普通错误类型',
          '-2': '取消',
          '-3': '发送失败',
          '-4': '授权失败',
          '-5': '微信不支持',
        };
        SimpleToast.show(errObj[`${e.code}`]);
      } else {
        SimpleToast.show(e.message);
      }
    }
  }, [replaceMe, updateMe, user]);

  return { loading, run };
};

export const useQQLogin = () => {
  const [loading, setLoading] = useState(false);
  const { user, replaceMe, updateMe } = useGetInfoOfMe();
  const run = useCallback(async () => {
    try {
      setLoading(true);

      let qqConfig;
      try {
        qqConfig = await QQAPI.login();
      } catch (error) {
        return setLoading(false);
      }

      if (!qqConfig) {
        return setLoading(false);
      }

      const userExsit = await getUserExsitJudge('qq', qqConfig.openid);
      let user1 = user;
      if (userExsit === false) {
        // 如果不存在，则直接更换匿名用户

        const params = {
          authData: {
            ...user.authData,
            anonymous: { __op: 'Delete' },
            qq: qqConfig,
          },
        };
        putUsersId({ id: user.objectId, ...params });
        updateMe(params);
      } else {
        // const userInfoParmas = thirdLogin('qq', qqConfig);
        // user = await get(userInfoParmas);
        user1 = (await postUsers({ authData: { qq: qqConfig } })) as UserType;
        if (user1.sessionToken) {
          replaceMe(user1);
          // await dispatch(addSample(user));
        }
      }

      setLoading(false);

      // 获取微信用户信息

      // let exData = {};
      if (user1.sessionToken && !user1.headimgurl) {
        const { access_token, oauth_consumer_key, openid } = qqConfig;
        const userInfoParams = QQUserInfo(
          access_token,
          oauth_consumer_key,
          openid,
        );
        const info = await get(userInfoParams);
        const userInfo = JSON.parse(info);
        let { nickname, figureurl_qq_2 } = userInfo;
        nickname = user.nickname || nickname;
        const exData = {
          nickname,
          headimgurl: figureurl_qq_2,
        };
        // const params = bindingToUser(user.objectId, exData);
        // const res = await putUsersId({ id: user.objectId, ...exData });
        // console.log('params:', params);
        // const res = await get(params);

        // dispatch(updateUserInfo(user.objectId, exData));
        updateMe(exData);
      }
    } catch (e) {
      setLoading(false);
      SimpleToast.show(e.message);
    }
  }, [replaceMe, updateMe, user]);

  return { loading, run };
};

export const useAppleLogin = () => {
  const [loading, setLoading] = useState(false);
  const { user, replaceMe, updateMe } = useGetInfoOfMe();
  const run = useCallback(async () => {
    try {
      setLoading(true);
      // let user = getState().user.data;
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });
      // console.log('appleAuthRequestResponse',appleAuthRequestResponse)

      if (!appleAuthRequestResponse) {
        return setLoading(false);
      }

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState !== 1) {
        return setLoading(false);
      }

      console.log('appleAuthRequestResponse', appleAuthRequestResponse);

      const userExsit = await getUserExsitJudge(
        'lc_apple',
        appleAuthRequestResponse.user,
      );

      const lc_apple = {
        uid: appleAuthRequestResponse.user,
        // identity_token:appleAuthRequestResponse.identityToken,
        // code:appleAuthRequestResponse.authorizationCode
      };
      let user1 = user;
      if (userExsit === false) {
        // 如果不存在，则直接更换匿名用户
        const params = {
          authData: {
            ...user.authData,
            anonymous: { __op: 'Delete' },
            lc_apple,
          },
        };
        putUsersId({ id: user.objectId, ...params });
        updateMe(params);
      } else {
        user1 = (await postUsers({
          authData: { lc_apple: lc_apple },
        })) as UserType;
        if (user1.sessionToken) {
          // await dispatch(_loginSucceed(user));
          replaceMe(user1);
          // await dispatch(addSample(user));
        }
      }

      setLoading(false);

      // let exData = {};
      const { fullName } = appleAuthRequestResponse;
      if (
        user1.sessionToken &&
        !user1.headimgurl &&
        fullName?.nickname &&
        fullName?.nickname.length > 0
      ) {
        const exData = {
          nickname: fullName?.nickname,
          // headimgurl: figureurl_qq_2,
        };
        // const params = bindingToUser(user.objectId, exData);
        // // console.log('params:', params);
        // const res = await get(params);
        // const res = await putUsersId({ id: user.objectId, ...exData });
        return updateMe(exData);
        // return dispatch(updateUserInfo(user.objectId, exData));
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      // SimpleToast.show(e.message);
    }
  }, [replaceMe, updateMe, user]);
  return { loading, run };
};

async function getUserExsitJudge(type: string, id: string) {
  if (id) {
    const res = await postCallUserExsitJudge({
      type,
      id,
    });
    if (res.result) {
      return res.result?.userExsit;
    } else {
      throw new Error('没有检索到用户!');
    }
  }
  throw new Error('没有检索到用户!');
}
