/*
 * @Author: tonyYo
 * @Date: 2020-12-25 10:04:27
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-05 17:37:57
 * @FilePath: /Combo/src/pages/Flag/Detail/style.ts
 */
/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import styled from 'styled-components/native';
import { Platform, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Button, { ButtonOpacity } from '../../../components/Button';

export const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

export const StyledContent = styled.ScrollView`
  flex: 1;
  /* background-color: white; */
`;

export const StyledHeader = styled.View`
  padding: 20px 20px 14px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const StyledHeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
`;

export const StyledHeaderDiecribView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledHeaderDiecrib = styled.Text<{ fontSize?: number }>`
  color: #ef9340;
  font-size: ${(props) => props.fontSize || 14}px;
`;

export const StyledCover = styled(FastImage)`
  width: ${(props) => props.theme.width - 40};
  height: ${(props) => (props.theme.width - 40) * 0.6}px;
  border-radius: 20px;
  align-self: center;
  margin-bottom: 20px;
  max-width: 550px;
  max-height: 350px;
  margin-top: 20px;
`;

export const StyledFlagView = styled.View`
  padding: 20px;
`;

export const StyledMemberView = styled.View`
  padding: 20px 20px 20px 20px;
`;

export const StyledMemberTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const StyledTaskView = styled.View`
  margin: 20px 20px 20px 20px;
  background-color: ${({ theme }) => theme.colors.card};
  shadow-opacity: 0.15;
  shadow-radius: 5px;
  shadow-color: #979797;
  shadow-offset: 0px 1px;
  flex-direction: row;
  border-radius: 12px;
  height: 64px;
  align-items: center;
  elevation: 10;
`;

export const StyledItemView = styled.View`
  margin: 0px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const StyledTitle = styled.Text<{ color?: string }>`
  font-size: 16px;
  color: ${(props) => props.color || props.theme.colors.textPrimary};
  /* margin-bottom: 5px; */
`;

export const StyledDiscrib = styled.Text<{ fontSize?: number }>`
  font-size: ${(props) => props.fontSize || 14}px;
  line-height: 25px;
  color: ${(props) => props.theme.colors.text};
  margin-top: 20px;
`;
export const StyledTaskDiscrib = styled.Text<{ fontSize?: number }>`
  font-size: ${(props) => props.fontSize || 13}px;
  line-height: 25px;
  color: ${(props) => props.theme.colors.titleSecondary};
`;

export const StyledTaskDiscrib2 = styled.Text<{ fontSize?: number }>`
  font-size: ${(props) => props.fontSize || 14}px;
  line-height: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
  /* background-color: red; */
  min-width: 75px;
  text-align: center;
`;

export const StyledTaskLine = styled.View`
  height: 20px;
  width: ${(props) => props.theme.hairlineWidth}px;
  background-color: ${(props) => props.theme.colors.hairlineColor};
`;

export const StyledBtn = styled(Button)`
  margin-right: 15px;
`;

export const StyledEvilIcons = styled(EvilIcons)`
  align-self: center;
`;

export const StyledHeaderBtnText = styled.Text<{ color?: string }>`
  color: ${(props) => props.color};
`;

export const StyledComplaintBtn = styled.TouchableOpacity`
  background-color: #ef9340;
  width: 100px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  height: 32px;
  border-radius: 4px;
`;

export const StyledComplaintText = styled.Text`
  font-size: 14px;
  color: white;
`;

export const StyledAvatarView = styled(ButtonOpacity)`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

export const StyledMoreBg = styled.View`
  background-color: #f4f4f5;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  margin-left: -5px;
  border-radius: 18px;
  border-width: 1px;
  border-color: white;
`;

export const StyledMoreText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? 16 : 11}px;
  color:#353535;
  /* color: ${(props) => props.theme.colors.text}; */
  min-width: 36px;
  text-align:center;

  /* background-color: red; */
`;

export const StyledBottomView = styled.View`
  align-items: center;
`;

export const StyledSubmitBtn = styled(Button)`
  background-color: #65bb6a;
  align-items: center;
  justify-content: center;
  margin: 20px;
  /* flex: 1; */
  height: 44px;
  border-radius: 4px;
  max-width: 400px;
  width: ${(props) => props.theme.width - 40}px;
`;

export const StyledSubmitText = styled.Text`
  color: white;
  font-size: 14px;
`;
