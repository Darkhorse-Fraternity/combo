import React, { PureComponent } from "react";
import {
  ActivityIndicator,
  View,
  Image,
  Dimensions,
  Platform,
  PixelRatio,
  StyleSheet,
  StyleProp,
  ViewProps
} from "react-native";
// import {hideLoding, showLoading} from '../NativeTool';
import { StatusBarHeight } from "@components/Nav/bar";
// import LottieView from 'lottie-react-native';
export default function(
  size: number | "small" | "large" = "small",
  color = "gray"
) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

// export class LoadCmp extends PureComponent {
//   componentDidMount() {
//     showLoading();
//   }
//   componentWillUnmount() {
//     hideLoding();
//   }

//   render() {
//     return (
//       <>
//         <View {...this.props} style={{flex: 1}} />
//       </>
//     );
//   }
// }

//@Deprecated WARGMING: use loadGif!
export function loadCmp() {
  return LoadAnimation({ top: 0 });
}

export function loadGif(showBar: boolean) {
  // const imgWidth = (width / 375) * 359 * 0.5;
  // const imgHeight = (width / 375) * 77 * 0.5;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {LoadAnimation({ top: showBar ? 44 + StatusBarHeight : 0 })}
    </View>
  );
}
// const dp2px = (dp: number) => PixelRatio.getPixelSizeForLayoutSize(dp);
export function loadView(top: number = 44 + StatusBarHeight) {
  // const {width, height} = Dimensions.get('window');
  // const dWidth = Platform.OS === 'ios' ? width / 375 : 200 / 300;
  // const imgWidth = dWidth * 359 * 0.5;
  // const imgHeight = dWidth * 77 * 0.5;
  // // const navigationBarHeight = 44 + StatusBarHeight;

  // const lastTop = Platform.OS === 'ios' ? 0 : StatusBarHeight;

  // return (
  //   <Image
  //     source={require('@img/default/load.gif')}
  //     style={{
  //       zIndex: 100000,
  //       position: 'absolute',
  //       width: imgWidth,
  //       height: imgHeight,
  //       left: (width - imgWidth) / 2,
  //       top: (height - imgHeight + lastTop) / 2 - top,
  //     }}
  //   />
  // );
  return <LoadAnimation top={top} />;
}

interface LoadAnimationProps extends ViewProps {
  top?: number;
  // style?
}

export function LoadAnimation(props?: LoadAnimationProps) {
  const { top = 44 + StatusBarHeight } = props || {};
  const { height } = Dimensions.get("window");
  // const dWidth = Platform.OS === 'ios' ? width / 375 : 200 / 300;
  const lastTop = Platform.OS === "ios" ? 0 : StatusBarHeight;

  return (
    <View
      style={[
        styles.lottieViewBC,
        { top: (height - size + lastTop) / 2 - top }
      ]}
    >
      <ActivityIndicator size={"small"} color={"gray"} />
      {/* <LottieLoading style={styles.lottieView} /> */}
    </View>
  );
}

// export function LottieLoading(props: ViewProps) {
//   return (
//     <LottieView
//       source={require("@animations/loading.json")}
//       autoPlay
//       loop
//       {...props}
//     />
//   );
// }

const size = 10;
const styles = StyleSheet.create({
  lottieView: {
    width: size,
    height: size
  },
  lottieViewBC: {
    zIndex: 100000,
    position: "absolute",
    left: (Dimensions.get("window").width - size) / 2
  }
});