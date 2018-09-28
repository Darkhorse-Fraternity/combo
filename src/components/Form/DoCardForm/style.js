import React from "react";
import styled from "styled-components";
import HeaderBtn from '../../../components/Button/HeaderBtn'
import Button from '../../../components/Button/'
import { TextInput } from '../Cunstom'


export const Form = styled.View`
     flex:1;
     padding: 50px 0px;
`

export const StyledContent = styled.View`
  padding: 0px 20px;
`

export const StyledIndicator = styled.ActivityIndicator`

`

export const StyledIndicatorView = styled.View`
    margin-top: 50px;
     width:80px;
`

export const StyledButtonView = styled.View`
   margin-top: 0px;
`

export const StyledBtn = styled(HeaderBtn)`
   margin-top:15px;
   width:80px;
`

export const StyledLine = styled.View`
    width: 100%;
    height: 1px;
    background-color: #a4a4a4;
`

export const StyledBackBtn = styled(Button)`
    background-color: white;
    justify-content: center;
    align-items: center;
    shadow-opacity: 0.25;
    shadow-radius: 5px;
    shadow-color: black;
    shadow-offset: 1px 3px;   
    elevation: 10;
    padding:15px;
    align-self: flex-start;
    flex-direction: row;
    margin:7.5px 5px 7.5px 0px;
`

export const StyledBackBtnText = styled.Text`
  font-size: 15px;
`

export const StyledTextInput = styled(TextInput)`
  height: 180px;
  margin: 5px 10px;
`