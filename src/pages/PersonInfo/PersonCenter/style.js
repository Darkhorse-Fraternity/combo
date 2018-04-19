/**
 * Created by lintong on 2018/4/8.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import Button from '../../../components/Button'

export const StyledContent = styled.ScrollView`
    flex: 1;
    background-color: white;
  
`

export const StyleHeader = styled.View`
  margin-top: 30px;
  padding: 25px;
   margin-bottom: 10px;
`

export const StyledHeaderTop = styled(Button)`
    margin-bottom: 15px;
`


export const StyledHeaderName = styled.Text`
    font-size: 30px;
    font-weight: bold;
`

export const StyledHeaderSubText = styled.Text`
    margin-top: 10px;
    font-size: 13px;
`

export const StyleFolllow = styled.View`
    
    flex-direction: row;
    align-content: center;
   
`

export const StyleFollowText = styled.Text`
    font-size: 14px;
    
`
export const StyleFollowDevide = styled.View`
    width:3px;
    height:18px;
    margin: 0px 15px 0px 15px;
    background-color: #aaaaaa;
   
`