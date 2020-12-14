import Indicators from '@components/Indicators';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Platform,
  StyleSheet,
  ViewProps,
  useWindowDimensions,
} from 'react-native';
// import {hideLoding, showLoading} from '../NativeTool';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
// import LottieView from 'lottie-react-native';
export default function (
  size: number | 'small' | 'large' = 'small',
  color = 'gray',
) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

//@Deprecated WARGMING: use loadGif!
export function loadCmp() {
  return LoadAnimation({ top: 0 });
}

export function loadGif(showBar: boolean) {
  // const imgWidth = (width / 375) * 359 * 0.5;
  // const imgHeight = (width / 375) * 77 * 0.5;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {LoadAnimation({ top: showBar ? 44 + getStatusBarHeight() : 0 })}
    </View>
  );
}
// const dp2px = (dp: number) => PixelRatio.getPixelSizeForLayoutSize(dp);
export function loadView(top: number = 44 + getStatusBarHeight()) {
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
  const { top = 44 + getStatusBarHeight() } = props || {};
  const { width, height } = useWindowDimensions();
  // const { height } = Dimensions.get('window');
  // const dWidth = Platform.OS === 'ios' ? width / 375 : 200 / 300;
  const lastTop = Platform.OS === 'ios' ? 0 : getStatusBarHeight();

  const [show, setshow] = useState(false);
  // 前两秒不出现

  useEffect(() => {
    const time = setTimeout(setshow.bind(undefined, true), 1000);
    return () => {
      clearTimeout(time);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <View
      style={[
        styles.lottieViewBC,
        { top: (height - size + lastTop) / 2 - top, left: (width - size) / 2 },
      ]}>
      {/* <ActivityIndicator size={"small"} color={"gray"} /> */}
      <Indicators size={30} />
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
    height: size,
  },
  lottieViewBC: {
    zIndex: 100000,
    position: 'absolute',
    // left: (Dimensions.get('window').width - size) / 2,
  },
});
