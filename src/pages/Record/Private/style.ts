/*
 * @Author: tonyYo
 * @Date: 2020-12-24 11:21:53
 * @LastEditors: tonyYo
 * @LastEditTime: 2020-12-24 14:17:39
 * @FilePath: /Combo/src/pages/Record/Private/style.ts
 */

import styled from 'styled-components/native';

export const StykedContent = styled.View`
  padding-top: 20px;
`;

export const StyledText = styled.Text<{ color?: string }>`
  color: ${({ theme, color }) => color || theme.colors.text};
  padding: 10px 20px;
  font-size: 17px;
`;
