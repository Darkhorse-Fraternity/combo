/**
 * Created by lintong on 2018/9/22.
 * @flow
 */

'use strict';

import styled from "styled-components";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Button from '../../../components/Button'


export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
`

export const StyledHeader = styled.View`
    padding: 15px 15px 0px 15px;
`

export const StyledHeaderTitle = styled.Text`
   font-size: 20px;
   font-weight: 500;
`

export const StyledSubTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.titleBackViewColor};
    border-radius: 10px;
    padding: 10px 15px;
    margin: 30px 15px 0px 15px;
`

export const StyledSubTitleText = styled.Text`
    font-size: 17px;
    margin-left: 10px;

`
export const StyledSwitch = styled.Switch`

`
export const StyledButton = styled(Button)`
  width: 100%;
  padding: 0px 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`

export const StyledTime = styled.Text`
  font-size: 18px;
  font-weight: 600;
`

export const StyledName = styled.Text`
  font-size: 15px;
`
export const StyledDays = styled.Text`
    font-size: 11px;
    margin-top: 5px;
    color: #a9a9aa;
`


export const StyledRowInner = styled.View`
  flex-direction: row;
  align-items: center;
`

export const StyledRowDis = styled.View`

`

export const StyledLine = styled.View`
   background-color: ${props => props.theme.titleBackViewColor};
   height: 80px;
   width: 3px;
   margin: 0px 15px 0px 5px;
   align-items: center;
   justify-content: center;
`

export const StyledRound = styled.View`
    background-color: ${props => props.theme.titleBackViewColor};
    width: 15px;
    height: 15px;
    border-radius: 7.5px;
    z-index: 10;
    position: absolute;
`

export const StyledIconView = styled.View`
    background-color: ${props => props.theme.titleBackViewColor};
    padding: 10px;
    width: 50px;
    height: 50px;
    border-radius: 15px;
    margin:0px 5px 0px 15px;
`

export const StyledIcon = styled(Icon)`
    align-self: center;
`


export const StyledDeleteBtn = styled.View`
   align-items: center;
   justify-content: center;
   flex:1
`

export const StyledDeleteBtnText = styled.Text`
  color: white;
  font-size: 19px;
  font-weight: 600;
`