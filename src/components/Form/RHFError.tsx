import React from 'react';
import { DeepMap, FieldError } from 'react-hook-form';
import { TextProps, StyleSheet, StyleProp } from 'react-native';
import * as Animatable from 'react-native-animatable';
type ErrorFields<T> = DeepMap<T, FieldError>;

interface RHFErrorProps<T> {
  as?: React.ReactElement;
  errors?: ErrorFields<T>;
  name?: keyof ErrorFields<T>;
  messages?: Record<string, string>;
  style?: StyleProp<TextProps>;
}

// type RHFErrorPropsOut = RHFErrorProps<ErrorFields, Name>;

const oneOfErrors = (errors: ErrorFields<{}>) => {
  let message = '';
  const keys = Object.keys(errors);
  const key = keys[0];
  if (key) {
    message = errors[key].message;
  }
  return message || '';
};

const RHFError = <T extends {}>({
  as,
  errors,
  name,
  // messages = {},
  style = {},
}: RHFErrorProps<T>) => {
  // @ts-ignore

  const message = name && errors ? errors[name]?.message : oneOfErrors(errors);

  // const [height, setHeight] = useState(new Animated.Value(0));

  // console.log(width);

  if (!message) {
    return null;
  }

  return as ? (
    React.cloneElement(as, { children: message })
  ) : (
    <Animatable.Text
      duration={500}
      animation={'fadeIn'}
      useNativeDriver
      style={[styles.error, style]}>
      {message}
    </Animatable.Text>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: 5,
  },
});

const MemoRHFError = React.memo(RHFError);

export { RHFError, MemoRHFError };
