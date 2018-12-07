/**
 * Created by lintong on 2018/3/6.
 * @flow
 */
'use strict';

import styled from "styled-components";

import HeaderBtn from '../../../components/Button/HeaderBtn'

export const StyledContent = styled.View`
    flex: 1;
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
  padding: 25px 20px 5px 20px;
  flex-direction: row;
  align-items: center;
`

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
`

export const StyledHeaderBtn = styled(HeaderBtn)`
  background-color: ${props=>props.backgroundColor||props.theme.sureColor};
`


export const StyledRow = styled.View`
  padding: 15px 20px;
  flex-direction: row;
  
`



export const StyledRowText = styled.Text`
  font-size: 15px;
  color: black;
  fontStyle:italic;
`

