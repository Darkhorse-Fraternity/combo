import * as React from 'react';
import {Props} from './types';
import {StyledTextInput} from './style';
import {TextInputProps} from 'react-native';

const isUndefined = (val: unknown): val is undefined => val === undefined;

function getValue(target: any, {isCheckbox}: {isCheckbox: boolean}) {
  // the following logic is specific for react-select
  if (target && (Array.isArray(target) || (target.label && target.value))) {
    return target;
  }

  return target
    ? isCheckbox
      ? target.checked
      : isUndefined(target.value)
      ? target
      : target.value
    : target;
}

const RHFInput = ({
  innerProps,
  setValue: setValueFromProp,
  register: registerFromProp,
  unregister: unregisterFromProp,
  name,
  rules,
  mode = 'onSubmit',
  as: InnerComponent = StyledTextInput,
  onChange,
  onBlur,
  type,
  value,
  defaultValue,
  defaultChecked,
  onChangeName,
  onChangeEvent,
  onBlurName,
  onBlurEvent,
  ...rest
}: Props & TextInputProps) => {
  const props = {
    ref: registerFromProp({name}),
    ...rest,
  };

  return React.isValidElement(StyledTextInput) ? (
    React.cloneElement(StyledTextInput, props)
  ) : (
    <StyledTextInput {...props} />
  );
};

const MemoRHFInput = React.memo(RHFInput);
export {RHFInput, MemoRHFInput};
