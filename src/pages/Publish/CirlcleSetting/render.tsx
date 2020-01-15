import React, { useCallback, useState } from "react";
import { Alert, View, Text } from "react-native";
import useForm from "react-hook-form";
import { StyledContent, StyledText, StyledButton } from "./style";
import Modal from "react-native-modal";
import * as yup from "yup";
import { MemoRHFError, MemoRHFInput } from "@components/Form";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .max(50)
    .trim()
    .label("密码")
    .required()
});

type FormData = {
  password: string;
};

const render = () => {
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

  const [showModal, setShowModal] = useState(false);

  // console.log('RHFErrorAnmition', RHFErrorAnmition);

  return (
    <StyledContent>
      <StyledText>设置加入密码</StyledText>
      <MemoRHFInput
        autoFocus
        name="password"
        register={register}
        maxLength={50}
        placeholder={"设置密码"}
        clearButtonMode={"while-editing"}
        autoCapitalize={"none"}
        returnKeyType={"done"}
        // keyboardType={'default'}
        textContentType={"password"}
        onSubmitEditing={memoHanleSubmit}
        onChangeText={onChangeText}
      />
      <MemoRHFError errors={errors} name={"password"} />

      <StyledButton
        hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
        // loading={true}
        onPress={memoHanleSubmit}
        disabled={Object.keys(errors).length > 0}
      >
        保存
      </StyledButton>

      <StyledButton
        hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
        // loading={true}
        onPress={() => {
          setShowModal(!showModal);
        }}
      >
        输入密码
      </StyledButton>

      <Modal
        avoidKeyboard
        useNativeDriver={true}
        animationIn={"fadeInUp"}
        animationOut={"fadeOutDown"}
        style={{ margin: 20 }}
        // swipeDirection="up"
        // coverScreen={false}
        // onBackdropPress={() => {
        //   setShowModal(!showModal);
        // }}
        // transparent={true}
        isVisible={showModal}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 5
          }}
        >
          <View>
            <Text style={{ alignSelf: "center", margin: 10 }}>请输入密码</Text>
            <MemoRHFInput
              autoFocus
              name="password"
              register={register}
              maxLength={50}
              placeholder={"设置密码"}
              clearButtonMode={"while-editing"}
              autoCapitalize={"none"}
              returnKeyType={"send"}
              // keyboardType={'default'}
              textContentType={"password"}
              onSubmitEditing={memoHanleSubmit}
              onChangeText={onChangeText}
            />
            <StyledButton
              // loading={true}
              onPress={() => {
                // this.setModalVisible(!this.state.modalVisible);
                setShowModal(!showModal);
              }}
            >
              确定
            </StyledButton>
          </View>
        </View>
      </Modal>
    </StyledContent>
  );
};

export default render;
