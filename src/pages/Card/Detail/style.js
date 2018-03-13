/**
 * Created by lintong on 2018/3/6.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/Ionicons'



export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
`

export const StyledInner = styled.View`
`

export const StyledAgendaRow = styled.View`
  margin-top: 20px;
  border-radius: 6px;
  padding: 10px;
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

export const StyledRow = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
`

export const StyledRowText = styled.Text`
  font-size: 15px;
  color: black;
`

export const StyledBottomMenu = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
`

export const StyledBottomMenuText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 500;
`

export const StyledIcon = styled(Icon)`

`