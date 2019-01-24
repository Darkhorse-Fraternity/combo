/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

export const ACCOUNT_CHANGE = 'ACCOUNTTEXT_CHANGE'
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCEED = 'LOGIN_SUCCEED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOAD_ACCOUNT = 'LOAD_ACCOUNT'
export const LOGOUT = 'LOGOUT'
export const LOGIN_LOAD = 'LOGIN_LOAD'
export const UPDATE_USERDATA = 'UPDATE_USERDATA'
export const THIRD_LOAD = 'THIRD_LOAD'
import {
  requestLogin,
  requestUsersByMobilePhone,
  getUserByID,
  usersMe,
  bindingAuthDataToUser,
  wechatInfo,
  wechatUserInfo,
  QQUserInfo,
  thirdLogin,
  bindingToUser,
  classBatch,
  classCreatNewOne,
  userExsitJudge,
  getUpdateMeByParam,
  verifySmsCode
} from '../../request/leanCloud';
import { leancloud_installationId } from '../../configure/push/push'
import {
  loadAccount,
} from '../../configure/storage'

import { get, req } from './req'
import { batch } from '../module/leancloud'
import { NavigationActions, StackActions } from 'react-navigation';
import { setLeanCloudSession } from '../../configure/reqConfigs'
// *** Action Types ***
import { Platform } from 'react-native'
import Toast from 'react-native-simple-toast';
import { updatePush } from '../../configure/push/push'
import { user } from '../../request/LCModle'
import * as Keychain from 'react-native-keychain';
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';
import moment from 'moment'
import DeviceInfo from 'react-native-device-info'
import md5 from "react-native-md5";

const secret = '00e7625e8d2fdd453ac54e83f2de153c'
const wechatAppID = 'wx637e6f35f8211c6d'
// WeChat.registerApp('wx637e6f35f8211c6d')
// import { popToIndex } from '../nav'

//当为异步的时候这么写，返回一个函数


export function loadAccountAction(): Function {

  return dispatch => {
    return loadAccount(ret => {
      dispatch(_loadAccount(ret));
    });
  }
}

function _loadAccount(ret: string): Object {
  return {
    type: LOAD_ACCOUNT,
    accountText: ret,
    passwordText: '',
  }
}

export function accountTextChange(text: string): Object {
  return {
    type: ACCOUNT_CHANGE,
    accountText: text,
  }
}

export function passwordTextChange(text: string): Object {
  return {
    type: ACCOUNT_CHANGE,
    passwordText: text,
  }
}

/**
 * 这边做了一个异步范例
 * dipacth 能够实现其异步，是通过 redux-thund 这个库来实现异步的。
 *
 */


const sessionTokenkey = 'sessionToken'

export function userInfo() {

  return async dispatch => {

    // const uuid =  DeviceInfo.getUniqueID()


    try{
      dispatch(_loginRequest());
      const credentials = await Keychain.getGenericPassword();
      const userString = credentials.password;
      // const sessionToken = await storage.load({ key: sessionTokenkey, })
      const user = JSON.parse(userString)
      const sessionToken = user.sessionToken
      if (sessionToken) {
        const sessionToken = user.sessionToken
        // setLeanCloudSession(sessionToken)
        // const params = usersMe()
        dispatch(loginSucceed(user));
        return user
        // try {
        //   const res = await get(params)
        //   console.log('res:', res);
        //   dispatch(_loginSucceed(res));
        //   return res;
        // } catch (e) {
        //   return dispatch(anonymousUser());
        // }
      } else {
        return dispatch(anonymousUser());
      }
    }catch (e){
      return dispatch(anonymousUser());
    }



  }
}


const anonymousUser = () => {
  return async dispatch => {
    try {
      let uniqueId = DeviceInfo.getUniqueID();
      if (Platform.OS === 'ios') {
        uniqueId = md5.hex_md5(uniqueId).substring(8, 24)
      }
      const anonymousConfig = { id: uniqueId }
      const userInfoParmas = thirdLogin('anonymous', anonymousConfig)
      const user = await get(userInfoParmas)
      await dispatch(_loginSucceed(user));
      await dispatch(_addSample(user))
      //
      // dispatch(NavigationActions.navigate({
      //   routeName: 'tab'
      // }))
      return user
      // console.log('user:', user);
    } catch (e) {
      // Toast.show(e.message)
      console.log('anonymousUser error:', e.message);
      const userInfoParmas = thirdLogin('anonymous', anonymousConfig)
      dispatch(_loginFailed());
      return await get(userInfoParmas)

    }
  }
}


const iCardSample = (objectId) => [{
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
  limitTimes: ['20:00', "24:00"],
  price: 0,
  state: 0,
  // doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
  user: {
    __type: "Pointer",
    className: "_User",
    objectId: objectId
  }
}, {
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
  limitTimes: ['00:00', "24:00"],
  price: 0,
  state: 0,
  // doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
  user: {
    __type: "Pointer",
    className: "_User",
    objectId: objectId
  }
}]

const iUseSample = (objectId, iCardId) => {
  return {
    time: 0,
    // notifyTime:option&&option.notifyTime||"20.00",
    doneDate: { "__type": "Date", "iso": moment('2017-03-20').toISOString() },
    user: {
      __type: "Pointer",
      className: "_User",
      objectId: objectId
    },
    iCard: {
      __type: "Pointer",
      className: "iCard",
      objectId: iCardId
    },
    statu: 'start',
    privacy: 2,
  }
}

//预设示例
function _addSample(user) {
  return async dispatch => {
    const { createdAt, updatedAt, objectId } = user
    const createdAtTime = (new Date(createdAt)).getTime()
    const updatedAtTime = (new Date(updatedAt)).getTime()
    // console.log('time:', updatedAtTime,createdAtTime);
    if (updatedAtTime - createdAtTime < 5000) {
      //生成一个icard
      dispatch(loginLoad(true))
      const iCards = iCardSample(objectId)
      const iCardsReq = iCards.map(item => classCreatNewOne('iCard', item))
      const iCardsBatch = classBatch(iCardsReq)
      const iCardsRes = await get(iCardsBatch)
      const iUseReq = iCardsRes.map(item => {
        if (item.success) {
          const iUseParam = iUseSample(objectId, item.success.objectId)
          return classCreatNewOne('iUse', iUseParam)
        }
      })
      //添加圈子示例
      const iUseParam = iUseSample(objectId, '5be8f3f0ee920a00668767bc')
      iUseReq.push(classCreatNewOne('iUse', iUseParam))
      const iUseBatch = classBatch(iUseReq)
      await get(iUseBatch)
      return dispatch(loginLoad(false))
    }
  }
}


/**
 * 登录
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
export function login(state: Object): Function {

  const parame = requestLogin(state.phone, state.ymCode);

  return dispatch => {
    dispatch(_loginRequest());


    return get(parame).then(async (response) => {
      if (response.statu) {
        //加入sessionToken
        await dispatch((response));


        dispatch(navigatePop());
      } else {
        dispatch(_loginFailed(response));
      }
    })

  }
}


/**
 * 注册
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
export function register(state: Object): Function {

  return async dispatch => {

    try {
      dispatch(_loginRequest());


      const userExsit = await getUserExsitJudge('phoneNumber', state.phone)
      // console.log('userExsit:', userExsit);
      if (userExsit === false) {
        //将匿名用户转化
        // https://leancloud.cn/docs/rest_sms_api.html#hash-745966375
        // requestMobilePhoneVerify
        //第一步设置用户手机号。
        //
        //第二步校验号码
        const mobilePhoneVerifyRes = await mobilePhoneVerify(state.phone, state.ymCode)


        console.log('mobilePhoneVerifyRes:', mobilePhoneVerifyRes);
        //第三步如果错误清除手机号，成功则清除匿名标记,并标记已登录


        if (mobilePhoneVerifyRes && !mobilePhoneVerifyRes.error) {
          await dispatch(updateMeByParam({
            mobilePhoneNumber: state.phone,
            authData: {
              anonymous: { "__op": "Delete" },
            }
          }))
          dispatch(StackActions.pop())
        }

        // await dispatch(updateMeByParam({mobilePhoneNumber:{"__op":"Delete"}}))

        //微信直接清除匿名标记，并标记已登录。
        return dispatch(_loginFailed());

      }
      //已存在则直接登录

      const params = requestUsersByMobilePhone(
        state.phone,
        state.ymCode,
        state.setPwd);
      const user = await get(params)
      await dispatch(_loginSucceed(user));
      await dispatch(_addSample(user))
      // dispatch(NavigationActions.navigate({
      //   routeName: 'punch'
      // }))
      dispatch(StackActions.pop())
      return user
    } catch (e) {
      Toast.show(e.message)
      return dispatch(_loginFailed());
    }

  }
}


//校验手机号
export function mobilePhoneVerify(mobilePhoneNumber, code) {
  const params = verifySmsCode(mobilePhoneNumber, code)
  return get(params)
}


function _loginRequest(): Object {
  return {
    type: LOGIN_REQUEST,
    loaded: true,
  }
}

function _loginSucceed(response: Object): Object {
  // const data = {...response,mobileNum:accountText,selectCommunityNum:0}
  // saveUserData(response);
  // saveAccount(response.mobilePhoneNumber);

  //只保存 sessionToken
  return async dispatch => {
    if (response) {
      // const { sessionToken = '', username = '' } = response
      // const userString = JSON.stringify(response)
      // Keychain.setGenericPassword(username, userString);
      updateLocation(response)
      return dispatch(loginSucceed(response));
    }
  }


  // storage.save({
  //     key: sessionTokenkey,  //注意:请不要在key中使用_下划线符号!
  //     data: sessionToken,
  // });


}


export function loginSucceed(data: Object): Object {
  //保存登录信息。
  setLeanCloudSession(data.sessionToken);
  // setAPPAuthorization(data.authorization);

  // console.log('data:', data);
  updatePush(user(data.objectId))

  return {
    type: LOGIN_SUCCEED,
    loaded: false,
    data: data,
    // isTourist: !!(data.authData &&
    //   data.authData.anonymous &&
    //   data.authData.anonymous.id)
  }

}

export function loginLoad(loaded) {
  return {
    type: LOGIN_LOAD,
    loaded,
  }
}

export function _loginFailed(response: Object): Object {
  return {
    type: LOGIN_FAILED,
    loaded: false
  }
}


export function logout(): Function {

  return async (dispatch, getState) => {

    try {
      const state = getState()
      if (!state.user.isLogin) return
      // const parame = appLogout(state.user.data.appUserId||'');
      // const response = await send(parame)
      // if (response.isSuccess === '1') {
      //     //加入sessionToken


      // dispatch(navigatePush('TabView'));
      // Router.pop()
      // clearUserData();

      // storage.remove({ key: sessionTokenkey });
      Keychain.resetGenericPassword()

      dispatch(logout2());//先退出
      // dispatch(NavigationActions.navigate({ routeName: 'login' }))
      updatePush(user("null"))

      // await dispatch(anonymousUser())

      dispatch(NavigationActions.navigate({ routeName: 'AuthLoading' }))
      // return loadAccount(ret => {
      //   //加载本地数据。
      //   dispatch(_loadAccount(ret));
      // });


      // } else {
      //     Toast.show(response.msg)
      //
      //     // dispatch(_loginFailed(response));
      // }
    } catch (e) {
      console.log('test:', e.message);
      Toast.show(e.message)
      // dispatch(_loginFailed(e.message));
    }


  }


}

function logout2() {
  return {
    type: LOGOUT,
  }
}

export function updateUserData(data: Object) {

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
    data: data,
  }
}


export function updateMeByParam(param) {
  return async (dispatch, getState) => {
    const user = getState().user.data
    const params = getUpdateMeByParam(user.objectId, param)
    await get(params)
    return dispatch(updateUserData(param))
  }
}

export function update() {
  return async dispatch => {
    const params = usersMe()
    const res = await get(params)
    updateLocation(res)
    return dispatch(updateUserData(res))
  }
}

function updateLocation(user) {
  const { sessionToken = '', username = '' } = user
  const userString = JSON.stringify(user)
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


export function weChatLogin(Key) {
  return async (dispatch, getState) => {
    try {

      dispatch(thirdLoaded(Key))
      const weConfig = await WeChat.sendAuthRequest("snsapi_userinfo")
      if (!weConfig) {
        return dispatch(thirdLoaded(''))
      }
      const { appid, code } = weConfig

      //获取openid
      const wechatInfoParam = wechatInfo(wechatAppID, secret, code)
      const weInfo = await get(wechatInfoParam)
      const { access_token, openid } = weInfo
      // console.log('weInfo:', weInfo);

      const userExsit = await getUserExsitJudge('weixin', openid)
      let user = getState().user.data
      if (userExsit === false) {
        //如果不存在，则直接更换匿名用户
        await dispatch(updateMeByParam({
          authData: {
            anonymous: { "__op": "Delete" },
            weixin: weInfo
          },
        }))
        dispatch(StackActions.pop())
      } else {
        //如果存在，则直接登录老账号
        const userInfoParmas = thirdLogin('weixin', weInfo)
        user = await get(userInfoParmas)
        if (user.sessionToken) {
          await dispatch(_loginSucceed(user));
          await dispatch(_addSample(user))
          // dispatch(NavigationActions.navigate({
          //   routeName: 'tab',
          //   params: { transition: 'forVertical' }
          // }))
          dispatch(StackActions.pop())
        } else {
          Toast.show(JSON.stringify(weConfig))
        }
      }

      dispatch(thirdLoaded(''))
      //获取微信用户信息


      let exData = {}
      if (user.sessionToken && !user.headimgurl) {
        const userInfoParams = wechatUserInfo(access_token, openid)
        const userInfo = await get(userInfoParams)
        let { nickname, headimgurl } = userInfo

        nickname = user.nickname || nickname
        exData = {
          nickname,
          headimgurl
        }
        const params = bindingToUser(user.objectId, exData)
        const res = await get(params)

        dispatch(updateUserData({
          ...exData,
          ...res
        }))
      }
      // return dispatch(bindingAuthData('weixin', KEY, weInfo,exData))

    } catch (e) {
      dispatch(thirdLoaded(''))
      if (e instanceof WeChat.WechatError) {
        const errObj = {
          '-1': '普通错误类型',
          '-2': '分享取消',
          '-3': '发送失败',
          '-4': '授权失败',
          '-5': '微信不支持',
        }
        Toast.show(errObj[e.code + ""])
      } else {
        Toast.show(e.message)
      }
    }

    // const res2 = req(params)
  }

}

export function qqLogin(Key) {
  return async (dispatch, getState) => {
    try {
      dispatch(thirdLoaded(Key))
      const qqConfig = await QQAPI.login()
      if (!qqConfig) {
        return dispatch(thirdLoaded(''))
      }

      const userExsit = await getUserExsitJudge('qq', qqConfig.openid)
      let user = getState().user.data
      if (userExsit === false) {
        //如果不存在，则直接更换匿名用户
        await dispatch(updateMeByParam({
          authData: {
            anonymous: { "__op": "Delete" },
            qq: qqConfig
          },
        }))
        dispatch(StackActions.pop())
      } else {
        const userInfoParmas = thirdLogin('qq', qqConfig)
        user = await get(userInfoParmas)
        if (user.sessionToken) {
          await  dispatch(_loginSucceed(user));
          await dispatch(_addSample(user))
          // dispatch(NavigationActions.navigate({
          //   routeName: 'tab',
          //   params: { transition: 'forVertical' }
          // }))
          dispatch(StackActions.pop())
        }
      }

      dispatch(thirdLoaded(''))

      //获取微信用户信息

      let exData = {}
      if (user.sessionToken && !user.headimgurl) {
        const { access_token, oauth_consumer_key, openid } = qqConfig
        const userInfoParams = QQUserInfo(access_token, oauth_consumer_key, openid)
        const info = await get(userInfoParams)
        const userInfo = JSON.parse(info)
        let { nickname, figureurl_qq_2 } = userInfo
        nickname = user.nickname || nickname
        exData = {
          nickname,
          headimgurl: figureurl_qq_2
        }
        const params = bindingToUser(user.objectId, exData)
        // console.log('params:', params);
        const res = await get(params)

        dispatch(updateUserData({
          ...exData,
          ...res
        }))
      }


    } catch (e) {
      dispatch(thirdLoaded(''))
      Toast.show(e.message)
    }

  }
}

export function thirdLoaded(key) {
  return {
    type: THIRD_LOAD,
    theThirdLoaded: key,
  }
}

export function wechatBinding(KEY) {


  return async (dispatch, getState) => {
    try {
      const weConfig = await WeChat.sendAuthRequest("snsapi_userinfo")
      const { appid, code } = weConfig

      //获取openid
      const wechatInfoParam = wechatInfo(wechatAppID, secret, code)
      const weInfo = await get(wechatInfoParam)
      const { access_token, openid } = weInfo

      //获取微信用户信息
      const state = getState()
      const user = state.user.data
      let exData = {}
      if (openid && !user.headimgurl) {
        const userInfoParams = wechatUserInfo(access_token, openid)
        const userInfo = await get(userInfoParams)
        let { nickname, headimgurl } = userInfo

        nickname = user.nickname || nickname
        exData = {
          nickname,
          headimgurl
        }
      }

      return dispatch(bindingAuthData('weixin', KEY, weInfo, exData))

    } catch (e) {
      if (e instanceof WeChat.WechatError) {
        const errObj = {
          '-1': '普通错误类型',
          '-2': '分享取消',
          '-3': '发送失败',
          '-4': '授权失败',
          '-5': '微信不支持',
        }
        Toast.show(errObj[e.code + ""])
      } else {
        Toast.show(e.message)
      }
    }

    // const res2 = req(params)
  }


}

export function qqBinding(KEY) {
  return async (dispatch, getState) => {
    try {
      const qqConfig = await QQAPI.login()

      const { access_token, oauth_consumer_key, openid } = qqConfig

      //获取微信用户信息
      const state = getState()
      const user = state.user.data
      let exData = {}

      if (!user.headimgurl) {
        const params = QQUserInfo(access_token, oauth_consumer_key, openid)
        const info = await get(params)
        const userInfo = JSON.parse(info)

        let { nickname, figureurl_2, figureurl_qq_2 } = userInfo

        nickname = user.nickname || nickname
        exData = {
          nickname,
          headimgurl: figureurl_qq_2
        }
      }


      return dispatch(bindingAuthData('qq', KEY, qqConfig, exData))


    } catch (e) {

      Toast.show(e.message)

    }

    // const res2 = req(params)
  }


}


export function breakBinding(key, loadKey) {

  return dispatch => {
    return dispatch(bindingAuthData(key, loadKey, null))
  }


}


export function bindingAuthData(key, loadKey, ad, exData) {
  return async (dispatch, getState) => {
    const state = getState()
    const userId = state.user.data.objectId;
    const params = bindingAuthDataToUser(userId, key, ad, exData)
    const res = await get(params, loadKey)
    if (res.objectId) {
      const authData = {
        ...state.user.data.authData,
        ...params.params.authData,

      }
      const entity = {
        authData,
        ...exData,
        ...res
      }
      dispatch(updateUserData(entity))
    }

  }
}


//判断user 是否存在

async function getUserExsitJudge(type, id) {
  const params = userExsitJudge(type, id);
  const res = await  get(params)
  return res.result.userExsit
}