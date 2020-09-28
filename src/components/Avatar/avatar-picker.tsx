import React, { FC } from 'react';
import Avatar, { AvatarProps } from './avatar-fc';
import {
  StyledCaramerBackView,
  StyledContent,
  StyledHeaderRow,
  StyledIcon,
  StyledIndicator
} from './style'
interface AvatarPickerType extends AvatarProps {
  load: boolean,
  upload: (uri: string) => void
}

export const AvatarPicker: FC<AvatarPickerType> = (props) => {
  const { load = false, upload, radius = 80, ...other } = props;
  return (
    <StyledHeaderRow onPress={() => {

    }}>
      <StyledContent radius={radius}>
        {load ? <StyledIndicator radius={radius} /> :
          <Avatar radius={radius} {...other} />}
      </StyledContent>
      <StyledCaramerBackView>
        <StyledIcon color="white" size={15} name="camera" />
      </StyledCaramerBackView>
    </StyledHeaderRow>
  )
}