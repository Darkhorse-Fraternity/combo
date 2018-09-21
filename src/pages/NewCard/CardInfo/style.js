/**
 * Created by lintong on 2018/4/13.
 * @flow
 */
'use strict';

import styled from "styled-components";

import Button from '../../../components/Button'
import { SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import AutoHeightImage from 'react-native-auto-height-image'
import { default as BaseIcon } from 'react-native-vector-icons/Ionicons';
export const StyledContent = styled(LinearGradient)`
    flex: 1;
`





export const StyledRow = styled.View`
  padding: 13px 0px ;
  flex-direction: row;
  align-items: center;

`


export const StyledRowText = styled.Text`
  color: #323232;
  font-size: 17px;
  fontStyle:italic;
`

export const StyledRowDes = styled.Text`
  color: #323232;
  font-size: 17px;
  fontStyle: italic;
  margin-right: 60px;
  margin-left: 20px;
`

export const StyledRowInner = styled.View`
  flex-direction: row;
  align-items: center;
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


export const StyledTitleView = styled.View`
  padding: 0px 0px 15px 0px;
`

export const StyledTitleText = styled.Text`
  font-size: 17px;
  color: #979797;
`

export const StyledKeysView = styled.Text`
  font-size: 17px;
`

export const StyledCourseView = styled.View`

`

export const StyledDescirbe = styled.Text`
  
  font-size: 15px;
  color: #979797;
  
 
`
export const StyledDescirbeView = styled.View`
  padding: 15px 5px;
  border-radius: 5px;
  margin: 15px 0px;
  background-color: ${props => props.theme.textinputbackgroundColor};
`


export const StyledImg = styled(AutoHeightImage)`
`

export const StyledIcon = styled(BaseIcon)`
  align-self: center;
`