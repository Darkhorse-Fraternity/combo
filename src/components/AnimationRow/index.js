/**
 * Created by lintong on 2019/1/7.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import {
  View,
  Animated
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const ANIMATION_DURATION = 500;

// import {
//   StyledContent,
// } from './style'


export default class AnimationRow extends PureComponent {
  constructor(props: Object) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    }
    this._animated = new Animated.Value(1);
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



  remove = ()=>{
    Animated.timing(this._animated, {
      toValue: 0,
      duration: ANIMATION_DURATION,
    }).start(({finished})=>{
      console.log('finished:', finished);
    });
  }

  reset = ()=>{
    Animated.timing(this._animated, {
      toValue: 1,
      duration: 1,
    }).start();
  }


  _onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    if (this.state.height === 0) {
      this.setState({ height })
    }
  }


  render(): ReactElement<any> {
    const { children, ...other } = this.props
    const {  height } = this.state

    console.log('height:', height);
    const rowStyles = height === 0 ? [] : [

      {
        height: this._animated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, height],
          extrapolate: 'clamp',
        }),
        overflow:'hidden'
      },
      { opacity: this._animated },
  ];

    return (

      <Animated.View onLayout={this._onLayout} style={rowStyles} {...other}>
        {children}
      </Animated.View>
    );
  }
}


