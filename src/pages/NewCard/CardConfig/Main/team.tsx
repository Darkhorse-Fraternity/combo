import React, { FC } from 'react';
import { Platform } from 'react-native';
// import {StyledContent} from './style';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { shadeBlend } from '@helps/util';
import { CircleState } from '@configure/enum';
interface RenderSoundsType {
  color: string;
  onChange?: (value: number) => void;
  value?: number;
}

export const RenderCardState: FC<RenderSoundsType> = ({
  color,
  onChange,
  value,
}) => {
  const propsColor = Platform.select({
    ios: { trackColor: { false: color, true: color } },
    android: {
      thumbColor: value === CircleState.open ? color : '#f6f7f9',
      trackColor: {
        true: shadeBlend(0.75, color),
        false: shadeBlend(0.75, color),
      },
    },
  });

  return (
    <StyledSubTitle>
      <StyledRowInner>
        <StyledIcon size={20} name="user-friends" />
        <StyledSubTitleText>开启小组</StyledSubTitleText>
      </StyledRowInner>
      <StyledSwitch
        {...propsColor}
        value={value === CircleState.open}
        onValueChange={(open) => {
          onChange && onChange(open ? CircleState.open : CircleState.close);
        }}
      />
    </StyledSubTitle>
  );
};

export const StyledContent = styled.View`
  flex: 1;
`;

export const StyledSoundMain = styled.View`
  flex-direction: row;
  padding: 10px 20px 0px 20px;
`;

export const StyledSubTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.titleBackViewColor};
  border-radius: 10px;
  padding: 10px 8px;
  margin: 10px 20px 0px 20px;
`;
export const StyledRowInner = styled.View`
  flex-direction: row;
  align-items: center;
`;
// export const StyledIcon = styled(Icon)`
//   align-self: center;
// `;

export const StyledSubTitleText = styled.Text`
  font-size: 17px;
  margin-left: 10px;
  color: ${(props) => props.theme.colors.text};
`;

export const StyledIcon = styled(Icon)`
  color: ${(props) => props.theme.colors.text};
`;

export const StyledSwitch = styled.Switch``;

export const StyledSubTitle2 = styled.Text`
  font-size: 15px;
  margin: 20px 0px 0px 5px;
  padding: 5px 20px;
  color: ${(props) => props.theme.colors.text};
`;
