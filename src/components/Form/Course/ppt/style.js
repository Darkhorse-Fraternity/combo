/**
 * Created by lintong on 2018/8/1.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import Button from '../../../Button'
import AutoHeightImage from 'react-native-auto-height-image'
// import {AutoGrowingTextInput} from 'react-native-autogrow-textinput'
import {AutoGrowingInput} from '../../Cunstom'

import Icon from 'react-native-vector-icons/Ionicons'


export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
`
export const StyledTitle = styled.Text`
   font-size: 17px;
   font-weight: 700;
`
export const StyledSubTitle = styled.Text`
  font-size: 13px;
  color: #adadad;
  margin-left:5px;
`

export const StyledReportBtn = styled(Button)`
    padding: 10px 10px;
    background-color: white;
    border-radius: 15px;
    shadow-opacity: 0.5;
    shadow-radius:10px;
    shadow-color: #979797;
    shadow-offset: 2px 4px;   
    elevation: 10;
    align-self: center;
   
`


export const StyledReportText = styled.Text`
    font-size: 15px;
`

export const StyledItem = styled.View`
      padding: 15px;
`

export const StyledItemTop = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`

export const StyledPagination = styled.Text`

`

export const StyledIcon = styled(Icon)`
    align-self: center;
`


export const StyledItemContent = styled.View`
    background-color: white;
     shadow-opacity: 0.5;
    shadow-radius:10px;
    shadow-color: #979797;
    shadow-offset: 2px 4px; 
    border-radius: 10px;
    padding: 0px 15px;
`

export const StyledImg = styled(AutoHeightImage)`

`

export const StyledBottom = styled.View`
  margin: 20px;
`

export const StyledTextInput = styled(AutoGrowingInput)`
    height: 45px;
   
`