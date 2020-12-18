import PhotoOrCameraSheet from '@components/modal/photo-camera-sheet';
import React, { FC, useState } from 'react';
import Avatar, { AvatarProps } from './avatar-fc';
import { Image as CropImage } from 'react-native-image-crop-picker';
import {
  StyledCaramerBackView,
  StyledContent,
  StyledContentInner,
  StyledHeaderRow,
  StyledIcon,
} from './style';
import Indicators from '@components/Indicators';
interface AvatarPickerType extends AvatarProps {
  load: boolean;
  upload: (uri: string) => void;
}

export const AvatarPicker: FC<AvatarPickerType> = (props) => {
  const { load = false, upload, radius = 80, ...other } = props;
  const [state, setstate] = useState(false);

  const onSuccess = (img: CropImage | CropImage[]) => {
    if (!Array.isArray(img)) {
      upload(img.path);
      setstate(false);
    }
  };

  return (
    <>
      <StyledHeaderRow disabled={load} onPress={setstate.bind(undefined, true)}>
        <StyledContent
          radius={radius}
          style={{
            width: radius,
            height: radius,
          }}>
          {load ? (
            // <StyledIndicator radius={radius / 2} />
            <StyledContentInner>
              <Indicators size={radius / 3} />
            </StyledContentInner>
          ) : (
            <Avatar radius={radius} {...other} />
          )}
        </StyledContent>
        <StyledCaramerBackView>
          <StyledIcon color="white" size={15} name="camera" />
        </StyledCaramerBackView>
      </StyledHeaderRow>
      <PhotoOrCameraSheet
        onClose={setstate.bind(undefined, false)}
        onSuccess={onSuccess}
        isVisiable={state}
      />
    </>
  );
};
