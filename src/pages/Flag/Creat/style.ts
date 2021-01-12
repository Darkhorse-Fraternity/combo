/*
 * @Author: tonyYo
 * @Date: 2020-12-25 10:04:27
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-12 14:14:38
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

export const StyledCoverPickcerBg = styled.View`
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
  margin-top: 15px;
`;

export const StyledCoverPickerBtnText = styled.Text`
  color: white;
  font-size: 14px;
`;
