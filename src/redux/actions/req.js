/**
 * Created by lintong on 10/19/16.
 * @flow
 */


import Toast from 'react-native-simple-toast';
import { normalize } from 'normalizr';
import { send } from '../../request';
import { addEntities } from '../module/normalizr';
import { schemas } from '../scemes';

export const REQUEST_LOAD = 'REQUEST_LOAD';
export const REQUEST_SUCCEEED = 'REQUEST_SUCCEEED';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const REQUESR_CHANGE_DATA = 'REQUESR_CHANGE_DATA';


export const RESCODE = 'code';
export const SUCCODE = -1000;
export const MSG = 'error';
export const DATA = 'results';


// export function reqF(params) {
//     return send(params).then(res => res.ok
//         ? res : res.json().then(err => Promise.reject(err)));
// }
//

export async function reqY(params) {
  const response = await send(params);
  // console.log('response:', response);
  const contentType = response.headers.get('content-type');
  const jsonTypes = ['application/json', 'text/plain'];
  const isJSON = jsonTypes.some(type => contentType.includes(type));
  if (isJSON) {
    return response.json();
  }
  return response.text();
}

export async function reqS(params) {
  let response = await reqY(params);
  if (!params.host && response && !response[RESCODE]) {
    response = { [DATA]: response, [RESCODE]: SUCCODE };
  }
  return response;
}

// 加入msg
export async function reqM(params) {
  const response = await reqS(params);
  // console.log('response111:', response);
  if (response && response[RESCODE]) {
    __DEV__ && response[RESCODE] !== SUCCODE && console.log('req message:', response[MSG]);
    response[RESCODE] !== SUCCODE && Toast.show(response[MSG], Toast.LONG);
  }

  return response;
}


// 加入 根据key 存入store
export function reqA(params: Object, key: string, option: Object = {}) {
  return async (dispatch) => {
    if (!key) {
      return reqM(params);
    }
    dispatch(requestStart(key));
    const response = await reqM(params);
    if (response && response[RESCODE]) {
      if (response[RESCODE] === SUCCODE) {
        const data = await dispatch(cleanData(response, option));
        dispatch(requestSucceed(key, data));
      } else if (response) {
        dispatch(requestFailed(key, response[MSG]));
      }
    }
    return response;
  };
}

// 不返回错误码，直接通过通用错误处理渠道。
export function req(params: Object, key: string, option: Object = {}) {
  return async (dispatch) => {
    try {
      const response = await dispatch(reqA(params, key, option));
      if (response && response[RESCODE] === SUCCODE) {
        return response[DATA];
      }
      return response;
    } catch (e) {
      if (e.message) {
        console.log('message:', e.message);
        Toast.show(e.message, Toast.LONG);
      }
      if (key) {
        dispatch(requestFailed(key, e.message));
      }
    }
  };
}


export function load(params: Object, key: stringg) {
  return dispatch => dispatch(req(params, key, { sceme: schemas[key] }));
}

export async function get(params) {
  const response = await reqM(params);
  if (response && response[RESCODE] === SUCCODE) {
    return response[DATA];
  } if (response && response[RESCODE] && response[RESCODE] !== SUCCODE) {
    throw new Error(JSON.stringify(response));
  } else {
    return response;
  }
}


export function cleanData(response, option) {
  return async (dispatch) => {
    const data = (!option.dataMap ? response[DATA]
      : option.dataMap(response[DATA]))
      || response;
    if (option.sceme && data) {
      const normalizeData = normalize(data, option.sceme);
      normalizeData && normalizeData.entities
      && dispatch(addEntities(normalizeData.entities));
      return normalizeData.result[DATA];
    }
    return data;
  };
}


export function clear(key: stringg) {
  // return requestSucceed(key, {})
  return requestSucceed(key, {});
}


export function requestSucceed(key: string, data: Object): Object {
  return {
    type: REQUEST_SUCCEEED,
    load: false,
    payload: data,
    key,
  };
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
  };
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
  };
}

export function reqChangeData(key: string, data: Object): Object {
  return {
    type: REQUESR_CHANGE_DATA,
    payload: data,
    key,
  };
}
