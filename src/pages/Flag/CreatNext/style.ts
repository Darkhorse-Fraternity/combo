/*
 * @Author: tonyYo
 * @Date: 2020-12-25 10:04:27
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-25 15:47:40
 * @FilePath: /Combo/src/pages/Flag/CreatNext/style.ts
 */
/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import Button from '@components/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

export const StyledContent = styled.ScrollView`
  flex: 1;
`;

export const StyledMenuItem = styled(Button)`
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
`;

export const StyledMenuItemTitle = styled.Text`
  /* color: #020203; */
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const StyledMenuItemDiscribPlacehold = styled.Text`
  color: #9b9c9e;
  font-size: 14px;
`;

export const StyledMenuItemDiscrib = styled.Text<{ isImportant?: boolean }>`
  color: ${({ isImportant, theme }) =>
    !isImportant ? theme.colors.text : '#EF9340'};
  font-size: 14px;
  font-weight: bold;
`;

export const StyledLine = styled.View`
  height: ${(props) => props.theme.hairlineWidth * 2};
  background-color: ${(props) => props.theme.colors.hairlineColor};
  margin: 0px 20px;
`;

export const StyledMenuItemArrow = styled.View`
  border-bottom-width: ${(props) => props.theme.hairlineWidth * 3};
  border-right-width: ${(props) => props.theme.hairlineWidth * 3};
  border-color: ${(props) => props.theme.colors.textPrimary};
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
  margin-left: 6px;
`;
export const StyledRightView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledNextBtn = styled(Button)<{ disabled: boolean }>`
  background-color: ${({ disabled }) => (disabled ? '#eef2f8' : '#65bb6a')};
  border-radius: 4px;

  height: 44px;
  align-items: center;
  justify-content: center;
  /* margin-top: 10px; */
  align-self: center;
  width: ${({ theme }) => theme.width - 30};
  max-width: 375px;
  margin-bottom: 20px;
  /* z-index: 100px;
  position: absolute;
  bottom: 50px; */
`;

export const StyledNextBtnText = styled.Text<{ disabled: boolean }>`
  color: ${({ disabled }) => (disabled ? 'grey' : 'white')};
  font-size: 14px;
`;

export const StyledSpace = styled.View`
  flex: 1;
`;

export const StyledTop = styled.View`
  /* flex: 1; */
  align-items: center;
`;

export const StyledTopInfo = styled.View`
  /* flex: 1; */
`;
export const StyledTopInfoItem = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;
export const StyledTopInfoItemTitle = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const StyledTopInfoItemDiscrib = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const StyledTopButton = styled(Button)`
  padding: 10px 20px;
  border-radius: 20px;
  border-width: ${({ theme }) => theme.hairlineWidth};
  border-color: green;
  margin: 20px;
`;

interface StyledIconBGType {
  color: string;
}

export const StyledIconBG = styled.View<StyledIconBGType>`
  height: 62px;
  width: 62px;
  background-color: ${(props) => props.color};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  shadow-opacity: 0.6;
  shadow-radius: 3px;
  shadow-color: ${(props) => props.color};
  shadow-offset: 2px 2px;
`;

interface StyledIconImageType {
  size: number;
}

export const StyledIconImage = styled.Image<StyledIconImageType>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export const StyledIcon = styled(FontAwesome)`
  align-self: center;
  margin-left: 5px;

  color: ${({ theme }) => theme.colors.text};
`;

export const StyledTitle = styled.Text`
  font-size: 15px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 5px;
`;

export const StyledTip = styled.Text`
  color: green;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 13px;
`;

export const StyledErrorsView = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: -15px;
`;
