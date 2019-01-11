/**
 * Created by lintong on 2019/1/10.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import {
  View,
  Image,
  Animated,
  Easing
} from 'react-native'
import PropTypes from 'prop-types';

const AnimatedImage = Animated.createAnimatedComponent(Image);
import * as Animatable from 'react-native-animatable';
import {
  StyledContent,
  StyleLogo
} from './style'


export default class Indicators extends PureComponent {
  constructor(props: Object) {
    super(props);
    this.springValue = new Animated.Value(0)
  }

  static propTypes = {
    size: PropTypes.string
  };
  static defaultProps = {
    size: 'small'
  };


  toMax() {
    this.springValue.setValue(0)
    Animated.timing(
      this.springValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => {
      this.toMax()
    })
  }



  componentDidMount() {
    this.toMax()
  }

  render(): ReactElement<any> {

    const spin = this.springValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    const size = this.props.size === 'large' ? 60:30

    return (
      <AnimatedImage
        style={{
          width:size,
          height:size,
          transform: [{ rotate: spin }]
        }}
        source={require('../../../source/img/my/logo.png')}
      />
    );
  }
}


