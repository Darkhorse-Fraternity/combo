/**
 * Created by lintong on 2018/9/29.
 * @flow
 */
'use strict';

import styled from 'styled-components/native';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from '@components/Button';

export const StyledContent = styled.View<{ radius: number }>`
  background-color: white;
  border-radius: ${(props) => props.radius};
  border-width: ${Platform.OS === 'ios' ? 1 : 2}px;
  border-color: ${(props) => props.theme.colors.card};;
  shadow-opacity: 1;
  shadow-radius: 5px;
  shadow-color: #979797;
  shadow-offset: 0px 3px;
  elevation: 5;
  margin: 5px;
  /* align-items: center;
  justify-content: center; */
  /* width: ${(props) => props.radius};
  height: ${(props) => props.radius}; */
`;

export const StyledContentInner = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const StyledContent2 = styled.View<{ radius: number }>`
  background-color: white;
  border-radius: ${(props) => props.radius};
  border-width: 1px;
  border-color: white;
`;

export const StyledAvatar = styled(FastImage)<{ radius: number }>`
  width: ${(props) => props.radius * 2};
  height: ${(props) => props.radius * 2};
  border-radius: ${(props) => props.radius};
  /* background-color: #fdfbfb; */
`;

export const StyledIndicator = styled.ActivityIndicator<{ radius: number }>`
  align-self: center;
  width: ${(props) => props.radius * 2};
  height: ${(props) => props.radius * 2};
  border-radius: ${(props) => props.radius};
`;

export const StyledCaramerBackView = styled.View`
  background-color: ${(props) => props.theme.mainColor};
  width: 30px;
  height: 30px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-left: -20px;
  z-index: 100;
  elevation: 6;
`;

export const StyledIcon = styled(Icon)``;

export const StyledHeaderRow = styled(Button)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
