/**
 * Created by lintong on 2018/7/12.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Button from '../../../components/Button'
import LinearGradient from 'react-native-linear-gradient';

export const StyledContent = styled.ScrollView`
    flex: 1;
    background-color: white;
`

export const StyledHeader = styled(LinearGradient)`
  
`

export const StyledReportBtn = styled(Button)`
    z-index: 100;
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 3px 10px;
    background-color: white;
    border-radius: 5px;
    shadow-opacity: 0.1;
    shadow-radius: 5px;
    shadow-color: #979797;
    shadow-offset: 0px 1px;   
    elevation: 2;
`

export const StyledReportText = styled.Text`
    font-size: 13px;
    color: #979797;
`


export const StyledTitleView = styled.View`
  padding: 15px;
`

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
  margin-left: 10px;
`