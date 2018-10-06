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
    background-color: white;
`

export const StyledImage = styled.Image`
    width: 200px;
    height: 200px;
    margin-top: ${props=> props.theme.height/6};
    align-self: center;
`
export const SyledImageName = styled.Text`
    font-size: 25px;
    margin-top: -10px;
    align-self: center;
`

export const ThirdPartyLoginView = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: center;
`
export const ThirdPartyInnerLoginView = styled.View`
    flex-direction: row;
    margin: 100px 0px;
    padding: 15px;
`

export const StyledIconItem = styled(TouchableBounce)`
  align-items: center;
  width: 100px;
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
    padding:10.5px;
`
