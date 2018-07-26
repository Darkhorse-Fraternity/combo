/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {
    requestLogin,
    requestUsersByMobilePhone,
    getUserByID }
    from '../../request/leanCloud';
import { leancloud_installationId } from '../../configure/push/push'
import {
    saveAccount,
    saveUserData,
    loadAccount,
    clearUserData } from '../../configure/storage'
// import {
//     navigatePush,
//     navigatePop,
//     navigateClearMiddleScene,
//     navigatePopToIndex,
//     navigateReplaceIndex
// } from './nav'
import { req } from './req'
import { NavigationActions } from 'react-navigation';
import { setLeanCloudSession } from '../../configure/reqConfigs'
// *** Action Types ***
export const ACCOUNT_CHANGE = 'ACCOUNTTEXT_CHANGE'
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCEED = 'LOGIN_SUCCEED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOAD_ACCOUNT = 'LOAD_ACCOUNT'
export const LOGOUT = 'LOGOUT'
export const UPDATE_USERDATA = 'UPDATE_USERDATA'
import Toast from 'react-native-simple-toast';
import { updatePush } from '../../configure/push/push'
import { user } from '../../request/LCModle'
import { usersMe } from '../../request/leanCloud'
import * as Keychain from 'react-native-keychain';
// import { popToIndex } from '../nav'

//当为异步的时候这么写，返回一个函数

import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';

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

export   function userInfo() {

    return  async dispatch => {


        const credentials = await Keychain.getGenericPassword();
        const sessionToken = credentials.password;
        // const sessionToken = await storage.load({ key: sessionTokenkey, })
        setLeanCloudSession(sessionToken)
        const params = usersMe()

  
        if(sessionToken){
            const res = await req(params)
            dispatch(_loginSucceed(res));
            return res;
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


        return req(parame).then((response) => {
            if (response.statu) {
                //加入sessionToken
                dispatch(_loginSucceed(response));

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

    return dispatch => {
        const params = requestUsersByMobilePhone(state.phone, state.ymCode,
            state.setPwd);
        dispatch(_loginRequest());

        return req(params).then((response) => {

            dispatch(_loginSucceed(response));
            dispatch(NavigationActions.navigate({
                routeName: 'Tab',
                params: { transition: 'forVertical' }
            }))
        }).catch(e => {
            // Toast.show(e.message)
            dispatch(_loginFailed());
        })
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
    const { sessionToken,username } = response
    // storage.save({
    //     key: sessionTokenkey,  //注意:请不要在key中使用_下划线符号!
    //     data: sessionToken,
    // });


    Keychain.setGenericPassword(username, sessionToken);

    return loginSucceed(response);
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
            // popToIndex()
            // clearUserData();

            // storage.remove({ key: sessionTokenkey });
            Keychain.resetGenericPassword()

            dispatch(logout2());//先退出
            dispatch(NavigationActions.navigate({ routeName: 'Login' }))
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
        return req(param, (response) => {

            if (response) {
                dispatch(_loginSucceed(response));
            } else {
                dispatch(_loginFailed(response));
            }
            callBack(response);
        });
    }
}


export function wechatBinding() {
    WeChat.sendAuthRequest()
}