/**
 * Created by lintong on 2018/8/17.
 * @flow
 */

import styled from 'styled-components/native';
import HeaderBtn from '../../../components/Button/HeaderBtn';

export const StyledHeader = styled.View`
  padding: 15px 20px 0px 20px;
`;

export const StyledTitleView = styled.View`
  padding: 45px 15px 5px 0px;
`;

export const StyledRow = styled.View`
  margin-top: 15px;
  padding: 15px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.textinputbackgroundColor};
`;
export const StyledRowInner = styled.View``;

export const StyledDiscrib = styled.Text`
  margin-bottom: 3px;
  font-size: 13px;
  color: #bfc2ce;
  line-height: 25px;
`;

export const StyledContent = styled.ScrollView`
  background-color: white;
  padding-bottom: 20px;
`;

export const StyledInput = styled.TextInput`
  height: 45px;
  border-bottom-width: ${(props) => props.theme.hairlineWidth};
  border-bottom-color: rgba(1, 1, 1, 0.2);
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

export const StyledHeaderBtn = styled(HeaderBtn)``;

export const StyledTitleText = styled.Text`
  margin-top: 15px;
  font-size: 15px;
`;
