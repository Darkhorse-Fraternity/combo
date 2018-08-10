/**
 * Created by lintong on 2018/7/10.
 * @flow
 */
'use strict';

import styled from "styled-components";
import HeaderBtn from "../../Button/HeaderBtn";

import { TextInput } from '../Cunstom'

import ImageSelect from './ImageSelect'

import { Platform } from 'react-native'

const KeyboardAvoidingView = Platform.OS === 'ios'?styled.View:
    styled.View

export const Form = KeyboardAvoidingView`
    flex: 1;
    background-color: white;
`

export  const StyledContent = styled.ScrollView`
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
export const StyledSubTitle = styled.Text`
  font-size: 13px;
  color: #adadad;
  margin-left:5px;
`

export const StyledHeaderBtn = styled(HeaderBtn)`
    padding: 0px 15px;
`

export const StyleImageSelect = styled(ImageSelect)``


export const StyledHearderTitle = styled(TextInput)`
    height: 45px;
    border-bottom-width: ${props => props.theme.hairlineWidth };
    border-bottom-color: #c1c1c1 ;
    margin: 15px;
    font-size: 30px;
`