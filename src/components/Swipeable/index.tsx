import React, { Component, ReactNode } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable, {
  SwipeableProperties,
} from 'react-native-gesture-handler/Swipeable';

interface AppleStyleSwipeableRowProps extends SwipeableProperties {
  right: {
    backgroundColor: string;
    component: JSX.Element;
    onPress: () => void;
    type: string;
  }[];
}

export default class AppleStyleSwipeableRow extends Component<
  AppleStyleSwipeableRowProps
> {
  swipeableRow?: Swipeable;
  // renderLeftActions = (progress, dragX) => {
  //   const trans = dragX.interpolate({
  //     inputRange: [0, 50, 100, 101],
  //     outputRange: [-20, 0, 0, 1],
  //   });
  //   return (
  //     <RectButton style={styles.leftAction} onPress={this.close}>
  //       <Animated.Text
  //         style={[
  //           styles.actionText,
  //           {
  //             transform: [{ translateX: trans }],
  //           },
  //         ]}>
  //         Archive
  //       </Animated.Text>
  //     </RectButton>
  //   );
  // };
  renderRightAction = (
    component: ReactNode,
    color: string,
    onPress: () => void,
    x: number,
    progress: Animated.AnimatedInterpolation,
    index: number,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
      onPress && onPress();
    };
    return (
      <Animated.View
        key={index}
        style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          key={index}
          style={[styles.rightAction, { backgroundColor: color, flex: 1 }]}
          onPress={pressHandler}>
          {component}
        </RectButton>
      </Animated.View>
    );
  };
  renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
    data: {
      backgroundColor: string;
      component: ReactNode;
      onPress: () => void;
    }[],
  ) => (
    <View style={{ width: data.length * 64, flexDirection: 'row' }}>
      {data.map((item, index) => {
        const { backgroundColor, component, onPress } = item;
        return this.renderRightAction(
          component,
          backgroundColor,
          onPress,
          (data.length - index) * 64,
          progress,
          index,
        );
      })}
      {/*{this.renderRightAction('More', '#C8C7CD', 192, progress)}*/}
      {/*{this.renderRightAction('Flag', '#ffab00', 128, progress)}*/}
      {/*{this.renderRightAction('More', '#dd2c00', 64, progress)}*/}
    </View>
  );
  updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  close = () => {
    this.swipeableRow!.close();
  };

  render() {
    const {
      children,
      rightThreshold,
      renderLeftActions,
      leftThreshold,
      right,
      ...otherProps
    } = this.props;
    return (
      <Swipeable
        useNativeAnimations
        ref={this.updateRef}
        friction={2}
        leftThreshold={leftThreshold}
        rightThreshold={rightThreshold || 10}
        renderLeftActions={renderLeftActions}
        renderRightActions={(progress, dragX) =>
          this.renderRightActions(progress, dragX, right)
        }
        {...otherProps}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  renderRight: {},
  rightAction: {},
});
