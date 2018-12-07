/**
 * Created by lintong on 2018/9/25.
 * @flow
 */
'use strict';

import styled from "styled-components";
import HeaderBtn from '../../components/Button/HeaderBtn'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {BorderlessButton} from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-navigation';

export const StyledContent = styled(SafeAreaView)`
    flex: 1;
    background-color: white;
`


export const StyledHeader = styled.View`
    padding: 15px 20px 30px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`



export const StyledHeaderTitle = styled.Text`
   font-size: 21px;
   font-weight: 500;
   max-width: 200px;
`

export const StyledAdd = styled(BorderlessButton)`
    padding: 10px;
    flex-direction: row;
    align-items: center;
`

export const StyledIonicons = styled(Ionicons)`
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


