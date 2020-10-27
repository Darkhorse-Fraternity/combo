import styled from 'styled-components/native';
import { Animated } from 'react-native';
import Button from '@components/Button';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const StyledNavbar = styled(Animated.View)`
  width: 100%;
  background-color: transparent;
  z-index: 100;
  position: absolute;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: ${(props) => getStatusBarHeight() + 44};
  padding-top: ${(props) => getStatusBarHeight()};
  /* padding-bottom: 15px;  */
  /* background-color: red; */
`;
// eslint-disable-next-line import/prefer-default-export
interface colorProps {
  color?: string;
}

export const StyledArrow = styled.View<colorProps>`
  border-bottom-width: ${(props) => props.theme.hairlineWidth * 5};
  border-right-width: ${(props) => props.theme.hairlineWidth * 5};
  border-color: ${(props) => props.color || 'white'};
  transform: rotate(135deg);
  width: 10;
  height: 10;
  left: 20;
`;

export const StyledTitle = styled(Animated.Text)<colorProps>`
  color: ${(props) => props.color || 'white'};
  font-size: 18;
  font-weight: 400;
`;

export const StyledButton = styled(Button)``;
