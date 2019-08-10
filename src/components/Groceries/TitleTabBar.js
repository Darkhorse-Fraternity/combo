import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';

import Button from '../Button';

export default class TitleTabBar extends Component {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    underlineColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
  };

  renderTabOption(name: string, page: number) {
    const {
      activeTab,
      activeTextColor = '#rgb(50,50,50)',
      inactiveTextColor = '#979797',
      textStyle = {},
      tabs,
      scrollValue,
      underlineColor,
      scrollValueWithOutNative,
      tabUnderlineWidth
    } = this.props;


    const isTabActive = activeTab === page;
    const numberOfTabs = tabs.length;
    // const tabUnderlineStyle = {
    //   width: tabUnderlineWidth,
    //   height: 7,
    //   backgroundColor: underlineColor || theme.mainColor,
    // };

    const inputRange = [];
    const outputRange = [];
    const outputRangeColor = [];
    const outputRangefontSize = [];
    for (let i = -1; i < numberOfTabs + 1; i++) {
      inputRange.push(i);
      outputRange.push(0.001);
      outputRangeColor.push(inactiveTextColor);
      outputRangefontSize.push(15);
    }
    outputRange.splice(page + 1, 1, 1);
    outputRangeColor.splice(page + 1, 1, activeTextColor);
    outputRangefontSize.splice(page + 1, 1, 21);

    // const scaleX = scrollValue.interpolate({
    //   inputRange: inputRange,
    //   outputRange: outputRange,
    // });

    const color = scrollValueWithOutNative.interpolate({
      inputRange,
      outputRange: outputRangeColor,
    });

    const fontSize = scrollValueWithOutNative.interpolate({
      inputRange,
      outputRange: outputRangefontSize,
    });

    return (
      <Button
        key={name}
        accessible
        accessibilityLabel={name}
        accessibilityTraits="button"
        style={{ paddingVertical: 20, paddingHorizontal: 10 }}
        onPress={() => this.props.goToPage(page)}
      >

        <Animated.Text style={
        [{
          color,
          fontWeight: 'bold',
          fontSize
        }, textStyle]}
  >
    {name}
  </Animated.Text>
            </Button>
    );
  }

  render() {
    // const containerWidth = this.props.containerWidth;
    // const numberOfTabs = this.props.tabs.length;
    // const tabWidth = containerWidth / numberOfTabs/2;
    return (
      <View style={[styles.tab, this.props.style]}>
        <View style={styles.tabs1}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
        <View style={styles.tabs2}>
          {this.props.rightView
          && this.props.rightView()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tabs1: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10
    // paddingBottom: 10,
  },
  tabs2: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'transparent',
  },
});
