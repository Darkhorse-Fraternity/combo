import {StyleSheet, Dimensions, Platform} from 'react-native';
import styled from 'styled-components';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import Button from '../../../components/Button';
// import {
//   RectButton,
// } from 'react-native-gesture-handler';

export const StyledContent = styled(Button)`
  padding: 10px 20px;
  flex-direction: row;
`;

export const StyledInner = styled.View`
  margin: ${Platform.OS === 'ios' ? 5 : 3}px 15px;
`;

export const StyledIconImage = styled.Image`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export const StyledTitle = styled.Text`
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

export const StyledTime = styled.Text`
  margin-top: ${Platform.OS === 'ios' ? 5 : 2};
  font-size: 12px;
`;

export const StyledDes = styled.Text`
  margin-top: ${Platform.OS === 'ios' ? 5 : 2};
  color: #888888;
  font-size: 11px;
  font-style: italic;
`;

export const StyledIconBG = styled.View`
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
