import styled from 'styled-components/native';
// import {SafeAreaView} from '@react-navigation/native';
import Button from '@components/Button';

export const StyledContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
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
