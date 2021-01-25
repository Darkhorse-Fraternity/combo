/*
 * @Author: tonyYo
 * @Date: 2021-01-06 16:44:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-25 14:02:46
 * @FilePath: /Combo/src/components/Indicators/index.tsx
 */
/**
 * Created by lintong on 2019/1/10.
 * @flow
 */

import React, { FC, memo } from 'react';
import LottieView from 'lottie-react-native';

interface IndicatorsProps {
  size?: number;
  animated?: boolean;
  modeDark?: boolean;
  source?: string | { uri: string };
}

const Indicators: FC<IndicatorsProps> = (props) => {
  const {
    animated = true,
    size = 30,
    source = require('@source/lottie/plant-animation'),
  } = props;

  // const springValueRef = useRef(new Animated.Value(0));
  // const springValue = springValueRef.current;

  // useEffect(() => {
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(springValueRef.current, {
  //         toValue: 1,
  //         duration: 3000,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(springValueRef.current, {
  //         toValue: 0,
  //         duration: 0,
  //         useNativeDriver: true,
  //       }),
  //     ]),
  //     {
  //       iterations: 100,
  //     },
  //   ).start();
  // }, []);

  // const colorScheme = useColorScheme();
  // const isMode = modeDark ?? colorScheme === 'dark';

  // const spin = springValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '360deg'],
  // });

  // const transform = animated ? { transform: [{ rotate: spin }] } : {};

  return (
    <LottieView
      source={source}
      autoPlay
      loop={animated}
      speed={5}
      resizeMode={'cover'}
      // progress={1000}
      style={{ width: size * 6, height: size * 6 }}
      {...props}
    />
  );
};

export default memo(Indicators);
