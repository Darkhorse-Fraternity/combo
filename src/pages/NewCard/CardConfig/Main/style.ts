/**
 * Created by lintong on 2018/7/26.
 * @flow
 */

'use strict';

import styled from 'styled-components/native';
import { TouchableOpacity, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons'
import Button from '../../../../components/Button';

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
  margin-left: 10px;
`;

export const StyledContent = styled.View`
  flex: 1;
  padding: 80px 0px;
`;

interface StyledItemViewType {
  contain: boolean;
}

export const StyledItemView = styled.View<StyledItemViewType>`
  padding: 0px 15px;
  height: 35px;
  background-color: ${(props) =>
    props.contain ? '#31d930' : props.theme.textinputbackgroundColor};
  align-items: center;
  justify-content: center;
  margin: 5px;
  border-radius: 8px;
`;

export const StyledItemText = styled.Text<StyledItemViewType>`
  font-weight: ${(props) => (props.contain ? 500 : 400)};
  color: ${(props) =>
    props.contain
      ? 'white'
      : Platform.OS === 'ios'
      ? 'black'
      : props.theme.blackTertiary};

  font-size: 14px;
`;

export const StyledSubView = styled.View`
  padding: 20px 0px;
`;

export const StyledSubTitleView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledSubTitle = styled.Text`
  font-size: 15px;
  margin: 15px 0px 10px 0px;
  padding: 5px 20px;
`;

export const StyledControl = styled(TouchableOpacity)`
  margin: 30px 15px 10px 15px;
  background-color: white;
  border-radius: 5px;
  shadow-opacity: 0.5;
  shadow-radius: 10px;
  shadow-color: #979797;
  shadow-offset: 2px 4px;
  elevation: 10;
  padding: 5px 5px;
`;
export const StyledShowDelete = styled.Text`
  color: #646464;
  font-style: italic;
  font-size: 13px;
`;

//NotifyTimerPicker

export const StyledTopButton = styled(Button)<{ top?: number }>`
  align-items: center;
  padding: 10px;
  margin-top: ${(props) => props.top ?? 20}px;
`;

interface StyledIconBGType {
  color: string;
}

export const StyledIconBG = styled.View<StyledIconBGType>`
  height: 62px;
  width: 62px;
  background-color: ${(props) => props.color};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  shadow-opacity: 0.6;
  shadow-radius: 3px;
  shadow-color: ${(props) => props.color};
  shadow-offset: 2px 2px;
`;

interface StyledIconImageType {
  size: number;
}

export const StyledIconImage = styled.Image<StyledIconImageType>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export const StyledTitleView = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 0px;
`;

export const StyledIcon = styled(FontAwesome)`
  align-self: center;
  margin-left: 5px;
`;

export const StyledTitle = styled.Text`
  font-size: 15px;
  letter-spacing: 0.5px;
`;

export const StyledCellButton = styled(Button)`
  margin: 7.5px;
  padding: 15px 20px 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledCellInner = styled.View``;

export const StyledCellTitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

export const StyledCellDiscrib = styled.Text`
  margin-top: ${Platform.OS === 'ios' ? 5 : 2};
  color: #888888;
  font-size: 15px;
  font-style: italic;
`;

export const StyledArrow = styled.View`
  border-bottom-width: ${(props) => props.theme.hairlineWidth * 2};
  border-right-width: ${(props) => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
`;

export const StyledTitleInput = styled.TextInput`
  font-size: 17px;
  background: ${(props) => props.theme.textinputbackgroundColor};
  height: 50px;
`;
