import React, { Component } from 'react';
import {
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  LayoutAnimationConfig,
  View,
  StyleSheet,
  Platform,
  Dimensions,
  EmitterSubscription,
} from 'react-native';
// import {DP_HEIGHT, IS_ANDROID, IS_IOS} from '../../defines/device';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

const defaultAnimation = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200,
  },
};

interface Props {
  topSpacing: number;
  onToggle?: (open: boolean, keyboardSpace: number) => void;
}

interface States {
  keyboardSpace: number;
  isKeyboardOpened: boolean;
}

class KeyboardSpacer extends Component<Props, States> {
  static defaultProps = {
    topSpacing: 0,
  };
  state = {
    keyboardSpace: 0,
    isKeyboardOpened: false,
  };
  listeners?: EmitterSubscription[];

  componentDidMount() {
    const updateListener = IS_ANDROID ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener = IS_ANDROID ? 'keyboardDidHide' : 'keyboardWillHide';

    this.listeners = [
      Keyboard.addListener(updateListener, this.updateKeyboardSpace.bind(this)),
      Keyboard.addListener(resetListener, this.resetKeyboardSpace.bind(this)),
    ];
  }

  componentWillUnmount() {
    this.listeners?.forEach((listener) => listener.remove());
  }

  onToggle(open: boolean, space: number) {
    this.props.onToggle?.call(null, open, space);
  }

  updateKeyboardSpace(event: KeyboardEvent) {
    if (!event.endCoordinates) {
      return;
    }
    const DP_HEIGHT = Dimensions.get('window').height;

    let animationConfig: LayoutAnimationConfig = defaultAnimation;
    if (IS_IOS) {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity,
      );
    }
    LayoutAnimation.configureNext(animationConfig);

    const keyboardSpace =
      DP_HEIGHT - event.endCoordinates.screenY + this.props.topSpacing;
    this.setState(
      {
        keyboardSpace,
        isKeyboardOpened: true,
      },
      this.onToggle.bind(this, true, keyboardSpace),
    );
  }

  resetKeyboardSpace(event: KeyboardEvent) {
    let animationConfig: LayoutAnimationConfig = defaultAnimation;
    if (IS_IOS) {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity,
      );
    }
    LayoutAnimation.configureNext(animationConfig);

    this.setState(
      {
        keyboardSpace: 0,
        isKeyboardOpened: false,
      },
      this.onToggle.bind(this, false, 0),
    );
  }

  render() {
    return (
      <View style={[styles.container, { height: this.state.keyboardSpace }]} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default KeyboardSpacer;
