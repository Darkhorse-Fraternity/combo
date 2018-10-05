/**
 * Created by lintong on 2018/4/8.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Button from '../../components/Button/index'
import Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'

export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
  
`
export const StyledInnerContent = styled.ScrollView`
  flex: 1;
`


export const StyleHeader = styled.View`
  margin-top: 40px;
  padding: 15px 25px;
`

export const StyledHeaderTop = styled(Button)`
    margin-bottom: 15px;
     align-items: center;
    
`


export const StyledHeaderName = styled.Text`
    font-size: 17px;
    font-weight: 300;
    max-width: 150px;
`

export const StyledAvatar = styled.Image`
    width:70px;
    height:70px;
   border-radius: 35px;
`
export const StyledAvatarView = styled.View`
    align-items: center;
    justify-content: center;
`


export const StyledHeaderSubText = styled.Text`
    font-size: 14px;
    color: #c1c1c1;
    margin-left: 2px;
`


export const StyledIcon = styled(Icon)`
    align-self: center;
`

export const StyledFuncView = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 0px;
`

export const StyleFolllow = styled.View`
    flex-direction: row;
    align-content: center; 
`
export const StyledIncome = styled.Text`
    font-size: 16px;
`
export const StyledEntypoIcon = styled(EntypoIcon)`

`

export const StyledFollowTextView = styled.View`
   width: 60px;
   height: 60px;
   border-radius: 30px;
   border-color: #2e2e2e;
   border-width: ${props => props.theme.hairlineWidth * 2};
   align-items: center;
  justify-content: center;
`

export const StyleFollowTextNum = styled.Text`
    font-size: 20px; 
    font-weight: 600;
`

export const StyleFollowText = styled.Text`
    margin-top: 10px;
    font-size: 17px; 
`
export const StyleFollowDevide = styled.View`
    margin: 0px 15px ;
    background-color: #adadad;
    width: 2px;
    margin-top: 8px;
    height: 25px;
   
`