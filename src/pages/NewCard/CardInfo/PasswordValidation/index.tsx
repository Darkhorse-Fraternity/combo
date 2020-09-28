import React, { useCallback, useState, PureComponent } from "react";
import { useForm } from "react-hook-form";
import {
  StyledButton,
  StyledUnderLine,
  StyleModalMain,
  StyleTitle
} from "./style";
import * as yup from "yup";
import { RHFError, MemoRHFInput } from "@components/Form";
import CModal, { CModalPropsType } from "@components/modal/c-model";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .max(50)
    .trim()
    .required()
    .label("密码")
});

type FormData = {
  password: string;
};

interface RenderPropsType extends CModalPropsType {
  onDone: (password: string, pdErrorAction: () => void) => void;
  loading?: boolean;
}

const Render = ({ show = false, onDone, loading }: RenderPropsType) => {
  const { register, setValue, handleSubmit, errors, setError } = useForm<
    FormData
  >({
    validationSchema
  });

  const pdErrorAction = () => {
    setValue("password", "", false);
    setError("password", "", "密码错误");
  };

  const onSubmit = (data: FormData) => onDone(data.password, pdErrorAction);

  const memoHanleSubmit = useCallback(handleSubmit(onSubmit), []);
  const onChangeText = useCallback(
    text => setValue("password", text, true),
    []
  );

  return (
    <CModal show={show}>
      <StyleModalMain>
        <StyleTitle>请输入加入密码</StyleTitle>
        <MemoRHFInput
          autoFocus
          name="password"
          setValue={setValue}
          register={register}
          maxLength={50}
          placeholder={"设置加入密码"}
          clearButtonMode={"while-editing"}
          autoCapitalize={"none"}
          returnKeyType={"done"}
          // keyboardType={'default'}
          textContentType={"password"}
          onSubmitEditing={memoHanleSubmit}
          onChangeText={onChangeText}
          // underlineColorAndroid={'green'}
          style={{ paddingVertical: 5 }}
        />
        <StyledUnderLine />
        <RHFError errors={errors} name={"password"} />
        <StyledButton
          loading={loading}
          // dise
          disabled={Object.keys(errors).length > 0}
          onPress={memoHanleSubmit}
        >
          确定
        </StyledButton>
      </StyleModalMain>
    </CModal>
  );
};

export default Render;

export class PasswordValidation extends PureComponent<RenderPropsType> {
  render() {
    return <Render {...this.props} />;
  }
}
