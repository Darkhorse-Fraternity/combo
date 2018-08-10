/**
 * Created by lintong on 2018/7/23.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Button from '../../../components/Button'


export const StyledContent = styled(Button)`
    background-color: #f9f9f9;
    border-radius: 10px;
    margin: 0px 5px;
    width: ${props => props.theme.width/2 -15};
`


export const StyledImage = styled.Image`
    width: 100%;
    height: 200px;
    border-radius: 10px;
`

export const StyledInnerView = styled.View`
    padding: 15px 15px;
`


export const StyledTitle = styled.Text`
    font-size: 19px;
    font-weight: 600;
    line-height: 30px;
`

export const StyledDes = styled.Text`
    margin-top: 15px;
    font-size: 15px;
    align-self: flex-end;
    color: #969697;
`