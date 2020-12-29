import React, { useState, useRef, memo, FC, useMemo } from 'react';
import {
  GestureResponderEvent,
  LayoutAnimation,
  useWindowDimensions,
  ViewProps,
} from 'react-native';
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
import { Image as PickerImage } from 'react-native-image-crop-picker';
// import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import ImagesViewModals from '@components/ZoomImage/ImagesViewModal';
import PhotoOrCameraSheet, {
  OnlyType,
  selectAlbum,
  selectCamera,
} from '@components/modal/photo-camera-sheet';
export interface UpdateImage {
  url: string;
}

export interface UpdateImageViewType extends Omit<ViewProps, 'children'> {
  countInrow: number;
  maxNumber: number;
  backgroundColor?: string;
  onChange?: (imageArray: UpdateImage[]) => void;
  onPress?: () => void;
  value?: UpdateImage[];
  openPickRef?: React.MutableRefObject<
    React.Dispatch<React.SetStateAction<boolean>> | undefined
  >;
  openDirectlyRef?: React.MutableRefObject<(() => void) | undefined>;
  only?: OnlyType;
  hide?: boolean;
}
interface ImagesListType extends UpdateImageViewType {
  deleteImage: (event: GestureResponderEvent, index: number) => void;
  showImage: (event: GestureResponderEvent, index: number) => void;
  addImage: (event: GestureResponderEvent) => void;
}

// export const pickerImage = async (
//   maxFiles: number,
// ): Promise<UpdateImage[] | null> => {
//   const image = await ImagePicker.openPicker({
//     maxFiles: maxFiles,
//     showsSelectedCount: true,
//     multiple: true,
//     cropping: false,
//     compressImageMaxWidth: 500,
//     hideBottomControls: true, //隐藏底部控制栏，andorid 特有
//     showCropGuidelines: false,
//     cropperToolbarTitle: '',
//     mediaType: 'photo',
//     sortOrder: 'desc',
//     cropperCancelText: '取消',
//     cropperChooseText: '选择',
//   });

//   if (!image) {
//     return null;
//   }
//   if (Array.isArray(image)) {
//     return image.map((obj) => ({ url: obj.path }));
//   } else {
//     return [
//       {
//         url: (image as PickerImage).path,
//       },
//     ];
//   }
// };

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
  // console.log('countInrow', countInrow);
  // console.log('width', Dimensions.get('window').width);

  const window = useWindowDimensions();

  return (
    // @ts-ignore: Unreachable code error
    <StyledMainView
      backgroundColor={backgroundColor || 'transparent'}
      {...other}>
      {value &&
        value.map((item, index) => {
          if (item.url) {
            return (
              <StyledCoverBtn
                key={item.url}
                // activeOpacity={1}
                onPress={(event) => showImage(event, index)}>
                <StyledListItemV
                  width={window.width}
                  index={index}
                  countInrow={countInrow}>
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
          return undefined;
        })}
      {value && value.length < maxNumber && (
        <StyledCoverBtn
          // activeOpacity={1}
          onPress={(event) => addImage(event)}>
          <StyledListItemV
            width={window.width}
            index={value.length}
            countInrow={countInrow}>
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
  openPickRef,
  hide = false,
  openDirectlyRef,
  only,
  ...other
}) => {
  const [state, setstate] = useState(false);
  const [imageViewShow, setImageViewShow] = useState(false);

  if (openPickRef) {
    openPickRef.current = setstate;
  }

  const selectIndex = useRef(0);
  const deleteImage = (_: GestureResponderEvent, index: number) => {
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
  const showImage = (_: GestureResponderEvent, index: number) => {
    selectIndex.current = index;
    setImageViewShow(true);
  };

  const onSuccess = (data: PickerImage | PickerImage[]) => {
    // upload(path);
    const image = Array.isArray(data) ? data : [data];
    LayoutAnimation.spring();
    if (onChange && image && image.length > 0) {
      // let imageArray: string[] = [];
      // imagesDataArray.map((item: IImageInfo) => {
      //   imageArray.push(item.url);
      // });
      setstate(false);
      // const imgs = [...value, ...image.map((item) => ({ url: item.path }))];
      //去重
      const imgs = [
        ...value.map((item) => item.url),
        ...image.map((item) => item.path),
      ];
      onChange([...new Set(imgs)].map((item) => ({ url: item })));
    }
  };

  const onClose = setstate.bind(undefined, false);
  const imageCount = maxNumber - value.length;
  const option = useMemo(() => {
    return {
      multiple: true,
      maxFiles: imageCount,
      showsSelectedCount: true,
      cropping: false,
    };
  }, [imageCount]);

  const pickerOnly = () => {
    const picker = only === 'Camera' ? selectCamera : selectAlbum;
    picker(option)
      .then(onSuccess)
      .catch((_) => {});
  };

  if (openDirectlyRef) {
    openDirectlyRef.current = pickerOnly;
  }

  const addImage = async () => {
    onPress && onPress();
    if (imageCount < 1) {
      return;
    }
    !only ? setstate(true) : pickerOnly();
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
      {!hide && (
        <ImagesList
          value={value}
          deleteImage={deleteImage}
          showImage={showImage}
          addImage={addImage}
          maxNumber={maxNumber}
          {...other}
        />
      )}
      <PhotoOrCameraSheet
        option={option}
        // onPick={onClose}
        onClose={onClose}
        onSuccess={onSuccess}
        isVisiable={state}
      />
    </>
  );
};
const MemoUpdateImageView = memo(UpdateImageView);
export default MemoUpdateImageView;
