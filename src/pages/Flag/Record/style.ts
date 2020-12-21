/**
 * Created by lintong on 2019/1/24.
 * @flow
 */
'use strict';

import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import { Platform } from 'react-native';
import Button from '../../../components/Button';

export const StyledContent = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.card};
`;

export const StyledHeader = styled.View`
  padding: 20px 20px 24px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
`;

export const StyledItem = styled(Button)`
  padding: 20px 20px 20px 20px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const StyledCellInner = styled.View``;

export const StyledCellTitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.colors.text};
`;

export const StyledCellDiscrib = styled.Text`
  margin-top: ${Platform.OS === 'ios' ? 5 : 2};
  color: #888888;
  font-size: 15px;
  font-style: italic;
`;

export const StyledArrow = styled.View`
  border-bottom-width: ${(props) => props.theme.hairlineWidth * 2};
  border-right-width: ${(props) => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
`;
