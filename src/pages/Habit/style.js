/**
 * Created by lintong on 2018/7/18.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {BorderlessButton} from 'react-native-gesture-handler'

export const StyledContent = styled.ScrollView`
    flex: 1;
`

export const StyledHeader = styled.View`
    padding: 44px 20px 24px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
`

export const StyledInnerdContent = styled.View`
  flex: 1;
  background-color: white;
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

export const StyledAdd = styled(BorderlessButton)`
    padding: 10px;
`

export const StyledIonicons = styled(Ionicons)`
    align-self: center;
`

