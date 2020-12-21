import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { theme as theme1 } from '../../Theme';

interface EZTabBarProps {
  goToPage?: (page: number) => void;
  // activeTab: number;
  tabs?: [];
  underlineColor?: string;
  backgroundColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  tabUnderlineWidth?: number;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  scrollValue?: Animated.Value;
  scrollValueWithOutNative: Animated.Value;
}

// class EZTabBarClass extends PureComponent<
//   EZTabBarProps & { name: string; page: number }
// > {
const EZTabBarClass: FC<EZTabBarProps & { name: string; page: number }> = (
  props,
) => {
  const theme = useTheme();

  const {
    // activeTab,
    activeTextColor = theme.colors.text,
    inactiveTextColor = '#979797',
    textStyle = {},
    tabs,
    scrollValue = new Animated.Value(0),
    underlineColor,
    scrollValueWithOutNative,
    tabUnderlineWidth = 72,
    name,
    page,
    goToPage,
  } = props;

  // const isTabActive = activeTab === page;
  const numberOfTabs = tabs?.length || 0;

  const tabUnderlineStyle = {
    width: tabUnderlineWidth,
    height: 7,
    backgroundColor: underlineColor || theme1.mainColor,
  };

  // let outputRange = lastActiveTab - page < 0 && isTabActive ? [0, 1] : [1, 0]

  // if(isTabActive){
  //   console.log('inputRange:', inputRange);
  // }

  // const background =
  //   TouchableNativeFeedback.SelectableBackgroundBorderless &&
  //   TouchableNativeFeedback.SelectableBackgroundBorderless();

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

  const scaleX = scrollValue?.interpolate({
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
      onPress={() => goToPage && goToPage(page)}>
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
};
// }

const EZTabBar: FC<EZTabBarProps> = (props) => {
  const { tabs, ...rest } = props;
  return (
    <View style={[styles.tabBar, props.style]}>
      {tabs?.map((tab, i) => (
        <EZTabBarClass key={tab} name={tab} page={i} tabs={tabs} {...rest} />
      ))}
    </View>
  );
};

export default EZTabBar;

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
