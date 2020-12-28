/*
 * @Author: tonyYo
 * @Date: 2020-12-25 10:04:27
 * @LastEditors: tonyYo
 * @LastEditTime: 2020-12-25 17:54:13
 * @FilePath: /Combo/src/Theme/index.ts
 */
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import {
  StyleSheet,
  Dimensions,
  Appearance,
  ColorSchemeName,
  Platform,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { randFlowCoverColor } from './color';
const getTheme = (colorScheme: ColorSchemeName) => {
  const { height, width } = Dimensions.get('window');
  if (Platform.OS === 'android') {
    DefaultTheme.colors.text = 'rgb(50,50,50)';
  } else {
    DefaultTheme.colors.text = 'rgb(50,50,50)';
  }
  const isDarkMode = colorScheme === 'dark';
  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  // theme.colors.card = theme.colors.primary;
  const colors = {
    ...theme.colors,
    hairlineColor: isDarkMode ? 'rgb(100,100,100)' : '#e4e4e4',
    titlePrimary: isDarkMode ? 'rgb(200,200,200)' : '#323232',
    titleSecondary: isDarkMode ? 'rgb(150,150,150)' : '#646464',
    titleTertiary: isDarkMode ? 'rgb(100,100,100)' : 'rgb(180,180,180)',
    textinputbackgroundColor: isDarkMode ? 'rgb(30,30,30)' : '#f6f7f9',
    titleBackViewColor: isDarkMode ? 'rgb(30,30,30)' : '#f6f7f9',
  };

  return {
    width,
    height,
    isDarkMode,
    widthProportion: width / 375, // 用于高度根据长度进行缩放
    hairlineWidth: StyleSheet.hairlineWidth,
    statusBarHeight: getStatusBarHeight(),
    showItem: isDarkMode ? 'rgb(35,35,35)' : '#f5f8f6',
    disabledColor: '#bfc2c7',
    sureColor: '#66bb6a',
    blackPrimary: 'rgba(0,0,0,0.87)',
    blackSecondary: 'rgba(0,0,0,0.54)',
    blackTertiary: 'rgba(0,0,0,0.38)',
    mainColor: '#fdd83c',
    textinputbackgroundColor: isDarkMode ? 'rgb(35,35,35)' : '#f6f7f9',
    backgroundColor: colorScheme === 'dark' ? colors.card : 'white',
    colors,
    //图片随机背景颜色
    randFlowCoverColor: randFlowCoverColor,
  };
};
const colorScheme = Appearance.getColorScheme();
const theme = getTheme(colorScheme);
export { getTheme, theme };
export default theme;
export type ThemeInterface = typeof theme;
// export default baseStyled as ReactNativeStyledInterface<Theme>;
declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}
