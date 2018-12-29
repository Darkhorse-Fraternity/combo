import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Button from "../../../components/Button";

const backWidth = Dimensions.get('window').width / 3
import HeaderBackImage from '../../../components/Nav/components/HeaderBackImage'

export default class BackTabBar extends Component {
  static propTypes = {
    title: PropTypes.string
  };



  render() {

    const {title} = this.props

    const background = TouchableNativeFeedback.SelectableBackgroundBorderless &&
      TouchableNativeFeedback.SelectableBackgroundBorderless()
    return (
      <View style={[styles.tabs, {
        backgroundColor:
        this.props.backgroundColor || 'white', marginTop: Platform.OS === 'ios' ? 0 : 20
      }, this.props.style,]}>
        <Button
          background={background}
          onPress={() => {
            this.props.onBackPress &&
            this.props.onBackPress()
          }}
          style={{
            width: backWidth,
            justifyContent: 'center',
          }}>
          <HeaderBackImage/>
        </Button>
        <View style={[styles.tab, styles.contain]}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={styles.title}>
              {title}
            </Text>
        </View>
        <View style={{
          width: backWidth,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingRight: 0,
          alignItems: 'center'
        }}>
          {this.props.rightView &&
          this.props.rightView()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 10,
    flexDirection: 'row',


  },
  contain: {
    flexDirection: 'row',
  },
  tabs: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'transparent',

  },
  title:{
    alignItems: 'center',
    fontSize: 19,
  }
});
