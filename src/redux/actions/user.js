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
  classCreatNewOne
} from '../../request/leanCloud';
import { leancloud_installationId } from '../../configure/push/push'
import {
  loadAccount,
} from '../../configure/storage'

import { get } from './req'
import { batch } from '../module/leancloud'
import { NavigationActions } from 'react-navigation';
import { setLeanCloudSession } from '../../configure/reqConfigs'
// *** Action Types ***

import Toast from 'react-native-simple-toast';
import { updatePush } from '../../configure/push/push'
import { user } from '../../request/LCModle'
import * as Keychain from 'react-native-keychain';
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';
import moment from 'moment'
import DeviceInfo from 'react-native-device-info'

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

    const uuid =  DeviceInfo.getUniqueID()
    console.log('uuid:', uuid);


    dispatch(_loginRequest());
    const credentials = await Keychain.getGenericPassword();
    const sessionToken = credentials.password;
    // const sessionToken = await storage.load({ key: sessionTokenkey, })

    if (sessionToken) {
      setLeanCloudSession(sessionToken)
      const params = usersMe()
      try {
        const res = await get(params)
        dispatch(_loginSucceed(res));
        return res;
      } catch (e) {
        dispatch(_loginFailed());
      }
    } else {
      dispatch(_loginFailed());
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
    color: '#cddc39',
  },
  notifyText: '早睡早起身体好!',
  notifyTimes: ['22:00'],
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
    color: '#dce775',
  },
  notifyText: '坚持鸭!',
  notifyTimes: ['20:00'],
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
    if (updatedAtTime - createdAtTime < 10000) {
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
      dispatch(loginLoad(false))
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

export function update() {
  return async dispatch => {
    const params = usersMe()
    const res = await get(params)
    return dispatch(updateUserData(res))
  }
}

/**
 * 注册
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
export function register(state: Object): Function {

  return async dispatch => {
    const params = requestUsersByMobilePhone(state.phone, state.ymCode,
      state.setPwd);
    dispatch(_loginRequest());

    try {
      const response = await get(params)
      await dispatch(_loginSucceed(response));
      dispatch(NavigationActions.navigate({
        routeName: 'tab'
      }))
      return response
    } catch (e) {
      Toast.show(e.message)
      return dispatch(_loginFailed());
    }

  }
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
      const { sessionToken = '', username = '' } = response
      Keychain.setGenericPassword(username, sessionToken);
      const res = await  dispatch(loginSucceed(response));

      await dispatch(_addSample(response))

      return res
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
      dispatch(NavigationActions.navigate({ routeName: 'login' }))
      updatePush(user("null"))


      return loadAccount(ret => {
        //加载本地数据。
        dispatch(_loadAccount(ret));
      });


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
  return {
    type: UPDATE_USERDATA,
    data: data,
  }
}


export function getUserByObjectID(objectID: string, callBack: Function): Function {
  return dispatch => {
    dispatch(_loginRequest());
    const param = getUserByID(objectID);
    return get(param, (response) => {

      if (response) {
        dispatch(_loginSucceed(response));
      } else {
        dispatch(_loginFailed(response));
      }
      callBack(response);
    });
  }
}


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

      const userInfoParmas = thirdLogin('weixin', weInfo)
      const user = await get(userInfoParmas)
      if (user.sessionToken) {
        await dispatch(_loginSucceed(user));
        dispatch(NavigationActions.navigate({
          routeName: 'tab',
          params: { transition: 'forVertical' }
        }))
      } else {
        Toast.show(JSON.stringify(weConfig))
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
      const userInfoParmas = thirdLogin('qq', qqConfig)
      const user = await get(userInfoParmas)
      if (user.sessionToken) {
        await  dispatch(_loginSucceed(user));
        dispatch(NavigationActions.navigate({
          routeName: 'tab',
          params: { transition: 'forVertical' }
        }))
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
