/**
 * Created by lintong on 2018/4/13.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/Ionicons'


export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
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