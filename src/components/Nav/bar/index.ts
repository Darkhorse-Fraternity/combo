import {Platform, StatusBar, Dimensions} from 'react-native';
// import {getStatusBarHeight} from 'react-native-safe-area-view';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;
const IPADPRO11_WIDTH = 834;
const IPADPRO11_HEIGHT = 1194;
const IPADPRO129_HEIGHT = 1024;
const IPADPRO129_WIDTH = 1366;

const getResolvedDimensions = () => {
  const {width, height} = Dimensions.get('window');
  if (width === 0 && height === 0) return Dimensions.get('screen');
  return {width, height};
};

const {height: D_HEIGHT, width: D_WIDTH} = getResolvedDimensions();

export const isIPhoneX = (() => {
  if (Platform.OS === 'web') return false;

  return (
    (Platform.OS === 'ios' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    (D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
    (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT)
  );
})();

const isNewIPadPro = (() => {
  if (Platform.OS !== 'ios') return false;

  return (
    (D_HEIGHT === IPADPRO11_HEIGHT && D_WIDTH === IPADPRO11_WIDTH) ||
    (D_HEIGHT === IPADPRO11_WIDTH && D_WIDTH === IPADPRO11_HEIGHT) ||
    (D_HEIGHT === IPADPRO129_HEIGHT && D_WIDTH === IPADPRO129_WIDTH) ||
    (D_HEIGHT === IPADPRO129_WIDTH && D_WIDTH === IPADPRO129_HEIGHT)
  );
})();

const isIPad = (() => {
  if (Platform.OS !== 'ios' || isIPhoneX) return false;

  // if portrait and width is smaller than iPad width
  if (D_HEIGHT > D_WIDTH && D_WIDTH < PAD_WIDTH) {
    return false;
  }

  // if landscape and height is smaller that iPad height
  if (D_WIDTH > D_HEIGHT && D_HEIGHT < PAD_WIDTH) {
    return false;
  }

  return true;
})();

let _customStatusBarHeight = null;
let _customStatusBarHidden = null;
const statusBarHeight = isLandscape => {
  if (_customStatusBarHeight !== null) {
    return _customStatusBarHeight;
  }

  /**
   * This is a temporary workaround because we don't have a way to detect
   * if the status bar is translucent or opaque. If opaque, we don't need to
   * factor in the height here; if translucent (content renders under it) then
   * we do.
   */
  if (Platform.OS === 'android') {
    if (global.Expo) {
      return global.Expo.Constants.statusBarHeight;
    } else {
      return 0;
    }
  }

  if (isIPhoneX) {
    return isLandscape ? 0 : 44;
  }

  if (isNewIPadPro) {
    return 24;
  }

  if (isIPad) {
    return _customStatusBarHidden ? 0 : 20;
  }

  return isLandscape || _customStatusBarHidden ? 0 : 20;
};

export function getStatusBarHeight(isLandscape: boolen) {
  return statusBarHeight(isLandscape);
}

// const {StatusBarManager} = NativeModules;

// iOS Only
const StatusBarHeight =
  (Platform.OS === 'ios'
    ? getStatusBarHeight(false)
    : StatusBar.currentHeight) || 20;

// const Screen
// if (Platform.OS === 'ios') {
//   StatusBarManager.getHeight(res => {
//     StatusBarHeight = res.height;
//   });
// }

// export const getStatusBarHeight = () => {
//   return StatusBarHeight;
// };

export {StatusBarHeight};
