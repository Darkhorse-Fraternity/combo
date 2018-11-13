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
   align-items: center;
   justify-content: center;
   background-color: ${props=>props.backgroundColor};
   width: ${props=>props.width};
   border-radius: 6px;
   padding: 20px 10px 20px 10px;
   margin: 6px;
    shadow-opacity: 0.6;
    shadow-radius:3px;
    shadow-color: ${props => props.backgroundColor};
    shadow-offset: 2px 2px; 
`


export const StyledCardTitleView = styled.View`
   justify-content: center;
   align-items: center;
   margin-top: 10px;
   height:40px;
`

export const StyledCardTitle = styled.Text`
   font-size: 15px;
   text-align: center;
   width: 80px;
`

export const StyledCardDis = styled.Text`
   font-size: 12px;
   font-style: italic;
   text-align: center;
   width: 80px;
   margin-top: 3px;
   color: #646464;
`

export const StyledMaterialCommunityIcons = styled(MaterialCommunityIcons)``


export const StyledIconImage = styled.Image`
  width: ${props => props.size};
   height: ${props => props.size};
`