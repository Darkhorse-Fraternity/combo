import { debounce } from "lodash";

import React, { ReactChild } from "react";
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
  GestureResponderEvent
} from "react-native";

export interface BtnPeddingProps extends TouchableNativeFeedbackProps {
  loading?: boolean;
  size?: number | "small" | "large";
  color?: string;
  textStyle?: StyleProp<ViewStyle>;
  textColor?: string;
}

const withPeddingClick = (WrappedComponent: Function) => {
  class PreventDoubleClick extends React.PureComponent<BtnPeddingProps> {
    render() {
      const {
        children,
        loading = false,
        size = "small",
        color = "gray",
        disabled,
        textStyle,
        textColor = "green"
      } = this.props;

      let hChildren = children;
      if (typeof children === "string" || typeof children === "number") {
        hChildren = (
          <Text
            style={[
              { color: !disabled ? textColor : "rgb(200,200,200)" },
              textStyle
            ]}
          >
            {children}{" "}
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

const withPreventDoubleClick = (WrappedComponent: Function) => {
  class PreventDoubleClick extends React.PureComponent<Props> {
    debouncedOnPress = (e: GestureResponderEvent) => {
      this.props.onPress && this.props.onPress(e);
    };

    onPress = debounce(this.debouncedOnPress, 300, {
      leading: true,
      trailing: false
    });

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }

  return PreventDoubleClick;
};

export interface BtnAndroidProps extends TouchableNativeFeedbackProps {
  children?: ReactChild[] | ReactChild;
}

const ButtonAndroid = (props: BtnAndroidProps) => (
  <TouchableNativeFeedback
    delayPressIn={0}
    background={
      TouchableNativeFeedback.SelectableBackground &&
      TouchableNativeFeedback.SelectableBackground()
    } // eslint-disable-line new-cap
    {...props}
  >
    {(typeof props.children !== "string" && props.children) || props.style ? (
      <View style={props.style}>{props.children}</View>
    ) : (
      props.children
    )}
  </TouchableNativeFeedback>
);

const button = Platform.OS === "ios" ? TouchableOpacity : ButtonAndroid;

export default withPeddingClick(withPreventDoubleClick(button));

export const ButtonOpacity = withPeddingClick(
  withPreventDoubleClick(TouchableOpacity)
);
