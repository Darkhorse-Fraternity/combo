import { StyleSheet, Dimensions } from 'react-native';
import styled from "styled-components";
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import Button from '../../../components/Button'
// import { colors } from 'example/src/styles/index.js.style';
const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};


export const StyledContent = styled(Button)`
    padding: 10px 20px;
    flex-direction: row;
`

export const StyledInner = styled.View`
    margin: 5px 15px;
`




export const StyledTitle = styled.Text`
    color: #1a1917;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 0.5px;
`

export const StyledTime = styled.Text`
    margin-top: 5px;
    color: #1a1917;
    font-size: 12px;
`

export const StyledDes = styled.Text`
    margin-top: 5px;
    color: #888888;
    font-size: 11px;
    font-style: italic;
`


export const StyledIconBG = styled.View`
   height:62px;
   width: 62px;
   background-color: ${props => props.color};
   align-items: center;
   justify-content: center; 
   border-radius: 5px;  
    shadow-opacity: 0.6;
    shadow-radius:3px;
    shadow-color: ${props => props.color};
    shadow-offset: 2px 2px; 
`