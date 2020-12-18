import React, { FC, memo } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  ViewStyle,
  StyleProp,
  useColorScheme,
} from 'react-native';

import Button from '../Button';

interface TitleTabBarProps {
  activeTextColor?: string;
  inactiveTextColor?: string;
  // underlineColor: string;
  scrollValueWithOutNative: Animated.Value;
  activeTab?: number;
  tabs?: string[];
  textStyle?: {};
  style?: StyleProp<ViewStyle>;
  goToPage?: (page: number) => void;
}

const TitleTabBarClass: FC<
  TitleTabBarProps & { name: string; page: number }
> = (props) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const {
    activeTextColor = isDarkMode ? 'rgb(200,200,200)' : 'rgb(50,50,50)',
    inactiveTextColor = isDarkMode ? 'rgb(100,100,100)' : '#979797',
    textStyle = {},
    tabs,
    scrollValueWithOutNative,
    name,
    page,
    goToPage,
  } = props;

  const numberOfTabs = tabs?.length ?? 0;
  // const tabUnderlineStyle = {
  //   width: tabUnderlineWidth,
  //   height: 7,
  //   backgroundColor: underlineColor || theme.mainColor,
  // };

  const inputRange = [];
  const outputRange = [];
  const outputRangeColor: string[] = [];
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
      onPress={() => {
        goToPage && goToPage(page);
      }}>
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
};

const TitleTabBar: FC<TitleTabBarProps> = (props) => {
  const {
    tabs,

    ...rest
  } = props;
  return (
    <View style={[styles.tab, props.style]}>
      <View style={styles.tabs1}>
        {tabs?.map((tab, i) => (
          <TitleTabBarClass
            key={tab}
            name={tab}
            page={i}
            tabs={tabs}
            {...rest}
          />
        ))}
      </View>
    </View>
  );
};

export default memo(TitleTabBar);

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
