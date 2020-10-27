import PhotoOrCameraSheet from '@components/modal/photo-camera-sheet';
import React, { FC, useState } from 'react';
import Avatar, { AvatarProps } from './avatar-fc';
import {
  StyledCaramerBackView,
  StyledContent,
  StyledHeaderRow,
  StyledIcon,
  StyledIndicator,
} from './style';
interface AvatarPickerType extends AvatarProps {
  load: boolean;
  upload: (uri: string) => void;
}

export const AvatarPicker: FC<AvatarPickerType> = (props) => {
  const { load = false, upload, radius = 80, ...other } = props;
  const [state, setstate] = useState(false);

  const onSuccess = ({ path }: { path: string }) => {
    upload(path);
    setstate(false);
  };

  return (
    <>
      <StyledHeaderRow disabled={load} onPress={setstate.bind(undefined, true)}>
        <StyledContent radius={radius}>
          {load ? (
            <StyledIndicator radius={radius / 2} />
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
