/*!
 *
 * https://leancloud.cn/docs/leanstorage_guide-js.html#从本地路径构建文件
 * 上传image 到leanCloud
 * @flow
 */

import AV from 'leancloud-storage';
import * as adapters from '@leancloud/platform-adapters-react-native';
// import AsyncStorage from '@react-native-community/async-storage';
AV.setAdapters(adapters);
import {LeanCloud_APP_ID, LeanCloud_APP_KEY} from '../configure/leancloud';
// AV.initialize(LeanCloud_APP_ID, LeanCloud_APP_KEY);

AV.init({
  appId: LeanCloud_APP_ID,
  appKey: LeanCloud_APP_KEY,
  serverURLs: 'https://api.icourage.cn',
});
// if (__DEV__) {
//   AV.debug.enable();
// }

export function upload(image: string, callBack: Function) {
  //   AV.debug.enable(); // 启用
  const file = new AV.File('image.jpg', {
    blob: {
      uri: image,
      // height:100,
      // width:100,
      isStored: true,
    },
    owner: AV.User.currentAsync(),
  });
  // console.log('files:',file);
  file
    .save()
    .then((res) => {
      // console.log('Uploaded: ' + res.url())
      // console.log('Uploaded: ' + JSON.stringify(res));
      callBack(true, res);
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
      callBack(false);
    });
}

export function uploadFilesByLeanCloud(imageURLs: string[]) {
  const promises = imageURLs.map((imageURL, i) => {
    console.log('imageURL', imageURL);

    const file = new AV.File('image.jpg', {
      blob: {
        uri: imageURL,
        // height:100,
        // width:100,
        isStored: true,
      },
      owner: AV.User.currentAsync(),
    });
    return file.save().then((res) => {
      console.log('res');

      return res;
    });
  });

  console.log('11111');

  return Promise.all(promises);
}
