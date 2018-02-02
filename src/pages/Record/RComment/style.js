import styled from "styled-components/native";


export const StyledContent = styled.View`
    flex: 1;
    background-color: ${props => props.theme.contentColor};
    justify-content: space-between;
`
export const StyledBody = styled.View`
    flex: 1;
    padding: 0px 15px 0px 15px;
`

export const StyledHeader = styled.View`
    border-bottom-width: ${props => props.theme.hairlineWidth};
    border-bottom-color: ${props => props.theme.hairlineColor};
`