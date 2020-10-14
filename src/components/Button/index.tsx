import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';
import { debounce } from 'lodash';

import React, { ReactChild, ComponentType, PropsWithChildren } from 'react';
import {
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  View,
  TouchableNativeFeedbackProps,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  Text,
  GestureResponderEvent,
  TouchableHighlight,
} from 'react-native';

export interface BtnPeddingProps {
  loading?: boolean;
  size?: number | 'small' | 'large';
  color?: string;
  textStyle?: StyleProp<ViewStyle>;
  textColor?: string;
}

const withPeddingClick = <ComposedComponentProps extends { disabled?: boolean | null }>(
  WrappedComponent: ComponentType<ComposedComponentProps>,
) => {
  class PreventDoubleClick extends React.PureComponent<
    ComposedComponentProps & BtnPeddingProps
    > {
    render() {
      const {
        children,
        loading = false,
        size = 'small',
        color = 'gray',
        disabled,
        textStyle,
        textColor = 'green',
      } = this.props;

      let hChildren = children;
      if (typeof children === 'string' || typeof children === 'number') {
        hChildren = (
          <Text
            style={[
              {
                color: !disabled ? textColor : 'rgb(200,200,200)',
                alignSelf: 'center',
              },
              textStyle,
            ]}>
            {children}{' '}
          </Text>
        );
      }

      return (
        <WrappedComponent disabled={loading || disabled} {...this.props}>
          {loading ? (
            <ActivityIndicator size={size} color={color} />
          ) : (
              hChildren
            )}
        </WrappedComponent>
      );
    }
  }

  return PreventDoubleClick;
};

const withPreventDoubleClick = <
  ComposedComponentProps extends { onPress?: (e: GestureResponderEvent) => void }
>(
  WrappedComponent: ComponentType<ComposedComponentProps>,
) => {
  class PreventDoubleClick extends React.PureComponent<ComposedComponentProps> {
    debouncedOnPress = (e: GestureResponderEvent) => {
      this.props.onPress && this.props.onPress(e);
    };

    onPress = debounce(this.debouncedOnPress, 600, {
      leading: true,
      trailing: false,
    });

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }

  return PreventDoubleClick;
};

const ButtonAndroid = (
  props: PropsWithChildren<TouchableNativeFeedbackProps>,
) => (
  <TouchableNativeFeedback
    delayPressIn={0}
    background={
      props.background ||
      (TouchableNativeFeedback.SelectableBackground &&
        TouchableNativeFeedback.SelectableBackground())
    } // eslint-disable-line new-cap
    {...props}>
    {(typeof props.children !== 'string' && props.children) || props.style ? (
      <View style={props.style}>{props.children}</View>
    ) : (
        props.children
      )}
  </TouchableNativeFeedback>
);

const button = Platform.OS === 'ios' ? TouchableOpacity : ButtonAndroid;

export default withPeddingClick(withPreventDoubleClick(button));

export const ButtonOpacity = withPeddingClick(
  withPreventDoubleClick(TouchableOpacity),
);

export const ButtonHighlight = withPeddingClick(
  withPreventDoubleClick(TouchableHighlight),
);

export const ButtonItem = withPeddingClick(
  withPreventDoubleClick(TouchableItem),
);

// const styles = StyleSheet.create({

// });
