import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class AppleStyleSwipeableRow extends Component {
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Archive
        </Animated.Text>
      </RectButton>
    );
  };
  renderRightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const pressHandler = () => {
      // this.close();
      // this.props.onPress && this.props.onPress()
    };
    return (
      <RectButton style={styles.rightAction} onPress={pressHandler}>
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="#fff"
          style={[styles.actionIcon, { transform: [{ scale }] }]}
        />
      </RectButton>

    );
  };
  renderRightActions = (progress, data) => (
    <View style={{ flex:1, flexDirection: 'row' }}>
      {data.map((item, index) => {
        const { backgroundColor, component, onPress } = item
        return this.renderRightAction(component,
          backgroundColor,
          onPress, (data.length - index) * 64, progress, index)
      })}
    </View>
  );
  updateRef = ref => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
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
        ref={this.updateRef}
        friction={2}
        leftThreshold={leftThreshold}
        rightThreshold={rightThreshold || 10}
        renderLeftActions={renderLeftActions}
        renderRightActions={this.renderRightAction}
        {...otherProps}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({

  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },

  rightAction: {
    alignItems: 'flex-end',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'center',
  },
});
