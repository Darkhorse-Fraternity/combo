/**
 * Created by lintong on 2018/9/22.
 * @flow
 */

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native';

import Button from '../../../components/Button';

export const StyledContent = styled(SafeAreaView)`
  flex: 1;
  /* background-color: white; */
`;

export const StyledHeader = styled.View`
  padding: 15px 20px 0px 20px;
`;

export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledSubTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.titleBackViewColor};
  border-radius: 10px;
  padding: 10px 8px;
  margin: 30px 20px 0px 20px;
`;

export const StyledSubTitleText = styled.Text`
  font-size: 17px;
  margin-left: 10px;
  color: ${(props) => props.theme.colors.text};
`;
export const StyledSwitch = styled.Switch``;
export const StyledButton = styled(Button)`
  width: 100%;
  padding: 0px 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.card};
`;

export const StyledTime = styled.Text`
  font-size: 18px;
  font-weight: 600;
  min-width: 50px;
  color: ${(props) => props.theme.colors.text};
`;

export const StyledName = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.colors.text};
`;
export const StyledDays = styled.Text`
  font-size: 11px;
  margin-top: 5px;
  color: #a9a9aa;
`;

export const StyledRowInner = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledRowDis = styled.View`
  margin-left: 5px;
  max-width: 100px;
`;

export const StyledLine = styled.View`
  background-color: ${(props) => props.theme.colors.titleBackViewColor};
  height: 80px;
  width: 3px;
  margin: 0px 15px 0px 5px;
  align-items: center;
  justify-content: center;
`;

export const StyledRound = styled.View`
  background-color: ${(props) => props.theme.colors.titleBackViewColor};
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  z-index: 10;
  position: absolute;
`;

export const StyledIconView = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 10px;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  margin: 0px 5px 0px 15px;
  align-items: center;
  justify-content: center;
`;

export const StyledIconImage = styled.Image<{ size: number }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export const StyledIcon = styled(Icon)`
  align-self: center;
  color: ${(props) => props.theme.colors.text};
`;

export const StyledAntDesign = styled(AntDesign)`
  align-self: center;
`;

export const StyledDeleteBtn = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${(props) => props.theme.colors.titleBackViewColor};
`;

export const StyledDeleteBtnText = styled.Text`
  color: red;
  margin: 3px;
  font-size: 13px;
  font-weight: 300;
`;

export const StyledTips = styled.Text`
  align-self: center;
  margin: 100px;
  color: rgba(0, 0, 0, 0.4);
  line-height: 25px;
  text-align: center;
`;
