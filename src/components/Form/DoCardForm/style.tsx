import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import HeaderBtn from '../../Button/HeaderBtn';
import Button from '../../Button';
import { TextInput } from '../Cunstom';

export const Form = styled.View`
  flex: 1;
  padding: 20px 0px 0px 10px;
`;

// export const Form = styled.KeyboardAvoidingView`
//      flex:1;
//      padding: 0px 0px;
// `

export const StyledHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 10px 20px;
`;

export const StyledContent = styled.KeyboardAvoidingView`
  flex: 1;
  padding: 10px 0px;
`;

export const StyledIndicatorView = styled.View``;

export const StyledIndicator = styled.ActivityIndicator``;

export const StyledButtonView = styled.View`
  margin-top: 0px;
`;

export const StyledBtn = styled(Button)`
  padding: 0px 0px;
`;

export const StyledLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: #a4a4a4;
`;

export const StyledBackBtn = styled(Button)``;

export const StyledBackBtnText = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: ${props => (props.disabled ? props.theme.disabledColor : props.color)};
`;

export const StyledTextInput = styled(TextInput)`
  flex: 1;
  text-align-vertical: top;
  margin: 20px;
`;

export const StyledIcon = styled(Icon)`
  align-self: center;
`;
