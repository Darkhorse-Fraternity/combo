/*
 * @Author: tonyYo
 * @Date: 2021-01-06 16:44:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-25 14:16:59
 * @FilePath: /Combo/src/components/Base/ExceptionView/style.ts
 */
/**
 * Created by lintong on 2018/7/17.
 * @flow
 */
'use strict';

import styled from 'styled-components/native';
import Button from '../../Button';

export const StyledContent = styled.View`
  align-items: center;
  justify-content: center;
`;
export const StyledReportBtn = styled(Button)`
  margin: 15px 0px;
  padding: 10px 15px;
  background-color: white;
  border-radius: 5px;
  shadow-opacity: 0.5;
  shadow-radius: 10px;
  shadow-color: #979797;
  shadow-offset: 2px 4px;
  elevation: 10;
`;

export const StyleReportView = styled.View`
  margin: 25px 0px;
  height: 40px;
`;

export const StyledReportText = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledActivityIndicator = styled.ActivityIndicator`
  width: 100px;
  height: 100px;
`;

export const StyledImage = styled.Image`
  width: 60px;
  height: 60px;
`;
