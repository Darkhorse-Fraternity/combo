/**
 * Created by lintong on 2016/11/6.
 * @flow
 */
'use strict';

export const SHARE_TO_TIMELINE = 'SHARE_TO_TIMELINE'
export const SHARE_TO_SESSION = 'SHARE_TO_SESSION'
export const SHARE_TO_QQ = 'SHARE_TO_QQ'
export const Share_TO_ZONE = 'Share_TO_ZONE'
export const SHARE_TO_SINA = 'SHARE_TO_SINA'
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';

import Toast from 'react-native-simple-toast'

// WeChat.registerApp('wx637e6f35f8211c6d')

export function shareTo(type: string, param: object): Function {

  return dispatch => {
    if (type === SHARE_TO_TIMELINE || type === SHARE_TO_SESSION) {
      dispatch(shareToWechat(type, param))
    } else if (type === SHARE_TO_QQ || type === Share_TO_ZONE) {
      dispatch(shareToQQ(type, param))
    } else if (type === SHARE_TO_SINA) {
      dispatch(shareToWeibo(param))
    }
  }


}


export function shareToWechat(type: string, param: object = {}): Function {

  let Method = WeChat.shareToTimeline;
  if (type === SHARE_TO_SESSION) Method = WeChat.shareToSession

  return async (dispatch) => {
    try {
      let result = await Method({
        type: 'news',
        title: param.title || '金色光芒',
        webpageUrl: param.webpageUrl || 'https://icard.leanapp.cn',
        description: param.description || '勇敢地成为你自己',
        mediaTagName: 'email signature',
        messageAction: undefined,
        messageExt: undefined,
        imageUrl: param.imageUrl || 'http://www.ncloud.hk/email-signature-262x100.png',
        thumbImage: param.thumbImage || 'http://www.ncloud.hk/email-signature-262x100.png'
      });
      // console.log('shareToWechat successful:', result);

      return dispatch(shareLast(type,result))
    } catch (e) {
      if (e instanceof WeChat.WechatError) {
        // console.error(e.stack);
        const errObj = {
          '-1': '普通错误类型',
          '-2': '分享取消',
          '-3': '发送失败',
          '-4': '授权失败',
          '-5': '微信不支持',
        }
        Toast.show(errObj[e.code + ""])
      } else {
        throw e;
      }
      // console.error('shareToWechat:', e);
    }
  }


}

export function shareToQQ(type: string, param: object = {}): Function {
  let Method = QQAPI.shareToQQ;
  if (type === Share_TO_ZONE) Method = QQAPI.shareToQzone

  return async (dispatch) => {
    try {
      let result = await Method({
        type: 'news',
        title: param.title || '金色光芒',
        description: param.description || '',
        webpageUrl: param.webpageUrl || 'https://stg-icard.leanapp.cn/',
        imageUrl: param.imageUrl || param.thumbImage || 'http://www.ncloud.hk/email-signature-262x100.png',
      });
      console.log('share text message to time line successful:', result);
      return dispatch(shareLast(type,result))
    } catch (e) {
      Toast.show(e.message)
      console.error('share text message to time line failed with:', e.message);
    }
  }
}

export function shareToWeibo(param: object): Function {
  return async (dispatch) => {
    try {
      let result = await WeiboAPI.share({
        type: 'news',
        text: '描述',
        imageUrl: '远程图片地址',
      });
      console.log('share text message to time line successful:', result);
      return dispatch(() => {
        type:SHARE_TO_SINA, result
      })
    } catch (e) {
      console.error('share text message to time line failed with:', e.message);
    }
  }

}


export function shareLast(tag,result) {
  return {
    type: 'APP_SHARE',
    tag,
    result
  }
}