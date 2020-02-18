import styled from "styled-components/native";
import Button from "@components/Button";

interface submitType {
  disabled: boolean;
}

export const StyledButton = styled(Button)`
  align-self: center;
  margin-top: 20px;
`;

export const StyledButtonText = styled.Text<submitType>`
  color: ${props => (!props.disabled ? "rgb(50,50,50)" : "rgb(200,200,200)")};
`;

export const StyledUnderLine = styled.View`
  background-color: rgb(200, 200, 200);
  margin-top: 5;
  height: ${props => props.theme.hairlineWidth};
`;

export const StyleTitle = styled.Text`
  align-self: center;
  margin: 10px;
`;

export const StyleModalMain = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 5;
  margin: 0px 5px;
`;
