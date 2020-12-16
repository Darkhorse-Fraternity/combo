/**
 * Created by lintong on 2019/1/10.
 * @flow
 */

import React, { FC, memo, useEffect, useRef } from 'react';
import { Image, Animated, useColorScheme } from 'react-native';

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface IndicatorsProps {
  size?: number;
  animated?: boolean;
}

const Indicators: FC<IndicatorsProps> = (props) => {
  const { animated = true, size = 30 } = props;

  const springValueRef = useRef(new Animated.Value(0));
  const springValue = springValueRef.current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(springValueRef.current, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(springValueRef.current, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 100,
      },
    ).start();
  }, []);

  const colorScheme = useColorScheme();
  const isMode = colorScheme === 'dark';

  const spin = springValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const transform = animated ? { transform: [{ rotate: spin }] } : {};

  return (
    <AnimatedImage
      style={{
        width: size,
        height: size,
        ...transform,
      }}
      source={
        isMode
          ? require('../../../source/img/my/logo-dark.png')
          : require('../../../source/img/my/logo.png')
      }
    />
  );
};

export default memo(Indicators);
