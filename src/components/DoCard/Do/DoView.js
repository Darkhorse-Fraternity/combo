/**
 * Created by lintong on 2017/8/30.
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  // ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
  findNodeHandle,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import DoCardForm from '../../Form/DoCardForm/index';
// static displayName =

export default class DoView extends Component {
  static propTypes = {};

  static defaultProps = {};

  // shouldComponentUpdate(nextProps: Object) {
  //     return !immutable.is(this.props, nextProps)
  // }
  constructor(props: Object) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }

  render(){
    const {record, load, done, type, localSaveID} = this.props;
    // const color = iconAndColor && iconAndColor.get('color')
    const color = '#51c332';

    return (
      <SafeAreaView style={{flex:1}}>
        <View
          onStartShouldSetResponder={() => true}
          onResponderGrant={Keyboard.dismiss}
          ref={e => {
            if (this.state.viewRef === null && Platform.OS === 'ios') {
              this.setState({viewRef: findNodeHandle(e)});
            }
          }}
          style={[
            this.props.style,
            styles.wrap,
            {
              backgroundColor:
                Platform.OS === 'ios' ? 'transparent' : 'rgba(255,255,255,1)',
            },
          ]}>
          {this.state.viewRef && (
            <BlurView
              style={[styles.absolute]}
              viewRef={this.state.viewRef}
              blurType="xlight"
              blurAmount={15}
            />
          )}
          <DoCardForm
            localSaveEnable
            localSaveID={localSaveID}
            color={color}
            type={type}
            load={load}
            record={record}
            onSubmit={done}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: height,
    // marginTop:Platform.OS === 'ios'?0:20
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: height,
  },
  do: {
    padding: 50,
  },
  top: {
    marginTop: 15,
  },
  textInputStyle: {
    height: 40,
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  close: {
    marginTop: 15,
    width: 80,
  },
});
