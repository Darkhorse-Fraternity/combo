/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

/**
 * 工具类，
 */

import { req, requestStart, requestFailed, requestSucceed } from './req'

export const LOAD_AVATAR = 'LOAD_AVATAR'
export const UPLOAD_IMAGES = 'UPLOAD_IMAGES'
export const CHANGEAVATAR = 'CHANGEAVATAR'
export const DATA_STORAGE = 'DATA_STORAGE'
export const APP_STATE_UPDATE = 'APP_STATE_UPDATE'
export const LOCAL_REMIND = 'LOCAL_REMIND'

import { bindingFileToUser } from '../../request/leanCloud'

import Toast from 'react-native-simple-toast'
import { uploadFilesByLeanCloud } from '../../request/uploadAVImage'

export function uploadAvatar(uri: string): Function {
  return async (dispatch, getState) => {
    const state = getState()
    const user = state.user.data
    try {
       dispatch(avatarStatu(true))
      let res = await uploadFilesByLeanCloud([uri])
      res = res[0]
      const bindUserParam = bindingFileToUser(user.objectId, res.id, 'avatar');
      await dispatch(req(bindUserParam))
      dispatch(avatarStatu(false))
      return  {
        objectId: res.id,
        url: res.url(),
      }
      // dispatch(updateUserData({ avatar }))
    } catch (e) {
      console.log('test:', e.message);
      Toast.show(e.message)
    }
  };
}

export function uploadImages(uris: any, key: string) {
  return async (dispatch) => {
    dispatch(requestStart(key))
    try {
      let res = await uploadFilesByLeanCloud(uris)
      return dispatch(requestSucceed(key, res))

    } catch (e) {
      console.log('test:', e.message);
      return dispatch(requestFailed(key, e.message))
    }
  };

}


export function dataStorage(key: string, data: any): Object {
  return {
    type: DATA_STORAGE,
    key,
    data,
  }
}

export function appStateUpdate(state): Object {
  return {
    type: APP_STATE_UPDATE,
    state,
  }
}





export function localRemind(id,value) {
  return {
    type:LOCAL_REMIND,
    data:{[id]:value}
  }
}

export function localRemindLoad(data) {
  return {
    type:LOCAL_REMIND,
    data
  }
}


function avatarStatu(statu) {
  return {
    type:LOAD_AVATAR,
    statu
  }
}