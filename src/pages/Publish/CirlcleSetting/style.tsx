/*
 * @Author: tonyYo
 * @Date: 2021-01-06 16:50:37
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-19 15:35:09
 * @FilePath: /Combo/src/pages/Publish/CirlcleSetting/style.tsx
 */
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
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme.colors.textinputbackgroundColorPrimary};
`;

export const StyledHeaderImage = styled.Image`
  width: 40px;
  height: 40px;
`;

export const StyledHeaderText = styled.Text`
  margin-top: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
`;
