import { Theme as FormTheme } from "react-native-clean-form";
import { StyleSheet, Dimensions } from "react-native";
import { StatusBarHeight } from "@components/Nav/bar";
const getTheme = () => {
  const { height, width } = Dimensions.get("window");
  return {
    width,
    height,
    widthProportion: width / 375, // 用于高度根据长度进行缩放
    hairlineWidth: StyleSheet.hairlineWidth,
    hairlineColor: "rgb(200,200,200)",
    statusBarHeight: StatusBarHeight,
    ...FormTheme,

    titleBackViewColor: "#f6f7f9",
    buttonItem: "#e7eced",
    showItem: "#f5f8f6",
    disabledColor: "#bfc2c7",
    sureColor: "#66bb6a",
    headerButtonColor: "#31d930",
    lightBlue: "#afd2ef",
    normalBtn: {
      color: "black",
      disabledColor: "rgb(150,150,150)",
      fontSize: 15,
      activityIndicatorColor: "grey"
    },
    calendar: {
      dotColor: "#51c332",
      selectedDayBackgroundColor: "#fdd83c",
      todayTextColor: "#51c332",
      agendaTodayColor: "#51c332"
    },
    contentColor: "white",
    mainColor: "#fdd83c",
    mainLightColor: "#fdd83c",
    textinputbackgroundColor: "#f6f7f9"
  };
};

const theme = getTheme();
export { getTheme, theme };
export default theme;
export type ThemeInterface = typeof theme;
// export default baseStyled as ReactNativeStyledInterface<Theme>;
declare module "styled-components" {
  interface DefaultTheme extends ThemeInterface {}
}
