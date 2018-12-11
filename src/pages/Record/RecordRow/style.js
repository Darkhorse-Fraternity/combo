import styled from "styled-components";
import Button from '../../../components/Button'
import ZoomImage from '../../../components/ZoomImage/ZoomImage'
import Icon from 'react-native-vector-icons/Ionicons'


export const StyledButton = styled.TouchableOpacity`

`

export const StyledImage = styled.Image`
    width: 100%;
    height: ${props =>props.theme.width * 0.7};
    border-radius: 10px;
    margin: 15px 0px 0px 0px; 
    background-color: #fdfbfb;
`

export const StyledZoomImage = styled(ZoomImage)`
    height: ${props =>(props.theme.width-80) * 0.7};
    border-radius: 10px;
    margin: 15px 45px ;
    background-color: #fdfbfb;
`


export const StyledTop = styled.View`
    padding: 0px 0px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const StyledBottom = styled.View`
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 0px 0px;
`

export const StyledDateView = styled.View`
    margin: 10px 0px 0px 0px; 
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const StyledNewTip = styled.View`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: red;
    margin-right: 5px;
    
`

export const StyledDateText = styled.Text`
    font-size: 18px;
    color: #969697;
`

export const StyledRecordText = styled.Text`
  
   font-size: 19px;
   margin: 20px 0px 0px 0px; 
`

export const StyledIcon = styled(Icon)`
    align-self: center;
`

export const StyledChatbtn = styled.View`
    justify-content: space-between;
    margin: 4px;
    flex-direction: row;
    align-items: center;
`
export const StyledChatBtnText = styled.Text`
    margin-left: 5px;
`

export const StyledArrowView = styled.View`
  border-bottom-width: ${props => props.theme.hairlineWidth * 2};
  border-right-width: ${props => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
  margin-left: 5px;
`