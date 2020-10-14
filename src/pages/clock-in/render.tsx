import { ButtonItem } from '@components/Button';
import UpdateImageView, { pickerImage, UpdateImage, UpdateImageViewType } from '@components/UpdateImageView';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useLayoutEffect } from 'react';
import { Keyboard, Platform, TextInputProps, View, TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {
  StyledContent, StyledHeaderText, StyledKeyboardAvoidingView,
  StyledTexInput, StyledToolBar, StyledToolBarItem, StyledToolBarItemTip
} from './style';

// 
import { Control, Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import SimpleToast from 'react-native-simple-toast';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import { usePostClassesIDo } from 'src/hooks/interface';

const recordText = 'recordText'
const recordImgs = 'recordImgs'
type FormData = {
  [recordText]: string;
  [recordImgs]: { url: string }[]
};



const validationSchema = yup.object().shape({
  [recordText]: yup
    .string()
    .max(50)
    .trim()
    .label("文本"),
  [recordImgs]: yup.array().of(
    yup.object().shape({
      url: yup.string().required(),
    })).label('图片')
});


const countInrow = 4
const maxNumber = 9
const bottomSpace = getBottomSpace()
const keyboardVerticalOffsetDefault = (Platform.OS === 'ios' ? 58 : 63) + bottomSpace + (bottomSpace === 0 ? 5 : 0);
// const keyboardVerticalOffset = keyboardVerticalOffsetDefault + 70;


interface CustomMaskedInputProps extends Omit<TextInputProps
  , 'onChange'> {
  onChange?: (text: string) => void
}

const CustomMaskedInput: FC<CustomMaskedInputProps> = (props) => {
  const { onChange, placeholderTextColor, ...rest } = props;
  return (
    <StyledTexInput
      {...rest}
      onChange={e => {
        e.persist();
        onChange && onChange(e.nativeEvent.text);
      }}
    />
  );
};

// const CutsomUpdateImageView: FC<CustomMaskedInputProps> = (props) => {

// }
const CustomImagePick: FC<UpdateImageViewType> = (props) => {
  const { value, onChange, ...rest } = props;
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <View onResponderGrant={Keyboard.dismiss} onStartShouldSetResponder={() => true}>
      <UpdateImageView
        // data={imgs}
        value={value}
        onPress={Keyboard.dismiss}
        onChange={res => onChange && onChange(res)}
        {...rest}
      />
    </View>

  )
}



interface ToolBarProps {
  control: Control<FormData>;
  setValue: <TFieldName extends keyof FormData, TFieldValue extends FormData[TFieldName]>
    (name: TFieldName, value: TFieldValue) => void;
}

interface ToolBarItemProps {
  showTip?: boolean
}

const ToolBarImagePickerItem: FC<TouchableOpacityProps & ToolBarProps & ToolBarItemProps> =
  ({ setValue, control, showTip, ...other }) => {

    const data = useWatch<UpdateImage[]>({ control, name: recordImgs }) || []

    const toolbarOnPress = () => {
      const imageCount = maxNumber - data.length;
      pickerImage(imageCount).then(imageArray => {
        if (imageArray && setValue) {
          setValue(recordImgs, [...data, ...imageArray])
        }
      })
    }

    return (
      <TouchableOpacity
        hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        onPress={toolbarOnPress}
        {...other}
      >
        <StyledToolBarItem name='image' size={19} />
        {!data || data.length === 0 && showTip && <StyledToolBarItemTip />}
      </TouchableOpacity >
    )
  }

const ToolBar: FC<ToolBarProps> =
  (props) => {
    return (<StyledToolBar  >

      {/* <ToolBarImagePickerItem
        // hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        onPress={onPress.bind(undefined, recordImgs)} /> */}
      <ToolBarImagePickerItem {...props} />
      <View style={{ flex: 1 }} onResponderGrant={Keyboard.dismiss} onStartShouldSetResponder={() => true} />
    </StyledToolBar>)
  }


const Render: FC<{}> = () => {
  const { setOptions } = useNavigation();
  const { data, loading, refresh } = usePostClassesIDo(
    { user: {}, type: 0, iCard: {}, iUse: {}, doneDate: {} }, { manual: false });
  const { id } = useNavigationAllParamsWithType<RouteKey.clockIn>();

  const { setValue, getValues, handleSubmit, errors, control, } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: { recordText: '', recordImgs: [] },
    mode: 'onSubmit',
  });



  const onSubmit = async (data: FormData) => {


    console.log('data', data);

  }

  useEffect(() => {
    const keys = Object.keys(errors);

    if (keys && keys[0]) {
      const key = keys[0];
      AlertWithTitle(errors[key].message);
    }
  }, [errors]);


  // TODO: 这种比较耗性能，如有需要，可以换成react-hook-form 模式
  useLayoutEffect(() => {
    setOptions({
      headerRight: (headerRightProps: { tintColor?: string }) => (
        <ButtonItem
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{ marginRight: 15 }}
          {...headerRightProps}
          onPress={handleSubmit(onSubmit)}>
          <StyledHeaderText>发布</StyledHeaderText>
        </ButtonItem>
      ),
    });
  }, []);
  // setOptions({onSumbmit: handleOnSubmit })
  // useEffect(() => {

  // }, [])


  // console.log('keyboardVerticalOffsetDefault', keyboardVerticalOffsetDefault);

  return (
    <StyledContent >
      <StyledKeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={keyboardVerticalOffsetDefault}>
        <Controller
          // defaultValue=''
          name={recordText}
          control={control}
          multiline
          placeholder={'记录每一天的改变～'}
          maxLength={5000}
          // onChangeText={text => setval}
          as={CustomMaskedInput}
        />

        <Controller

          name={recordImgs}
          control={control}
          // data={imgs}
          onPress={Keyboard.dismiss}
          countInrow={countInrow}
          maxNumber={maxNumber}
          // onChange={onChangeImageArray}
          as={CustomImagePick}
        />
        <ToolBar control={control} setValue={setValue as any} />
      </StyledKeyboardAvoidingView>
    </StyledContent>
  );
};

const AlertWithTitle = (title: string) => {
  SimpleToast.showWithGravity(title, SimpleToast.SHORT, SimpleToast.CENTER);
};

export default Render;
