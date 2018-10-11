/**
 * Created by lintong on 2018/10/11.
 * @flow
 */
'use strict';

import styled from "styled-components";


export const StyledCard = styled.View`
   align-items: center;
   justify-content: center;
   background-color: ${props=>props.backgroundColor};
   width: ${props=>props.width};
   border-radius: 6px;
   padding: 20px 10px;
   margin: 6px;
`


export const StyledCardTitleView = styled.View`
   justify-content: center;
   align-items: center;
   height:17px;
   margin-top: 15px;
`

export const StyledCardTitle = styled.Text`
   font-size: 15px;
   font-style: italic;
   text-align: center;
  
`