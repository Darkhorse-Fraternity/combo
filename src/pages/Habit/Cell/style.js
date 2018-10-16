import { StyleSheet, Dimensions } from 'react-native';
import styled from "styled-components";
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
// import { colors } from 'example/src/styles/index.js.style';
const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};

const { width } = Dimensions.get('window');

const slideWidth = (width - 20) / 2;
const slideHeight = width * 0.63;



export const StyledContent = styled(TouchableBounce)`
    width: ${slideWidth};
    height: ${slideHeight};
    padding: 0px;
    padding-bottom: 8px;
`


export const StyledDes = styled.Text`
    margin-top: 6px;
    color: #888888;
    font-size: 12px;
    font-style: italic;
`

export const StyledTitle = styled.Text`
    color: #1a1917;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 0.5px;
`


