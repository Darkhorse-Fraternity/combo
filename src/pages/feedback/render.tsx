import { ButtonItem } from '@components/Button';
import UpdateImageView, {
  UpdateImageViewType,
} from '@components/UpdateImageView';
import { useNavigation } from '@react-navigation/native';
import React, {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Keyboard,
  Platform,
  TextInputProps,
  View,
  TouchableOpacityProps,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {
  StyledContent,
  StyledHeaderText,
  StyledKeyboardAvoidingView,
  StyledTexInput,
  StyledToolBar,
  StyledToolBarItem,
} from './style';

//
import { Control, Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SimpleToast from 'react-native-simple-toast';

import { useGetUserInfo } from 'src/data/data-context';

import { isTablet } from 'react-native-device-info';
import { useOrientation } from '@components/util/hooks';
import { uploadFilesByLeanCloud } from '@request/uploadAVImage';
import { postClassesFeedback } from 'src/hooks/interface';
// import { LoadAnimation } from '@components/Load';
const OpinionText = 'text';
const OpinionImgs = 'images';
// const OpinionEmail = 'email';
type FormData = {
  [OpinionText]: string;
  // [OpinionEmail]: string;
  [OpinionImgs]: { url: string }[];
};

const validationSchema = yup.object().shape({
  [OpinionText]: yup.string().max(50).trim().label('文本'),
  // [OpinionEmail]: yup.string().max(50).trim().label('Email'),
  [OpinionImgs]: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().required(),
      }),
    )
    .label('截图'),
});

const countInrow = isTablet() ? 6 : 4;
const maxNumber = 9;
const bottomSpace = getBottomSpace();
const keyboardVerticalOffsetDefault =
  (Platform.OS === 'ios' ? 58 : 63) +
  bottomSpace +
  (bottomSpace === 0 ? 5 : 0) +
  20;
// const keyboardVerticalOffset = keyboardVerticalOffsetDefault + 70;

interface CustomMaskedInputProps extends Omit<TextInputProps, 'onChange'> {
  onChange?: (text: string) => void;
}

const CustomMaskedInput: FC<CustomMaskedInputProps> = forwardRef((props, _) => {
  const { onChange, ...rest } = props;
  return (
    // @ts-ignore: Unreachable code error
    <StyledTexInput
      {...rest}
      onChange={(e) => {
        e.persist();
        onChange && onChange(e.nativeEvent.text);
      }}
    />
  );
});

// const CutsomUpdateImageView: FC<CustomMaskedInputProps> = (props) => {

// }
const CustomImagePick: FC<UpdateImageViewType> = forwardRef((props, _) => {
  const { value, onChange, ...rest } = props;
  return (
    <View
      onResponderGrant={Keyboard.dismiss}
      onStartShouldSetResponder={() => true}>
      <UpdateImageView
        // data={imgs}
        hide={!value || value.length === 0}
        value={value}
        onPress={Keyboard.dismiss}
        onChange={(res) => onChange && onChange(res)}
        {...rest}
      />
    </View>
  );
});

interface ToolBarProps {
  control: Control<FormData>;
  setValue: <
    TFieldName extends keyof FormData,
    TFieldValue extends FormData[TFieldName]
  >(
    name: TFieldName,
    value: TFieldValue,
  ) => void;
}

const ToolBarImagePickerItem: FC<TouchableOpacityProps & ToolBarProps> = ({
  // control,
  onPress,
  ...other
}) => {
  // const data = useWatch<UpdateImage[]>({ control, name: OpinionImgs }) || [];

  return (
    <TouchableOpacity
      hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
      onPress={onPress}
      {...other}>
      <StyledToolBarItem name="image" size={19} />
    </TouchableOpacity>
  );
};

// interface ToolBarProps extends

const ToolBar: FC<ToolBarProps & { onPress: (type: string) => void }> = ({
  onPress,
  ...other
}) => {
  return (
    <StyledToolBar>
      {/* <ToolBarImagePickerItem
        // hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        onPress={onPress.bind(undefined, recordImgs)} /> */}
      <ToolBarImagePickerItem
        onPress={onPress.bind(undefined, 'imagePick')}
        {...other}
      />
      <View
        style={{ flex: 1 }}
        onResponderGrant={Keyboard.dismiss}
        onStartShouldSetResponder={() => true}
      />
    </StyledToolBar>
  );
};

function point(className: string, objectId: string) {
  return {
    __type: 'Pointer',
    className: className,
    objectId: objectId,
  };
}

const Render: FC<{}> = () => {
  const { setOptions, goBack } = useNavigation();
  const user = useGetUserInfo();
  // useGetUserInfo();

  const [load, setLoad] = useState(false);

  const { setValue, handleSubmit, errors, control } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      // [OpinionEmail]: '',
      [OpinionText]: '',
      [OpinionImgs]: [],
    },
    mode: 'onSubmit',
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoad(true);

      try {
        console.log('data', data);

        // 判断为本地图片时候,则上传并被替换
        const recordImags = data[OpinionImgs];
        const localUrls: string[] = [];
        const imags = recordImags.map(({ url }, index) => {
          if (url.substr(0, 4).toLowerCase() === 'http') {
            return { id: index, localUrl: '', remoteUrl: url };
          }
          localUrls.push(url);
          return { id: index, localUrl: url, remoteUrl: '' };
        });
        //上传本地图片

        if (localUrls.length > 0) {
          const loadImgs = await uploadFilesByLeanCloud(localUrls);
          let num = 0;
          imags.forEach(({ localUrl }, index) => {
            if (localUrl.length !== 0) {
              imags[index].remoteUrl = loadImgs[num].url();
              num++;
            }
          });
          const newImages = imags.map((item) => ({ url: item.remoteUrl }));
          setValue(OpinionImgs, newImages);
        }

        //上传图片

        const param = {
          [OpinionImgs]: imags.map((item) => item.remoteUrl),
          [OpinionText]: data[OpinionText],
          user: point('_User', user?.objectId || ''),
        };

        postClassesFeedback(param).then((res) => {
          if (res.objectId) {
            SimpleToast.showWithGravity(
              '我们已经收到您的反馈，非常感谢～！',
              SimpleToast.SHORT,
              SimpleToast.CENTER,
            );
            goBack();
          }
        });
      } catch (error) {
        SimpleToast.show(error.message);
      }
      setLoad(false);
    },
    [goBack, setValue, user?.objectId],
  );

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
          <StyledHeaderText>{'提交'}</StyledHeaderText>
        </ButtonItem>
      ),
    });
  }, [handleSubmit, load, onSubmit, setOptions]);
  const ref = useRef<(() => void) | undefined>();
  // setOptions({onSumbmit: handleOnSubmit })
  // useEffect(() => {

  // }, [])

  const ori = useOrientation();

  // console.log('keyboardVerticalOffsetDefault', keyboardVerticalOffsetDefault);

  // if (loading) {
  //   return <LoadAnimation />;
  // }

  return (
    <StyledContent>
      <StyledKeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={keyboardVerticalOffsetDefault}>
        {/* <StyledTitle>{title}</StyledTitle>
        <StyledLine /> */}
        <Controller
          // defaultValue=''

          autoFocus={Platform.OS === 'android'}
          name={OpinionText}
          control={control}
          multiline
          placeholder={
            '非常感谢你的意见反馈~！如需回复，请在文末添加您的邮箱。'
          }
          placeholderTextColor={'rgb(180,180,180)'}
          maxLength={5000}
          // onChangeText={text => setval}
          as={CustomMaskedInput}
        />

        <Controller
          only="Album"
          openDirectlyRef={ref}
          name={OpinionImgs}
          control={control}
          // data={imgs}
          onPress={Keyboard.dismiss}
          countInrow={ori === 'PORTRAIT' ? countInrow : 9}
          maxNumber={maxNumber}
          // onChange={onChangeImageArray}
          as={CustomImagePick}
        />

        <ToolBar
          onPress={(toolBartype) => {
            if (toolBartype === 'imagePick') {
              ref?.current?.call(undefined);
            }
          }}
          control={control}
          setValue={setValue as never}
        />
      </StyledKeyboardAvoidingView>
    </StyledContent>
  );
};

const AlertWithTitle = (title: string) => {
  SimpleToast.showWithGravity(title, SimpleToast.SHORT, SimpleToast.CENTER);
};

export default Render;
