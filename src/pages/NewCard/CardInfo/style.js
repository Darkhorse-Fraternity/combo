/**
 * Created by lintong on 2018/4/13.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../../components/Button'
import { SafeAreaView } from 'react-navigation';

export const StyledContent = styled(SafeAreaView)`
    flex: 1;
    background-color: white;
`





export const StyledRow = styled.View`
  padding: 25px 15px 25px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: ${props => props.theme.hairlineWidth };
  border-bottom-color: #e4e4e4;
`

export const StyledRowTouch = styled(Button)`
  padding: 25px 15px 25px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: ${props => props.theme.hairlineWidth };
  border-bottom-color: #e4e4e4;
`

export const StyledRowText = styled.Text`
  color: #323232;
  font-size: 18px;
`

export const StyledRowDes = styled.Text`
  color: #323232;
  font-size: 19px;
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
