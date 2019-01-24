/**
 * Created by lintong on 2019/1/24.
 * @flow
 */
'use strict';

import styled from "styled-components";
import { SafeAreaView } from 'react-navigation';
import { Platform } from 'react-native'
import Button from '../../../components/Button'


export const StyledContent = styled(SafeAreaView)`
    flex: 1;
`

export const StyledHeader = styled.View`
    padding: 20px 20px 24px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
`


export const StyledItem = styled(Button)`
 padding: 20px 20px 20px 20px ;
 justify-content: space-between;
 flex-direction: row;
 align-items: center;
`



export const StyledCellName = styled.Text`
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.5px;
    margin-left: 10px;
`

export const StyledCellDiscrib = styled.Text`
    margin-top: ${Platform.OS === 'ios'?5:2 };
    color: #888888;
    font-size: 15px;
    font-style: italic;
`

export const StyledInner = styled.View`
  flex-direction: row;
  align-items: center;
`

export const StyledRanking = styled.Text`
   font-size: 40px;
   font-weight: 500;
   margin-right: 15px;
`
