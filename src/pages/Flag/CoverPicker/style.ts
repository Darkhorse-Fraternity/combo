/*
 * @Author: tonyYo
 * @Date: 2020-12-25 10:04:27
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-25 15:44:08
 * @FilePath: /Combo/src/pages/Flag/CoverPicker/style.ts
 */
/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import styled from 'styled-components/native';
import { FlatList, SafeAreaView } from 'react-native';
import Button from '@components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
export const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

export const StyledContent = styled.View`
  flex: 1;
`;

export const StyledCoverPickcerBg = styled.ImageBackground`
  padding: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.backViewPrimary};
  margin: 20px;
  align-items: center;
  height: 188px;
  justify-content: center;
`;

export const StyledLogo = styled.Image`
  width: 48px;
  height: 48px;
  ${({ theme }) => theme.colors.backViewPrimary};
`;

export const StyledCoverPickerBtn = styled(Button)`
  background-color: #65bb6a;
  border-radius: 4px;
  height: 32px;
  width: 88px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  flex-direction: row;
  align-items: center;
`;

export const StyledCoverPickerBtnText = styled.Text`
  color: white;
  font-size: 14px;
`;

export const StyledNextBtn = styled(Button)<{ disabled: boolean }>`
  background-color: ${({ disabled }) => (disabled ? '#b1d5a7' : '#65bb6a')};
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

export const StyledTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 12px;
`;

// export const StyledList = styled.FlatList`` as React.ReactNode) as new <T>() => FlatList<T>;

export const StyledList = (styled.FlatList`
  margin: 20px 20px;
` as React.ReactNode) as new <T>() => FlatList<T>;

export const StyledListItemImage = styled.Image`
  width: ${({ theme }) => (theme.width - 50) / 2};
  height: ${({ theme }) => ((theme.width - 50) / 2 / 16) * 9};
  margin-bottom: 5px;
  margin-right: 5px;
  /* margin-left: 20px; */
  border-radius: 4px;
`;

export const StyledListItemBtn = styled(Button)``;

export const StyledIcon = styled(Icon)`
  color: white;
  /* font-weight: bold; */
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
  top: 38px;
  position: absolute;
  z-index: 100;
`;

export const StyledCloseImage = styled.Image``;
