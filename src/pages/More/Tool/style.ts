import styled from 'styled-components/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const StyledContent = styled.ScrollView`
  flex: 1;
`;

export const StyledHeader = styled.View`
  padding: 15px 20px 0px 20px;
`;

export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledRow = styled.View<{ num: number }>`
  width:${(props) => props.theme.width / props.num - 40}
  padding: 20px 20px 20px 20px;
  background-color: #e69;
  border-radius: 10px;
  margin: 20px 20px 0px 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledRowInner = styled.View``;

export const StyledRowTitle = styled.Text`
  font-size: 23px;
  color: white;
  font-weight: 400;
`;

export const StyledRowDiscrib = styled.Text`
  font-size: 15px;
  margin-top: 5px;
  color: white;
  font-weight: 400;
`;

export const StyledIcon = styled(FontAwesome5)`
  align-self: center;
`;
