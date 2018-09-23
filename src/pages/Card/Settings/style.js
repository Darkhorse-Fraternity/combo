/**
 * Created by lintong on 2018/4/13.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Icon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'


import Button from '../../../components/Button'
import HeaderBtn from '../../../components/Button/HeaderBtn'
// import LinearGradient from 'react-native-linear-gradient';

export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
`

export const StyledTitleView = styled.View`
  background-color: #e7ebeb;
  padding: 15px;
`

export const StyledTitleText = styled.Text`
  font-size: 17px;
  color: black;
`

export const StyledBottomMenu = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const StyledBottomMenuText = styled.Text`
  font-size: 14px;
  margin-top: 7.5px;
`

export const StyledBottomMenuButton = styled(Button)`
  align-items: center;
  padding: 15px 0px;
  margin: 7.5px 15px;
  background-color: ${props => props.theme.buttonItem};
  width:${props => props.theme.width>340?props.theme.width/4: 
    props.theme.width/3 };
  border-radius: 10px;
  height: 85px;
`

export const StyledActivityIndicator = styled.ActivityIndicator`
  flex:1
`

export const StyledIcon = styled(Icon)`
 
`

export const StyledEntypoIcon= styled(EntypoIcon)``

export const StyledRow = styled.View`
  padding: 25px 15px 25px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: ${props => props.theme.hairlineWidth };
  border-bottom-color: #e4e4e4;
`

export const StyledRowTouch = styled.View`
  padding: 25px 25px 25px 25px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const StyledRowText = styled.Text`
  color: #323232;
  font-size: 18px;
`

export const StyledRowDes = styled.Text`
  color: #323232;
  font-size: 19px;
 
`

export const StyledRowInner = styled.View`
  flex-direction: row;
  align-items: center;
`

export const StyledBtn = styled(HeaderBtn)`
   margin-top:15px;
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

export const StyeldDoneView = styled.View`
`

export const StyledHeader = styled.View`
  padding:15px;
`