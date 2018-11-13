/**
 * Created by lintong on 2018/7/12.
 * @flow
 */
'use strict';

import styled from "styled-components";
// import Button from '../../../components/Button'
import HeaderBtn from '../../../components/Button/HeaderBtn'
import Button from '../../../components/Button'

export const StyledContent = styled.ScrollView`
    flex: 1;
    background-color: white;
`

export const StyledHeader = styled.View`
    margin: 10px 15px;
    padding: 7px 15px;
    background-color: white;
    border-radius: 5px;
    shadow-opacity: 0.5;
    shadow-radius:10px;
    shadow-color: #979797;
    shadow-offset: 2px 4px;      
    elevation: 10;
    flex-direction: row;
    flex-wrap: wrap;
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

export const StyledHeaderButton = styled(Button)`
   border-radius: 10px;
   padding: 5px;
   margin: 5px;
   align-items: center;
`

export const StyledHeaderImage = styled.Image`
   width: 30px;
   height: 30px;
`

export const StyledHeaderText = styled.Text`
  margin-top: 8px;
  font-size: 12px;
`