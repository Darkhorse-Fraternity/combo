const React = require('react');
const ReactNative = require('react-native');
const {
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
    View
} = ReactNative;

import { debounce } from 'lodash'; // 4.0.8

const withPreventDoubleClick = (WrappedComponent) => {

    class PreventDoubleClick extends React.PureComponent {

        debouncedOnPress = () => {
            this.props.onPress && this.props.onPress();
        }

        onPress = debounce(this.debouncedOnPress, 300, { leading: true, trailing: false });

        render() {
            return <WrappedComponent {...this.props} onPress={this.onPress}/>;
        }
    }

    PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponent.displayName || WrappedComponent.name})`
    return PreventDoubleClick;
}

const ButtonIOS = (props) => {
    return <TouchableOpacity {...props}>
        {props.children}
    </TouchableOpacity>;
};

const ButtonAndroid = (props) => {
    return <TouchableNativeFeedback
        delayPressIn={0}
        background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
        {...props}
    >
        {props.children && props.children.length > 1 || props.style ? (
            <View style={props.style}>
                {props.children}
            </View>) : props.children}
    </TouchableNativeFeedback>;
};


const button = Platform.OS === 'ios' ? ButtonIOS : ButtonAndroid;


module.exports = withPreventDoubleClick(button);