import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated, ViewStyle, StyleProp } from 'react-native';

import Button from '../Button';

interface TitleTabBarProps {
  activeTextColor?: string;
  inactiveTextColor?: string;
  // underlineColor: string;
  scrollValueWithOutNative: Animated.Value;
  activeTab?: number;
  tabs?: [];
  textStyle?: {};
  style?: StyleProp<ViewStyle>;
  goToPage?: (page: number) => void;
}

export default class TitleTabBar extends PureComponent<TitleTabBarProps> {
  renderTabOption(name: string, page: number) {
    const {
      activeTextColor = '#rgb(50,50,50)',
      inactiveTextColor = '#979797',
      textStyle = {},
      tabs,
      scrollValueWithOutNative,
    } = this.props;

    const numberOfTabs = tabs?.length ?? 0;
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
        onPress={() => this.props.goToPage && this.props.goToPage(page)}>
        <Animated.Text
          style={[
            {
              color,
              fontWeight: 'bold',
              fontSize,
            },
            textStyle,
          ]}>
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
          {this.props.tabs?.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
        {/* <View style={styles.tabs2}>
          {this.props.rightView && this.props.rightView()}
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabs1: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
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
