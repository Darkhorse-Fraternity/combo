/**
 * Created by lintong on 2018/7/13.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import Button from '../../../components/Button'


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
    height: 200px;
    margin: 10px 5px;
    width: 250px;
    align-self: center;
    justify-content: center;
    border-radius: 10px;

    shadow-opacity: 0.25;
    shadow-radius: 5px;
    shadow-color: black;
    shadow-offset: 1px 3px;   
    elevation: 10;

`

export const StyledHeaderTitle = styled.Text`
    font-size: 30px;
    font-weight: 700;
    margin-top: 15px;
`



export const StyledHeaderInner = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const StyledHeaderInnerLeft = styled.View`

`
export const StyledNickName = styled.Text`
    font-size: 17px;
`
export const StyledSubTitle = styled.Text`
    margin-top: 5px;
    font-size: 17px;
     color: #c1c1c1;
`
export const StyledReadNum = styled.Text`
    margin-top: 10px;
    font-size: 13px;
    color: #c1c1c1;
    font-weight: 600;
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
    flex: 1;
    border-radius: 5px;
`
