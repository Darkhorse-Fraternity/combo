/**
 * Created by lintong on 2018/8/19.
 * @flow
 */

import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HeaderBtn from '../../components/Button/HeaderBtn';

export const StyledContent = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`;

export const StyledTitleView = styled.View`
  padding: 25px 10px 0px 10px;
  overflow: hidden;
`;

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
  margin-left: 10px;
`;

export const StyledTop = styled.ScrollView``;

export const StyledHeader = styled.View`
  margin: 15px 10px 0px 10px;
  padding: 15px 10px;
  overflow: visible;
`;

export const StyledHeaderText = styled.Text`
  font-size: 20px;
  color: ${props=>props.theme.blackPrimary};
  overflow: visible;
  padding: 20px 15px;
  align-self: center;
`;

export const StyledHerderButton = styled(HeaderBtn)`
  padding: 11px 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  align-self: center;
  width: ${(props) => props.theme.width - 50}px;
  max-width: 380px;
  overflow: visible;
`;

export const StyledIcon = styled(Icon)``;

export const StyledNarBarRightView = styled.View`
  flex-direction: row;
  padding-right: 10px;
`;
