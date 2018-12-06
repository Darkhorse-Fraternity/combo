/**
 * Created by lintong on 2018/4/9.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Button from '../../../components/Button'
import { SafeAreaView } from 'react-navigation';
import ZoomImage from '../../../components/ZoomImage/ZoomImage'

export const StyledContent = styled(SafeAreaView)`
    flex: 1;
`
export const StyleHeader = styled.View`
  margin-top: 10px;
  padding: 15px 20px;

`

export const StyledHeaderTop = styled.View`
    margin-bottom: 5px;
`

export const StyleHeaderInner = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
export const StyleHeaderInnerLeft = styled.View`
  justify-content: space-between;

`
export const StyleHeaderInnerRight = styled.View`
   flex-direction: row;
  align-items: center;
  justify-content: space-between;

`

export const StyledAvatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: lightgray;
`
export const StyledSmallAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`

export const StyledRowContent = styled(Button)`
    background-color: white;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
`
export const StyledInnerView = styled.View`
    flex-direction: row;
     align-items: center;
`

export const StyledInnerRight = styled.View`
  margin-left: 10px;
`


export const StyledName = styled.Text`
  font-size: 17px;
`

export const StyledDiscrib = styled.Text`
   margin-top: 5px;
   color: #9ea0a0;
   font-size: 13px;
`

export const StyledArrow = styled.View`
  border-bottom-width: ${props => props.theme.hairlineWidth * 2};
  border-right-width: ${props => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
`

export const StyledHeaderBottom = styled.View`
    flex-direction: column-reverse;
   padding: 25px 0px;
`


export const StyledHeaderName = styled.Text`
    font-size: 21px;
    font-weight: 500;
    max-width: 150px;
`

export const StyledZoomImage = styled(ZoomImage)`
    width: 90px;
    height: 90px;
    
`

export const StyleFollowTipText = styled.Text`
    margin-top: 1px;
    font-size: 13px; 
    color: #646464;
`

export const StyledBottomTitle = styled.Text`

`