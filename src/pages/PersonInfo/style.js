/**
 * Created by lintong on 2018/7/24.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import Button from '../../components/Button'

export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
`

export const StyledButton = styled(Button)`
         border-bottom-color:  #c8c8c8;
        border-bottom-width: ${props => props.theme.hairlineWidth};
        padding: 20px 15px;
        flex-direction: row;     
        justify-content: space-between;
        align-items: center;
`

export const StyledAvatar = styled.Image`
    width:60px;
    height: 60px;
    border-radius: 30px;
    
`

export const StyledArrow = styled.View`
  border-bottom-width: ${props => props.theme.hairlineWidth * 2};
  border-right-width: ${props => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
  margin-left: 5px;
`

export const StyledTitle = styled.Text`
    color: #333333;
    font-size: 14px;
`

export const StyledDes = styled.Text`
    color: #333333;
    font-size: 14px;
`

export const StyledRow = styled.View`
  flex-direction: row;
  align-items: center;
`

export const StyledActivityIndicator = styled.ActivityIndicator`
    margin-left: 5px;
     width: 10px;
    height: 10px;

`
