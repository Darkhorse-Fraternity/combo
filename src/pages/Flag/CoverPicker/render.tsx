/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { DeviceEventEmitterKey } from '@configure/enum';
import { RouteKey } from '@pages/interface';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { DeviceEventEmitter, ListRenderItem } from 'react-native';
import ImagePicker, { Options } from 'react-native-image-crop-picker';
import {
  StyledCoverPickcerBg,
  StyledCoverPickerBtnText,
  StyledLogo,
  StyledSafeAreaView,
  StyledNextBtn,
  StyledNextBtnText,
  StyledContent,
  StyledTitle,
  StyledList,
  StyledListItemImage,
  StyledListItemBtn,
  StyledCoverPickerBtn,
  StyledIcon,
  StyledDeleteBtn,
  StyledCloseImage,
} from './style';
const data = [
  'http://placekitten.com/g/800/450',
  'http://placekitten.com/g/800/450',
  'http://placekitten.com/g/800/450',
  'http://placekitten.com/g/800/450',
  'http://placekitten.com/g/800/450',
  'http://placekitten.com/g/800/450',
  'http://placekitten.com/g/800/450',
  'http://placekitten.com/g/800/450',
  'http://placekitten.com/g/800/450',
  'http://placekitten.com/g/800/450',
  'http://placekitten.com/g/800/450',
  'http://placekitten.com/g/800/450',
  'http://placekitten.com/g/800/450',
  'http://placekitten.com/g/800/450',
];

export const ImagePickerConfig: Options = {
  width: 1600,
  height: 900,
  cropping: true,
  hideBottomControls: true, //隐藏底部控制栏，andorid 特有
  showCropGuidelines: false,
  cropperToolbarTitle: '',
  cropperCancelText: '取消',
  cropperChooseText: '选择',
  sortOrder: 'desc',
  mediaType: 'photo',
  multiple: false,
};

const CoverPicher: FC<ImagePikerType> = ({ value, setValue }) => {
  return (
    <>
      <StyledTitle>上传本地图片</StyledTitle>
      {value && (
        <StyledDeleteBtn
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          onPress={() => {
            setValue(undefined);
          }}>
          <StyledCloseImage source={require('@img/flag/icon_close.png')} />
        </StyledDeleteBtn>
      )}
      <StyledCoverPickcerBg borderRadius={20} source={{ uri: value }}>
        {!value && (
          <>
            <StyledLogo source={require('@img/my/logo.png')} />
            <StyledCoverPickerBtn
              onPress={() => {
                ImagePicker.openPicker(ImagePickerConfig)
                  .then((res) => {
                    setValue(res.path);
                  })
                  .catch((e) => {
                    console.log('e', e.message);
                  });
              }}>
              <StyledIcon name="add" size={18} />
              <StyledCoverPickerBtnText>上传封面</StyledCoverPickerBtnText>
            </StyledCoverPickerBtn>
          </>
        )}
      </StyledCoverPickcerBg>
    </>
  );
};

const _keyExtractor = (_: string, index: number) => {
  // const id = item;

  // const key = id || index;
  return `${index}`;
};

const DeaultImages: FC<ImagePikerType> = ({ setValue }) => {
  const renderImagesItem: ListRenderItem<string> = ({ item, index }) => {
    return (
      <StyledListItemBtn
        onPress={() => {
          setValue(item);
        }}>
        <StyledListItemImage key={index} source={{ uri: item }} />
      </StyledListItemBtn>
    );
  };

  return (
    <>
      <StyledTitle>推荐图片</StyledTitle>
      <StyledList<string>
        numColumns={2}
        data={data}
        keyExtractor={_keyExtractor}
        key="a"
        renderItem={renderImagesItem}
      />
    </>
  );
};

interface ImagePikerType {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const CreatStepOn: FC<ImagePikerType> = (props) => {
  return (
    <StyledContent>
      <CoverPicher {...props} />
      <DeaultImages {...props} />
    </StyledContent>
  );
};

const FlagCoverPicker: FC<{}> = () => {
  const { url } = useNavigationAllParamsWithType<RouteKey.flagCoverPicker>();
  const { goBack } = useNavigation();
  const [value, setValue] = useState<string | undefined>(url);
  const onPress = () => {
    DeviceEventEmitter.emit(DeviceEventEmitterKey.flag_cover_picker, value);
    goBack();
  };
  return (
    <StyledSafeAreaView>
      <CreatStepOn value={value} setValue={setValue} />
      <StyledNextBtn onPress={onPress} disabled={!value}>
        <StyledNextBtnText disabled={!value}>保存</StyledNextBtnText>
      </StyledNextBtn>
    </StyledSafeAreaView>
  );
};

export default FlagCoverPicker;
