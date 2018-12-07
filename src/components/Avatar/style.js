/**
 * Created by lintong on 2018/9/29.
 * @flow
 */
'use strict';

import styled from "styled-components";

export const StyledContent = styled.View`
    background-color: white;
    border-radius: ${props=>props.radius};
    border-width: 1px;
    border-color: white;
    shadow-opacity: 1;
    shadow-radius: 5px;
    shadow-color: #979797;
    shadow-offset: 0px 0px;   
    elevation: 5;
    margin:5px
`

export const StyledContent2 = styled.View`
    background-color: white;
    border-radius: ${props=>props.radius};
    border-width: 1px;
    border-color: white;
`

export const StyledAvatar = styled.Image`
    width:${props=>props.radius * 2};
    height:${props=>props.radius * 2};
    border-radius: ${props=>props.radius};
    background-color: #fdfbfb;
`

export const StyledIndicator = styled.ActivityIndicator`
    align-self: center;
    width:${props => props.radius * 2};
    height:${props => props.radius * 2};
    border-radius: ${props => props.radius};
`