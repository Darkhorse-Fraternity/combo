import styled from 'styled-components/native';
// import { Text } from 'react-native';
import { SafeAreaView } from 'react-native';

export const StyledContent = styled(SafeAreaView)`
  flex: 1;
`;

export const StyledNarBarRightView = styled.View`
  flex-direction: row;
  padding-right: 10px;
`;

export const StyledSearchInput = styled.TextInput`
  padding: 10px 20px;
  margin-top: 5px;
  font-size: 17px;
`;

export const StyledLine = styled.View`
  height: 1px;
  background-color: #efefef;
`;
