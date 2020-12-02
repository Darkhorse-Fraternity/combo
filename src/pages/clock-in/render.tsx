import { ButtonItem } from '@components/Button';
import UpdateImageView, {
  UpdateImage,
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
  DeviceEventEmitter,
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
  StyledToolBarItemTip,
} from './style';

//
import { Control, Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SimpleToast from 'react-native-simple-toast';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import {
  getClassesIDo,
  getClassesIDoId,
  postClassesIDo,
  putClassesIDoId,
  useGetClassesIUseId,
} from 'src/hooks/interface';
import { getUerInfo, useGetUserInfo } from 'src/data/data-context';
import { iUsePoint, userPoint } from '@request/LCModle';
import moment from 'moment';
import { DeviceEventEmitterKey } from '@configure/enum';
import { isTablet } from 'react-native-device-info';
import { useOrientation } from '@components/util/hooks';
import { uploadFilesByLeanCloud } from '@request/uploadAVImage';
import { LoadAnimation } from '@components/Load';
import { useGetIuseData, useMutateIuseData } from 'src/data/data-context/core';
const RecordText = 'recordText';
const RecordImgs = 'recordImgs';
type FormData = {
  [RecordText]: string;
  [RecordImgs]: { url: string }[];
};

const validationSchema = yup.object().shape({
  [RecordText]: yup.string().max(50).trim().label('文本'),
  [RecordImgs]: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().required(),
      }),
    )
    .label('图片'),
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

interface ToolBarItemProps {
  showTip?: boolean;
}

const ToolBarImagePickerItem: FC<
  TouchableOpacityProps & ToolBarProps & ToolBarItemProps
> = ({ control, showTip, onPress, ...other }) => {
  const data = useWatch<UpdateImage[]>({ control, name: RecordImgs }) || [];

  return (
    <TouchableOpacity
      hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
      onPress={onPress}
      {...other}>
      <StyledToolBarItem name="image" size={19} />
      {!data || (data.length === 0 && showTip && <StyledToolBarItemTip />)}
    </TouchableOpacity>
  );
};

const ToolBar: FC<
  ToolBarProps & { showImagePickTip: boolean; onPress: (type: string) => void }
> = ({ showImagePickTip, onPress, ...other }) => {
  return (
    <StyledToolBar>
      {/* <ToolBarImagePickerItem
        // hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
        onPress={onPress.bind(undefined, recordImgs)} /> */}
      <ToolBarImagePickerItem
        showTip={showImagePickTip}
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
  const { update } = useMutateIuseData();
  const user = useGetUserInfo();
  // useGetUserInfo();
  const {
    iUseId,
    iDoId,
    // iCardId,
    // record = [],
    // type = 0,
    // done = false,
    doneDateIso,
  } = useNavigationAllParamsWithType<RouteKey.clockIn>();
  const [load, setLoad] = useState(false);

  const { setValue, handleSubmit, errors, control } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: { recordText: '', recordImgs: [] },
    mode: 'onSubmit',
  });

  const idRef = useRef<string>();
  if (iDoId) {
    idRef.current = iDoId;
  }
  // console.log('type', type);

  const { data } = useGetIuseData(iUseId);
  const { time } = data || { time: 0 };
  const record = data?.iCard.record;
  const iCardId = data?.iCard.objectId || '';

  // const doneDate = data?.doneDate

  // const limitTimes = data?.iCard.limitTimes || ['00:00', '24:00'];
  // const before = moment(limitTimes[0], 'HH');
  // const after = moment(limitTimes[1], 'HH');
  // const now = moment(new Date());
  // const momentIn = moment(now).isBetween(before, after);
  const type = doneDateIso ? 2 : 0;
  const done = moment(0, 'HH').isBefore(data?.doneDate?.iso || '');
  // const [idoLoad, setIdoLoad] = useState(false);

  // useEffect(() => {
  //   if (!done && !loading) {
  //     //如果今日未打卡，则不需要等待 ido 加载完成
  //     setIdoLoad(false);
  //   }
  // }, [done, loading]);

  // 如果没有iDoid 怎查询今天的最新打卡。如果有，则修改打卡
  useEffect(() => {
    if (done && !iDoId) {
      // getClassesIDoId({ id: iDoId }).then(({ recordText, imgs }) => {
      //   // if ()
      //   recordText && setValue(RecordText, recordText)
      //   imgs && setValue(RecordImgs, imgs.map(url => ({ url })))
      // })
      const where = {
        user: userPoint(user?.objectId || ''),
        iUse: iUsePoint(iUseId),
        state: { $ne: -1 },
      };
      // setIdoLoad(true);
      getClassesIDo({
        limit: '1',
        order: '-createdAt',
        where: JSON.stringify(where),
      }).then((res) => {
        if (res.results[0]) {
          const data = res.results[0];
          const { recordText, imgs, objectId } = data;
          idRef.current = objectId;
          recordText && setValue(RecordText, recordText);
          imgs &&
            setValue(
              RecordImgs,
              imgs.map((url) => ({ url })),
            );
        }
        // setIdoLoad(false);
      });
      // .catch(() => [setIdoLoad(false)]);
    }
  }, [done, iDoId, iUseId, setValue, user?.objectId]);

  useEffect(() => {
    if (iDoId) {
      getClassesIDoId({ id: iDoId }).then((res) => {
        const { recordText, imgs } = res;
        recordText && setValue(RecordText, recordText);
        imgs &&
          setValue(
            RecordImgs,
            imgs.map((url) => ({ url })),
          );
      });
    }
  }, [iDoId, setValue]);

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (record?.includes('图片') && data[RecordImgs].length === 0) {
        return AlertWithTitle('该习惯打卡必须包含图片哦～!');
      }

      if (record?.includes('文字') && data[RecordText].length === 0) {
        return AlertWithTitle('该习惯打卡必须包含文字哦～!');
      }

      setLoad(true);
      const user = getUerInfo();

      try {
        console.log('data', data);

        // 判断为本地图片时候,则上传并被替换
        const recordImags = data[RecordImgs];
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
          setValue(RecordImgs, newImages);
        }

        const allParam = {
          imgs: imags.map((item) => item.remoteUrl),
          recordText: data[RecordText],
        };
        //上传图片

        const param1 = { id: idRef.current || '', ...allParam };
        const param2 = {
          user: point('_User', user?.objectId || ''),
          type: type, // 0 打卡,1日志,2:补打卡
          iCard: point('iCard', iCardId),
          iUse: point('iUse', iUseId),
          doneDate: {
            __type: 'Date',
            iso: doneDateIso || new Date().toISOString(),
          },
          ...allParam,
        };
        const { objectId, createdAt } = await (idRef.current
          ? putClassesIDoId(param1)
          : postClassesIDo(param2));

        if (objectId) {
          //发消息通知。
          DeviceEventEmitter.emit(DeviceEventEmitterKey.iDO_reload, {});
          update({
            objectId: iUseId,
            doneDate: { __type: 'Date', iso: moment(createdAt).toISOString() },
            time: time + 1,
          });
          goBack();
        }
      } catch (error) {
        SimpleToast.show(error.message);
      }
      setLoad(false);
    },
    [
      doneDateIso,
      goBack,
      iCardId,
      iUseId,
      record,
      setValue,
      time,
      type,
      update,
    ],
  );

  useEffect(() => {
    const keys = Object.keys(errors);

    if (keys && keys[0]) {
      const key = keys[0];
      AlertWithTitle(errors[key].message);
    }
  }, [errors]);

  useLayoutEffect(() => {
    if (iCardId) {
      setOptions({
        headerRight: (headerRightProps: { tintColor?: string }) => (
          <ButtonItem
            loading={load}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{ marginRight: 15 }}
            {...headerRightProps}
            onPress={handleSubmit(onSubmit)}>
            <StyledHeaderText>{'发布'}</StyledHeaderText>
          </ButtonItem>
        ),
      });
    }
  }, [load, iCardId, setOptions, handleSubmit, onSubmit]);
  const ref = useRef<React.Dispatch<React.SetStateAction<boolean>>>();
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
        <Controller
          // defaultValue=''
          autoFocus={Platform.OS === 'android'}
          name={RecordText}
          control={control}
          multiline
          placeholder={'记录每一天的改变～'}
          maxLength={5000}
          // onChangeText={text => setval}
          as={CustomMaskedInput}
        />

        <Controller
          openPickRef={ref}
          name={RecordImgs}
          control={control}
          // data={imgs}
          onPress={Keyboard.dismiss}
          countInrow={
            ori === 'PORTRAIT' || ori === 'PORTRAITUPSIDEDOWN' ? countInrow : 9
          }
          maxNumber={maxNumber}
          // onChange={onChangeImageArray}
          as={CustomImagePick}
        />
        <ToolBar
          onPress={(toolBartype) => {
            if (toolBartype === 'imagePick') {
              ref?.current?.call(undefined, true);
            }
          }}
          showImagePickTip={!!record?.includes('图片')}
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
