import {Platform, NativeModules} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const {RNAppUtil} = NativeModules;

export function shadeBlend(p, c0, c1) {
  const n = p < 0 ? p * -1 : p;
  const u = Math.round;
  const w = parseInt;
  if (c0.length > 7) {
    const f = c0.split(',');
    const t = (c1 || (p < 0 ? 'rgb(0,0,0)' : 'rgb(255,255,255)')).split(',');
    const R = w(f[0].slice(4));
    const G = w(f[1]);
    const B = w(f[2]);
    return `rgb(${u((w(t[0].slice(4)) - R) * n) + R},${u((w(t[1]) - G) * n) +
      G},${u((w(t[2]) - B) * n) + B})`;
  }
  const f = w(c0.slice(1), 16);
  const t = w((c1 || (p < 0 ? '#000000' : '#FFFFFF')).slice(1), 16);
  const R1 = f >> 16;
  const G1 = (f >> 8) & 0x00ff;
  const B1 = f & 0x0000ff;
  return `#${(
    0x1000000 +
    (u(((t >> 16) - R1) * n) + R1) * 0x10000 +
    (u((((t >> 8) & 0x00ff) - G1) * n) + G1) * 0x100 +
    (u(((t & 0x0000ff) - B1) * n) + B1)
  )
    .toString(16)
    .slice(1)}`;
}

export function add_Leancloud_Thumbnail_Suffix(
  url,
  width,
  height,
  q = 100,
  format = 'jpg',
) {
  const wurl = require('wurl');
  const hostname = wurl('hostname', url);
  return hostname !== 'file.icourage.cn'
    ? url
    : `${url}?imageView/1/w/${width}/h/${height}/q/${q}/format/${format}`;
}

const key = 'firstInstaller';
let isFirstInstaller = true;
let isLoadFirstInstaller = false;

export async function firstInstaller() {
  if (!isLoadFirstInstaller) {
    isLoadFirstInstaller = true;
    const res = await AsyncStorage.getItem(key);
    if (res === null) {
      await AsyncStorage.setItem(key, '1');
    } else {
      isFirstInstaller = false;
    }
  }
  return isFirstInstaller;
}

export let appChannel = 'unknow';
const app_channel = async () => {
  if (Platform.OS === 'ios') {
    appChannel = !__DEV__ ? 'appStore' : 'iOS_inhouse';
  } else {
    appChannel = await RNAppUtil.getAppMetadataBy('TD_CHANNEL_ID');
  }
};
app_channel();
