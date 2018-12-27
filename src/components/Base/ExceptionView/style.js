/**
 * Created by lintong on 2018/7/17.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Button from '../../Button'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {BorderlessButton} from 'react-native-gesture-handler'

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
    shadow-opacity: 0.5;
    shadow-radius:10px;
    shadow-color: #979797;
    shadow-offset: 2px 4px;      
    elevation: 10;
`
export const StyledRefresh = styled(BorderlessButton)`
    padding: 10px;
`


export const StyleReportView = styled.View`
    margin: 25px 0px;
    height: 40px;
`

export const StyledReportText = styled.Text`
    font-size: 15px;
`

export const StyledIcon = styled(Ionicons)`
    align-self: center;
    margin: 0px 10px;
`

export const StyledActivityIndicator = styled.ActivityIndicator`
    width: 100px;
    height: 100px;

`

export const StyledImage = styled.Image`
    width: 60px;
    height: 60px;
`