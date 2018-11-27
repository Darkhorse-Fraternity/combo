/**
 * Created by lintong on 2018/8/19.
 * @flow
 */

'use strict';

import styled from "styled-components";
import HeaderBtn from "../../components/Button/HeaderBtn";
import { materialColors } from 'react-native-typography'
import { SafeAreaView } from 'react-navigation';

export const StyledContent = styled(SafeAreaView)`
    flex: 1;
    background-color: white;
`

export const StyledTitleView = styled.View`
  padding: 20px 10px 5px 10px;
`

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
  margin-left: 10px;
`

export const StyledHeader = styled.View`
  border-radius: 15px;
  margin: 15px 10px;
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