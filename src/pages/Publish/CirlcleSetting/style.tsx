import styled from "styled-components/native";
// import {SafeAreaView} from 'react-navigation';
import Button from "@components/Button";

export const StyledContent = styled.View`
  flex: 1;
  padding: 15px;
  background-color: white;
`;

export const StyledNavBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledText = styled.Text`
  color: #333333;
  font-weight: bold;
  font-size: 15px;
`;

export const StyledTextInput = styled.TextInput`
  margin-top: 5px;
  color: #333333;
`;

interface submitType {
  disabled: boolean;
}

export const StyledButton = styled(Button)`
  align-self: center;
  min-height: 20;
`;

export const StyledButtonText = styled.Text<submitType>`
  color: ${(props) => (!props.disabled ? "rgb(50,50,50)" : "rgb(200,200,200)")};
`;

export const StyledUnderLine = styled.View`
  background-color: rgb(200, 200, 200);
  margin-top: 2;
  height: ${(props) => props.theme.hairlineWidth};
`;
