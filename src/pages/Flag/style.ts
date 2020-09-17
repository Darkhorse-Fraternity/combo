/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from '../../components/Button';

export const StyledContent = styled(SafeAreaView)`
  flex: 1;
`;

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

export const StyledItem = styled(Button)`
  margin: 10px 20px 10px 20px;
  shadow-opacity: 0.7;
  shadow-radius: 5px;
  shadow-color: #979797;
  shadow-offset: 0px 3px;
`;

export const StyledItemImage = styled(FastImage)<{numColumns: number}>`
  width: ${(props) =>  props.theme.getWidth() / props.numColumns - 40};
  aspect-ratio:1.5;
  border-radius: 20px;
  align-self: center;
  background-color: #fdfbfb;
  elevation: 5;
`;
export const StyledItemCover = styled.View<{position: string}>`
  position: absolute;
  elevation: 6;
  padding: 20px;
  top: ${(props) => (props.position === 'top' ? 20 : 140)}px;
`;

export const StyledItemTitle = styled.Text<{color: string}>`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.color};
`;

export const StyledItemText = styled.Text<{color: string}>`
  font-size: 15px;
  color: ${(props) => props.color};
  font-weight: 500;
  margin-top: 5px;
`;
