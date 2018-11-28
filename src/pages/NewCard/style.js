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
  padding: 25px 10px 0px 10px;
  overflow: hidden;
`

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
  margin-left: 10px;
`


export const StyledTop = styled.ScrollView`
`

export const StyledHeader = styled.View`
  margin: 15px 10px 0px 10px;
  padding: 15px 10px;
  overflow: visible;
`



export const StyledHeaderText = styled.Text`
  font-size: 20px;
  color:${materialColors.blackPrimary};
  overflow: visible;
  padding: 20px 15px;
`

export const StyledHerderButton = styled(HeaderBtn)`
  padding:11px 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: visible;
`