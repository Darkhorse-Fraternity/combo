/**
 * Created by lintong on 2018/7/10.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import Button from '../../../Button'


export const StyledButtonText = styled.Text`
  font-size: 17px;
  margin-top: 3px;
  color: #bfbfbf;
`

export const StyledButton = styled(Button)`
  flex: 1;
`

export const StyledHeaderImage = styled.Image`
    flex: 1;
    border-radius: 10px;
`

export const StyledHeaderItem = styled.View`
    background-color: white;
    height: 200px;
    margin: 10px 5px;
    width: 250px;
    align-self: center;
    border-radius: 10px;

    shadow-opacity: 0.25;
    shadow-radius: 5px;
    shadow-color: black;
    shadow-offset: 1px 3px;   
    elevation: 10;

`

export const StyledTipView = styled.View`
    background-color: black;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 80px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    position: absolute;
    top: 20px;
    left: 0px;
    z-index: 10;
`

export const StyledTipViewText = styled.Text`
    color: white;
    font-size: 14px;
`