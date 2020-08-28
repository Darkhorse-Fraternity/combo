/**
 * Created by lintong on 2018/7/18.
 * @flow
 */
'use strict';

import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BorderlessButton } from 'react-native-gesture-handler';
import { FlatList, Platform } from 'react-native';
import { SafeAreaView } from 'react-native';
import AnimationRow from '@components/AnimationRow';

export const StyledContent = styled.ScrollView`
  flex: 1;
`;

export const StyledList = (styled(FlatList)`
` as React.ReactNode) as new <T>() => FlatList<T>;

export const StyledHeader = styled.View`
  padding: 10px 20px 24px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
`;

export const StyledInnerdContent = styled(SafeAreaView)`
  flex: 1;
`;

export const StyledIcon = styled(Feather)`
  align-self: center;
`;

export const StyledAntDesign = styled(AntDesign)``;

export const StyledDeleteBtn = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const StyledDeleteBtnText = styled.Text`
  color: ${props => props.color};
  margin: ${props => (Platform.OS === 'ios' ? 5 : 3)}px;
  font-size: 13px;
  font-weight: 300;
`;

export const StyledAdd = styled(BorderlessButton)`
  padding: 10px;
`;

export const StyledIonicons = styled(Ionicons)`
  align-self: center;
`;

export const StyledAnimationRow = styled(AnimationRow)`
  flex:1 0;
`