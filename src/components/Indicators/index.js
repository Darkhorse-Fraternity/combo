/**
 * Created by lintong on 2019/1/10.
 * @flow
 */


import React, { PureComponent } from 'react';
import {
  View,
  Image,
  Animated,
  Easing
} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import {
  StyledContent,
  StyleLogo
} from './style';

const AnimatedImage = Animated.createAnimatedComponent(Image);


export default class Indicators extends PureComponent {
  static propTypes = {
    size: PropTypes.string,
    animated: PropTypes.bool,
  };

  static defaultProps = {
    size: 'small',
    animated: true
  };

  constructor(props: Object) {
    super(props);
    this.springValue = new Animated.Value(0);
  }


  componentDidMount() {
    this.toMax();
  }


  toMax() {
    this.springValue.setValue(0);
    Animated.timing(
      this.springValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => {
      this.toMax();
    });
  }


  render(): ReactElement<any> {
    const { animated, size } = this.props;

    const spin = this.springValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    const sizeNum = size === 'large' ? 60 : 30;
    const transform = animated ? { transform: [{ rotate: spin }] } : {};

    return (
      <AnimatedImage
        style={{
          width: sizeNum,
          height: sizeNum,
          ...transform
        }}
        source={require('../../../source/img/my/logo.png')}
      />
    );
  }
}
