/**
 * Created by lintong on 2019/1/7.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';

const ANIMATION_DURATION = 1000;

// import {
//   StyledContent,
// } from './style'

export default class AnimationRow extends PureComponent {
  constructor(props: Object) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };
    this._animated = new Animated.Value(1);
    this._swiperAnimated = new Animated.Value(0);
  }

  // static propTypes = {};
  // static defaultProps = {};
  //
  //
  componentDidMount() {
    //
  }

  //
  //Animated.timing(this._animated, {
  //   toValue: 1,
  //   duration: 1,
  // }).start();

  remove = () => {
    return new Promise((resolve) => {
      Animated.sequence([
        Animated.timing(
          // Uses easing functions
          this._swiperAnimated, // The value to drive
          {
            toValue: 1, // Target
            duration: ANIMATION_DURATION, // Configuration
          },
        ),
        Animated.timing(this._animated, {
          toValue: 0,
          duration: ANIMATION_DURATION / 2,
        }),
      ]).start(({ finished }) => {
        resolve(finished);
      });
    });
  };

  reset = () => {
    new Promise((resolve) => {
      this._animated.setValue(1);
      this._swiperAnimated.setValue(0);
      resolve();
    });
  };

  _onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    if (this.state.height === 0) {
      this.setState({ height });
    }
  };

  render() {
    const { children, style, ...other } = this.props;
    const { height } = this.state;

    const rowStyles =
      height === 0
        ? []
        : [
            {
              height: this._animated.interpolate({
                inputRange: [0, 1],
                outputRange: [0, height],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateX: this._swiperAnimated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100],
                  }),
                },
              ],
              overflow: 'hidden',
            },
            {
              opacity: this._swiperAnimated.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ];

    return (
      <Animated.View
        onLayout={this._onLayout}
        style={[rowStyles, style]}
        {...other}>
        {children}
      </Animated.View>
    );
  }
}
