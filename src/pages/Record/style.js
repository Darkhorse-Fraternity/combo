/**
 * Created by lintong on 2018/9/25.
 * @flow
 */
'use strict';

import styled from "styled-components";
import HeaderBtn from '../../components/Button/HeaderBtn'
import Icon from 'react-native-vector-icons/MaterialIcons'

export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
`


export const StyledHeader = styled.View`
    padding: 15px 15px 15px 20px;
`

export const StyledHeaderTitle = styled.Text`
   font-size: 20px;
   font-weight: 500;
`

export const StyledHeaderBtn = styled(HeaderBtn)`

`
export const StyledHeaderButtonText = styled.Text`

`


export const StyledIcon = styled(Icon)`
    align-self: center;
`


export const StyledDeleteBtn = styled.View`
   align-items: center;
   justify-content: center;
   flex:1
`

export const StyledDeleteBtnText = styled.Text`
  color: ${props=>props.color};
  margin: 3px;
  font-size: 13px;
  font-weight: 300;
`