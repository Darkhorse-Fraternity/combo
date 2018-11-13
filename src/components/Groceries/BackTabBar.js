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

import Button from "../Button";
import theme from '../../Theme'
import { required } from "../../request/validation";

const backWidth = Dimensions.get('window').width / 3
import HeaderBackImage from '../Nav/components/HeaderBackImage'
import EZTabBar from './EZTabBar'

export default class BackTabBar extends Component {
  static propTypes = {
    goToPage: PropTypes.func,
    onBackPress: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    underlineColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    title: PropTypes.string
  };

  renderTabOption(name: string, page: number) {
    const containerWidth = this.props.containerWidth - backWidth * 2;
    const numberOfTabs = this.props.tabs.length;
    const tabWidth = containerWidth / numberOfTabs;
    const isTabActive = this.props.activeTab === page;
    const activeTextColor = this.props.activeTextColor || '#f1bd49';
    const inactiveTextColor = this.props.inactiveTextColor || '#999999';
    const textStyle = this.props.textStyle || {};
    return <TouchableOpacity
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => this.props.goToPage(page)}>
      <View style={[styles.tab,
        { width: tabWidth }]}>
        <Text style={[{
          color: isTabActive ? activeTextColor : inactiveTextColor,
          fontWeight: isTabActive ? 'bold' : 'normal',
          fontSize: isTabActive ? 15 : 14
        }, textStyle]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>;
  }

  render() {
    const containerWidth = this.props.containerWidth - backWidth * 2;
    const numberOfTabs = this.props.tabs.length;
    const tabWidth = containerWidth / numberOfTabs;
    const underLineWidth = 30
    const moveX = tabWidth * (numberOfTabs - 1) / 2
    const tabUnderlineStyle = {
      position: 'absolute',
      width: underLineWidth,
      height: 3,
      backgroundColor: this.props.underlineColor || theme.mainColor,
      bottom: 5,
    };


    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, numberOfTabs - 1],
      outputRange: [-moveX, moveX],
    });

    // console.log('this.props.scrollValue:', translateX);
    // console.log('this.props.onBackPress:',  this.props.scrollValue);

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
          {/*{this.props.tabs.map((tab, i) =>*/}
          {/*this.renderTabOption(tab, i))}*/}
          {/*<Animated.View style={[tabUnderlineStyle,*/}
          {/*{*/}
          {/*transform: [*/}
          {/*{ translateX },*/}
          {/*]*/}
          {/*},*/}
          {/*]}/>*/}
          {numberOfTabs > 1 ? <EZTabBar {...this.props}/> :
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={styles.title}>
              {this.props.title}
            </Text>
          }
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
    height: 45,
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
