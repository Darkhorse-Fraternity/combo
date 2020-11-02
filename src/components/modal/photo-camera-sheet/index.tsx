/* eslint-disable react-native/no-inline-styles */
import React, { FC, memo, useEffect, useRef } from 'react';
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

const ImagePickerConfig: Options = {
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

const selectCamera = (op?: Options) => {
  return ImagePicker.openCamera({ ...ImagePickerConfig, ...op });
};

const selectAlbum = (op?: Options) => {
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
}

const InnerView = (props: InnerViewProps) => {
  const { onSuccess, onClose, option, onPick } = props;

  const ref = useRef<NodeJS.Timeout>();
  useEffect(() => {
    return () => {
      ref.current && clearTimeout(ref.current);
    };
  }, []);

  return (
    <ContentView>
      <Button
        onPress={() => {
          // onSuccess(0);
          if (!onPick) {
            selectCamera(option)
              .then((res) => {
                onSuccess(res);
              })
              .catch((e) => {});
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
            selectAlbum(option)
              .then((res) => onSuccess(res))
              .catch((e) => {});
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
  const { isVisiable = false, onSuccess, onClose, ...other } = props;

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
      <InnerView onSuccess={onSuccess} onClose={onClose} {...other} />
    </Modal>
  );
};

const PhotoOrCameraSheet = memo(Render);
export default PhotoOrCameraSheet;