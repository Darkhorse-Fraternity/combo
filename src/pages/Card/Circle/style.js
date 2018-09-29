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

`
