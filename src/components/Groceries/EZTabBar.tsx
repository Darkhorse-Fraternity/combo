import React, { PureComponent } from 'react';
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
  Platform,
} from 'react-native';

import { theme } from '../../Theme';

export default class EZTabBar extends PureComponent {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    underlineColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    tabUnderlineWidth: PropTypes.number,
  };

  static defaultProps = {
    tabUnderlineWidth: 72,
  };

  renderTabOption(name: string, page: number) {
    const {
      activeTab,
      activeTextColor = '#000000',
      inactiveTextColor = '#979797',
      textStyle = {},
      tabs,
      scrollValue,
      underlineColor,
      scrollValueWithOutNative,
      tabUnderlineWidth,
    } = this.props;

    const isTabActive = activeTab === page;
    const numberOfTabs = tabs.length;

    const tabUnderlineStyle = {
      width: tabUnderlineWidth,
      height: 7,
      backgroundColor: underlineColor || theme.mainColor,
    };

    // let outputRange = lastActiveTab - page < 0 && isTabActive ? [0, 1] : [1, 0]

    // if(isTabActive){
    //   console.log('inputRange:', inputRange);
    // }

    const background =
      TouchableNativeFeedback.SelectableBackgroundBorderless &&
      TouchableNativeFeedback.SelectableBackgroundBorderless();

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
    outputRangefontSize.splice(page + 1, 1, 18);

    const scaleX = scrollValue.interpolate({
      inputRange: inputRange,
      outputRange: outputRange,
    });

    const color = scrollValueWithOutNative.interpolate({
      inputRange: inputRange,
      outputRange: outputRangeColor,
    });

    const fontSize = scrollValueWithOutNative.interpolate({
      inputRange: inputRange,
      outputRange: outputRangefontSize,
    });

    // console.log('outputRangeColor:', outputRangeColor);

    return (
      <TouchableOpacity
        key={name}
        accessible
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => this.props.goToPage(page)}>
        <View style={[styles.tab]}>
          <Animated.Text
            style={[
              {
                fontSize: fontSize,
                color: color,
              },
              textStyle,
            ]}>
            {name}
          </Animated.Text>
          {numberOfTabs > 1 && (
            <Animated.View
              style={[
                tabUnderlineStyle,
                {
                  transform: [{ scaleX }],
                },
              ]}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    // console.log('this.props.scrollValue:', translateX);

    return (
      <View style={[styles.tabBar, this.props.style]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
