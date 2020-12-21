/**
 * Created by lintong on 2018/10/12.
 * @flow
 */

import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import HeaderBtn from '../../../../components/Button/HeaderBtn';

export const StyledContent = styled(SafeAreaView)`
  /* background-color: white; */
  flex: 1;
`;

export const StyledHeader = styled.View`
  padding: 50px 20px 10px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTitle = styled.Text`
  font-weight: 500;
  font-size: 21px;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledHeaderInner = styled.View`
  flex-direction: row;
`;

export const StyledHeaderBtn = styled(HeaderBtn)<{ backgroundColor?: string }>`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.sureColor};
  margin-left: 10px;
  width: 80px;
`;

export const StyledSubTitleView = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px 0px 5px 0px;
`;

export const StyledSubTitle = styled.Text`
  font-size: 15px;
  margin: 0px 0px 10px 15px;
  padding: 5px;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledInnerScrollView = styled.ScrollView`
  padding: 10px 0px;
`;

export const StyledInnerView = styled.View`
  flex: 1;
  padding: 10px 0px;
`;

export const StyledTitleInput = styled.TextInput`
  font-size: 17px;
  background-color: ${(props) => props.theme.textinputbackgroundColor};
  height: 50px;
  color: ${({ theme }) => theme.colors.text};
`;
