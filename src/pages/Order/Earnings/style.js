/**
 * Created by lintong on 2018/8/17.
 * @flow
 */
'use strict';

import styled from "styled-components";
import HeaderBtn from "../../../components/Button/HeaderBtn";



export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
`
export const StyledHeader = styled.View`
    padding: 15px 15px 0px 15px;
`

export const StyledHeaderTitle = styled.Text`
   font-size: 20px;
`

export const StyledHeaderCash = styled.Text`
   font-size: 40px;
   font-weight: 500;
  
   margin-left: -5px;
`

export const StyledHeaderBottom = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding: 20px 0px 20px 0px ;
`

export const StyledHeaderBtn = styled(HeaderBtn)`
    padding: 0px 15px;
`


export const StyledTitleView = styled.View`
  padding: 15px 15px 5px 0px;
`

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
`

export const StyledRow = styled.View`

`

export const StyledRowTitle = styled.Text`
    padding: 15px;
`