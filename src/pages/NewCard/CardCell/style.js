/**
 * Created by lintong on 2018/7/23.
 * @flow
 */
'use strict';

import styled from "styled-components";
// import Button from '../../../components/Button'
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

import {
  StyleSheet,
  Dimensions,
  Platform } from 'react-native';


const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};





const IS_IOS = Platform.OS === 'ios';
const { width } = Dimensions.get('window');

const slideWidth = (width -10)/4;
const slideHeight = slideWidth;

const entryBorderRadius = 8;


export const StyledContent = styled(TouchableBounce)`
    width: ${slideWidth};
    height: ${slideHeight};
    padding: 0px;
    padding-bottom: 8px;
    align-items: center;
`


export const StyledImageBack = styled.View`
  background-color: ${props => props.color};
  border-radius: 10px;
  padding: 10px;
`

export const StyledImage = styled.Image`
    width: 30px;
    height: 30px;
   
`

export const StyledInnerView = styled.View`
`


export const StyledDes = styled.Text`
    margin-top: 6px;
    color: #888888;
    font-size: 12px;
    font-style: italic;
`

export const StyledTitle = styled.Text`
    color: #1a1917;
    font-size: 11px;
    letter-spacing: 0.5px;
    margin-top: 3px;
    max-width: 100px;
    line-height: 14px;
`


