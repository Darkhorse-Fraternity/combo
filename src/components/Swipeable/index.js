import React, { Component } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { RectButton } from "react-native-gesture-handler";

import Swipeable from "react-native-gesture-handler/Swipeable";

export default class AppleStyleSwipeableRow extends Component {
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
  renderRightAction = (component, color, onPress, x, progress, index) => {
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
        style={{ flex: 1, transform: [{ translateX: trans }] }}
      >
        <RectButton
          key={index}
          style={[styles.rightAction, { backgroundColor: color, flex: 1 }]}
          onPress={pressHandler}
        >
          {component}
        </RectButton>
      </Animated.View>
    );
  };
  renderRightActions = (progress, dragX, data) => (
    <View style={{ width: data.length * 64, flexDirection: "row" }}>
      {data.map((item, index) => {
        const { backgroundColor, component, onPress } = item;
        return this.renderRightAction(
          component,
          backgroundColor,
          onPress,
          (data.length - index) * 64,
          progress,
          index
        );
      })}
      {/*{this.renderRightAction('More', '#C8C7CD', 192, progress)}*/}
      {/*{this.renderRightAction('Flag', '#ffab00', 128, progress)}*/}
      {/*{this.renderRightAction('More', '#dd2c00', 64, progress)}*/}
    </View>
  );
  updateRef = (ref) => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };

  componentWillReceiveProps(props) {
    // if(props.close !=== ){
    //
    // }
  }

  render() {
    const {
      children,
      rightThreshold,
      renderLeftActions,
      leftThreshold,
      renderRightActions,
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
        {...otherProps}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({});
