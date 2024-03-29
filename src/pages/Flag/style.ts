/*
 * @Author: tonyYo
 * @Date: 2021-01-07 10:35:57
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-26 09:35:36
 * @FilePath: /Combo/src/pages/Flag/style.ts
 */
/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ButtonItem } from '../../components/Button';

export const StyledContent = styled(SafeAreaView)`
  flex: 1;
`;

export const StyledHeader = styled.View`
  padding: 10px 20px 24px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledItem = styled(ButtonItem)`
  margin: 10px 20px 10px 20px;
  shadow-opacity: 0.7;
  shadow-radius: 5px;
  shadow-color: #979797;
  shadow-offset: 0px 3px;
`;

export const StyledItemImage = styled(FastImage)<{
  numColumns: number;
  width: number;
}>`
  width: ${(props) => props.width / props.numColumns - 40};
  aspect-ratio: 1.5;
  border-radius: 20px;
  align-self: center;
  background-color: #afcccb;
  elevation: 5;
`;
export const StyledItemCover = styled.View<{ position: string }>`
  position: absolute;
  elevation: 6;
  padding: 20px;
  ${(props) => props.position}: ${(props) =>
    props.position === 'top' ? 20 : 5}px;
`;

export const StyledItemTitle = styled.Text<{ color: string }>`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.color};
`;

export const StyledItemText = styled.Text<{ color: string }>`
  font-size: 15px;
  color: ${(props) => props.color};
  font-weight: 500;
  margin-top: 5px;
`;
