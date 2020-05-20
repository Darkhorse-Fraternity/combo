/**
 * Created by lintong on 2019/1/10.
 * @flow
 */

import React, {PureComponent} from 'react';
import {View, Image, Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';
import {StyledContent, StyleLogo} from './style';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default class Indicators extends PureComponent {
  static propTypes = {
    size: PropTypes.string,
    animated: PropTypes.bool,
  };

  static defaultProps = {
    size: 'small',
    animated: true,
  };
  springValue: Animated.Value;

  constructor(props: Object) {
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

  render(): ReactElement<any> {
    const {animated, size} = this.props;

    const spin = this.springValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const sizeNum = size === 'large' ? 60 : 30;
    const transform = animated ? {transform: [{rotate: spin}]} : {};

    return (
      <AnimatedImage
        style={{
          width: sizeNum,
          height: sizeNum,
          ...transform,
        }}
        source={require('../../../source/img/my/logo.png')}
      />
    );
  }
}
