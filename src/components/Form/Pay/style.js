/**
 * Created by lintong on 2018/2/27.
 * @flow
 */
'use strict';

import styled from 'styled-components/native';
import { default as BaseIcon } from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/Button';
import IconAwesome from 'react-native-vector-icons/EvilIcons';

export const StyledContent = styled.View`
  background-color: white;
  margin-bottom: -50px;
  padding-bottom: 50px;
`;

export const StyledHeaderView = styled.View`
  margin-top: 10px;
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const StyledHeaderTitle = styled.Text`
  font-size: 23px;
`;

export const StyledIconAwesome = styled(IconAwesome)``;

export const StyledBottomView = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledBuyButton = styled(Button)`
  align-items: center;
  padding: 12px;
  margin: 20px 30px;
`;

export const StyledPriceText = styled.Text`
  color: ${(props) => (props.submitDisabled ? 'rgb(200,200,200)' : 'white')};
  font-size: 20px;
  font-weight: 500;
`;

export const StyledActivityIndicator = styled.ActivityIndicator`
  height: 25px;
`;

export const StyleRadio = styled.View`
  padding: 15px 15px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const StyledRadioInnner = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const StyleRadioText = styled.Text`
  font-size: 20px;
  color: black;
  text-align: center;
`;
export const RadioIcon = styled(BaseIcon)`
  height: 30px;
  width: 30px;
`;

export const RadioImage = styled.Image`
  height: 35px;
  width: 35px;
  margin: 0px 15px;
`;

export const RadioPlacehold = styled.View`
  background-color: #f36a3e;
  height: 35px;
  width: 35px;
  margin: 0px 15px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

export const RadioPlaceholdText = styled.Text`
  color: white;
  font-size: 22px;
  font-weight: 700;
`;
