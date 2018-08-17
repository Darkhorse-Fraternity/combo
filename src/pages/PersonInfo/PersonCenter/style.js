/**
 * Created by lintong on 2018/4/8.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Button from '../../../components/Button'
import Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'

export const StyledContent = styled.ScrollView`
    flex: 1;
    background-color: white;
  
`

export const StyleHeader = styled.View`
  margin-top: 40px;
  padding: 25px;
`

export const StyledHeaderTop = styled(Button)`
    margin-bottom: 15px;
    justify-content: space-between;
   flex-flow: row;
    
`


export const StyledHeaderName = styled.Text`
    font-size: 40px;
    font-weight: 600;
    margin-top: 5px;
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
  padding: 10px 0px;
`

export const StyleFolllow = styled.View`
    margin-top: 20px;
    flex-direction: row;
    align-content: center; 
`
export const StyledIncome = styled.Text`
    font-size: 16px;
     color: #adadad; 
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
    font-size: 14px; 
    color:  #adadad; 
`
export const StyleFollowDevide = styled.View`
    margin: 0px 15px ;
   
`