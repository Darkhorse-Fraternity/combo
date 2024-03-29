import React from 'react';
import DeviceInfo from 'react-native-device-info';
import { Platform, Linking, Alert } from 'react-native';
import { send } from '../../request/index';
import Pop from '../Pop';
// import {androidUpdate} from './downLoad'
import UpdateView from './AndroidUpdateView';
import { appChannel } from '../../../helps/util';
import { postCallAppUpdateInfo } from 'src/hooks/interface';
// import axios from 'axios';
// 当前测试版本号
// const AppTestVersion = '1.3.0';

const api_token = 'a3f43472f64ddccbc58c2dcf75438f18';

const setTimeoutDelay = (delayInMilliseconds: number): Promise<number> =>
  new Promise((resolve) => {
    let timeId = 0;
    const timer = setTimeout(() => resolve(timeId), delayInMilliseconds);
    timeId = timer;
  });
// const interactionManagerDelay = () =>
//   new Promise((resolve) => InteractionManager.runAfterInteractions(resolve));

function firUpdate(bundleId: string, api_token: string, type: string) {
  return {
    scheme: 'http',
    host: 'api.fir.im/',
    path: `apps/latest/${bundleId}`,
    method: 'GET',
    params: {
      api_token,
      type,
    },
  };
}

const checkIos = (str: string) => str.lastIndexOf('ep') !== -1;
// 当为android 时 只有大于或等于指定版本进入测试状态
// const checkAndroid = () =>
//   compareVersion(DeviceInfo.getVersion(), AppTestVersion);

const checkUpdate = (
  res: {
    installUrl: string;
    version: string;
    versionShort: string;
    changelog?: string;
  },
  callBack: () => void,
) => {
  // installUrl含有表示返回正确值,

  if (res.installUrl) {
    const version = `${res.version}`;
    const versionShort = `${res.versionShort}`;
    const appVersion = `${DeviceInfo.getVersion()}`;
    const buildNumber = `${DeviceInfo.getBuildNumber()}`;

    console.log('version:', version);
    console.log('versionShort:', versionShort);
    console.log('appVersion:', appVersion);
    console.log('buildNumber:', buildNumber);

    if (
      compareVersion(versionShort, appVersion) >= 0 &&
      compareVersion(version, buildNumber) > 0
    ) {
      const changelog = `当前版本号:${appVersion},\n编译号:${buildNumber};
            \n新版本号:${versionShort},\n新编译号:${version}`;

      // console.log('changelog:', changelog)
      Alert.alert('有新的版本~', res.changelog || changelog, [
        {
          text: '取消',
          onPress: () => {},
        },
        {
          text: '确定',
          onPress: () => {
            callBack && callBack();
          },
        },
      ]);
    }
  }
};

// const goWebView = async (uri) => {
//   // push('WebView', { uri, title: '新版本更新' })
//   // let remoteData = await send(appUpdateInfo()).then(res => res.json())
//   //
//   // console.log('remoteData:', remoteData);
// };
// goWebView()
// 用于企业端自动更新
export const epUpdate = async () => {
  const bundleId = DeviceInfo.getBundleId();
  if (Platform.OS === 'ios' && checkIos(bundleId)) {
    // 企业版
    // const res = await sendBack(bundleId)
    // // console.log('update:', res);
    // const callback = () => {
    //     try {
    //         const services = 'itms-services://?action=download-manifest&url='
    //         const url = services + res.installUrl
    //         Linking.openURL(url);
    //     } catch (e) {
    //         Toash.show(e.message)
    //     }
    //     // goWebView(res.update_url)
    //     Linking.openURL(res.update_url);
    // }
    // checkUpdate(res, callback)
  } else if (Platform.OS === 'android') {
    // 远程接口

    const timeId = await setTimeoutDelay(5000);
    timeId && clearTimeout(timeId);
    // await interactionManagerDelay()
    const remoteData = await postCallAppUpdateInfo({});
    // let remoteData = await send(appUpdateInfo()).then((res) => res.json());
    console.log('remoteData', remoteData);

    // remoteData = (remoteData && remoteData.result) || {};

    const { desc = [], version = '' } = remoteData.result || {};
    // console.log('version:', version);
    const appVersion = `${DeviceInfo.getVersion()}`;
    // console.log('remoteData:', version, appVersion);
    // console.log('compareVersion:', compareVersion(version, appVersion));
    if (compareVersion(version, appVersion) > 0) {
      // 本地版本号小于远程版本号 进入远程升级
      Alert.alert(`可以升级到${version}了~`, desc.join('\n'), [
        {
          text: '取消',
          onPress: () => {},
        },
        {
          text: '确定',
          onPress: () => {
            Pop.show(
              <UpdateView
                bannerImage={require('../../../source/img/my/icon-60.png')}
                fetchRes={remoteData.result}
              />,
              //@ts-expect-error
              { maskClosable: false },
            );
          },
        },
      ]);
    } else if (
      compareVersion(version, appVersion) < 0 &&
      appChannel === 'andoird_inhouse'
    ) {
      // 本地版本号大于远程版本号 查询编译号，是否进入测试升级
      try {
        const res = await sendBack(bundleId);
        // console.log('update:', res);
        const callback = () => {
          Linking.openURL(res.install_url);
          Linking.openURL(res.update_url);
        };
        // Android 识别当前测试版本号 来检测更新
        checkUpdate(res, callback);
      } catch (error) {}
    }
  }
};

function sendBack(bundleId: string) {
  const params = firUpdate(bundleId, api_token, Platform.OS);

  // axios.request<TResponseData>({
  //   baseURL,
  //   url: path,
  //   method,
  //   ...config,
  // });

  return send(params as never).then((res) => res.json());
}

/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */

export const compareVersion = (a: string, b: string) => {
  const aa = a.split('.');
  const ab = b.split('.');
  let i = 0;
  let la = aa.length;
  let lb = ab.length;
  while (la > lb) {
    ab.push('0');
    ++lb;
  }
  while (la < lb) {
    aa.push('0');
    ++la;
  }
  while (i < la && i < lb) {
    const ai = parseInt(aa[i], 10);
    const bi = parseInt(ab[i], 10);
    if (ai > bi) {
      return 1;
    }
    if (ai < bi) {
      return -1;
    }
    ++i;
  }
  return 0;
};
