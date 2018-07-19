/**
 * Created by lintong on 2018/4/13.
 * @flow
 */
'use strict';

import styled from "styled-components/native";

import Button from '../../../components/Button'
import { SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

export const StyledContent = styled(LinearGradient)`
    flex: 1;
`





export const StyledRow = styled.View`
  padding: 15px 0px ;
  flex-direction: row;
  align-items: center;
 

`


export const StyledRowText = styled.Text`
  color: #323232;
  font-size: 17px;
  fontStyle:italic;
`

export const StyledRowDes = styled.Text`
  color: #323232;
  font-size: 17px;
  fontStyle:italic;
`

export const StyledRowInner = styled.View`
  flex-direction: row;
  align-items: center;
`

export const StyledArrow = styled.View`
  border-bottom-width: ${props => props.theme.hairlineWidth * 2};
  border-right-width: ${props => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
  margin-left: 5px;
`


export const StyledTitleView = styled.View`
  padding: 0px 0px 15px 0px;
`

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
`

export const StyledCourseView = styled.View`

`