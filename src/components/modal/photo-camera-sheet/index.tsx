/* eslint-disable react-native/no-inline-styles */
import React, { useState, memo, useRef, useCallback } from 'react';
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
import ImagePicker, { Image as CropImage, Options } from 'react-native-image-crop-picker';

const ImagePickerConfig: Options = {
  width: 500,
  height: 500,
  cropping: true,
  hideBottomControls: true, //隐藏底部控制栏，andorid 特有
  showCropGuidelines: false,
  cropperToolbarTitle: '',
  cropperCancelText: '取消',
  cropperChooseText: '选择',
  sortOrder: 'desc',
  mediaType: 'photo',
  multiple: false,
}

const selectCamera = () => {
  return ImagePicker.openCamera(ImagePickerConfig);
};


const selectAlbum = () => {
  return ImagePicker.openPicker(ImagePickerConfig);
};

export interface PickViewProps extends InnerViewProps {
  isVisiable?: boolean;
}

export interface InnerViewProps {
  onSuccess: (img: CropImage) => void;
  onClose: () => void;
}

const InnerView = (props: InnerViewProps) => {
  const { onSuccess, onClose } = props;

  return (
    <ContentView>
      <Button
        onPress={() => {
          // onSuccess(0);

          selectCamera().then(res => onSuccess(res));
          //  onSuccess()
        }}>
        <StyledSubmit>
          <CommitBtn>拍照</CommitBtn>
        </StyledSubmit>
      </Button>
      <StyledCellTopLine />
      <Button
        onPress={() => {
          selectAlbum().then(res => onSuccess(res));
        }}>
        <StyledSubmit>
          <CommitBtn>从相册中选择</CommitBtn>
        </StyledSubmit>
      </Button>
      <StyledSplitView />
      <Button
        onPress={() => {
          onClose();
        }}>
        <StyledSubmit>
          <CommitBtn color={'#848494'}>取消</CommitBtn>
        </StyledSubmit>
      </Button>
    </ContentView>
  );
};
const Render = (props: PickViewProps) => {
  const { isVisiable = false, onSuccess, onClose } = props;

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
      <InnerView onSuccess={onSuccess} onClose={onClose} />
    </Modal>
  );
};

const PhotoOrCameraSheet = memo(Render)
export default PhotoOrCameraSheet;
