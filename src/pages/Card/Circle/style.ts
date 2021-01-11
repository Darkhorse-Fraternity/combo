/*
 * @Author: tonyYo
 * @Date: 2021-01-06 16:44:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-11 11:16:33
 * @FilePath: /Combo/src/pages/Card/Circle/style.ts
 */
/**
 * Created by lintong on 2018/7/12.
 * @flow
 */

import styled from 'styled-components/native';
// import Button from '../../../components/Button'
import Button from '@components/Button';
import NativeUnifiedADView from '@components/GDTNativeUnifiedAD';
import { Platform } from 'react-native';

export const StyledContent = styled.ScrollView`
  flex: 1;
  /* background-color: white; */
`;

export const StyledRow = styled(Button)``;

export const StyledHeader = styled.View`
  padding: 0px 10px 10px 10px;
  /* background-color: white; */
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom-width: ${(props) => props.theme.hairlineWidth};
  border-bottom-color: ${(props) => props.theme.colors.hairlineColor};
`;

export const StyledTitleView = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
  margin-left: 10px;
`;

export const StyledHeaderButton = styled(Button)`
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
  align-items: center;
`;

export const StyledHeaderImage = styled.Image`
  width: 30px;
  height: 30px;
`;

export const StyledHeaderText = styled.Text`
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

const imageRate = 16 / 9.0;
export const StyledNativeUnifiedADView = styled(NativeUnifiedADView)`
  margin-top: ${Platform.OS === 'ios' ? 20 : 0}px;
  width: 100%;
  height: ${(props) => (props.theme.width * 0.65) / imageRate + 114};
`;

export const StyledTipView = styled.View`
  width: 90%;
  height: 20px;
  margin-left: 10px;
  background-color: #ebd46a;
  justify-content: center;
  border-radius: 5px;
`;

export const StyledTipText = styled.Text`
  color: yellow;
  font-size: 12px;
  margin-left: 5px;
  font-weight: bold;
`;
