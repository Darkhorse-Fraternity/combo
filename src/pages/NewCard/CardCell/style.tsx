/**
 * Created by lintong on 2018/7/23.
 * @flow
 */

import styled from 'styled-components/native';
// import Button from '../../../components/Button'
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

import { StyleSheet, Dimensions, Platform } from 'react-native';

const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};

const IS_IOS = Platform.OS === 'ios';
const { width } = Dimensions.get('window');

const slideWidth = (width - 10) / 4;
const slideHeight = slideWidth;

const entryBorderRadius = 8;

export const StyledContent = styled(TouchableBounce)`
    /* width: ${(props) => (props.theme.getWidth() - 10) / 4}; */
    flex:1;
    padding: 0px;
    align-items: center;
    margin-top: 15px;
`;

export const StyledContent2 = styled(TouchableBounce)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledImageBack = styled.View`
  background-color: ${(props) => props.color};
  border-radius: 10px;
  padding: 10px;
`;

export const StyledImage = styled.Image`
  width: 30px;
  height: 30px;
`;

export const StyledInnerView = styled.View`
  flex-direction: row;
  margin: 10px 20px;
`;

export const StyledDes = styled.Text`
  margin-top: 6px;
  color: #888888;
  font-size: 12px;
  font-style: italic;
`;

export const StyledTitle = styled.Text`
  color: #1a1917;
  font-size: 11px;
  letter-spacing: 0.5px;
  margin-top: 3px;
  max-width: 100px;
  line-height: 14px;
`;

export const StyledTitle2 = styled.Text`
  color: #1a1917;
  font-size: 17px;
  margin-left: 10px;
  margin-top: 5px;
  max-width: 200;
`;
export const StyledNotify = styled.Text`
  color: #808080;
  font-size: 15px;
  margin-left: 10px;
  margin-top: 8px;
  max-width: 200;
`;

export const StyledImageBack2 = styled.View`
  background-color: ${(props) => props.color};
  border-radius: 10px;
  padding: 10px;
  align-items: center;
  height: 60px;
`;

export const StyledImage2 = styled.Image`
  width: 40px;
  height: 40px;
`;

export const StyledArrowView = styled.View`
  border-bottom-width: ${(props) => props.theme.hairlineWidth * 2};
  border-right-width: ${(props) => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
  margin-right: 20px;
`;
