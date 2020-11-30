import React from 'react';
import { TextProps, StyleSheet, StyleProp } from 'react-native';
import * as Animatable from 'react-native-animatable';
type ErrorFields = Record<
  string,
  { message?: string; type: string } | undefined
>;
type Name = keyof ErrorFields;

interface RHFErrorProps<T, U> {
  as?: React.ReactElement;
  errors?: T;
  name: U;
  messages?: Record<string, string>;
  style?: StyleProp<TextProps>;
}

type RHFErrorPropsOut = RHFErrorProps<ErrorFields, Name>;

const RHFError = ({
  as,
  errors,
  name,
  messages = {},
  style = {},
}: RHFErrorPropsOut) => {
  // @ts-ignore

  const message = errors[name]?.message || messages[errors?.type];

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
    fontSize: 11,
    marginTop: 5,
  },
});

const MemoRHFError = React.memo(RHFError);

export { RHFError, MemoRHFError };
