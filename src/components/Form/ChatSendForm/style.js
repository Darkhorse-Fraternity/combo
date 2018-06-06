import React from "react";
import styled from "styled-components/native";



export const Form = styled.View`
     flex-direction: row;
     align-items: center;
     padding: 10px 15px 10px 5px;
     background-color: white;
     border-top-color: #c8c8c8;
     border-top-width: ${props => props.theme.hairlineWidth};
     border-bottom-color:  #c8c8c8;
     border-bottom-width: ${props => props.theme.hairlineWidth};
`
