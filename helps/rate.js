import {Alert, Platform} from 'react-native';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import Rate, {AndroidMarket} from 'react-native-rate';
import AsyncStorage from '@react-native-community/async-storage';

const appleAppID = '1332546993';
let hasTryRate = false;
const androidRateTime = 'AndroidRateTime';
const appURL = 'https://icouage.cn/';

const iosRate = () => {
  // 版本10.3之后用这个方法
  if (Number(DeviceInfo.getSystemVersion()) > 10.3) {
    Rate.rate(
      {
        AppleAppID: appleAppID,
        preferInApp: true,
        inAppDelay: 5.0,
        openAppStoreIfInAppFails: false,
      },
      () => {},
    );
  }
};

const anrdroidRate = async () => {
  const time = await AsyncStorage.getItem(androidRateTime);
  if (!time || moment().isAfter(moment(time))) {
    Alert.alert('给我们一个好评吧!', 'Thanks♪(･ω･)ﾉ', [
      {
        text: '取消',
        onPress: async () => {
          // 存一个20天后提醒的时间
          const nextTime = moment()
            .add(3, 'weeks')
            .toISOString();
          await AsyncStorage.setItem(androidRateTime, nextTime);
        },
      },
      {
        text: '确定',
        onPress: () => {
          const url = `market://details?id=${DeviceInfo.getBundleId()}`;
          // Linking.openURL(url)
          const options = {
            preferredAndroidMarket: AndroidMarket.Other,
            OtherAndroidURL: url,
            fallbackPlatformURL: appURL,
          };

          Rate.rate(options, async success => {
            if (success) {
              // 存一个两月后提醒的时间
              const nextTime = moment()
                .add(9, 'weeks')
                .toISOString();
              await AsyncStorage.setItem(androidRateTime, nextTime);
            } else {
              // 存一个20天后提醒的时间
              const nextTime = moment()
                .add(3, 'weeks')
                .toISOString();
              await AsyncStorage.setItem(androidRateTime, nextTime);
            }
          });
        },
      },
    ]);
  }
};

export default function rate() {
  if (!hasTryRate && !__DEV__) {
    hasTryRate = true;
    if (Platform.OS === 'ios') {
      iosRate();
    } else {
      anrdroidRate();
    }
  }
}
