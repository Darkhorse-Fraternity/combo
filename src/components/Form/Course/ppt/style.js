/**
 * Created by lintong on 2018/8/1.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Button from '../../../Button'
import AutoHeightImage from 'react-native-auto-height-image'
// import {AutoGrowingTextInput} from 'react-native-autogrow-textinput'
import { AutoGrowingInput } from '../../Cunstom'

import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable';

export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
`


export const StyledHeaderView = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   padding: 15px;
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
    elevation: 5;
    align-self: center;
   
`


export const StyledReportText = styled.Text`
    font-size: 15px;
`

export const StyledItem = styled.View`
      padding: 15px;
      overflow: hidden;
`

export const StyledTipButton = styled(Button)`
    background-color: black;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    left: 0px;
    top: 50px;
    position: absolute;
    z-index: 100px;
    padding: 5px 10px;
`
export const StyledTipButtonText = styled.Text`
  color: white;
  font-weight: 500;
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


export const StyledItemContent = styled(Animatable.View)`
    background-color: white;
    shadow-opacity: 0.5;
    shadow-radius:5px;
    shadow-color: #979797;
    shadow-offset: 2px 2px; 
    border-radius: 10px;
    padding: 0px 0px 0px 0px;
   elevation: 5;
`

export const StyledImg = styled(AutoHeightImage)`
    border-radius: 10px;
`

export const StyledBottom = styled.View`
  margin: 10px 0px;
`


export const StyledBottomTextView = styled(Button)`
    flex-direction: row;
    align-items: center;
`
export const StyledBottomTView = styled.View`

  background-color: #e1e1e1;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-left: 10px;
`
export const StyledBottomT = styled.Text`
  color: #979797;
  font-size: 17px;
  font-weight: 500;
`

export const StyledBottomText = styled.Text`
  font-size: 15px;
  color: #c1c1c1;
  margin-left: 10px;
`


export const StyledTextInput = styled(AutoGrowingInput)`
    height: 45px;
`

export const StyledTextInputDes = styled.TextInput`
    padding:15px;
    font-size: 17px;
    line-height: 30px;
`