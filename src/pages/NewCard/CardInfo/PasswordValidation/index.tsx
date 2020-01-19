import React, { useCallback, useState, PureComponent } from "react";
import { useForm } from "react-hook-form";
import {
  StyledButton,
  StyledUnderLine,
  StyleModalMain,
  StyleModalOutView,
  StyleTitle,
  StyleCance,
  StyleConceText,
  StyledIcon
} from "./style";
import Modal from "react-native-modal";
import * as yup from "yup";
import { RHFError, MemoRHFInput } from "@components/Form";

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

interface RenderPropsType {
  show: boolean;
  onDone: (password: string) => void;
}

const Render = ({ show = false, onDone }: RenderPropsType) => {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>({
    validationSchema
    // defaultValues: {password: '11111'},
  });

  const onSubmit = (data: FormData) => onDone(data.password);

  const memoHanleSubmit = useCallback(handleSubmit(onSubmit), []);
  const onChangeText = useCallback(
    text => setValue("password", text, true),
    []
  );

  const [showModal, setShowModal] = useState(show);

  return (
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
      <StyleModalOutView>
        <StyleCance
          onPress={() => {
            setShowModal(!showModal);
          }}
        >
          <StyledIcon name="ios-close" size={20} />
        </StyleCance>
        <StyleModalMain>
          <StyleTitle>请加入输入密码</StyleTitle>
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
            // loading={true}
            onPress={() => {
              // this.setModalVisible(!this.state.modalVisible);
              setShowModal(!showModal);
            }}
          >
            确定
          </StyledButton>
        </StyleModalMain>
      </StyleModalOutView>
    </Modal>
  );
};

export default Render;

export class PasswordValidation extends PureComponent<RenderPropsType> {
  render() {
    return <Render {...this.props} />;
  }
}
