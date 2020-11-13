/**
 * Created by lintong on 2018/7/18.
 * @flow
 */

import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton } from 'react-native-gesture-handler';

export const StyledContent = styled.View`
  flex: 1;
  padding: 0px 20px;
`;

export const StyledHeader = styled.View`
  padding: 10px 0px 5px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const StyledHeaderTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const StyledSectionHeader = styled.View`
  padding: 10px 0px 15px 0px;
  background-color: white;
`;

export const StyledSectionHeaderTitle = styled.Text`
  font-size: 19px;
  font-weight: 500;
`;

export const StyledAdd = styled(BorderlessButton)`
  width: 25px;
  height: 25px;
`;

export const StyledIonicons = styled(Feather)`
  align-self: center;
`;

export const StyledCellMain = styled.View`
  flex-direction: row;
`;

export const StyledSectionList = styled.SectionList`
  flex: 1;
`;
