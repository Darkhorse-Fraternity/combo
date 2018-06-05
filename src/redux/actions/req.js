/**
 * Created by lintong on 10/19/16.
 * @flow
 */
'use strict';
import { send } from '../../request'

export const REQUEST_LOAD = 'REQUEST_LOAD'
export const REQUEST_SUCCEEED = 'REQUEST_SUCCEEED'
export const REQUEST_FAILED = 'REQUEST_FAILED'
export const REQUESR_CHANGE_DATA = 'REQUESR_CHANGE_DATA'
import Toast from 'react-native-simple-toast';
import store from '../store'
import { normalize } from 'normalizr';
import { addEntities } from '../module/normalizr'
import { schemas } from '../scemes'


export const RESCODE = 'code'
export const SUCCODE = -1000
export const MSG = 'error'
export const DATA = 'results'


export function reqY(params) {
    return send(params).then((response) => {
        const contentType = response.headers.get("content-type")
        let responseData = contentType.indexOf("application/json") !== -1 ? response.json() : {}
        return responseData;
    })
}

export function reqS(params) {

    return reqY(params).then(response => {
        //对leancloud 的数据格式进行包装，兼容通用数据模型
        if (!params.host && response &&!response[RESCODE]) {
            response = { [DATA]: response, [RESCODE]: SUCCODE }
        }

        // if (response[RESCODE] === "2" || response[RESCODE] === "3") {
        //     console.log('response[RESCODE]:', response[RESCODE]);
        //     store.dispatch(logout())
        // }
        return response
    })
}

//加入msg
export function reqM(params) {
    return reqS(params).then(response => {
        if (response && response[RESCODE]) {
            __DEV__ && response[RESCODE] !== SUCCODE && console.log('req message:', response[MSG]);
            response[RESCODE] !== SUCCODE && Toast.show(response[MSG], Toast.LONG)
        }

        return response
    })
}


export function cleanData(response, option) {
    const data = (!option.dataMap ? response[DATA] : option.dataMap(response[DATA]))
        || response


    if (option.sceme && data) {
        const normalizeData = normalize(data, option.sceme);
        normalizeData && normalizeData.entities
        && store.dispatch(addEntities(normalizeData.entities))
        return normalizeData.result[DATA]
    }

    return data;
}


//加入 根据key 存入store
export function reqA(params: Object, key: string, option: Object = {}) {
    if (!key) {
        return reqM(params)
    }
    const dispatch = store.dispatch
    dispatch(requestStart(key))
    return reqM(params).then(response => {
        if (response && response[RESCODE]) {
            if (response[RESCODE] === SUCCODE) {
                const data = cleanData(response, option)
                dispatch(requestSucceed(key, data))
            } else if(response){
                dispatch(requestFailed(key, response[MSG]))
            }
        }
        return response
    }).catch(e => {
        if (e.message) {
            console.log('message:', e.message)
            Toast.show(e.message, Toast.LONG)
        }
        if (key) {
            dispatch(requestFailed(key, e.message))
        }

    })
}

//不返回错误码，直接通过通用错误处理渠道。
export function req(params: Object, key: string, option: Object = {}) {
    return reqA(params, key, option).then(response => {
        // console.log('test:', response);
        if (response && response[RESCODE] === SUCCODE) {
            return response[DATA]
        } else {
            throw new Error();
        }
    })
}


export function load(params: Object, key: stringg) {
    return req(params, key, { 'sceme': schemas[key] })
}

export function clear(key: stringg) {

    // return requestSucceed(key, {})
    return requestSucceed(key, {})
}


export function requestSucceed(key: string, data: Object): Object {
    return {
        type: REQUEST_SUCCEEED,
        load: false,
        payload: data,
        key,
    }

}


/**
 * 请求失败
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
export function requestFailed(key: string, err: any): Object {
    return {
        type: REQUEST_FAILED,
        load: false,
        key,
        err,
    }
}

/**
 * 开始请求，使得loaded 变动。
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
export function requestStart(key: string): Object {
    return {
        type: REQUEST_LOAD,
        load: true,
        key,
    }
}

export function reqChangeData(key: string, data: Object): Object {
    return {
        type: REQUESR_CHANGE_DATA,
        payload: data,
        key,
    }
}