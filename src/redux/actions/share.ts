/**
 * Created by lintong on 2016/11/6.
 * @flow
 */
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';

import Toast from 'react-native-simple-toast';
import { ShareMetadata } from 'react-native-wechat';

export const SHARE_TO_SESSION = 'SHARE_TO_SESSION';
export const SHARE_TO_TIMELINE = 'SHARE_TO_TIMELINE';
export const SHARE_TO_QQ = 'SHARE_TO_QQ';
export const Share_TO_ZONE = 'Share_TO_ZONE';
export const SHARE_TO_SINA = 'SHARE_TO_SINA';

// WeChat.registerApp('wx637e6f35f8211c6d')

export function shareTo(
  type:
    | typeof SHARE_TO_SESSION
    | typeof SHARE_TO_TIMELINE
    | typeof SHARE_TO_QQ
    | typeof Share_TO_ZONE
    | typeof SHARE_TO_SINA,
  param: Omit<ShareMetadata, 'type'>,
) {
  if (type === SHARE_TO_TIMELINE || type === SHARE_TO_SESSION) {
    shareToWechat(type, param);
  } else if (type === SHARE_TO_QQ || type === Share_TO_ZONE) {
    shareToQQ(type, param);
  } else if (type === SHARE_TO_SINA) {
    // shareToWeibo(param);
  }
}

export async function shareToWechat(
  type: string,
  param: Omit<ShareMetadata, 'type'>,
) {
  let Method = WeChat.shareToTimeline;
  if (type === SHARE_TO_SESSION) {
    Method = WeChat.shareToSession;
  }

  try {
    const result = await Method({
      type: 'news',
      title: param.title || '小改变',
      webpageUrl: param.webpageUrl || 'https://icouage.cn',
      description: param.description || '勇敢地成为你自己',
      // messageAction: undefined,
      // messageExt: undefined,
      imageUrl: param.imageUrl,
      thumbImage: param.thumbImage,
    });
    console.log('shareToWechat successful:', result);
  } catch (e) {
    if (e instanceof WeChat.WechatError) {
      // console.error(e.stack);
      const errObj = {
        '-1': '普通错误类型',
        '-2': '分享取消',
        '-3': '发送失败',
        '-4': '授权失败',
        '-5': '微信不支持',
      };
      Toast.show(errObj[`${e.code}`]);
    } else {
      throw e;
    }
    // console.error('shareToWechat:', e);
  }
}

export async function shareToQQ(
  type: string,
  param: Omit<ShareMetadata, 'type'>,
) {
  let Method = QQAPI.shareToQQ;
  if (type === Share_TO_ZONE) {
    Method = QQAPI.shareToQzone;
  }

  try {
    const result = await Method({
      type: 'news',
      title: param.title || '小改变',
      description: param.description || '',
      webpageUrl: param.webpageUrl || 'https://icouage.cn/',
      imageUrl: param.imageUrl || param.thumbImage,
    });
    // let result = {}
    console.log('share text message to time line successful:', result);
  } catch (e) {
    Toast.show(e.message);
    console.error('share text message to time line failed with:', e.message);
  }
}

// export function shareToWeibo(param: object): Function {
//   try {
//     const result = await WeiboAPI.share({
//       type: 'news',
//       text: '描述',
//       imageUrl: '远程图片地址',
//     });
//     console.log('share text message to time line successful:', result);
//   } catch (e) {
//     console.error('share text message to time line failed with:', e.message);
//   }
// }

// export function shareLast(tag, result) {
//   return {
//     type: 'APP_SHARE',
//     tag,
//     result,
//   };
// }
