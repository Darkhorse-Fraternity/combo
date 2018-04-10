/**
 * Created by lintong on 2018/4/8.
 * @flow
 */
'use strict';

import styled from "styled-components/native";

export const StyledContent = styled.ScrollView`
    flex: 1;
    background-color: white;
  
`

export const StyleHeader = styled.View`
  margin-top: 30px;
  padding: 25px;
`

export const StyledHeaderTop = styled.TouchableOpacity`
    margin-bottom: 25px;
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
    margin-bottom: 20px;
`

export const StyleFollowText = styled.Text`
    color: black;
    font-size: 14px;
    font-weight: bold;
`
export const StyleFollowDevide = styled.View`
    width:3px;
    height:18px;
    background-color: black;
    margin: 0px 15px 0px 15px;
   
`