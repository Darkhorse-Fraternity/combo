/**
 * Created by lintong on 2019/1/2.
 * @flow
 */
'use strict';

import styled from "styled-components";
import { SafeAreaView } from 'react-navigation';
import { Platform } from 'react-native'
import Button from '../../components/Button'
import FastImage from 'react-native-fast-image'


export const StyledContent = styled(SafeAreaView)`
    flex: 1;
`

export const StyledHeader = styled.View`
    padding: ${Platform.OS === 'ios' ? 44 : 64}px 20px 24px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
`


export const StyledItem = styled(Button)`
 padding: 20px ;
`

export const StyledItemImage = styled(FastImage)`
  width: ${props => props.theme.width - 40};
  height: 250px;
  border-radius: 20px;
  align-self: center;
`

export const StyledItemText = styled.Text`
  position: absolute;
  bottom: 50px;
  left: 40px;
  font-size: 20px;
  font-weight: 500;
`