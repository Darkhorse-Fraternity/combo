import React, { useState, useRef, memo, FC } from 'react';
import { GestureResponderEvent, LayoutAnimation, View, ViewProps } from 'react-native';
import {
  StyledMainView,
  StyledListItemV,
  StyledCoverImage,
  StyledDelImage,
  StyledDelImageBtn,
  StyledCoverBtn,
  StyledCoverImageBg,
  StyledCoverAddImage,
  StyledCoverAddTitle,
} from './style';

// import ImagesViewModals from '../ImagesViewModal/ImagesViewModal';
import ImagePicker, {
  Image as PickerImage,
} from 'react-native-image-crop-picker';
// import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import ImagesViewModals from '@components/ZoomImage/ImagesViewModal';

export interface UpdateImage {
  url: string
}

export interface UpdateImageViewType extends Omit<ViewProps, 'children'> {
  countInrow: number;
  maxNumber: number;
  backgroundColor?: string;
  onChange?: (imageArray: UpdateImage[]) => void;
  onPress?: () => void;
  value?: UpdateImage[];
}
interface ImagesListType extends UpdateImageViewType {
  deleteImage: (event: GestureResponderEvent, index: number) => void;
  showImage: (event: GestureResponderEvent, index: number) => void;
  addImage: (event: GestureResponderEvent, index: number) => void;
}

export const pickerImage = async (maxFiles: number): Promise<UpdateImage[] | null> => {
  const image = await ImagePicker.openPicker({
    maxFiles: maxFiles,
    multiple: true,
    cropping: false,
    compressImageMaxWidth: 500,
    hideBottomControls: true, //隐藏底部控制栏，andorid 特有
    showCropGuidelines: false,
    cropperToolbarTitle: '',
    mediaType: 'photo'
  });

  if (!image) {
    return null;
  }
  if (Array.isArray(image)) {
    return image.map((obj) => ({ url: obj.path }));
  } else {
    return [{
      url: (image as PickerImage).path,
    }];
  }
}

export const ImagesList = ({
  maxNumber,
  countInrow,
  value,
  deleteImage,
  showImage,
  addImage,
  backgroundColor,
  ...other
}: ImagesListType) => {
  return (
    <StyledMainView backgroundColor={backgroundColor || 'transparent'} {...other} >
      {value &&
        value.map((item, index) => {
          if (item.url) {
            return (
              <StyledCoverBtn
                key={item.url}
                // activeOpacity={1}
                onPress={(event) => showImage(event, index)}>
                <StyledListItemV index={index} countInrow={countInrow}>
                  <StyledCoverImage
                    source={{
                      uri: item.url,
                    }}>
                    <StyledDelImageBtn
                      onPress={(event) => deleteImage(event, index)}>
                      <StyledDelImage
                        source={require('./images/liveVideo_delImage.png')}
                      />
                    </StyledDelImageBtn>
                  </StyledCoverImage>
                </StyledListItemV>
              </StyledCoverBtn>
            );
          }
        })}
      {value && value.length < maxNumber && (
        <StyledCoverBtn
          // activeOpacity={1}
          onPress={(event) => addImage(event, value.length)}>
          <StyledListItemV index={value.length} countInrow={countInrow}>
            <StyledCoverImageBg>
              <StyledCoverAddImage source={require('./images/addImage.png')} />
              <StyledCoverAddTitle>上传图片</StyledCoverAddTitle>
            </StyledCoverImageBg>
          </StyledListItemV>
        </StyledCoverBtn>
      )}
    </StyledMainView>
  );
};

const UpdateImageView: FC<UpdateImageViewType> = ({
  maxNumber = 9,
  onChange,
  onPress,
  value = [],
  ...other
}) => {

  // const [imagesData, setImagesData] = useState<IImageInfo[]>([]);

  const [imageViewShow, setImageViewShow] = useState(false);

  const selectIndex = useRef(0);
  const deleteImage = (event: GestureResponderEvent, index: number) => {
    const array = [...value];

    array.splice(index, 1);

    // setImagesData(array);
    if (onChange) {
      if (array.length >= 0) {
        // let imageArray: UpdateImage[] = [];
        // array.map((item) => {
        //   imageArray.push({url:item.});
        // });
        onChange(array);
      }
    }
  };
  const showImage = (event: GestureResponderEvent, index: number) => {
    selectIndex.current = index;
    setImageViewShow(true);
  };

  const addImage = async (event: GestureResponderEvent, index: number) => {
    const imageCount = maxNumber - index;
    if (imageCount < 1) {
      return;
    }
    onPress && onPress();
    // const imagesDataArray = [...data];
    const image = await pickerImage(imageCount);


    LayoutAnimation.spring();
    // setImagesData(imagesDataArray);
    if (onChange && image && image.length > 0) {
      // let imageArray: string[] = [];
      // imagesDataArray.map((item: IImageInfo) => {
      //   imageArray.push(item.url);
      // });
      onChange([...value, ...image]);
    }
  };
  return (
    <>
      <ImagesViewModals
        visible={imageViewShow}
        imageUrls={value}
        closeCallBack={() => {
          setImageViewShow(false);
        }}
        index={selectIndex.current}
      />
      <ImagesList
        value={value}
        deleteImage={deleteImage}
        showImage={showImage}
        addImage={addImage}
        maxNumber={maxNumber}
        {...other}
      />
    </>
  );
};
const MemoUpdateImageView = memo(UpdateImageView);
export default MemoUpdateImageView;
