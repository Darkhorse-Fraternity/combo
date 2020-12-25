/*
 * @Author: tonyYo
 * @Date: 2020-12-25 10:04:27
 * @LastEditors: tonyYo
 * @LastEditTime: 2020-12-25 13:22:55
 * @FilePath: /Combo/src/request/uploadAVImage.ts
 */
/*!
 *
 * https://leancloud.cn/docs/leanstorage_guide-js.html#从本地路径构建文件
 * 上传image 到leanCloud
 * @flow
 */

import AV from 'leancloud-storage';
import * as adapters from '@leancloud/platform-adapters-react-native';
//@ts-expect-error
AV.setAdapters(adapters);
import { LeanCloud_APP_ID, LeanCloud_APP_KEY } from '../configure/leancloud';

AV.init({
  appId: LeanCloud_APP_ID,
  appKey: LeanCloud_APP_KEY,
  serverURLs: 'https://api.icourage.cn',
});

export function uploadFilesByLeanCloud(imageURLs: string[]) {
  const promises = imageURLs.map((imageURL) => {
    console.log('imageURL', imageURL);
    return new AV.File('image.jpg', {
      blob: {
        uri: imageURL,
      },
      owner: AV.User.currentAsync(),
    }).save();
  });

  return Promise.all(promises);
}
