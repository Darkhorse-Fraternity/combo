/**
 * Created by lintong on 2018/8/19.
 * @flow
 */

'use strict';

import styled from "styled-components";
import HeaderBtn from "../../components/Button/HeaderBtn";
import { materialColors } from 'react-native-typography'

export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
`

export const StyledTitleView = styled.View`
  padding: 15px 15px 15px 15px;
`

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
  margin-left: 10px;
`

export const StyledHeader = styled.View`
  border-radius: 15px;
  margin: 15px;
  padding: 15px 10px;
`


export const StyledHeaderText = styled.Text`
  font-size: 20px;
  color:${materialColors.blackPrimary};
`

export const StyledHerderButton = styled(HeaderBtn)`
  padding:11px 5px;
  margin-top: 30px;
`