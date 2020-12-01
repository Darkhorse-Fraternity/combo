import * as Keychain from 'react-native-keychain';
import {
  GetUsersIdResponse,
  getUsersMe,
  GetUsersMeResponse,
  postBatch,
  postCallUserExsitJudge,
  postUsers,
  postUsersByMobilePhone,
  PostUsersByMobilePhoneResponse,
  PostUsersResponse,
  postVerifySmsCodeCode,
  PutUsersIdRequest,
  usePutUsersId,
} from 'src/hooks/interface';
import { AuthDataKey, UserType } from './interface';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { classCreatNewOne } from '@request/leanCloud';
import moment from 'moment';
// import { get } from '@redux/actions/req';
// @ts-ignore: Unreachable code error
import md5 from 'react-native-md5';
import { setLeanCloudSession } from '@configure/reqConfigs';
import { useCallback, useContext, useState } from 'react';
import DataContext from './index';

export const useUpdateMe = () => {
  const { dispatch: contextDispatch } = useContext(DataContext);
  const run = useCallback(() => {
    userInfo().then((user) => {
      updateLocation(user as never);
      contextDispatch({ type: 'update_user_info', user: user as never });
    });
  }, [contextDispatch]);
  return { run };
};

export async function userInfo() {
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
        setLeanCloudSession(sessionToken);
        update();

        return user;
      } else {
        return anonymousUser();
      }
    } else {
      return anonymousUser();
    }
  } catch (e) {
    return anonymousUser();
  }
}

export async function update() {
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
  const updateMe = useCallback(
    (info: Partial<GetUsersIdResponse | GetUsersMeResponse>) => {
      updateLocation({
        ...data.user,
        ...info,
      });
      dispatch({
        type: 'update_user_info',
        user: {
          ...data.user,
          ...(info as UserType),
        },
      });
    },
    [data.user, dispatch],
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

const anonymousUser = async () => {
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
    setLeanCloudSession(user.sessionToken || '');
    addSample(user);

    return user;
    // console.log('user:', user);
  } catch (e) {
    SimpleToast.show(e.message);
    console.log('anonymousUser error:', e.message);
    // const userInfoParmas = thirdLogin('anonymous', anonymousConfig);
    // dispatch(_loginFailed());
    // const user = await anonymousUser();
    // return user;
    const user = postUsers({ authData: { anonymous: anonymousConfig } });
    return user;
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
    iCardsRes.forEach((item) => {
      if (item.success) {
        const iUseParam = iUseSample(objectId, item.success.objectId);
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
