/**
 * Created by lintong on 2018/9/25.
 * @flow
 */
'use strict';

import styled from 'styled-components/native';
import HeaderBtn from '@components/Button/HeaderBtn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Platform, SafeAreaView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

export const Styledcontain = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`;

export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
  max-width: 200px;
  margin-left: 20px;
  margin: 10px 20px 20px 20px;
  background-color: white;
`;

export const StyledAdd = styled(BorderlessButton)`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

export const StyledIonicons = styled(Ionicons)``;

export const StyledAntDesign = styled(AntDesign)``;

export const StyledHeaderBtn = styled(HeaderBtn)``;
export const StyledHeaderButtonText = styled.Text``;

export const StyledIcon = styled(Feather)`
  align-self: center;
`;

export const StyledDeleteBtn = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const StyledDeleteBtnText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  margin: ${(props) => (Platform.OS === 'ios' ? 5 : 3)}px;
  font-size: 13px;
  font-weight: 300;
`;

export const StyledHeaderText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 13px;
`;
