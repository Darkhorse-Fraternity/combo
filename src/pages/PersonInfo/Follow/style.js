/**
 * Created by lintong on 2018/4/9.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Button from '../../../components/Button'

export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
`
export const StyleHeader = styled.View`
  margin-top: 10px;
  padding: 15px;

`

export const StyledHeaderTop = styled.View`
    margin-bottom: 25px;
`

export const StyleHeaderInner = styled.View`

  
`
export const StyleHeaderInnerRight = styled.View`
   flex-direction: row;
  align-items: center;
  justify-content: space-between;

`

export const StyledAvatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`
export const StyledSmallAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`

export const StyledRowContent = styled(Button)`
    background-color: white;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
`
export const StyledInnerView = styled.View`
    flex-direction: row;
     align-items: center;
`

export const StyledInnerRight = styled.View`
  margin-left: 10px;
`


export const StyledName = styled.Text`
  font-size: 17px;
`

export const StyledDiscrib = styled.Text`
   margin-top: 5px;
   color: #9ea0a0;
   font-size: 13px;
`

export const StyledArrow = styled.View`
  border-bottom-width: ${props => props.theme.hairlineWidth * 2};
  border-right-width: ${props => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
`

export const StyledHeaderBottom = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0px;
`
