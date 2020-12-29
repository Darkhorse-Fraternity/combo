/* eslint-disable react-native/no-inline-styles */
import React, { FC, memo, useState } from 'react';
// import Button from 'components/Button';
import {
  ContentView,
  CommitBtn,
  StyledSubmit,
  StyledCellTopLine,
  StyledSplitView,
} from './style';
import Modal from 'react-native-modal';
import Button from '@components/Button';
import ImagePicker, {
  Image as CropImage,
  Options,
} from 'react-native-image-crop-picker';

export const ImagePickerConfig: Options = {
  width: 1000,
  height: 1000,
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

export type OnlyType = 'Camera' | 'Album';

export const selectCamera = (op?: Options) => {
  return ImagePicker.openCamera({ ...ImagePickerConfig, ...op });
};

export const selectAlbum = (op?: Options) => {
  return ImagePicker.openPicker({ ...ImagePickerConfig, ...op });
};

export interface PickViewProps extends InnerViewProps {
  isVisiable?: boolean;
}

export interface InnerViewProps {
  onSuccess: (img: CropImage | CropImage[]) => void;
  onClose?: () => void;
  option?: Options;
  onPick?: () => void;
  // only?: OnlyType;
}

const InnerView = (props: InnerViewProps) => {
  const [loading, setLoding] = useState(false);
  const { onSuccess, onClose, option, onPick } = props;

  if (loading) {
    return null;
  }

  return (
    <ContentView>
      <Button
        onPress={() => {
          // onSuccess(0);
          if (!onPick) {
            setLoding(true);
            selectCamera(option)
              .then((res) => {
                onSuccess(res);
                setLoding(false);
              })
              .catch(() => {
                setLoding(false);
              });
          } else {
            onPick();
          }
        }}>
        <StyledSubmit>
          <CommitBtn>拍照</CommitBtn>
        </StyledSubmit>
      </Button>
      <StyledCellTopLine />
      <Button
        onPress={() => {
          onPick && onPick();
          if (!onPick) {
            setLoding(true);
            selectAlbum(option)
              .then((res) => onSuccess(res))
              .catch(() => {
                setLoding(false);
              });
          } else {
            onPick();
          }
        }}>
        <StyledSubmit>
          <CommitBtn>从相册中选择</CommitBtn>
        </StyledSubmit>
      </Button>
      <StyledSplitView />
      <Button onPress={onClose}>
        <StyledSubmit>
          <CommitBtn color={'#848494'}>取消</CommitBtn>
        </StyledSubmit>
      </Button>
    </ContentView>
  );
};
const Render: FC<PickViewProps> = (props) => {
  const { isVisiable = false, onSuccess, onClose, option, ...other } = props;

  return (
    <Modal
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      useNativeDriver
      style={{
        justifyContent: 'flex-end',
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
      }}
      isVisible={isVisiable}>
      <InnerView
        onSuccess={onSuccess}
        onClose={onClose}
        option={option}
        {...other}
      />
    </Modal>
  );
};

const PhotoOrCameraSheet = memo(Render);
export default PhotoOrCameraSheet;
