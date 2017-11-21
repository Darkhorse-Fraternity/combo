import  {send} from'../request'
import {pushInstallation} from '../request/leanCloud'
import Toast from 'react-native-simple-toast';
import  PushNotification from 'react-native-push-notification'

import {
    Platform,
    DeviceEventEmitter,
    NativeModules,
} from 'react-native'

export default function pushConfig() {


    Platform.OS == 'ios' && PushNotification.setApplicationIconBadgeNumber(0)


    PushNotification.configure({

        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (value) {
            push(value.token)
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function (notification) {
            console.log('NOTIFICATION:', notification);
            if(notification.foreground && !notification.data.silent){
                // Toast.show(notification.message)
                store.dispatch(dataStorage('notify',{show:true,notification}))
            }else {
                doReceiveNotify(notification)
            }
        },

        // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: "YOUR GCM SENDER ID",

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
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
    if (Platform.OS != 'ios') {

        const LeanCloudPushNative = NativeModules.LeanCloudPush;

        LeanCloudPushNative.getInstallationId().then(id=>{
            push(id)
        })

        LeanCloudPushNative.getInitialNotification().then((res)=> {
            console.log('InitialNotification:', res)
        }).catch((err)=> {
            console.log('message:', err.message)
        })

        DeviceEventEmitter.addListener(LeanCloudPushNative.ON_RECEIVE, (res) => {
            const data= JSON.parse(res.data);
            const foreground = res.foreground === '1' ? true : false
            const notification = {'data': data, 'foreground': foreground}
            console.log("数据", res)
            if (!notification.data.silent && notification.foreground) {
                store.dispatch(dataStorage('notify', {show: true, notification}))
            } else {
                doReceiveNotify(notification)
            }
        });
        DeviceEventEmitter.addListener(LeanCloudPushNative.ON_ERROR, (res) => {
            console.log('ON_ERROR:', res)
        });

    }

}

let staticId ;
export function push(id = staticId,user) {
    if(id && id !== staticId){staticId = id}
    // console.log('staticId:', staticId);
    if(id){
        const param = pushInstallation(Platform.OS,id,user)
        console.log('push param:', param);
        send(param).then((response)=>{
            console.log('response:',response)
        })
    }
}