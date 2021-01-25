/*
 * @Author: tonyYo
 * @Date: 2020-12-25 10:04:27
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-25 14:15:40
 * @FilePath: /Combo/src/pages/Record/Detail/style.ts
 */
/**
 * Created by lintong on 2018/9/25.
 * @flow
 */
'use strict';

import styled from 'styled-components/native';
import HeaderBtn from '@components/Button/HeaderBtn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Platform, SafeAreaView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

export const Styledcontain = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.card};
  /* background-color: white; */
`;

export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
  max-width: 200px;
  margin-left: 20px;
  margin: 10px 20px 20px 20px;
  /* background-color: white; */
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledIonicons = styled(Ionicons)``;

export const StyledAntDesign = styled(AntDesign)``;

export const StyledHeaderBtn = styled(HeaderBtn)``;
export const StyledHeaderButtonText = styled.Text``;

export const StyledIcon = styled(Feather)`
  align-self: center;
`;

export const StyledDeleteBtn = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const StyledDeleteBtnText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  margin: ${Platform.OS === 'ios' ? 5 : 3}px;
  font-size: 13px;
  font-weight: 300;
`;

export const StyledHeaderText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 13px;
`;
