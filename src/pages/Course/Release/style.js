/**
 * Created by lintong on 2018/7/9.
 * @flow
 */
'use strict';

import styled from "styled-components";
import HeaderBtn from "../../../components/Button/HeaderBtn";


export const StyledContent = styled.ScrollView`
    flex: 1;
    background-color: white;
`

export const StyledHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px;
`

export const StyledTitle = styled.Text`
   font-size: 17px;
   font-weight: 700;
   
`

export const StyledList = styled.FlatList`
  flex:1;
`


export const StyledMain = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const StyledDes = styled.Text`
   font-size: 20px;
   color: #bfbfbf;

`


export const StyledEditBtn = styled(HeaderBtn)`

  width:60px;
`


export const StyledHeaderBtn = styled(HeaderBtn)`
    margin-top: 20px;
    padding: 0px 15px;
    width:60px;
    
`
