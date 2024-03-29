/**
 * Created by lintong on 2018/10/14.
 * @flow
 */
'use strict';

import styled from 'styled-components/native';
// @ts-ignore: Unreachable code error
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

export const StyledCell = styled(TouchableBounce)`
  margin: 10px 5px 10px 15px;
  background-color: ${(props) =>
    props.backgroundColor || props.theme.textinputbackgroundColor};
  border-radius: 5px;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-color: ${(props) =>
    props.select ? props.theme.colors.text : props.theme.colors.card};
  border-width: 2px;
`;

export const StyledCellBtn = styled.View``;

export const StyledCellImage = styled.Image<{ size: number }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export const StyledColorCell = styled(TouchableBounce)<{ color: string }>`
  width: 30px;
  height: 30px;
  margin: 15px 20px 15px 30px;
  background-color: ${(props) => props.color};
  border-radius: 20px;
  border-color: ${(props) =>
    props.select ? props.theme.colors.text : props.color};
  border-width: 2px;
`;
