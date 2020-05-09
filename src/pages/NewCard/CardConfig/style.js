/**
 * Created by lintong on 2018/7/26.
 * @flow
 */

import styled from 'styled-components';
import {TouchableOpacity, Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
// export const StyledContent = styled.View`
//     flex: 1;
//     background-color: white;
// `

import {SafeAreaView} from 'react-navigation';
import {materialColors} from 'react-native-typography';
import Button from '../../../components/Button/';

export const StyledContent = styled(SafeAreaView)`
  background-color: white;
  flex: 1;
`;

export const StyledTitleView = styled.View`
  padding: 20px 5px 5px 5px;
`;

export const StyledTitleText = styled.Text`
  font-size: 15px;
  color: #979797;
  margin-left: 10px;
`;

export const StyledInnerView = styled.ScrollView``;

export const StyledItemText = styled.Text`
  font-weight: ${props =>
    props.contain ? 600 : Platform.OS === 'ios' ? 500 : 400};
  color:${props =>
    props.contain
      ? 'white'
      : Platform.OS === 'ios'
      ? 'black'
      : materialColors.blackTertiary}
  
  font-size: 14px;
`;

export const StyledSubTitleView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledSubTitle = styled.Text`
  font-size: 15px;
  margin: 30px 0px 10px 0px;
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
  fontstyle: italic;
  font-size: 13px;
`;

// NotifyTimerPicker

export const StyledNotifyButton = styled(TouchableOpacity)`
  margin: 2px 5px 0px 0px;
  width: 75px;
  height: 75px;
  align-items: center;
  justify-content: center;
`;

export const StyledNotifyButtonInner = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.textinputbackgroundColor};
  border-radius: 10px;
  width: 60px;
  height: 60px;
`;

export const StyledMaterialIcons = styled(MaterialIcons)`
  color: ${materialColors.blackSecondary};
`;

export const StyledIonicons = styled(Ionicons)``;

export const StyledRound = styled.View`
  align-items: center;
  justify-content: center;
  background-color: orangered;
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  margin-left: 47.5px;
  z-index: 100;
  position: absolute;
  top: 0px;
  right: 0px;
`;
export const StyledLine = styled.View`
  width: 8px;
  height: 3px;
  background-color: white;
`;

export const StyledInner = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px 10px;
`;

export const StyledNotifyTime = styled.Text`
  text-align: center;
  color: ${materialColors.blackSecondary};
`;

export const StyledLogoImage = styled.Image`
  width: 150px;
  height: 150px;
  position: absolute;
  top: 50px;
  right: 10px;
`;

export const StyledLimitTimeContent = styled.View`
  padding: 0px 20px;
  margin-top: -10px;
  flex-direction: row;
  align-items: center;
`;
