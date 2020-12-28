import styled from 'styled-components/native';
import { View } from 'react-native';
interface StyledSubmitTextProps {
  color?: string;
}
export const ContentView = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.card};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  /* height: 163px; */
  justify-content: flex-end;
`;
export const CommitBtn = styled.Text<StyledSubmitTextProps>`
  color: ${(props) => props.color || props.theme.colors.text};
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-align: center;
`;
export const StyledSubmit = styled(View)`
  align-items: center;
  height: 52px;
  justify-content: center;
`;

export const StyledSplitView = styled(View)`
  background-color: #f5f5f5;
  background-color: ${({ theme }) =>
    theme.isDarkMode ? 'rgb(50,50,50)' : '#f5f5f5'};
  height: 7px;
`;
export const StyledCellTopLine = styled.View<StyledSubmitTextProps>`
  height: 0.5px;
  background-color: ${({ theme }) =>
    theme.isDarkMode ? '#999999' : '#999999'};
`;
