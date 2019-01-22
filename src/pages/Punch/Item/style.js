/**
 * Created by lintong on 2018/10/11.
 * @flow
 */
'use strict';

import styled from "styled-components";
import FlipCard from 'react-native-flip-card'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';


export const StyledButton = styled(TouchableBounce)`

`

export const StyledFlipCard = styled(FlipCard)`
    border-width: 0;
`

export const StyledCard = styled.View`
   justify-content: space-between;
   background-color: ${props => props.backgroundColor};
   width: ${props => props.width};
   height: ${props => props.width * 1.4};
   border-radius: 6px;
   padding: 10px 5px ;
   marginRight: 10px;
   margin-bottom: 10px;
    shadow-opacity: 0.6;
    shadow-radius:3px;
    shadow-color: ${props => props.backgroundColor};
    shadow-offset: 2px 2px; 
   overflow: hidden;
`


export const StyledCardTitleView = styled.View`
   justify-content: center;
   align-items: center;
`

export const StyledCardTitle = styled.Text`
   font-size: 15px;
   text-align: center;
   width: 80px;
`

export const StyledCardDis = styled.Text`
   font-size: 12px;
   font-style: italic;
   margin-bottom: 5px;
   text-align: right;
`

export const StyledMaterialCommunityIcons = styled(MaterialCommunityIcons)``


export const StyledIconImage = styled.Image`
    width: ${props => props.size};
   height: ${props => props.size};
`

export const StyledInner = styled.View`
  align-items: center;
  justify-content: center;
  height: ${props => props.height};
`


export const StyledTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  
`

export const StyledFB = styled.View`
  background-color: #ff1744;
  align-items: center;
  padding: 3px 15px;
  margin-left: -20px;
 transform: rotate(315deg);
 margin-top: -8px;
 height:20px;

  
`

export const StyledFBText = styled.Text`
  color: white;
  font-weight:500;
`