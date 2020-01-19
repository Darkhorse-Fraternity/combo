import styled from "styled-components/native";
// import {SafeAreaView} from 'react-navigation';
import Button from "@components/Button";
import Feather from "react-native-vector-icons/Feather";
export const StyledContent = styled.View`
  flex: 1;
  padding: 15px;
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

export const StyleModalOutView = styled.View``;

export const StyleTitle = styled.Text`
  align-self: center;
  margin: 10px;
`;

export const StyleCance = styled(Button)`
  width: 30px;
  height: 30px;
  border-radius: 15;
  background-color: white;
  margin-bottom: -20px;
  align-self: flex-end;
  margin-right: -5px;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const StyleConceText = styled.Text`
  font-size: 30px;

  /* background-color: red; */
`;

export const StyledIcon = styled(Feather)`
  align-self: center;
`;

export const StyleModalMain = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 5;
  margin: 0px 5px;
`;
