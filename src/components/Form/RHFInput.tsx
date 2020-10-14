import * as React from "react";
import { Props } from "./types";
import { StyledTextInput } from "./style";
import { TextInputProps, TextInput } from "react-native";
import { RHFInput as InnerRHFInput } from "react-hook-form-input";
const isUndefined = (val: unknown): val is undefined => val === undefined;

function getValue(target: any, { isCheckbox }: { isCheckbox: boolean }) {
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
  mode = "onSubmit",
  as: InnerComponent = StyledTextInput,
  ...rest
}: Props & TextInputProps) => {
  const onChange = (args: any) => ({
    value: args[0].nativeEvent.text
  });
  return (
    <InnerRHFInput
      onChangeEvent={onChange}
      as={<InnerComponent />}
      {...rest}
    />
  );
};

const MemoRHFInput = React.memo(RHFInput);
export { RHFInput, MemoRHFInput };
