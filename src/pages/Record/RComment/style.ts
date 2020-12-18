import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../../../components/Button';
// @ts-ignore: Unreachable code error
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

export const StyledContent = styled(SafeAreaView)`
  flex: 1;
  /* justify-content: space-between; */
`;

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const StyledHeader = styled.View`
  padding: 10px 20px;
  border-bottom-width: ${(props) => props.theme.hairlineWidth};
  border-bottom-color: ${(props) => props.theme.colors.hairlineColor};
`;

export const StyledRow = styled(Button)`
  flex-direction: row;
  padding: 15px 15px 0px 15px;
`;

export const StyledRowLeft = styled.View`
  margin-right: 15px;
`;
export const StyledAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

export const StyledRowRight = styled.View`
  flex: 1;
  border-bottom-width: ${(props) => props.theme.hairlineWidth};
  border-bottom-color: ${(props) => props.theme.colors.hairlineColor};
`;

export const StyledNickText = styled.Text`
  font-size: 17px;
  font-weight: 600;
`;
export const StyledContentText = styled.Text`
  margin: 10px 0px 10px 0px;
  font-size: 16px;
`;

export const StyledDate = styled.Text`
  margin: 0px 0px 10px 0px;
  color: #9ea1a1;
`;

export const StyleBottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledIcon = styled(Icon)``;

export const StyledRightView = styled.View`
  flex-direction: row;
  padding-right: 10px;
`;

export const StyleAutoGrowingChatTextInput = styled(AutoGrowingTextInput)`
  flex: 1;
  margin: 0px 0px 0px 0px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  font-size: 16px;
  background-color: white;
`;

export const StyledSumbitBtn = styled(Button)``;

export const StyledSumbitBtnText = styled.Text<{ disabled: boolean }>`
  color: ${(props) => (props.disabled ? 'rgb(150,150,150)' : 'green')};
`;

export const Form = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 15px 10px 5px;
  background-color: white;
  border-top-color: #c8c8c8;
  border-top-width: ${(props) => props.theme.hairlineWidth};
  border-bottom-color: #c8c8c8;
  border-bottom-width: ${(props) => props.theme.hairlineWidth};
`;
