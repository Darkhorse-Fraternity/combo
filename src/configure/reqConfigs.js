/* @flow */
'use strict'
// import DeviceInfo from 'react-native-device-info'

import {LeanCloud_APP_ID,LeanCloud_APP_SIGN} from './leancloud'
export const defaultHost = !__DEV__ ?
    /*release*/   'cmwljtyw.api.lncld.net/1.1' :
    /*debug*/     'q81jdsbi.api.lncld.net/1.1'


let LeanCloud_APP_Session = '';

export function setLeanCloudSession(session:string){
  LeanCloud_APP_Session = session;
}


export function httpHeaders(needSession:bool):Object{

   let header = {
     "Content-Type": "application/json",
     "X-LC-Sign": LeanCloud_APP_SIGN,
     "X-LC-Id": LeanCloud_APP_ID,
   }

   if(needSession){
      header = Object.assign({},
        header,
      {
        "X-LC-Session":LeanCloud_APP_Session
      })
   }
   return header;
}


