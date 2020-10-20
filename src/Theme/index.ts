import {StyleSheet, Dimensions} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { randFlowCoverColor } from './color';
const getTheme = () => {
  const {height, width} = Dimensions.get('window');
  return {
    width,
    height,
    getWidth: () => Dimensions.get('window').width,
    getHeight: () => Dimensions.get('window').height,
    widthProportion: width / 375, // 用于高度根据长度进行缩放
    hairlineWidth: StyleSheet.hairlineWidth,
    hairlineColor: 'rgb(200,200,200)',
    statusBarHeight: getStatusBarHeight(),

    titleBackViewColor: '#f6f7f9',
    buttonItem: '#e7eced',
    showItem: '#f5f8f6',
    disabledColor: '#bfc2c7',
    sureColor: '#66bb6a',
    headerButtonColor: '#31d930',
    lightBlue: '#afd2ef',
    blackPrimary:"rgba(0,0,0,0.87)",
    blackSecondary:"rgba(0,0,0,0.54)",
    blackTertiary:'rgba(0,0,0,0.38)',
    normalBtn: {
      color: 'black',
      disabledColor: 'rgb(150,150,150)',
      fontSize: 15,
      activityIndicatorColor: 'grey',
    },
    calendar: {
      dotColor: '#51c332',
      selectedDayBackgroundColor: '#fdd83c',
      todayTextColor: '#51c332',
      agendaTodayColor: '#51c332',
    },
    contentColor: 'white',
    mainColor: '#fdd83c',
    mainLightColor: '#fdd83c',
    textinputbackgroundColor: '#f6f7f9',

    //图片随机背景颜色
    randFlowCoverColor:randFlowCoverColor,
  };
};

const theme = getTheme();
export {getTheme, theme};
export default theme;
export type ThemeInterface = typeof theme;
// export default baseStyled as ReactNativeStyledInterface<Theme>;
declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}
