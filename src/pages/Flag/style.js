/**
 * Created by lintong on 2019/1/2.
 * @flow
 */


import styled from 'styled-components';
import { SafeAreaView } from 'react-navigation';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from '../../components/Button';


export const StyledContent = styled(SafeAreaView)`
    flex: 1;
`;

export const StyledHeader = styled.View`
    padding: ${Platform.OS === 'ios' ? 44 : 64}px 20px 24px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
`;


export const StyledItem = styled(Button)`
    margin: 10px 20px 10px 20px ;
    shadow-opacity: 0.7;
    shadow-radius: 5px;
    shadow-color: #979797;
    shadow-offset: 0px 3px;   
    
`;

export const StyledItemImage = styled(FastImage)`
  width: ${props => props.theme.width - 40};
  height: 250px;
  border-radius: 20px;
  align-self: center;
  background-color: #fdfbfb;
  elevation: 5;
`;

export const StyledItemText = styled.Text`
  position: absolute;
  bottom: 30px;
  left: 20px;
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.color};
  elevation: 6;
`;
