import React, { useCallback, useState } from "react";
import { Alert, View, Text } from "react-native";
import useForm from "react-hook-form";
import {
  StyledContent,
  StyledText,
  StyledButton,
  StyledUnderLine,
  StyledNavBar
} from "./style";
import { reqO } from "react-native-qj-fetch";
import * as yup from "yup";
import { MemoRHFError, MemoRHFInput } from "@components/Form";
import { useNavigationParam } from "react-navigation-hooks";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .max(50)
    .trim()
    .label("密码")
});

type FormData = {
  password: string;
};

const render = () => {
  const iCardID = useNavigationParam("iCardID") as string;
  // console.log("req", reqO);
  const lParams = classUpdate(key, objectId, params);
  // reqO();

  const { register, setValue, handleSubmit, errors } = useForm<FormData>({
    validationSchema
  });

  const onSubmit = (data: FormData) =>
    Alert.alert("Form Data2", JSON.stringify(data));

  const memoHanleSubmit = useCallback(handleSubmit(onSubmit), []);
  const onChangeText = useCallback(
    text => setValue("password", text, true),
    []
  );

  // console.log('RHFErrorAnmition', RHFErrorAnmition);

  return (
    <StyledContent>
      <StyledNavBar>
        <StyledText>圈子设置</StyledText>
        <StyledButton
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
          // loading={true}
          onPress={memoHanleSubmit}
          disabled={Object.keys(errors).length > 0}
        >
          保存
        </StyledButton>
      </StyledNavBar>
      <View style={{ height: 10 }} />
      <MemoRHFInput
        autoFocus
        name="password"
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
      <MemoRHFError errors={errors} name={"password"} />
    </StyledContent>
  );
};

export default render;
