/**
 * Created by lintong on 2018/7/12.
 * @flow
 */

import styled from 'styled-components/native';
// import Button from '../../../components/Button'
import Button from '@components/Button';
import NativeUnifiedADView from '@components/GDTNativeUnifiedAD';
import {Platform} from 'react-native';

export const StyledContent = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

export const StyledRow = styled(Button)``;

export const StyledHeader = styled.View`
  padding: 0px 10px 10px 10px;
  background-color: white;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom-width: ${props => props.theme.hairlineWidth};
  border-bottom-color: #e4e4e4;
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
`;

const imageRate = 16 / 9.0;
export const StyledNativeUnifiedADView = styled(NativeUnifiedADView)`
  margin-top: ${Platform.OS === 'ios' ? 20 : 0}px;
  width: 100%;
  height: ${props => (props.theme.width * 0.65) / imageRate + 114};
`;
