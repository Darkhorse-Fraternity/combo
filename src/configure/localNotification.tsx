import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import moment from 'moment';
import { useEffect } from 'react';

import RNCalendarEvents, {
  CalendarEventWritable,
  RecurrenceRule,
} from 'react-native-calendar-events';
import Toast from 'react-native-simple-toast';
import DeviceInfo, { isEmulatorSync } from 'react-native-device-info';
import { useGetUserInfo } from 'src/data/data-context';
import { RemindDataType, useLoadlocalRemind } from './app';
import { IUseType } from 'src/data/data-context/interface';
import { useGetIuseData } from 'src/data/data-context/core';
import { useDebouncedCallback } from 'use-debounce/lib';

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function nowNotification() {
  PushNotification.localNotification({
    /* Android Only Properties */
    id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    ticker: 'My Notification Ticker', // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
    subText: 'This is a subText', // (optional) default: none
    color: 'red', // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: 'group', // (optional) add group to message
    ongoing: false, // (optional) set whether this is an "ongoing" notification

    /* iOS only properties */
    // alertAction: '', // (optional) default: view
    // category: null, // (optional) default: null
    userInfo: { type: 'local' }, // (optional) default: null (object containing additional notification data)

    /* iOS and Android properties */
    title: 'My Notification Title', // (optional, for iOS this is only used
    // in apple watch, the title will be the app name on other iOS devices)
    message: '测试', // (required)
    // playSound: false, // (optional) default: true
    // soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
    actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
  });
}

type ItemType = IUseType;

const calendarSaved = {};
const calendarEvents = async (
  data: ItemType[],
  localRemindData: RemindDataType,
  nickname: string,
) => {
  // console.log('localRemindData', localRemindData);

  let unDoneCount = 0;
  if (data) {
    data.forEach((item) => {
      if (item.statu !== 'start') {
        // 已经删除了,就不用提醒了。
        return;
      }
      // 检查几个已经打卡了
      const { iCard, doneDate } = item;
      const { limitTimes = ['00:00', '24:00'] } = iCard;
      const done = moment(0, 'HH').isBefore(doneDate.iso);

      const before = moment(limitTimes[0], 'HH');
      const after = moment(limitTimes[1], 'HH');
      const now = moment(new Date());
      const momentIn = moment(now).isBetween(before, after);
      if (momentIn && !done) {
        unDoneCount += 1;
      }
    });
  }

  (Platform.OS === 'ios' || DeviceInfo.getApiLevelSync() < 29) &&
    PushNotification.setApplicationIconBadgeNumber(unDoneCount);

  let { all } = localRemindData;

  // 获取是否开启通知的条件。 当all 不存在时候，all 为true

  // console.log('localRemindData', localRemindData);

  // if (!all) {
  //   //当只有为ios 时候才默认打开
  //   // all = Platform.OS == 'ios';
  //   return;
  // }

  const statu = await RNCalendarEvents.authorizationStatus();
  let statu2 = '';
  if (statu !== 'authorized') {
    statu2 = await RNCalendarEvents.authorizeEventStore();
  }
  if (statu2 === 'denied') {
    return Toast.show('没有日历权限,我们将无法提醒您按时打卡~');
  }

  try {
    const events = await RNCalendarEvents.fetchAllEvents(
      new Date().toISOString(),
      moment().add(1, 'weeks').toISOString(),
    );

    const objEvents = {};
    events.forEach((item) => {
      if (item.description?.indexOf('来自小改变的提醒') !== -1) {
        objEvents[item.id] = item;
      }
    });

    const ids = Object.keys(objEvents);
    // console.log('ids:', ids);
    if (!all) {
      ids &&
        ids.forEach((id) => {
          RNCalendarEvents.removeEvent(id);
        });
      return;
    }
    // 老版本数据清除
    ids &&
      ids.forEach((id) => {
        if (objEvents[id].location.indexOf('来自小改变的提醒') !== -1) {
          RNCalendarEvents.removeEvent(id);
        }
      });

    data.forEach(async (item) => {
      let calendaId: string | undefined;

      ids &&
        ids.forEach((id) => {
          if (
            objEvents[id] &&
            objEvents[id].description.indexOf(item.objectId) !== -1
          ) {
            calendaId = id;
          }
        });

      const { iCard, objectId } = item;
      const { title, notifyText, notifyTimes, recordDay } = iCard;

      if (calendaId) {
        delete objEvents[calendaId];
      }
      // console.log('item:', item);
      if (
        item.statu !== 'start' ||
        notifyTimes === undefined ||
        notifyTimes.length === 0
      ) {
        // 已经删除了或归档,就不用提醒了。
        // 删除calendar 数据
        if (calendaId) {
          return RNCalendarEvents.removeEvent(calendaId);
        }
        return;
      }

      const notifyTime = notifyTimes[notifyTimes.length - 1];
      const startDate = moment(notifyTime, 'HH:mm');

      // 控制单个开个
      const open = localRemindData[objectId + notifyTime];
      const alarms = open || open === undefined ? [{ date: 0 }] : [];
      notifyTimes.pop();
      // 提醒时间,需要计算和最后一次提醒的分钟差别,即与startDate的相差分钟数
      if (notifyTimes.length > 0) {
        const notifyMonets = notifyTimes
          .map((notify) => {
            const remindId = objectId + notify;
            const open1 = localRemindData[remindId] ?? true;
            if (open1) {
              // console.log('test:', day,notifyTime,item);
              return (
                (startDate.hours() - moment(notify, 'HH:mm').hours()) * 60 +
                startDate.minutes() -
                moment(notify, 'HH:mm').minutes()
              );
            }
            return undefined;
          })
          .map((minutes) => {
            if (minutes) {
              return { date: minutes };
            }
            return undefined;
          })
          .filter(notEmpty);
        alarms.push(...notifyMonets);
        // console.log('alarms:', alarms);
      }

      if (alarms.length === 0) {
        if (calendaId) {
          RNCalendarEvents.removeEvent(calendaId);
          delete objEvents[calendaId];
        }
        return;
      }

      // 换算一周内提醒哪一天
      const day = recordDay?.sort();
      // PT1M 是指持续1分钟，PT1S 是指持续1S 在魅族手机上 PT1S 会导致没有循环。

      const recurrenceRule: RecurrenceRule = {
        frequency: 'daily',
        // @ts-ignore: Unreachable code error
        duration: 'PT1H', // 好像是类型定义有问题
        occurrence: 100,
        interval: 1,
        // endDate: startDate.toISOString(),
      };
      if (day && day.length < 7) {
        recurrenceRule.frequency = 'weekly';
        // 好像是类型定义有问题
        // @ts-ignore: Unreachable code error
        recurrenceRule.daysOfWeek = day.map(
          (num) => ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'][num - 1],
        );
      }
      const name = nickname ? `${nickname},` : '';
      const idConfig = calendaId ? { id: calendaId } : {};
      // console.log('test:', title,idConfig);
      // @ts-ignore: Unreachable code error
      // TODO 类型错误
      const eventBody: CalendarEventWritable = {
        ...idConfig,
        startDate: startDate.toISOString(),
        description: `来自小改变的提醒(${item.objectId})`,
        recurrenceRule,
        url: 'combo://combo',
        // location: '#来自小改变的提醒-'+objectId+'#',
        location: name + (notifyText || '锲而不舍,金石可镂!'),
        alarms,
      };
      if (calendaId) {
        if (
          calendarSaved[calendaId] &&
          JSON.stringify(eventBody) === calendarSaved[calendaId]
        ) {
          return;
        }
        calendarSaved[calendaId] = JSON.stringify(eventBody);
      }

      await RNCalendarEvents.saveEvent(title || '', eventBody);
      return null;
    });
    // 将剩余的本地已被移的event 移除
    const ids2 = Object.keys(objEvents);
    ids2 &&
      ids2.forEach((oid) => {
        RNCalendarEvents.removeEvent(oid);
      });

    // 添加进本地记录
  } catch (e) {
    console.log('e:', e.message);
  }
};

const localNotificationSchedule = (
  day: number,
  notifyTime: string,
  item: ItemType,
  nickname: string,
) => {
  // const { nickname } = this.props.user;
  const name = nickname ? `${nickname},` : '';
  const title = `${item.iCard.title}的时间到了`;
  const message = name + (item.iCard.notifyText || '锲而不舍,金石可镂!');
  const id = item.iCard.objectId;

  // const number = numbers[day-1]

  if (day === 7) {
    day = 0;
  }

  const momentDate = moment(notifyTime, 'HH:mm').days(day);

  PushNotification.localNotificationSchedule({
    title,
    message, // (required)
    date: momentDate.toDate(), // in 60 secs
    soundName: 'tip.mp3',
    // date: new Date(Date.now() + (1*1000)), // in 60 secs
    // number: number,
    repeatType: 'week',
    userInfo: {
      title,
      id,
      alert: message,
      // webUrl: "combo://combo/card",
      // params: { iUseId: item.objectId, iCardId: item.iCard.objectId },
      // action: "com.avos.UPDATE_STATUS",
      type: 'local',
    },
    // userInfo: {'type': 'local'},
  });
};

const dayNotification = async (
  data: ItemType[],
  localRemindData: RemindDataType,
  nickname: string,
) => {
  // const { nickname = '' } = this.props.user;
  PushNotification.cancelAllLocalNotifications();

  let { all } = localRemindData;

  if (!all) {
    return;
  }

  let daysFlag = false;
  let unDoneCount = 0;
  data.forEach((item) => {
    if (item.statu !== 'start') {
      // 已经删除了,就不用提醒了。
      return;
    }
    // 检查几个已经打卡了
    const { iCard, doneDate } = item;
    const { limitTimes = ['00:00', '24:00'] } = iCard;
    const done = moment(0, 'HH').isBefore(doneDate.iso);

    const before = moment(limitTimes[0], 'HH');
    const after = moment(limitTimes[1], 'HH');
    const now = moment(new Date());
    const momentIn = moment(now).isBetween(before, after);
    if (momentIn && !done) {
      unDoneCount += 1;
    }

    (Platform.OS === 'ios' || DeviceInfo.getApiLevelSync() < 29) &&
      PushNotification.setApplicationIconBadgeNumber(unDoneCount);
    const { recordDay } = item.iCard;
    const notifyTimes = item.iCard.notifyTimes || [];

    // const title = item.iCard.title
    // const message = item.iCard.notifyText || '快来记录一下吧!'
    // const id = item.iCard.objectId

    recordDay?.forEach((day) => {
      notifyTimes.forEach((notifyTime) => {
        // console.log('notifyTime:', notifyTime);
        const id = item.objectId + notifyTime;
        const open = localRemindData[id];
        if (open || open === undefined) {
          daysFlag = true;
          // console.log('test:', day,notifyTime,item);
          localNotificationSchedule(day, notifyTime, item, nickname);
        }
      });
    });
  });

  // console.log('unDoneCount:', unDoneCount);

  const name = nickname;
  if (!daysFlag) {
    PushNotification.localNotificationSchedule({
      title: '给自己添加一个习惯吧~',
      message: `${name}小改变，大不同！`, // (required)
      date: moment(21, 'HH').toDate(), // in 60 secs
      // date: new Date(Date.now() + (1*1000)), // in 60 secs
      // data: {
      //   webUrl: '',
      //   action: 'com.avos.UPDATE_STATUS',
      // },
      repeatType: 'day',
      userInfo: { type: 'local' },
    });
  }

  PushNotification.localNotificationSchedule({
    title: '新的一周开始了~',
    message: `${name}为新的一周设置一些习惯吧！`, // (required)
    date: moment(21, 'HH').day(7).toDate(), // in 60 secs
    // date: new Date(Date.now() + (1*1000)), // in 60 secs
    // data: {
    //   webUrl: '',
    //   action: 'com.avos.UPDATE_STATUS',
    // },
    repeatType: 'week',
    userInfo: { type: 'local' },
  });
};

const useLocalNotification = () => {
  const user = useGetUserInfo();
  const localRemindData = useLoadlocalRemind();
  const { data = [] } = useGetIuseData();

  const debounced = useDebouncedCallback(
    // function
    (nickname: string, localRemindData1: RemindDataType, iUse1: IUseType[]) => {
      if (Platform.OS === 'ios') {
        dayNotification(iUse1, localRemindData1, nickname);
      } else if (!isEmulatorSync()) {
        calendarEvents(iUse1, localRemindData1, nickname);
      }
    },
    // delay in ms
    1000,
    { trailing: true, leading: true },
  );

  useEffect(() => {
    debounced.callback(user.nickname || '', localRemindData, data);
  }, [data, debounced, localRemindData, user.nickname]);
};

export default useLocalNotification;
