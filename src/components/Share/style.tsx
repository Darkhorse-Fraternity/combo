import { Platform } from 'react-native';
import styled from 'styled-components/native';
// import { ButtonOpacity } from 'components/Button';

export const StyledSafeAreaView = styled.SafeAreaView`
  background-color: ${(props) => props.theme.colors.card};
  align-items: center;
`;

export const StyledPopItemText = styled.Text`
  font-size: 13;
  margin-top: ${Platform.OS === 'ios' ? 10 : 5}px;
  color: ${(props) => props.theme.colors.text};
  align-self: center;
  min-width: 55px;
  text-align: center;
`;
