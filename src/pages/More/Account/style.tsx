/**
 * Created by lintong on 2018/7/24.
 * @flow
 */
'use strict';

import styled from 'styled-components/native';
import Button from '../../../components/Button/index';

import { SafeAreaView } from 'react-native';

export const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;
export const StyledContent = styled.View`
  flex: 1;
`;

export const StyledButton = styled(Button)`
  padding: 0px 15px;
  margin: 0px 10px;
  border-radius: 6px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledAvatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const StyledArrow = styled.View`
  border-bottom-width: ${(props) => props.theme.hairlineWidth * 2};
  border-right-width: ${(props) => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
  margin-left: 5px;
`;

export const StyledTitle = styled.Text`
  font-size: 17px;
  font-weight: 500;
  min-width: 60;
  color: ${(props) => props.theme.colors.text};
`;

export const StyledDes = styled.Text<{ heighLight: boolean }>`
  color: ${(props) => (props.heighLight ? 'green' : '#a4a4a4')};
  font-size: 14px;
`;

export const StyledRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
`;

export const StyledActivityIndicator = styled.ActivityIndicator`
  margin-left: 5px;
  width: 10px;
  height: 10px;
`;

export const StyledInput = styled.TextInput`
  font-size: 17px;
  background-color: ${(props) => props.theme.colors.textinputbackgroundColor};
  width: ${(props) => props.theme.width - 40};
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  padding: 15px;
  margin: 10px 0px;
  border-radius: 5px;
`;

export const StyledHeader = styled.View`
  align-items: center;
  justify-content: center;
`;

export const StyledAppInfo = styled.View`
  width: 100%;
  align-items: center;
  padding: 15px;
`;
export const StyledAppVersionText = styled.Text`
  color: #a4a4a4;
  font-size: 13px;
  /* align-self: center;
  min-width: 150; */
  text-align: center;
`;

export const StyledAppPrivacyPolicyView = styled.View`
  flex-direction: row;
  margin: 15px;
  align-self: center;
`;

export const StyledAppPrivacyPolicyText = styled.Text`
  align-self: center;
  color: #0099ff;
`;

export const StyledAppPrivacyLine = styled.View`
  width: ${(props) => props.theme.hairlineWidth * 2}px;
  height: 15px;
  background-color: #0099ff;
  margin: 0px 10px;
`;

export const StyledUIDText = styled.Text`
  align-self: center;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 10;
`;
