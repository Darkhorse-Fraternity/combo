import { Platform, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const { RNAppUtil } = NativeModules;

export function hexToRgb(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  //@ts-nocheck
  const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (normal) {
    return normal.slice(1).map((e) => parseInt(e, 16));
  }
  const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (shorthand) {
    return shorthand.slice(1).map((e) => 0x11 * parseInt(e, 16));
  }

  return null;
}

export const rgbToHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

// 判断颜色深浅
export const isLightColorAction = (r: number, g: number, b: number) => {
  const an = r * 0.299 + g * 0.578 + b * 0.114;
  console.log('an', an);

  return an > 192;
};

export function shadeBlend(p: number, c0: string, c1?: string) {
  const n = p < 0 ? p * -1 : p;
  const u = Math.round;
  const w = parseInt;
  if (c0.length > 7) {
    const f = c0.split(',');
    const t = (c1 || (p < 0 ? 'rgb(0,0,0)' : 'rgb(255,255,255)')).split(',');
    const R = w(f[0].slice(4));
    const G = w(f[1]);
    const B = w(f[2]);
    return `rgb(${u((w(t[0].slice(4)) - R) * n) + R},${
      u((w(t[1]) - G) * n) + G
    },${u((w(t[2]) - B) * n) + B})`;
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
  url: string,
  width: number,
  height: number,
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
export const app_channel = async () => {
  if (Platform.OS === 'ios') {
    appChannel = !__DEV__ ? 'appStore' : 'iOS_inhouse';
  } else {
    appChannel = await RNAppUtil.getAppMetadataBy('TD_CHANNEL_ID');
  }
};
app_channel();
