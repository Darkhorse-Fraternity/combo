import React from "react";
import styled from "styled-components/native";
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';


export const StyleAutoGrowingChatTextInput = styled(AutoGrowingTextInput)`
    flex: 1;
    margin: 10px 10px 10px 0px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left:10px;
    font-size: 16px;
    background: white;
    border-width:  ${props => props.theme.hairlineWidth};
    border-color: ${props => props.theme.hairlineColor};;
    border-radius: 18px;
`

export const StyleAutoGrowingTextInput = styled(AutoGrowingTextInput)`
    margin: 10px 10px 10px 0px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left:10px;
`



export const StyleTextInput = styled.TextInput`
    font-size: 17px;
    background: white;
    height:50px;
    width: 100%;
`