/**
 * Created by lintong on 2017/2/25.
 * @flow
 */
'use strict';

import React from 'react';
import Modal from 'rmc-dialog/es/Modal';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import theme from '../../Theme'
import { StyleSheet, ViewStyle } from 'react-native';
import {creatStore} from '../../redux/store'

const styles = StyleSheet.create({
  wrapStyle: {
    justifyContent: 'center',
  }
});

export default class PopupContainer extends React.Component<any> {

  // static childContextTypes = {
  //     store: PropTypes.object,
  // };
  // getChildContext(): Object {
  //     return {
  //         store: this.props.store,
  //     };
  // }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
    };
  }

  hide() {
    this.setState({
      visible: false,
    });
  }

  onMaskClose = () => {
    const onMaskClose = this.props.onMaskClose;
    if (onMaskClose) {
      const res = onMaskClose();
      if (res && res.then) {
        res.then(() => {
          this.hide();
        });
      } else {
        this.hide();
      }
    }
  }

  render() {
    return (
      <Modal
        maskStyle={this.props.maskStyle}
        animateAppear
        onAnimationEnd={this.props.onAnimationEnd}
        animationType={this.props.animationType}
        wrapStyle={[styles.wrapStyle, this.props.wrapStyle]}
        visible={this.state.visible}
        maskClosable={this.props.maskClosable}
        onClose={this.onMaskClose}
        style={{ backgroundColor: 'transparent' }}
      >
        <Provider store={creatStore()}>
          <ThemeProvider theme={theme}>
            {this.props.children}
          </ThemeProvider>
        </Provider>

      </Modal>
    );
  }
}