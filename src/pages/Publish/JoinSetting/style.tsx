/*
 * @Author: tonyYo
 * @Date: 2021-01-15 15:49:30
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-25 16:35:20
 * @FilePath: /Combo/src/pages/Publish/JoinSetting/style.tsx
 */
import styled from 'styled-components/native';
import Button from '@components/Button';

export const StyledContent = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.card};
`;

export const StyledMain = styled.View`
  padding: 5px 20px;
  flex: 1;
`;

export const StyledNavBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-weight: bold;
  font-size: 17px;
`;

export const StyledTextInput = styled.TextInput`
  margin-top: 5px;
  color: ${(props) => props.theme.colors.text};
`;

interface submitType {
  disabled: boolean;
}

export const StyledButton = styled(Button)`
  align-self: center;
  min-height: 20;
`;

export const StyledButtonText = styled.Text<submitType>`
  color: ${(props) => (!props.disabled ? 'rgb(50,50,50)' : 'rgb(200,200,200)')};
`;

export const StyledUnderLine = styled.View`
  background-color: rgb(200, 200, 200);
  /* margin: 5px; */
  height: ${(props) => props.theme.hairlineWidth};
  margin: 12px 0px 5px;
`;

export const StyledHeaderText = styled.Text`
  color: green;
`;

export const StyledTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
  align-self: center;
  color: ${(props) => props.theme.colors.text};
  margin: 30px 0px 0px 0px;
`;

export const StyledDiscrib = styled.Text`
  font-size: 14px;
  align-self: center;
  color: ${(props) => props.theme.colors.titlePrimary};
  margin: 20px 0px 30px 0px;
  text-align: center;
  line-height: 20px;
  padding: 0;
`;

export const StyledSpace = styled.View`
  flex: 1;
`;

export const StyledSumbmit = styled(Button)`
  background-color: #5eac26;
  align-items: center;
  justify-content: center;
  margin: 20px;
  margin-bottom: 60px;
  /* flex: 1; */
  height: 44px;
  border-radius: 4px;
  /* max-width: 400px; */
  width: 200px;
  align-self: center;
`;
