import styled from 'styled-components/native';
// import {SafeAreaView} from 'react-navigation';
import Button from '@components/Button';

export const StyledContent = styled.View`
  flex: 1;
  padding: 15px;
`;

export const StyledText = styled.Text`
  color: #333333;
`;

export const StyledTextInput = styled.TextInput`
  margin-top: 5px;
  color: #333333;
`;



interface submitType {
  disabled: boolean;
}

export const StyledButton = styled(Button)`
  margin-top: 10px;
  align-self: center;
  padding: 5px 10px;
`;

export const StyledButtonText = styled.Text<submitType>`
  color: ${props => (!props.disabled ? 'rgb(50,50,50)' : 'rgb(200,200,200)')};
`;
