import { debounce } from 'lodash';

const React = require('react');
const ReactNative = require('react-native');

const {
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  View
} = ReactNative; // 4.0.8

const withPreventDoubleClick = (WrappedComponent) => {
  class PreventDoubleClick extends React.PureComponent {
        debouncedOnPress = () => {
          this.props.onPress && this.props.onPress();
        }

        onPress = debounce(this.debouncedOnPress, 300, { leading: true, trailing: false });

        render() {
          return <WrappedComponent {...this.props} onPress={this.onPress} />;
        }
  }

  PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponent.displayName || WrappedComponent.name})`;
  return PreventDoubleClick;
};


const ButtonAndroid = props => (
  <TouchableNativeFeedback
    delayPressIn={0}
    background={TouchableNativeFeedback.SelectableBackground
        && TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
    {...props}
  >
    {props.children && props.children.length > 1 || props.style ? (
      <View style={props.style}>
        {props.children}
      </View>
    ) : props.children}
  </TouchableNativeFeedback>
);


const button = Platform.OS === 'ios' ? TouchableOpacity : ButtonAndroid;


module.exports = withPreventDoubleClick(button);
