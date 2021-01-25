/*
 * @Author: tonyYo
 * @Date: 2021-01-06 16:44:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-25 14:15:50
 * @FilePath: /Combo/src/pages/Record/style.ts
 */
/**
 * Created by lintong on 2018/9/25.
 * @flow
 */
'use strict';

import styled from 'styled-components/native';
import HeaderBtn from '../../components/Button/HeaderBtn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Platform } from 'react-native';
import AnimationRow from '@components/AnimationRow';

export const StyledAnimationRow = styled(AnimationRow)`
  /* flex: 1; */
  /* height: 80px; */
`;

export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
  max-width: 200px;
  margin-left: 20px;
  margin: 10px 20px 20px 20px;
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
  margin: ${() => (Platform.OS === 'ios' ? 5 : 3)}px;
  font-size: 13px;
  font-weight: 300;
`;
