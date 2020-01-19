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
  // innerProps,
  // setValue,
  // register,
  // // unregister: unregisterFromProp,
  // name,
  // rules,
  mode = "onSubmit",
  as: InnerComponent = StyledTextInput,
  // onChange,
  // // onBlur,
  // type,
  // value,
  // defaultValue,
  // defaultChecked,
  // onChangeName,
  // onChangeEvent,
  // onBlurName,
  // onBlurEvent,
  // defaultValue,
  // rules,
  // unregister,
  ...rest
}: Props & TextInputProps) => {
  // const props = {
  //   ref: registerFromProp({name}),
  //   mode,
  //   as: InnerComponent,
  //   ...rest,
  // };

  const onChange = (args: any) => ({
    value: args[0].nativeEvent.text
  });

  return (
    <InnerRHFInput
      // register={register}
      onChangeEvent={onChange}
      as={<InnerComponent />}
      // rules={{required: true}}
      // name={name}
      // rules={rules}
      // unregister={unregister}
      // setValue={setValue}
      // defaultValue={defaultValue}
      {...rest}
    />
  );
};

const MemoRHFInput = React.memo(RHFInput);
export { RHFInput, MemoRHFInput };
