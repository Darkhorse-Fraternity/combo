import styled from 'styled-components/native';
// import {SafeAreaView} from '@react-navigation/native';
import Button, { ButtonOpacity } from '@components/Button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export const StyledContent = styled.View<{ paddingBottom?: number }>`
  /* flex: 1; */
  padding-top: 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: ${({ theme }) => theme.colors.cardPrimary};
  /* margin-bottom:0; */
  /* padding-bottom: ${(props) => props.paddingBottom || 0}; */
`;

export const StyledRuleView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

export const StyledRule = styled(Button)`
  align-items: center;
  /* margin-right: 15px; */
  flex: 1;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const StyledRuleText = styled.Text`
  font-size: 20px;
  color: green;
`;

export const StyledInfo = styled.Text`
  font-size: 20px;
  align-self: center;
  margin: 20px;
`;

export const StyledTitleView = styled.View`
  flex-direction: row;
  align-self: center;
  margin: 10px;
  align-items: center;
`;

export const StyledTitle = styled.Text`
  font-size: 15px;
  /* margin: 10px; */
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledContentContainer = styled.SafeAreaView`
  /* flex: 1; */
`;

export const StyledImage = styled.Image`
  width: 17px;
  height: 17px;
  margin-left: 5px;
`;

export const StyledItem = styled(ButtonOpacity)`
  justify-content: space-between;
  padding: 15px;
  flex-direction: row;
  align-items: center;
  height: 50px;
`;

export const StyledText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 17px;
`;

export const StyledSelect = styled.Text``;

export const StyledMaterialIcons = styled(MaterialIcons)`
  /* color: ${(props) => props.theme.colors.titleSecondary}; */
  color: green
`;
