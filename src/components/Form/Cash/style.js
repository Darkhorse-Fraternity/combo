/**
 * Created by lintong on 2018/8/22.
 * @flow
 */


import styled from 'styled-components';
import { TextInput } from '../Cunstom';
import HeaderBtn from '../../Button/HeaderBtn';

export const StyledContent = styled.View`
    background-color: white;
    padding-bottom: 20px;
`;

export const StyledInput = styled(TextInput)`
    height: 45px;
    border-bottom-width: ${props => props.theme.hairlineWidth};
    border-bottom-color: black ;
    margin: 20px 0px;
    font-size: 17px;
    background-color: white;
`;

export const StyledHeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const StyledHeaderTitle = styled.Text`
   font-size: 20px;
`;

export const StyledHeaderBtn = styled(HeaderBtn)`
`;

export const StyledTitleText = styled.Text`
  margin-top: 15px;
  font-size: 15px;
`;
