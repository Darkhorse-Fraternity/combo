/**
 * Created by lintong on 2018/8/17.
 * @flow
 */
'use strict';

import styled from "styled-components";



export const StyledRow = styled.View`
   margin-bottom: 15px;
    padding: 15px 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.textinputbackgroundColor};
`


export const StyledRowInner = styled.View`

`

export const StyledRowTitle = styled.Text`
    font-size: 17px;
`





export const StyledRowDate = styled.Text`
    font-size: 15px;
   margin-top: 10px;
`

export const StyledRowAmount = styled.Text`
  font-size: 17px;
`

export const StyledRowStatu = styled.Text`
    margin-top: 10px;
     font-size: 15px;
`