/**
 * Created by lintong on 2018/5/8.
 * @flow
 */
'use strict';

import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
export const StyledContent = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`;

export const StyledHeader = styled.View`
  padding: 15px 20px 20px 20px;
`;

export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
`;
