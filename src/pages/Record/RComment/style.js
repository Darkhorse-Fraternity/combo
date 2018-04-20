import styled from "styled-components/native";


export const StyledContent = styled.View`
    flex: 1;
    background-color: ${props => props.theme.contentColor};
    justify-content: space-between;
`


export const StyledHeader = styled.View`
    padding: 15px 0px 0px  0px;
    border-bottom-width: ${props => props.theme.hairlineWidth};
    border-bottom-color: ${props => props.theme.hairlineColor};
    
`


export const StyledRow = styled.TouchableOpacity`
   flex-direction: row;
   padding: 15px 15px 5px 15px;
`

export const StyledRowLeft = styled.View`

`
export const StyledAvatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right:10px;
`

export const StyledRowRight = styled.View`
    flex:1;
    border-bottom-width: ${props => props.theme.hairlineWidth};
    border-bottom-color: ${props => props.theme.hairlineColor};
`

export const StyledNickText = styled.Text`
    font-size: 17px;
    font-weight: 600;

`
export const StyledContentText = styled.Text`
   margin: 10px 0px 10px 0px;
   font-size: 16px;
`

export const StyledDate = styled.Text`
  margin: 0px 0px 10px 0px;
  color: #9ea1a1;
`