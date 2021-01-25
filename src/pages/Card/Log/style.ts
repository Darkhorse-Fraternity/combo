/*
 * @Author: tonyYo
 * @Date: 2021-01-06 16:44:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-25 14:16:20
 * @FilePath: /Combo/src/pages/Card/Log/style.ts
 */
/**
 * Created by lintong on 2018/3/6.
 * @flow
 */

import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import HeaderBtn from '../../../components/Button/HeaderBtn';
import { ButtonOpacity } from '@components/Button';

export const StyledContent = styled.View`
  flex: 1;
`;

export const StyledInner = styled.ScrollView``;

export const StyledAgendaRow = styled.View`
  margin-top: 20px;
  border-radius: 6px;
  padding: 10px;
  background-color: white;
`;

export const StyledTitleView = styled.View`
  padding: 25px 20px 5px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
`;

export const StyledHeaderBtn = styled(HeaderBtn)<{ backgroundColor?: string }>`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.sureColor};
`;

export const StyledRow = styled.View`
  padding: 15px 20px;
  flex-direction: row;
`;

// export const StyledRowText = styled.Text`
//   font-size: 15px;
//   color: ${({ theme }) => theme.colors.text};
//   font-style: italic;
// `;

export const StyledIonicons = styled(Feather)`
  align-self: center;
`;

export const StyledLogButton = styled(ButtonOpacity)<{ color: string }>`
  align-self: center;
  background-color: ${(props) => props.color || 'yellow'};
  margin-top: 50px;
  border-radius: 10px;
`;

// export const StyledLogButtonText = styled.Text`
//   margin: 10px 20px;
// `;
