/**
 * Created by lintong on 2018/7/26.
 * @flow
 */

'use strict';

import styled from "styled-components";

import LinearGradient from 'react-native-linear-gradient';
import Button from "../../../components/Button/";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
// export const StyledContent = styled.View`
//     flex: 1;
//     background-color: white;
// `


export const StyledTitleView = styled.View`
  padding: 20px 5px 5px 5px;
`

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
  margin-left: 10px;
`

export const StyledContent = styled(LinearGradient)`
    flex: 1;
`


export const StyledSubTitleView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const StyledSubTitle = styled.Text`
  font-size: 15px;
  margin: 30px 15px 10px 15px;
  padding: 5px 5px;
`

export const StyledControl = styled(Button)`
    margin: 30px 15px 10px 15px;
    background-color: white;
    border-radius: 5px;
    shadow-opacity: 0.5;
    shadow-radius:10px;
    shadow-color: #979797;
    shadow-offset: 2px 4px;      
    elevation: 10;
    padding: 5px 5px;
`
export const StyledShowDelete = styled.Text`
    color: #646464;
    fontStyle:italic;
    font-size: 13px;
`

//NotifyTimerPicker

export const StyledNotifyButton = styled(Button)`
  align-items: center;
  justify-content: center;
  margin: 5.5px 10px;
  background-color: white;
  border-radius: 10px;
  width: 60px;
  height: 60px;
`

export const StyledNotifyButtonInner = styled.View`
    flex-direction: row;
`

export const StyledMaterialIcons = styled(MaterialIcons)`
`

export const StyledIonicons = styled(Ionicons)`

`

export const StyledRound = styled.View`
  align-items: center;
  justify-content: center;
  background-color: orangered;
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  top: -15px;
  right: -20px;
  position: absolute;
  z-index: 5;
  
`
export const StyledLine = styled.View`
  width: 8px;
  height: 3px;
  background-color: white;
`

export const StyledInner = styled.View`
     flex-direction: row;
     align-items: center;
     flex-wrap: wrap;
`

export const StyledNotifyTime = styled.Text`
    text-align: center;
`