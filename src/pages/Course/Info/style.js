/**
 * Created by lintong on 2018/7/13.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Button from '../../../components/Button'

import AutoHeightImage from 'react-native-auto-height-image'

export const StyledContent = styled.View`
`


export const StyledHeaderContent = styled.View`

    padding:30px 30px ;
    height: 450px;
    
`


export const StyledHeaderTipText = styled.Text`
   
    font-size: 30px;
    color: #c7c7c7
`

export const StyledIndicator = styled.ActivityIndicator`
   margin-top: 5px;
`

export const StyledHeaderCover = styled(Button)`
    background-color: white;
   
    margin: 10px 5px;
   
    align-self: center;
    justify-content: center;
    border-radius: 10px;

    shadow-opacity: 0.25;
    shadow-radius: 5px;
    shadow-color: black;
    shadow-offset: 1px 3px;   
    elevation: 10;

`

export const StyledReportBtn = styled(Button)`
    margin-top: 15px;
    padding: 10px 15px;
    background-color: white;
    border-radius: 5px;
    shadow-opacity: 0.25;
    shadow-radius: 5px;
    shadow-color: #979797;
    shadow-offset: 2px 5px;   
    elevation: 5;
`

export const StyledReportText = styled.Text`
    font-size: 15px;
`


export const StyledHeaderConverTip = styled.View`
    width: 60px;
    height: 60px;
    z-index: 10;
    position: absolute;
    align-self: center;
    border-color: white;
    border-width: 3px;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background-color: rgba(0,0,0,0.6);
`

export const StyledTriangle = styled.View`
    border-top-width: 11px;
    border-right-width: 0px;
    border-left-width: 19px;
    border-bottom-width: 11px;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: white;
    border-right-color: transparent;
    border-style: solid;
`

export const StyledHeaderTitle = styled.Text`
    font-size: 30px;
    font-weight: 700;
    margin-top: 15px;
`


export const StyledHeaderInner = styled.View`
    margin-top: 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const StyledHeaderInnerLeft = styled.View`

`
export const StyledNickName = styled.Text`
    font-size: 17px;
     margin-bottom: 5px;
`


export const StyledSubTitle = styled.Text`
   
    font-size: 17px;
    margin-bottom: 5px;
`
export const StyleKeys = styled.Text`
    color: #c1c1c1;
    font-size: 17px;
    margin-bottom: 5px;
`


export const StyledReadNum = styled.Text`
    font-size: 13px;
    color: #c1c1c1;
    font-weight: 600;
    margin-right: 10px;
`

export const StyledHeaderInnerRight = styled.View`
    align-items: center;
`

export const StyledAvatar = styled.Image`
    width:70px;
    height:70px;
   border-radius: 35px;
`

export const StyledFollowBtnText = styled.Text`
    margin-top: 10px;
    font-weight: 600;
    color: ${props => props.theme.mainColor}
`


export const StyledHeaderImage = styled.Image`
    width:250px;
    height: 200px;
    
    border-radius: 5px;
`


export const StyledRow = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`

export const StyledRowInner = styled(Button)`
    background-color: white;
    shadow-opacity: 0.5;
    shadow-radius:5px;
    shadow-color: #979797;
    shadow-offset: 2px 2px; 
    border-radius: 10px;
   
   elevation: 5;
`
export const StyledImg = styled(AutoHeightImage)`
    border-radius: 10px;
`

export const StyledBottomText = styled.Text`
  font-size: 15px;
  color: #c1c1c1;
  margin-left: 10px;
`

