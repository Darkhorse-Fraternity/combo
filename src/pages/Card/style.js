/**
 * Created by lintong on 2018/3/6.
 * @flow
 */
'use strict';

import styled from "styled-components";
import { SafeAreaView } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather'
import IconSet from '../../../source/font/Iconfont'
export const StyledContent = styled(SafeAreaView)`
    flex: 1;
    background-color: white;
`


export const StyledIcon = styled(Feather)`
  align-self: center;
  padding: 3px 12px;
`

export const StyledIconSet = styled(IconSet)`
  align-self: center;
  padding: 3px 12px;
`