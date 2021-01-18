/*
 * @Author: tonyYo
 * @Date: 2020-12-25 10:04:27
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-15 10:42:00
 * @FilePath: /Combo/src/pages/Flag/Creat/style.ts
 */
/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import Button from '@components/Button';

export const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

export const StyledContent = styled.ScrollView`
  flex: 1;
`;

export const StyledTop = styled.View``;

export const StyledCoverPickcerBg = styled.ImageBackground`
  padding: 20px;
  border-radius: 20px;
  background-color: #edf2f8;
  margin: 20px;
  align-items: center;
  height: 188px;
  justify-content: center;
`;

export const StyledLogo = styled.Image`
  width: 48px;
  height: 48px;
`;

export const StyledCoverPickerBtn = styled(Button)`
  background-color: #65bb6a;
  border-radius: 4px;
  height: 32px;
  width: 88px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const StyledCoverPickerBtnText = styled.Text`
  color: white;
  font-size: 14px;
`;

export const StyledTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 12px;
`;

export const StyledTitleInput = styled.TextInput`
  margin: 15px 20px 0px;
  font-size: 14px;
  padding: 0px;
`;

export const StyledDiscribInput = styled.TextInput`
  padding: 0px;
  flex: 1;
  font-size: 14px;
`;

export const StyledDiscribInputBg = styled.View`
  margin: 15px 20px;
  border-radius: 4px;
  border-width: ${({ theme }) => theme.hairlineWidth * 2};
  border-color: ${({ theme }) => theme.colors.hairlineColor};
  padding: 10px;
  height: 120px;
`;

export const StyledTitleTip = styled.Text`
  font-weight: 300;
  font-size: 14px;
`;

export const StyledLine = styled.View`
  background-color: ${({ theme }) => theme.colors.hairlineColor};
  height: ${({ theme }) => theme.hairlineWidth * 2};
  margin: 10px 20px 10px 20px;
`;

export const StyledSpace = styled.View`
  flex: 1;
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

export const StyledDeleteBtn = styled(Button)`
  /* background-color: #ff3232;
  width: 20.8px;
  height: 20.8px;
  border-radius: 10.4px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #ffffff; */
  right: 5px;
  top: 8px;
  position: absolute;
  z-index: 100;
`;

export const StyledCloseImage = styled.Image``;
