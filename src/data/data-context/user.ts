import * as Keychain from 'react-native-keychain';
import {
  getUsersId,
  GetUsersIdResponse,
  getUsersMe,
  postUsers,
  PostUsersResponse,
} from 'src/hooks/interface';
import { UserType } from './interface';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { classBatch, classCreatNewOne } from '@request/leanCloud';
import moment from 'moment';
import { get } from '@redux/actions/req';
import md5 from 'react-native-md5';
import { setLeanCloudSession } from '@configure/reqConfigs';
export async function userInfo() {
  // const uuid =  DeviceInfo.getUniqueID()

  try {
    const credentials = await Keychain.getGenericPassword();
    if (typeof credentials === 'object') {
      const userString = credentials.password;
      // const sessionToken = await storage.load({ key: sessionTokenkey, })
      const user = JSON.parse(userString) as UserType;
      const { sessionToken } = user;
      console.log('sessionToken', sessionToken);

      if (sessionToken) {
        // 更新用户数据
        setLeanCloudSession(sessionToken);
        update();

        return user;
      } else {
        return anonymousUser();
      }
    } else {
      return anonymousUser();
    }
  } catch (e) {
    return anonymousUser();
  }
}

export async function update() {
  //   const params = usersMe();
  //   const res = await get(params);

  const res = await getUsersMe();
  updateLocation(res);
  //   return updateUserData(res);
}

function updateLocation(user: GetUsersIdResponse) {
  const { username = '', sessionToken } = user;
  const userString = JSON.stringify(user);

  if (sessionToken) {
    Keychain.setGenericPassword(username, userString);
  }
}

const anonymousUser = async () => {
  let uniqueId = DeviceInfo.getUniqueId();
  console.log('uniqueId', uniqueId);
  if (Platform.OS === 'ios') {
    const md5String = md5.hex_md5(uniqueId, 'md5');
    uniqueId = md5String.substring(8, 24);
  }
  const anonymousConfig = { id: uniqueId };
  try {
    // const userInfoParmas = thirdLogin('anonymous', anonymousConfig);
    // const user = await get(userInfoParmas);
    // await dispatch(_loginSucceed(user));

    const user = await postUsers({ authData: { anonymous: anonymousConfig } });
    addSample(user);

    return user;
    // console.log('user:', user);
  } catch (e) {
    SimpleToast.show(e.message);
    console.log('anonymousUser error:', e.message);
    // const userInfoParmas = thirdLogin('anonymous', anonymousConfig);
    // dispatch(_loginFailed());
    // const user = await anonymousUser();
    // return user;
    const user = postUsers({ authData: { anonymous: anonymousConfig } });
    return user;
  }
};

// 预设示例
const addSample = async (user: PostUsersResponse) => {
  const { createdAt, updatedAt, objectId } = user;
  const createdAtTime = new Date(createdAt).getTime();
  const updatedAtTime = new Date(updatedAt).getTime();
  // console.log('time:', updatedAtTime,createdAtTime);
  if (updatedAtTime - createdAtTime < 5000) {
    // 生成一个icard
    const iCards = iCardSample(objectId);
    const iCardsReq = iCards.map((item) => classCreatNewOne('iCard', item));
    const iCardsBatch = classBatch(iCardsReq);
    const iCardsRes = await get(iCardsBatch);
    const iUseReq = iCardsRes.map((item: { success: { objectId: string } }) => {
      if (item.success) {
        const iUseParam = iUseSample(objectId, item.success.objectId);
        return classCreatNewOne('iUse', iUseParam);
      }
    });
    // 添加圈子示例
    const iUseParam = iUseSample(objectId, '5be8f3f0ee920a00668767bc');
    iUseReq.push(classCreatNewOne('iUse', iUseParam));
    const iUseBatch = classBatch(iUseReq);
    await get(iUseBatch);
  }
};

export const iCardSample = (objectId: string) => [
  {
    title: '示例：早睡',
    period: '7',
    record: [],
    recordDay: [1, 2, 3, 4, 5, 6, 7],
    iconAndColor: {
      name: 'sleepBoy',
      color: '#F08200',
    },
    notifyText: '早睡早起身体好!',
    notifyTimes: ['22:00'],
    limitTimes: ['20:00', '24:00'],
    price: 0,
    state: 0,
    // doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
    user: {
      __type: 'Pointer',
      className: '_User',
      objectId,
    },
  },
  {
    title: '示例：记单词',
    period: '7',
    record: [],
    recordDay: [1, 2, 3, 4, 5, 6, 7],
    iconAndColor: {
      name: 'homework',
      color: '#FFC076',
    },
    notifyText: '坚持鸭!',
    notifyTimes: ['20:00'],
    limitTimes: ['00:00', '24:00'],
    price: 0,
    state: 0,
    // doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
    user: {
      __type: 'Pointer',
      className: '_User',
      objectId,
    },
  },
];

export const iUseSample = (objectId: string, iCardId: string) => ({
  time: 0,
  // notifyTime:option&&option.notifyTime||"20.00",
  doneDate: { __type: 'Date', iso: moment('2017-03-20').toISOString() },
  user: {
    __type: 'Pointer',
    className: '_User',
    objectId,
  },
  iCard: {
    __type: 'Pointer',
    className: 'iCard',
    objectId: iCardId,
  },
  statu: 'start',
  privacy: 2,
});