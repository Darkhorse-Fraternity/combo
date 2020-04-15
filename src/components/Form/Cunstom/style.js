import React from "react";
import styled from "styled-components";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

export const StyleAutoGrowingChatTextInput = styled(AutoGrowingTextInput)`
  flex: 1;
  margin: 0px 0px 0px 0px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  font-size: 16px;
  background-color: white;
`;

export const StyleAutoGrowingTextInput = styled(AutoGrowingTextInput)`
  margin: 10px 10px 10px 0px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
`;

export const StyleTextInput = styled.TextInput`
  font-size: 17px;
  background: ${props => props.theme.textinputbackgroundColor};
  height: 50px;
`;
