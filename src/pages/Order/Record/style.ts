/**
 * Created by lintong on 2018/8/17.
 * @flow
 */
'use strict';

import styled from 'styled-components/native';

export const StyledRow = styled.View`
  margin: 0px 20px 15px 20px;
  padding: 15px 15px;
  background-color: ${(props) => props.theme.showItem};
  border-radius: 5px;
`;

export const StyledRowInner = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledRowTitle = styled.Text`
  font-size: 15px;
  min-width: 180px;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledRowDate = styled.Text`
  font-size: 15px;
  min-width: 90px;
  text-align: right;
  color: ${({ theme }) => theme.colors.text};
`;
export const StyledRowDate2 = styled.Text`
  font-size: 15px;
  min-width: 140px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledRowAmount = styled.Text`
  font-size: 19px;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledRowStatu = styled.Text`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.text};
`;
