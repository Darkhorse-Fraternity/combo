/* @flow */

// import DeviceInfo from 'react-native-device-info'
import DeviceInfo from 'react-native-device-info';
import { LeanCloud_APP_ID, LeanCloud_APP_SIGN } from './leancloud';
import { appChannel } from '../../helps/util';
import {
  setNetworkConig,
  setDoCache,
  setDataMap,
  setShowErrorAction,
  ReqProps,
} from './config';
import AsyncStorage from '@react-native-community/async-storage';
import SimpleToast from 'react-native-simple-toast';

// @ts-ignore: Unreachable code error
import { Cache } from 'react-native-cache';
import DefaultPreference from 'react-native-default-preference';
// export const defaultHost = !__DEV__
//   /* release */ ? 'api.icourage.cn/1.1'
//   /* debug */ : 'api.icourage.cn/1.1';

const NATIVE_NET_KEY = 'NET_FOR_NATIVE';

export const defaultHost = !__DEV__
  ? /* release */ 'api.icourage.cn/1.1'
  : /* debug */ 'api.icourage.cn/1.1';

export const apiHost = !__DEV__
  ? /* release */ 'icourage.cn'
  : /* debug */ 'stg-icard.leanapp.cn';
// /* debug */ : 'icard.leanapp.cn';

// export const apiHost = !__DEV__
//   ? /* release */ 'cmwljtyw.api.lncld.net'
//   : /* debug */ 'cmwljtyw.api.lncld.net';

let LeanCloud_APP_Session = '';

export function setLeanCloudSession(session: string) {
  LeanCloud_APP_Session = session;
  const myHeader = { ...header };
  if (session && session.length > 0) {
    myHeader['X-LC-Session'] = LeanCloud_APP_Session;

    //发送给原生小组件
    DefaultPreference.setName('group.com.winlong.xiamen.Bear').then(() => {
      DefaultPreference.set(
        NATIVE_NET_KEY,
        JSON.stringify({
          header: myHeader,
          host: defaultHost,
        }),
      );
    });
  }

  setNetworkConig({
    headers: myHeader as HeadersInit_,
    host: defaultHost,
    scheme: 'https',
  });
}
setLeanCloudSession('');

const header = {
  'Content-Type': 'application/json; charset=utf-8',
  'X-LC-Sign': LeanCloud_APP_SIGN,
  'X-LC-Id': LeanCloud_APP_ID,
  'X-LC-Prod': __DEV__ ? '0' : '1',
  appVersion: DeviceInfo.getVersion(),
  'Accept-Encoding': 'br',
  appChannel,
};

//发送给原生小组件
DefaultPreference.setName('group.com.winlong.xiamen.Bear').then(() => {
  DefaultPreference.set(
    NATIVE_NET_KEY,
    JSON.stringify({
      header: header,
      host: defaultHost,
    }),
  );
});

export function httpHeaders() {
  // let header = {
  //   "Content-Type": "application/json; charset=utf-8",
  //   "X-LC-Sign": LeanCloud_APP_SIGN,
  //   "X-LC-Id": LeanCloud_APP_ID,
  //   "X-LC-Prod": __DEV__ ? 0 : 1,
  //   appVersion,
  //   appChannel
  // };
  const myHeader = { ...header };
  if (LeanCloud_APP_Session && LeanCloud_APP_Session.length > 0) {
    // header = Object.assign({}, header, {
    //   "X-LC-Session": LeanCloud_APP_Session
    // });
    myHeader['X-LC-Session'] = LeanCloud_APP_Session;
  }
  return myHeader;
}

const cache = new Cache({
  namespace: 'myapp',
  policy: {
    maxEntries: 50000,
  },
  backend: AsyncStorage,
});

export const setCache = (key: string, value: unknown) =>
  new Promise((resolve, reject) => {
    cache.setItem(key, value, (err: Error) => {
      // key 'hello' is 'world' in cache
      if (err) {
        reject(err);
      }
      resolve(null);
    });
  });
// cache.clearAll();
export const getCache = (key: string) =>
  new Promise((resolve, reject) => {
    // cache.clearAll();\
    cache.getItem(key, (err: Error, value: object) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });

export const doCache = async (key: string, req: Function) => {
  let cacheData = await getCache(key);
  if (!cacheData) {
    cacheData = await req();
    setCache(key, cacheData);
  } else {
    req().then((res: Object) => {
      setCache(key, res);
    });
  }
  return cacheData;
};
setDoCache(doCache);

// const RESCODE = 'code';
// const MSG = 'error';
// const DATA = 'results';

interface eType {
  message?: string;
  code?: number;
  error?: string;
}

const dataMap = async <T extends {}>(data: T, e?: eType) => {
  if (e) {
    return { error: e.message || e.error, code: e.code, result: data };
  }

  return { result: data, code: 200 };
};

setDataMap(<never>dataMap);

const errorAction = (_: ReqProps, error: string, code: number) => {
  // if (code === 432) {
  //   return;
  // }
  const localizr = { 'Network request failed': '网络请求失败' };
  const codeString = code ? `,code:${code}` : '';
  const message = (localizr[error] || error) + codeString;
  SimpleToast.show(message);
};

setShowErrorAction(errorAction);

export interface reqPlacehold {
  scheme?: string;
  host?: string;
  headers?: HeadersInit_;
}

// setNetworkConig({
//   headers: header as HeadersInit_,
//   host: defaultHost,
//   scheme: "https"
// });
