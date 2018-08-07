/**
 * Created by lintong on 2018/7/26.
 * @flow
 */
'use strict';

import styled from "styled-components/native";

import LinearGradient from 'react-native-linear-gradient';


// export const StyledContent = styled.View`
//     flex: 1;
//     background-color: white;
// `


export const StyledTitleView = styled.View`
  padding: 20px 5px 5px 5px;
`

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
  margin-left: 10px;
`

export const StyledContent = styled(LinearGradient)`
    flex: 1;
`