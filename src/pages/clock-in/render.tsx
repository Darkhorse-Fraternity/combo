import { ButtonItem } from '@components/Button';
import UpdateImageView, { pickerImage, UpdateImage, UpdateImageViewType } from '@components/UpdateImageView';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { Keyboard, Platform, TextInputProps, View, TouchableOpacityProps, DeviceEventEmitter } from 'react-native';
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
import { getClassesIDoId, postClassesIDo } from 'src/hooks/interface';
import { getUerInfo } from 'src/data/data-context';

const RecordText = 'recordText'
const RecordImgs = 'recordImgs'
type FormData = {
  [RecordText]: string;
  [RecordImgs]: { url: string }[]
};



const validationSchema = yup.object().shape({
  [RecordText]: yup
    .string()
    .max(50)
    .trim()
    .label("文本"),
  [RecordImgs]: yup.array().of(
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

    const data = useWatch<UpdateImage[]>({ control, name: RecordImgs }) || []

    const toolbarOnPress = () => {
      const imageCount = maxNumber - data.length;
      pickerImage(imageCount).then(imageArray => {
        if (imageArray && setValue) {
          setValue(RecordImgs, [...data, ...imageArray])
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

const ToolBar: FC<ToolBarProps & { showImagePickTip: boolean }> =
  ({ showImagePickTip, ...other }) => {
    return (<StyledToolBar  >

      {/* <ToolBarImagePickerItem
        // hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        onPress={onPress.bind(undefined, recordImgs)} /> */}
      <ToolBarImagePickerItem showTip={showImagePickTip}  {...other} />
      <View style={{ flex: 1 }} onResponderGrant={Keyboard.dismiss} onStartShouldSetResponder={() => true} />
    </StyledToolBar>)
  }

function point(className: string, objectId: string) {
  return {
    "__type": "Pointer",
    "className": className,
    "objectId": objectId
  }
}


const Render: FC<{}> = () => {
  const { setOptions, goBack } = useNavigation();
  // useGetUserInfo();
  const { iUseId, iDoId, iCardId, record = [] } = useNavigationAllParamsWithType<RouteKey.clockIn>();
  const [load, setLoad] = useState(false);

  const { setValue, handleSubmit, errors, control, } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: { recordText: '', recordImgs: [] },
    mode: 'onSubmit',
  });


  useEffect(() => {
    if (iDoId) {
      getClassesIDoId({ id: iDoId }).then(({ recordText, imgs }) => {
        // if ()
        recordText && setValue(RecordText, recordText)
        imgs && setValue(RecordImgs, imgs.map(url => ({ url })))
      })
    }
  }, [iDoId])



  const onSubmit = async (data: FormData) => {

    if (record.includes('图片') && data[RecordImgs].length === 0) {
      return AlertWithTitle('该习惯打卡必须包含图片哦～!')
    }

    if (record.includes('文字') && data[RecordText].length === 0) {
      return AlertWithTitle('该习惯打卡必须包含文字哦～!')
    }

    setLoad(true);
    const user = getUerInfo();

    try {
      const { objectId } = await postClassesIDo({
        user: point('_User', user?.objectId || ''),
        type: 0,
        iCard: point('iCard', iCardId),
        iUse: point('iUse', iUseId),
        doneDate: { "__type": "Date", iso: new Date().toISOString() },
        imgs: data[RecordImgs].map(item => item.url),
        recordText: data[RecordText]
      })
      if (objectId) {
        //发消息通知。
        DeviceEventEmitter.emit('iDO_Reload', {});
        goBack();
      }
    } catch (error) {
      SimpleToast.show(error.message)
    }
    setLoad(false);
  }

  useEffect(() => {
    const keys = Object.keys(errors);

    if (keys && keys[0]) {
      const key = keys[0];
      AlertWithTitle(errors[key].message);
    }
  }, [errors]);


  useLayoutEffect(() => {
    setOptions({
      headerRight: (headerRightProps: { tintColor?: string }) => (
        <ButtonItem
          loading={load}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{ marginRight: 15 }}
          {...headerRightProps}
          onPress={handleSubmit(onSubmit)}>
          <StyledHeaderText>发布</StyledHeaderText>
        </ButtonItem>
      ),
    });
  }, [load]);
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
          name={RecordText}
          control={control}
          multiline
          placeholder={'记录每一天的改变～'}
          maxLength={5000}
          // onChangeText={text => setval}
          as={CustomMaskedInput}
        />

        <Controller

          name={RecordImgs}
          control={control}
          // data={imgs}
          onPress={Keyboard.dismiss}
          countInrow={countInrow}
          maxNumber={maxNumber}

          // onChange={onChangeImageArray}
          as={CustomImagePick}
        />
        <ToolBar showImagePickTip={record.includes('图片')} control={control} setValue={setValue as any} />
      </StyledKeyboardAvoidingView>
    </StyledContent>
  );
};

const AlertWithTitle = (title: string) => {
  SimpleToast.showWithGravity(title, SimpleToast.SHORT, SimpleToast.CENTER);
};

export default Render;
