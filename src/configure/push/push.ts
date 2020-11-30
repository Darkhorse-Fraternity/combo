// import { send } from '../../request/index';
// import { pushInstallation, updateInstallation } from '../../request/leanCloud';
import PushNotification from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info';

import { Platform, DeviceEventEmitter, NativeModules } from 'react-native';
import { doReceiveNotify } from './pushReceive';
// import { dataStorage } from '../../redux/actions/util';
import { userPoint } from '../../request/LCModle';
import { postInstallations, putInstallationsId } from 'src/hooks/interface';

interface NotificationData {
  silent: boolean;
}

export default function pushConfig(uid: string) {
  // PushNotification.setApplicationIconBadgeNumber(0)

  if (Platform.OS === 'ios') {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (value) {
        push(value.token, uid);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        if (notification && notification.data) {
          if (
            notification.foreground &&
            !(notification.data as NotificationData).silent
          ) {
            // TODO:暂时不做处理
            // Toast.show(notification.message)
            // dispatch(dataStorage('notify', { show: true, notification }));
          } else {
            doReceiveNotify(notification as never);
          }
        }
      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: 'YOUR GCM SENDER ID',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  }

  if (Platform.OS !== 'ios') {
    const LeanCloudPushNative = NativeModules.LeanCloudPush;

    LeanCloudPushNative.getInstallationId().then((id: string) => {
      push(id, uid);
    });

    LeanCloudPushNative.getInitialNotification()
      .then((res: never) => {
        console.log('InitialNotification:', res);
      })
      .catch((err: Error) => {
        console.log('message:', err.message);
      });

    DeviceEventEmitter.addListener(LeanCloudPushNative.ON_RECEIVE, (res) => {
      const data = JSON.parse(res.data);
      const foreground = res.foreground === '1';
      const notification = { data: data, foreground: foreground };
      console.log('数据', res);
      if (data) {
        if (!data.silent && foreground) {
          // TODO: 暂时不做处理
          // dispatch(dataStorage('notify', { show: true, notification }));
        } else {
          doReceiveNotify(notification);
        }
      }
    });
    DeviceEventEmitter.addListener(LeanCloudPushNative.ON_ERROR, (res) => {
      console.log('ON_ERROR:', res);
    });
  }
}

let InstallationID: string;
export function push(token: string, uid: string) {
  if (token) {
    // const param = pushInstallation(Platform.OS, token);
    const installationId =
      Platform.OS === 'ios'
        ? { deviceToken: token }
        : { installationId: token };
    postInstallations({
      deviceType: Platform.OS,
      ...installationId,
      channels: ['public', 'protected', 'private'],
    }).then((res) => {
      InstallationID = res.objectId;
      if (uid) {
        updatePush(uid);
      }
    });
    // console.log('push param:', param);
    // send(param)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     // console.log('response:',res)
    //     // store.dispatch(dataStorage('InstallationID',res.objectId))
    //     InstallationID = res.objectId;
    //     if (uid) {
    //       updatePush(uid);
    //     }
    //   });
  }
}

export function updatePush(uid: string) {
  if (InstallationID) {
    const profile: { deviceProfile?: string } = {};
    if (Platform.OS === 'ios') {
      const devP = __DEV__ ? 'dev' : 'prod';
      const getBundleId = DeviceInfo.getBundleId();
      const enp = getBundleId === 'com.rn.combo' ? '' : '_ep';

      profile.deviceProfile = devP + enp;
    }

    // const param = updateInstallation(InstallationID, {
    //   user: userPoint(uid),
    //   badge: 0,
    //   ...profile,
    // });

    // send(param).then((response) => {
    //   console.log('response:', response);
    // });

    putInstallationsId({
      id: InstallationID,
      user: userPoint(uid),
      badge: 0,
      ...profile,
    }).then((res) => {
      console.log('response:', res);
    });
  }
}
