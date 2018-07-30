/**
 * Created by lintong on 2018/7/30.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../../../components/Button'

export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
`

export const StyledImage = styled.Image`
    width: 200px;
    height: 200px;
    margin-top: 30px;
    align-self: center;
`
export const SyledImageName = styled.Text`
    font-size: 25px;
    margin-top: -10px;
    align-self: center;
`

export const ThirdPartyLoginView = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
`
export const ThirdPartyInnerLoginView = styled.View`
    flex-direction: row;
    margin: 100px 0px;
`

export const StyledIconItem = styled(Button)`
  align-items: center;
`

export const StyledIconView = styled.View`
   align-items: center;
   justify-content: center;
    width: 70px;
    height: 70px;
    border-radius: 35px;   
`

export const StyledIconText = styled.Text`
   margin-top: 10px;
   color: #979797;
`

export const StyledIcon = styled(Icon)`
    align-self: center;
`