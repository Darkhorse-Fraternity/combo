import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { randFlowCoverColor } from './color';
const getTheme = () => {
  const { height, width } = Dimensions.get('window');
  return {
    width,
    height,
    widthProportion: width / 375, // 用于高度根据长度进行缩放
    hairlineWidth: StyleSheet.hairlineWidth,
    statusBarHeight: getStatusBarHeight(),

    hairlineColor: 'rgb(200,200,200)',
    titleBackViewColor: '#f6f7f9',
    showItem: '#f5f8f6',
    disabledColor: '#bfc2c7',
    sureColor: '#66bb6a',
    blackPrimary: 'rgba(0,0,0,0.87)',
    blackSecondary: 'rgba(0,0,0,0.54)',
    blackTertiary: 'rgba(0,0,0,0.38)',
    mainColor: '#fdd83c',
    textinputbackgroundColor: '#f6f7f9',

    //图片随机背景颜色
    randFlowCoverColor: randFlowCoverColor,
  };
};

const theme = getTheme();
export { getTheme, theme };
export default theme;
export type ThemeInterface = typeof theme;
// export default baseStyled as ReactNativeStyledInterface<Theme>;
declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}
