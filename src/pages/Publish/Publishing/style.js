/**
 * Created by lintong on 2018/10/10.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Icon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
// import Button from '../../../components/Button'
export const StyledContent = styled.ScrollView`
    flex: 1;
`
export const StyledTitle = styled.Text`
   font-size: 21px;
   font-weight: 700;
   margin-bottom: 30px;
`

export const StyledHeader = styled.View`
  padding: 20px 15px;
   
`

export const StyledSubTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.titleBackViewColor};
    border-radius: 10px;
    margin: 5px 0px ;
    padding: 20px 15px;
   
`

export const StyledSubTitleText = styled.Text`
    font-size: 17px;
    margin-left: 10px;

`
export const StyledSwitch = styled.Switch`

`

export const StyledRowInner = styled.View`
  flex-direction: row;
  align-items: center;
`

export const StyledIcon = styled(Icon)`
    align-self: center;
`

export const StyledEntypoIcon= styled(EntypoIcon)``