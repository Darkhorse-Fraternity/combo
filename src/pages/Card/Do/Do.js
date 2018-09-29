/**
 * Created by lintong on 2017/8/30.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
  findNodeHandle,
  Keyboard,
} from 'react-native'
import { BlurView } from 'react-native-blur';


import { ICARD } from '../../../redux/reqKeys'
import DoCardForm, { FormID } from '../../../components/Form/DoCardForm/index'
//static displayName =

export default class Do extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      viewRef: null,
    }
  }

  static propTypes = {
    data: PropTypes.object,
  };
  static defaultProps = {
    data: {}
  };


  // shouldComponentUpdate(nextProps: Object) {
  //     return !immutable.is(this.props, nextProps)
  // }


  render(): ReactElement<any> {

    const { record, load ,done, type} = this.props


    return (
      <ScrollView
        onStartShouldSetResponder={() => true}
        onResponderGrant={Keyboard.dismiss}
        ref={(e) => {
          if (this.state.viewRef === null && Platform.OS === 'ios') {
            this.setState({ viewRef: findNodeHandle(e) })
          }
        }}
        style={[this.props.style, styles.wrap, {
          backgroundColor: Platform.OS === 'ios' ?
            'transparent' : 'rgba(255,255,255,1)'
        }]}>
        {this.state.viewRef && (<BlurView
          style={[styles.absolute]}
          viewRef={this.state.viewRef}
          blurType="xlight"
          blurAmount={15}
        />)}
        <View/>
        <DoCardForm
          type = {type}
          load={load}
          record={record}
          onSubmit={done}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

  },
  do: {
    padding: 50,
  },
  top: {
    marginTop: 15
  },
  textInputStyle: {
    height: 40
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  close: {
    marginTop: 15,
    width: 80,
  }
})
