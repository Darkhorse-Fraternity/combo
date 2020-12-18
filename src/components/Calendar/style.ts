import styled from 'styled-components/native';

export const StyledTitle = styled.Text`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledDateText = styled.Text`
  font-size: 15px;
  min-width: 20px;
  color: rgb(100, 100, 100);
  color: ${({ theme }) => theme.colors.titlePrimary};
  text-align: center;
`;

export const StyledDateText1 = styled.Text`
  font-size: 14px;
  min-width: 20px;
  color: ${({ theme }) => theme.colors.titlePrimary};
  text-align: center;
`;

export const StyledDateText2 = styled.Text`
  font-size: 11px;
  min-width: 20px;
  color: ${({ theme }) => theme.colors.titleSecondary};
  text-align: center;
`;
