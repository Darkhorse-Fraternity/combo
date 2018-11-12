/**
 * Created by lintong on 2018/7/12.
 * @flow
 */
'use strict';

import styled from "styled-components";
// import Button from '../../../components/Button'
import HeaderBtn from '../../../components/Button/HeaderBtn'

export const StyledContent = styled.ScrollView`
    flex: 1;
    background-color: white;
`

export const StyledHeader = styled.View`
    margin: 10px 15px;
    padding: 10px 15px;
    background-color: white;
    border-radius: 5px;
    shadow-opacity: 0.5;
    shadow-radius:10px;
    shadow-color: #979797;
    shadow-offset: 2px 4px;      
    elevation: 10;
`


export const StyledTitleView = styled.View`
  padding: 15px;
   flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
  margin-left: 10px;
`

export const StyledHeaderBtn = styled(HeaderBtn)`
   background-color: green;
`
