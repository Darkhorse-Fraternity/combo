import styled from "styled-components/native";
import HeaderBtn from '../../../components/Button/HeaderBtn'
export function followRow() {
    return (
        <StyledContent>
            <StyledInnerView>
                <StyledAvatar>
                </StyledAvatar>
                <StyledInnerRight>
                    <StyledName>
                    </StyledName>
                    <StyledDiscrib>
                    </StyledDiscrib>
                </StyledInnerRight>
            </StyledInnerView>
            <StyledFollowBtn
                load={false }
                title={'关注'}
                onPress={() => {
                    this._tapRight()
                }}/>
        </StyledContent>
    )
}


export const StyledContent = styled.View`
    background-color: white;
    
`
export const StyledInnerView = styled.View`
    
`

export const StyledInnerRight = styled.View`

`

export const StyledAvatar = styled.Image`
    width: 50px;
    height: 50px;
    border-right: 25px;
`

export const StyledName = styled.Text`
  
`

export const StyledDiscrib = styled.Text`

`

export const StyledFollowBtn = styled(HeaderBtn)`
    
`