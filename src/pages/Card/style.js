/**
 * Created by lintong on 2018/3/6.
 * @flow
 */
'use strict';

import styled from "styled-components";
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
export const StyledContent = styled(SafeAreaView)`
    flex: 1;
    background-color: white;
`


export const StyledIcon = styled(Icon)`
  align-self: center;
  padding: 3px 12px;
`

export const StyledEntypoIcon = styled(Entypo)`
  align-self: center;
  padding: 3px 12px;
`