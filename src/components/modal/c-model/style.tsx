import styled from 'styled-components/native';
import Button from '@components/Button';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export const StyleModalOutView = styled.View``;

export const StyleCance = styled(Button)`
  width: 30px;
  height: 30px;
  border-radius: 15;
  background-color: white;
  margin-bottom: -20px;
  align-self: flex-end;
  margin-right: -5px;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const StyledIcon = styled(EvilIcons)`
  align-self: center;
`;
