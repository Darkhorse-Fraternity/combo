/**
 * Created by lintong on 2018/7/17.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import Button from '../../Button'


export const StyledContent = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    
`
export const StyledReportBtn = styled(Button)`
    margin: 25px 0px;
    padding: 10px 15px;
    background-color: white;
    border-radius: 5px;
    shadow-opacity: 0.25;
    shadow-radius: 5px;
    shadow-color: #979797;
    shadow-offset: 5px 10px;   
    elevation: 10;
   
`

export const StyleReportView = styled.View`
    margin: 25px 0px;
    height: 40px;
`

export const StyledReportText = styled.Text`
    font-size: 15px;
`

export const StyledActivityIndicator = styled.ActivityIndicator`
    width: 100px;
    height: 100px;

`

export const StyledImage = styled.Image`
    width: 100px;
    height: 100px;
`