/**
 * Created by lintong on 2018/8/17.
 * @flow
 */



import styled from 'styled-components/native';
import HeaderBtn from '../../../components/Button/HeaderBtn';


export const StyledContent = styled.ScrollView`
    flex: 1;
    background-color: white;
`;
export const StyledHeader = styled.View`
    padding: 15px 20px 0px 20px;
`;


export const StyledHeaderBtn = styled(HeaderBtn)`
    padding: 0px 15px;
`;


export const StyledTitleView = styled.View`
  padding: 45px 15px 5px 0px;
`;

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
`;

export const StyledRow = styled.View`
    margin-top: 15px;
    padding: 15px 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.textinputbackgroundColor};
`;
export const StyledRowInner = styled.View`

`;


export const StyledDiscrib = styled.Text`
    margin-bottom: 3px;
    font-size: 17px;
    color: #bfc2ce;
    line-height: 25px;
`;
