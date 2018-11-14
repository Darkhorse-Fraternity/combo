/**
 * Created by lintong on 2018/7/10.
 * @flow
 */
'use strict';

import styled from "styled-components";
import HeaderBtn from "../../Button/HeaderBtn";
import AutoHeightImage from 'react-native-auto-height-image'
import { TextInput,AutoGrowingInput } from '../Cunstom'
import Button from '../../Button'
import ImageSelect from '../Course/ImageSelect'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons'

import { Platform } from 'react-native'

// const KeyboardAvoidingView = Platform.OS === 'ios'?styled.KeyboardAvoidingView:
//     styled.View

export const Form = styled.View`
    flex: 1;
    background-color: white;
`

export  const StyledContent = styled.ScrollView`
   overflow: hidden;
`



export const StyledHeader = styled.View`
   flex-direction: row;
   align-items: center;
   padding: 15px ;
   justify-content: space-between;
   z-index: 100;
   background-color: white;
`

export const StyledTitle = styled.Text`
   font-size: 17px;
   font-weight: 700;
`

export const StyledHeaderBtn = styled(HeaderBtn)`
`

export const StyleImageSelect = styled(ImageSelect)``



export const StyledTitleDis = styled.Text`
  margin: 20px 15px 0px 15px;
  font-size: 13px;
  color: #2e2e2e;
`

export const StyledHearderTitle = styled(TextInput)`
    height: 40px;
    border-bottom-width: ${props => props.theme.hairlineWidth };
    border-bottom-color: #c1c1c1 ;
    margin: 5px 15px;
    font-size: 30px;
    background-color: white;
`

export const StyledDescribe = styled(TextInput)`
    border-bottom-width: ${props => props.theme.hairlineWidth };
    border-bottom-color: #c1c1c1 ;
    margin: 5px 15px;
    font-size: 15px;
    height: 40px;
    background-color: white;
`

export const StyledItem = styled.View`
      padding: 15px;
      overflow: hidden;
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

export const StyledItemTop = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`
export const StyledPagination = styled.Text`

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

export const StyledIcon = styled(Icon)`
    align-self: center;
`