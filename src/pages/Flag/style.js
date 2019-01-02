/**
 * Created by lintong on 2019/1/2.
 * @flow
 */
'use strict';

import styled from "styled-components";
import { SafeAreaView } from 'react-navigation';
import { Platform } from 'react-native'

export const StyledContent = styled(SafeAreaView)`
    flex: 1;
`

export const StyledHeader = styled.View`
    padding: ${Platform.OS === 'ios' ? 44 : 64}px 20px 24px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
`