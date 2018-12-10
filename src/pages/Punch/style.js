/**
 * Created by lintong on 2018/7/18.
 * @flow
 */
'use strict';

import styled from "styled-components";
import { SafeAreaView } from 'react-navigation';

export const StyledContent = styled.View`
     flex: 1;
     padding: 0px 20px;
`



export const StyledHeader = styled.View`
    padding: 44px 0px 5px 0px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const StyledHeaderTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
`

export const StyledSectionHeader = styled.View`
  padding: 25px 0px 15px 0px ;
  background-color: white;
`


export const StyledSectionHeaderTitle = styled.Text`
  font-size: 19px;  
  font-weight: 500;
 
`