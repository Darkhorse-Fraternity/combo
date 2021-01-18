import Button from '@components/Button';
import styled from 'styled-components/native';

export const StyledContent = styled.View`
  flex: 1;
  padding: 15px;
  background-color: ${(props) => props.theme.colors.card};
  flex-direction: row;
`;

export const StyledHeaderButton = styled(Button)`
  border-radius: 10px;
  /* padding: 5px 10px; */
  margin: 5px 15px 5px 10px;
  align-items: center;
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme.colors.textinputbackgroundColorPrimary};
`;

export const StyledHeaderImage = styled.Image`
  width: 30px;
  height: 30px;
`;

export const StyledHeaderText = styled.Text`
  margin-top: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
`;
