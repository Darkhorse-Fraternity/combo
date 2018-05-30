/**
 * Created by lintong on 2018/3/6.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/Ionicons'
import FlipCard from 'react-native-flip-card'


export const StyledContent = styled.TouchableOpacity`
    z-index: 10;
    position: absolute;
    right: 10px;
    bottom: 50px;
`

export const StyledCard = styled(FlipCard)`
    width: 80px;
    height: 80px;
    border-width: 0;
`

export const StyledFace = styled.View`
    flex:1;
    background-color: white;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    shadow-opacity: 0.25;
    shadow-radius: 5px;
    shadow-color: black;
    shadow-offset: 1px 3px;   
    elevation: 5;
    margin: 10px;
`

export const StyledBack = styled.View`
    flex:1;
    background-color: white;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    shadow-opacity: 0.25;
    shadow-radius: 5px;
    shadow-color: black;
    shadow-offset: 3px 3px; 
    elevation: 5;
    margin: 10px; 
`

export const StyledFaceText = styled.Text`
    font-weight: 500;
    line-height: 18px;
    
`

export const StyledBackText = styled.Text`
    font-weight: 500;
    color: #a6a6a6;
    font-size:12px;
`

export const StyledIcon = styled(Icon)`
    align-self: center;
`

