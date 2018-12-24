/**
 * Created by lintong on 2018/7/30.
 * @flow
 */
'use strict';

import styled from "styled-components";
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../../../components/Button'
import HeaderBtn from '../../../components/Button/HeaderBtn'
import LinearGradient from 'react-native-linear-gradient';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

export const StyledContent = styled(LinearGradient)`
    flex: 1;
`

export const StyledImage = styled.Image`
    width: 100px;
    height: 100px;
    margin-top: ${props=> 20};
    align-self: center;
`

export const StyledImageBottom = styled.Image`
  width: 100%;
  height: ${props => props.theme.height * 0.3};
`

export const SyledImageName = styled.Text`
    font-size: 20px;
    align-self: center;
`

export const ThirdPartyLoginView = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
`
export const ThirdPartyInnerLoginView = styled.View`
    flex-direction: row;
    margin: 20px 0px;
    padding: 0px ${props => props.isWXAppInstalled?80:props.theme.width/2}px;
    width: 100%;
    justify-content: space-between;
`

export const StyledIconItem = styled(TouchableBounce)`
  align-items: center;
`



export const StyledIconView = styled.View`
   align-items: center;
   justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 30px;   
`

export const StyledIconText = styled.Text`
   margin-top: 10px;
   color: #979797;
`

export const StyledIcon = styled(Icon)`
    align-self: center;
`

export const StyledActivityIndicator = styled.ActivityIndicator`
`

export const StyledCodeButton = styled(Button)`

`

export const StyledCodeButtonText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: #333333;
`


export const StyledSignInBtn = styled(HeaderBtn)`
    background-color: ${props=>props.disabled?
      props.theme.disabledColor:props.theme.mainColor};
    margin: 30px;
    padding:13px;
    border-radius: 20px;
    width: 200px;
    align-self: center;
`
