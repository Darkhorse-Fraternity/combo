import  PushNotification from 'react-native-push-notification'
import {
    Platform
} from 'react-native'
import moment from 'moment'
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux'
import {ICARD,IUSE} from '../redux/reqKeys'
import { iCard } from "../request/LCModle";
export  function nowNotification() {


    PushNotification.localNotification({
        /* Android Only Properties */
        id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        ticker: "My Notification Ticker", // (optional)
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
        subText: "This is a subText", // (optional) default: none
        color: "red", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: 'some_tag', // (optional) add tag to message
        group: "group", // (optional) add group to message
        ongoing: false, // (optional) set whether this is an "ongoing" notification

        /* iOS only properties */
        //alertAction: '', // (optional) default: view
        //category: null, // (optional) default: null
        userInfo: {'type':'local'},// (optional) default: null (object containing additional notification data)

        /* iOS and Android properties */
        title: "My Notification Title", // (optional, for iOS this is only used
        // in apple watch, the title will be the app name on other iOS devices)
        message: "测试", // (required)
        // playSound: false, // (optional) default: true
        // soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
        actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
    });
}
export async function  dayNotification(data) {

    // console.log('test:', data);
    PushNotification.cancelAllLocalNotifications()

    // let res = 0
    //   PushNotification.getApplicationIconBadgeNumber(item=>{
    //       res = item
    //       console.log('test:', '222');
    //   })

    //
    // const time =  moment(20, "HH").day(7).format('YYYY-MM-DD HH:mm:ss');
    //
    // console.log('moment:',  moment().toDate());
    // console.log('Date:',  new Date());

    // const data1 = [{title:'测试',notifyTime:'9:00',doneDate:'2017-08-06 21:33:11'}]


    data.forEach(item=>{

        if(item.statu !== 'start'){return}
        let notifyTime = item.iCard.notifyTime.split(":")[0]
        notifyTime = parseInt(notifyTime)


        const title = item.iCard.title
        const message = item.iCard.notifyText || '快来记录一下吧!'
        const recordDay = item.iCard.recordDay
        const id = item.iCard.objectId

        recordDay.forEach(day => {

            let momentDate = moment(notifyTime, "HH").days(day)

            const lastMoment = moment(item.doneDate.iso)
            //如果当天凌晨两点后已经打卡并且没有超过提醒时间，则需要到下周才打卡
            const flag = lastMoment.isBefore(momentDate) &&
                lastMoment.isAfter(moment(2,"HH"))
            //提醒时间已经超过当前时间
            if(moment().isAfter(momentDate)|| flag){
                momentDate.add(1, 'weeks')
            }
            // console.log('localPushDate:',day,notifyTime, momentDate.format('YYYY-MM-DD HH:mm'));

            // const date = !flag?notifyTimeHH
            //     :notifyTimeHH.add(1, 'weeks').toDate()

            PushNotification.localNotificationSchedule({
                title,
                message: message, // (required)
                date: momentDate.toDate(), // in 60 secs
                soundName:'tip.mp3',
                // date: new Date(Date.now() + (1*1000)), // in 60 secs
                number:  1,
                repeatType: 'week',
                userInfo:{
                    title,
                    id,
                    alert:message,
                    webUrl:"combo://CardDetail",
                    params:{iUseId: item.objectId,iCardId: item.iCard.objectId},
                    //action: "com.avos.UPDATE_STATUS",
                    type: 'local'
                },
                //userInfo: {'type': 'local'},
            });


        })


    })




    PushNotification.localNotificationSchedule({
        message: "设置一些本周挑战吧~！", // (required)
        date: moment(21, "HH").day(7).toDate(), // in 60 secs
        // date: new Date(Date.now() + (1*1000)), // in 60 secs
        data:{
            webUrl:"",
            action: "com.avos.UPDATE_STATUS",
        },
        number: 1,
        repeatType: 'week',
        userInfo: {'type': 'local'},
    });


}

@connect(
    state =>({
        data: state.list.get(IUSE),
        normalizrData: state.normalizr.get(IUSE),
        iCard:state.normalizr.get(ICARD)
    }),
    dispatch =>({})
)

export  default  class PushManage extends Component {
    constructor(props: Object) {
        super(props);
    }
    static propTypes = {};
    static defaultProps = {};

    componentWillReceiveProps(props) {

        let  data = props.data.toJS()




        if(!!this.props.iCard && data.loadStatu !== "LIST_LOAD_DATA"){
            const ndata = props.normalizrData.toJS()
            data = data.listData
            const array = data.map(key =>{
                const res = ndata[key]
                const iCard =  this.props.iCard.get(res[ICARD]);
                res.iCard =  iCard &&iCard.toJS()
                return res
            })

            // console.log('test:', array);
            dayNotification(array)

        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //
    //     let  data = nextProps.data.toJS()
    //
    //     if(!!nextProps.iCard && data.loadStatu !== "LIST_LOAD_DATA"){
    //         const ndata = nextProps.normalizrData.toJS()
    //         data = data.listData
    //         const array = data.map(key =>{
    //             const res = ndata[key]
    //             res.iCard = nextProps.iCard.get(res[ICARD]).toJS()
    //             return res
    //         })
    //
    //         // console.log('test:', array);
    //         dayNotification(array)
    //
    //     }
    // }


    render(): ReactElement<any> {
        return null
    }
}

