/* @flow */

// import DeviceInfo from 'react-native-device-info'
import DeviceInfo from 'react-native-device-info';
import { LeanCloud_APP_ID, LeanCloud_APP_SIGN } from './leancloud';
import { appChannel } from '../../helps/util';


export const defaultHost = !__DEV__
  /* release */ ? 'api.icourage.cn/1.1'
  /* debug */ : 'api.icourage.cn/1.1';


export const apiHost = !__DEV__
  /* release */ ? 'icourage.cn'
/* debug */ : 'stg-icard.leanapp.cn';
  // /* debug */ : 'icard.leanapp.cn';


let LeanCloud_APP_Session = '';

export function setLeanCloudSession(session: string) {
  LeanCloud_APP_Session = session;
}


export function httpHeaders(needSession: bool): Object {
  const appVersion = DeviceInfo.getVersion();

  let header = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-LC-Sign': LeanCloud_APP_SIGN,
    'X-LC-Id': LeanCloud_APP_ID,
    'X-LC-Prod': __DEV__ ? 0
      : 1,
    appVersion,
    appChannel
  };

  if (needSession) {
    header = Object.assign({},
      header,
      {
        'X-LC-Session': LeanCloud_APP_Session
      });
  }
  // console.log('LeanCloud_APP_Session', LeanCloud_APP_Session);
  return header;
}
