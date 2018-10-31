/**
 * Created by lintong on 2018/7/18.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Icon from 'react-native-vector-icons/MaterialIcons'

export const StyledContent = styled.ScrollView`
    flex: 1;
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