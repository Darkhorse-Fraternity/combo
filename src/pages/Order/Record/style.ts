/**
 * Created by lintong on 2018/8/17.
 * @flow
 */
'use strict';

import styled from "styled-components/native";



export const StyledRow = styled.View`
    margin: 0px 20px 15px 20px;
    padding: 15px 15px;
    background-color: ${props => props.theme.showItem};
    border-radius: 5px;
`


export const StyledRowInner = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const StyledRowTitle = styled.Text`
    font-size: 17px;
`

export const StyledRowDate = styled.Text`
    font-size: 15px;

`

export const StyledRowAmount = styled.Text`
  font-size: 19px;
`

export const StyledRowStatu = styled.Text`
     font-size: 17px;
`