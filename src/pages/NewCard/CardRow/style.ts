/**
 * Created by lintong on 2018/7/23.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
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

const slideWidth = (width - 20) / 2;
const slideHeight = width * 0.63;

const entryBorderRadius = 8;


export const StyledContent = styled(TouchableBounce)`
    width: ${slideWidth};
    height: ${slideHeight};
    padding: 0px;
    padding-bottom: 8px;
`


export const StyledImage = styled.Image`
    width: 100%;
    border-radius: ${IS_IOS ? entryBorderRadius : 0}px;
    
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
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 0.5px;
`


export default StyleSheet.create({

  shadow: {
    // position: 'absolute',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius,
    elevation: 15,
    marginHorizontal: 7.5,

  },

  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
},

  image: {
    ...StyleSheet.absoluteFillObject,
    // resizeMode: 'cover',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  imageDefault:{
    width: slideWidth/2,
    height:slideWidth/2,
    top:slideHeight/5,
    left:slideWidth/4.5,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white'
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 10 - entryBorderRadius,
    paddingBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
});
