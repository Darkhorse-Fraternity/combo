/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {loadUserData} from '../configure/XGlobal'
import React, {
    Platform,
    UIManager,
    ToastAndroid,
    StatusBar,
    BackAndroid,
    BackHandler,
    NetInfo
} from 'react-native';
import {loginSucceed,_loginFailed} from './actions/user'
// import {navigatePush} from './actions/nav'
import pushConfig from '../configure/push'
import {dataStorage} from '../redux/actions/util'
export const PRE_CONFIG_STATU = 'PRE_CONFIG_STATU'
import { NavigationActions } from 'react-navigation';
import Orientation from 'react-native-orientation';
import DeviceInfo from 'react-native-device-info'
import {epUpdate} from '../request/EPUpdate'


//前置配置 在一进程序的时候就会
/**
 * 用于系统前置配置。
 */
function _preConfig() {
    epUpdate()
    // StatusBar.backgroundColor = 'white'
    //加载是否是第一次进入。
    // loadFirstJoin()

    // 加载缓存设置到公共参数


    //热跟新
    // jsCheckUpdate();


    // lockToPortrait();
    //配置友盟信息
    // umeng.configure();

    if (Platform.OS !== 'ios') {
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    // Platform.OS !=='ios'&& StatusBar.setBackgroundColor('white', true);
    //
    // if()

    pushConfig()
    // Orientation.lockToPortrait()

    if (DeviceInfo.isTablet()) {
        Orientation.lockToLandscape();
    } else {
        Orientation.lockToPortrait()
    }


    // dayNotification()


}


let lastBackPressed: number = 0;

function _backAnroid () {

    return (dispatch,getState) => {
        // const BackHandler =  BackHandler || BackAndroid
        if( Platform.OS === 'ios')return;

        BackHandler.addEventListener('hardwareBackPress', ()=> {
            const state = getState().nav;
            const index = state.index;
            //idnex 前两个分别是登录和tabview
            if (index > 1) {
                dispatch(NavigationActions.back())
                return true;
            }
            let times = Date.now();
            if (times - lastBackPressed >= 2500) {
                //再次点击退出应用
                lastBackPressed = times;
                ToastAndroid.show("再按一次退出应用", 0);
                return true;
            }
            lastBackPressed = 0;
            return false;
        });
    }


}

function _isConnected(dispatch) {
    NetInfo.isConnected.addEventListener(
        'connectionChange',
        (isConnected)=>{
           // console.log('isConnected:', isConnected);
            dispatch(dataStorage('isConnected',isConnected))
        }
    );
}


export function preConfig():Function {
    _preConfig();

    return (dispatch,getState) =>{
        dispatch(_backAnroid())
        _isConnected(dispatch)
        loadUserData().then((response)=>{
            dispatch(loginSucceed(response))
            dispatch(NavigationActions.navigate({routeName: 'Tab', params: {transition: 'forVertical'}}))
        }).catch((error)=>{
            dispatch(_loginFailed())
            console.log('loadUserDataError:',error.message)
        });

    }

}



