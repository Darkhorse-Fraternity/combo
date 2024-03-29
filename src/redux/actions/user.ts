/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

// *** Action Types ***
import Toast from 'react-native-simple-toast';
import * as Keychain from 'react-native-keychain';
import * as WeChat from 'react-native-wechat';

// @ts-ignore: Unreachable code error
import * as QQAPI from 'react-native-qq';
import { updatePush } from '../../configure/push/push';
import { setLeanCloudSession } from '../../configure/reqConfigs';
import { get } from './req';
// import { loadAccount } from '../../configure/storage';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

import {
  wechatInfo,
  wechatUserInfo,
  QQUserInfo,
} from '../../request/leanCloud';
import { UserType } from 'src/data/data-context/interface';
import {
  getUsersMe,
  GetUsersMeResponse,
  postCallUserExsitJudge,
  postUsers,
  postUsersByMobilePhone,
  PostUsersResponse,
  postVerifySmsCodeCode,
  putUsersId,
  PutUsersIdRequest,
} from 'src/hooks/interface';
import { APPLELOGIN, QQLOGIN, WECHATLOGIN } from '@redux/reqKeys';

('use strict');

export const ACCOUNT_CHANGE = 'ACCOUNTTEXT_CHANGE';
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCEED = 'LOGIN_SUCCEED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOAD_ACCOUNT = 'LOAD_ACCOUNT';
export const LOGOUT = 'LOGOUT';
export const LOGIN_LOAD = 'LOGIN_LOAD';
export const UPDATE_USERDATA = 'UPDATE_USERDATA';
export const THIRD_LOAD = 'THIRD_LOAD';

const secret = '00e7625e8d2fdd453ac54e83f2de153c';
const wechatAppID = 'wx637e6f35f8211c6d';
// WeChat.registerApp('wx637e6f35f8211c6d')
// import { popToIndex } from '../nav'

// 当为异步的时候这么写，返回一个函数

/**
 * 登录
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
// export function login(state: Object): Function {
//   const parame = requestLogin(state.phone, state.ymCode);

//   return (dispatch) => {
//     dispatch(_loginRequest());

//     return get(parame).then(async (response) => {
//       if (response.statu) {
//         // 加入sessionToken
//         await dispatch(response);

//         dispatch(navigatePop());
//       } else {
//         dispatch(_loginFailed(response));
//       }
//     });
//   };
// }

/**
 * 注册
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
export function register(
  state: { phone: string; ymCode: string },
  uid: string,
) {
  // @ts-ignore: Unreachable code error
  return async (dispatch) => {
    // try {
    dispatch(_loginRequest());

    // const userExsit = await getUserExsitJudge('phoneNumber', state.phone);
    const userExsit = await postCallUserExsitJudge({
      type: 'phoneNumber',
      id: state.phone,
    });
    // console.log('userExsit:', userExsit);

    if (!userExsit.error && userExsit.result?.userExsit === false) {
      // 将匿名用户转化
      // https://leancloud.cn/docs/rest_sms_api.html#hash-745966375
      // requestMobilePhoneVerify
      // 第一步设置用户手机号。
      //
      // 第二步校验号码

      const mobilePhoneVerifyRes = await postVerifySmsCodeCode({
        code: state.ymCode,
        mobilePhoneNumber: state.phone,
      });

      // const mobilePhoneVerifyRes = await mobilePhoneVerify(
      //   state.phone,
      //   state.ymCode,
      // );

      // console.log('mobilePhoneVerifyRes:', mobilePhoneVerifyRes);
      // 第三步如果错误清除手机号，成功则清除匿名标记,并标记已登录

      if (mobilePhoneVerifyRes && !mobilePhoneVerifyRes.error) {
        await dispatch(
          updateMeByParam(
            {
              mobilePhoneNumber: state.phone,
              authData: {
                anonymous: { __op: 'Delete' },
              },
            },
            uid,
          ),
        );
      }

      // await dispatch(updateMeByParam({mobilePhoneNumber:{"__op":"Delete"}}))

      // 微信直接清除匿名标记，并标记已登录。
      return dispatch(_loginFailed());
    }
    // 已存在则直接登录

    const user = await postUsersByMobilePhone({
      mobilePhoneNumber: state.phone,
      smsCode: state.ymCode,
    });

    // const params = requestUsersByMobilePhone(state.phone, state.ymCode);
    // const user = await get(params);
    await dispatch(_loginSucceed(user as UserType));
    // await dispatch(addSample(user));
    // } catch (e) {
    //   Toast.show(e.message);
    //   return dispatch(_loginFailed());
    // }
  };
}

// 校验手机号
// export function mobilePhoneVerify(mobilePhoneNumber: string, code: string) {
//   const params = verifySmsCode(mobilePhoneNumber, code);
//   return get(params);
// }

function _loginRequest() {
  return {
    type: LOGIN_REQUEST,
    loaded: true,
  };
}

function _loginSucceed(response: UserType | PostUsersResponse) {
  // const data = {...response,mobileNum:accountText,selectCommunityNum:0}
  // saveUserData(response);
  // saveAccount(response.mobilePhoneNumber);

  // 只保存 sessionToken
  // @ts-ignore: Unreachable code error
  return async (dispatch) => {
    if (response) {
      // const { sessionToken = '', username = '' } = response
      // const userString = JSON.stringify(response)
      // Keychain.setGenericPassword(username, userString);
      updateLocation(response);
      return dispatch(loginSucceed(response));
    }
  };

  // storage.save({
  //     key: sessionTokenkey,  //注意:请不要在key中使用_下划线符号!
  //     data: sessionToken,
  // });
}

export function loginSucceed(data: UserType | PostUsersResponse) {
  // 保存登录信息。
  setLeanCloudSession(data.sessionToken);
  // setAPPAuthorization(data.authorization);

  // console.log('data:', data);
  updatePush(data.objectId);

  return {
    type: LOGIN_SUCCEED,
    loaded: false,
    data,
    // isTourist: !!(data.authData &&
    //   data.authData.anonymous &&
    //   data.authData.anonymous.id)
  };
}

export function loginLoad(loaded: boolean) {
  return {
    type: LOGIN_LOAD,
    loaded,
  };
}

export function _loginFailed() {
  return {
    type: LOGIN_FAILED,
    loaded: false,
  };
}

// export function logout(navigation) {
//   return async (dispatch, getState) => {
//     try {
//       const state = getState();
//       if (!state.user.isLogin) {
//         return;
//       }
//       // const parame = appLogout(state.user.data.appUserId||'');
//       // const response = await send(parame)
//       // if (response.isSuccess === '1') {
//       //     //加入sessionToken

//       // dispatch(navigatePush('TabView'));
//       // Router.pop()
//       // clearUserData();

//       // storage.remove({ key: sessionTokenkey });
//       Keychain.resetGenericPassword();

//       dispatch(logout2()); // 先退出
//       updatePush(user('null'));

//       // await dispatch(anonymousUser())

//       navigation.dispatch(StackActions.replace('AuthLoading'));
//       // return loadAccount(ret => {
//       //   //加载本地数据。
//       //   dispatch(_loadAccount(ret));
//       // });

//       // } else {
//       //     Toast.show(response.msg)
//       //
//       //     // dispatch(_loginFailed(response));
//       // }
//     } catch (e) {
//       console.log('test:', e.message);
//       Toast.show(e.message);
//       // dispatch(_loginFailed(e.message));
//     }
//   };
// }

// function logout2() {
//   return {
//     type: LOGOUT,
//   };
// }

export function updateUserData(data: Partial<GetUsersMeResponse>) {
  // if(data.authData){
  //   return {
  //     type: UPDATE_USERDATA,
  //     data: data,
  //     isTourist: !!(data.authData.anonymous
  //       && data.authData.anonymous.id)
  //   }
  // }
  return {
    type: UPDATE_USERDATA,
    data,
  };
}

export function updateMeByParam(
  param: Omit<PutUsersIdRequest, 'id'>,
  uid: string,
) {
  // @ts-ignore: Unreachable code error
  return async (dispatch) => {
    // const userData = getState().user.data;
    // const params = getUpdateMeByParam(userData.objectId, param);
    // await get(params);

    putUsersId({ id: uid, ...param });

    return dispatch(updateUserData(param as never));
  };
}

export function update() {
  // @ts-ignore: Unreachable code error
  return async (dispatch) => {
    // const params = usersMe();
    // const res = await get(params);
    const res = await getUsersMe();
    updateLocation(res);
    return dispatch(updateUserData(res));
  };
}

function updateLocation(user: GetUsersMeResponse | PostUsersResponse) {
  const { username = '' } = user;
  const userString = JSON.stringify(user);
  Keychain.setGenericPassword(username, userString);
}

// export function getUserByObjectID(objectID: string, callBack: Function): Function {
//   return dispatch => {
//     dispatch(_loginRequest());
//     const param = getUserByID(objectID);
//     return get(param, (response) => {
//
//       if (response) {
//         dispatch(_loginSucceed(response));
//       } else {
//         dispatch(_loginFailed(response));
//       }
//       callBack(response);
//     });
//   }
// }

export function weChatLogin(user: UserType | PostUsersResponse) {
  const key = WECHATLOGIN;
  // @ts-ignore: Unreachable code error
  return async (dispatch) => {
    try {
      dispatch(thirdLoaded(key));
      const weConfig = await WeChat.sendAuthRequest('snsapi_userinfo');
      if (!weConfig) {
        return dispatch(thirdLoaded(''));
      }
      const { code } = weConfig;

      // 获取openid
      const wechatInfoParam = wechatInfo(wechatAppID, secret, code || '');
      const weInfo = await get(wechatInfoParam);
      const { access_token, openid } = weInfo;
      // console.log('weInfo:', weInfo);

      const userExsit = await getUserExsitJudge('weixin', openid);
      // let user = getState().user.data;
      if (userExsit === false) {
        // 如果不存在，则直接更换匿名用户
        await dispatch(
          updateMeByParam(
            {
              authData: {
                anonymous: { __op: 'Delete' },
                weixin: weInfo,
              },
            },
            user.objectId,
          ),
        );
      } else {
        // 如果存在，则直接登录老账号
        // const userInfoParmas = thirdLogin('weixin', weInfo);

        user = await postUsers({ authData: { weixin: weInfo } });

        if (user.sessionToken) {
          await dispatch(_loginSucceed(user));
          // await dispatch(addSample(user));
        } else {
          Toast.show(JSON.stringify(weConfig));
        }
      }

      dispatch(thirdLoaded(''));
      // 获取微信用户信息

      // let exData = {};
      if (user.sessionToken && !user.headimgurl) {
        const userInfoParams = wechatUserInfo(access_token, openid);
        const userInfo = await get(userInfoParams);
        let { nickname, headimgurl } = userInfo;

        nickname = user.nickname || nickname;
        const exData = {
          nickname,
          headimgurl,
        };
        // const params = bindingToUser(user.objectId, exData);
        // const res = await get(params);

        // const res = await putUsersId({ id: user.objectId, ...exData });

        dispatch(updateUserInfo(user.objectId, exData));
      }
      // return dispatch(bindingAuthData('weixin', KEY, weInfo,exData))
    } catch (e) {
      dispatch(thirdLoaded(''));
      // @ts-ignore: Unreachable code error
      if (e instanceof WeChat.WechatError) {
        const errObj = {
          '-1': '普通错误类型',
          '-2': '取消',
          '-3': '发送失败',
          '-4': '授权失败',
          '-5': '微信不支持',
        };
        Toast.show(errObj[`${e.code}`]);
      } else {
        Toast.show(e.message);
      }
    }

    // const res2 = req(params)
  };
}

export function qqLogin(user: UserType | PostUsersResponse) {
  const key = QQLOGIN;
  // @ts-ignore: Unreachable code error
  return async (dispatch) => {
    try {
      dispatch(thirdLoaded(key));

      let qqConfig;
      try {
        qqConfig = await QQAPI.login();
      } catch (error) {
        return dispatch(thirdLoaded(''));
      }

      if (!qqConfig) {
        return dispatch(thirdLoaded(''));
      }

      const userExsit = await getUserExsitJudge('qq', qqConfig.openid);
      if (userExsit === false) {
        // 如果不存在，则直接更换匿名用户
        await dispatch(
          updateMeByParam(
            {
              authData: {
                anonymous: { __op: 'Delete' },
                qq: qqConfig,
              },
            },
            user.objectId,
          ),
        );
      } else {
        // const userInfoParmas = thirdLogin('qq', qqConfig);
        // user = await get(userInfoParmas);
        user = await postUsers({ authData: { qq: qqConfig } });
        if (user.sessionToken) {
          await dispatch(_loginSucceed(user));
          // await dispatch(addSample(user));
        }
      }

      dispatch(thirdLoaded(''));

      // 获取微信用户信息

      // let exData = {};
      if (user.sessionToken && !user.headimgurl) {
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

        dispatch(updateUserInfo(user.objectId, exData));
      }
    } catch (e) {
      dispatch(thirdLoaded(''));
      Toast.show(e.message);
    }
  };
}

export function appleLogin(user: UserType | PostUsersResponse) {
  const key = APPLELOGIN;

  // @ts-ignore: Unreachable code error
  return async (dispatch) => {
    try {
      dispatch(thirdLoaded(key));
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
        return dispatch(thirdLoaded(''));
      }

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState !== 1) {
        return dispatch(thirdLoaded(''));
      }

      const userExsit = await getUserExsitJudge(
        'lc_apple',
        appleAuthRequestResponse.user,
      );

      const lc_apple = {
        uid: appleAuthRequestResponse.user,
        // identity_token:appleAuthRequestResponse.identityToken,
        // code:appleAuthRequestResponse.authorizationCode
      };

      if (userExsit === false) {
        // 如果不存在，则直接更换匿名用户
        await dispatch(
          updateMeByParam(
            {
              authData: {
                anonymous: { __op: 'Delete' },
                lc_apple,
              },
            },
            user.objectId,
          ),
        );
      } else {
        // const userInfoParmas = thirdLogin('lc_apple', lc_apple);

        // console.log('userInfoParmas', userInfoParmas);

        // user = await get(userInfoParmas);

        user = await postUsers({ authData: { lc_apple: lc_apple } });
        if (user.sessionToken) {
          await dispatch(_loginSucceed(user));
          // await dispatch(addSample(user));
        }
      }

      dispatch(thirdLoaded(''));

      // let exData = {};
      const { fullName } = appleAuthRequestResponse;
      if (
        user.sessionToken &&
        !user.headimgurl &&
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
        return dispatch(updateUserInfo(user.objectId, exData));
      }
    } catch (e) {
      console.log(e);

      dispatch(thirdLoaded(''));
      Toast.show(e.message);
    }
  };
}

export const updateUserInfo = (
  id: string,
  data: Omit<PutUsersIdRequest, 'id' | 'authData'>,
) => {
  // @ts-ignore: Unreachable code error
  return async (dispatch) => {
    const res = await putUsersId({ id, ...data });
    return dispatch(
      updateUserData({
        ...data,
        ...res,
      }),
    );
  };
};

export function thirdLoaded(key: string) {
  return {
    type: THIRD_LOAD,
    theThirdLoaded: key,
  };
}

// 判断user 是否存在

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
