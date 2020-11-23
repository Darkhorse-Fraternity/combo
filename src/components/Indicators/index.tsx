/**
 * Created by lintong on 2019/1/10.
 * @flow
 */

import React, { PureComponent } from 'react';
import { View, Image, Animated, Easing } from 'react-native';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default class Indicators extends PureComponent<{
  size: number;
  animated: boolean;
}> {
  static defaultProps = {
    size: 30,
    animated: true,
  };
  springValue: Animated.Value;

  constructor(props: any) {
    super(props);
    this.springValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.start();
  }

  start() {
    // this.springValue.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.springValue, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(this.springValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 100,
      },
    ).start();
  }

  render() {
    const { animated, size } = this.props;

    const spin = this.springValue.interpolate({
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
        source={require('../../../source/img/my/logo.png')}
      />
    );
  }
}
