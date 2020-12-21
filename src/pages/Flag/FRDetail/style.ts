/**
 * Created by lintong on 2019/1/24.
 * @flow
 */

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

export const StyledCellName = styled.Text`
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-left: 10px;
  max-width: 100px;
  color: ${(props) => props.theme.colors.text};
`;

export const StyledCellDiscrib = styled.Text<{ done: boolean }>`
  margin-top: ${Platform.OS === 'ios' ? 5 : 2};
  color: ${(props) => (props.done ? 'green' : '#888888')};
  font-size: 15px;
  font-style: italic;
  min-width: 90px;
  text-align: right;
`;

export const StyledInner = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledRanking = styled.Text<{ size: number }>`
  font-size: ${(props) => props.size}px;
  font-weight: 500;
  margin-right: 15px;
  color: ${(props) => props.theme.colors.text};
`;
