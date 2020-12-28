import styled from 'styled-components/native';
// import {SafeAreaView} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
export const StyledHeader = styled.View`
  flex: 1;
`;

export const StyledContent = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.card};
`;

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const StyledTexInput = styled.TextInput`
  flex: 1;
  margin: 10px 15px;
  text-align-vertical: top;
  color: ${({ theme }) => theme.colors.text};
  /* background-color:red; */
  /* padding:0px; */
  /* text-align-vertical:top; */
`;

export const StyledHeaderText = styled.Text`
  color: green;
`;

export const StyledToolBar = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 0px 10px;
  margin-bottom: 0px;
  /* height:74px; */
  /* background-color:yellow; */
`;

export const StyledToolBarItem = styled(Feather)`
  width: 20px;
  height: 20px;
  margin: 5px 5px 10px 5px;
  color: ${({ theme }) => theme.colors.text};
  /* background-color:red; */
`;

export const StyledToolBarAntDesignItem = styled(AntDesign)`
  width: 20px;
  height: 20px;
  margin: 5px 5px 10px 5px;
  color: ${({ theme }) => theme.colors.text};
  /* background-color:red; */
`;

export const StyledToolBarItemTip = styled.View`
  width: 4px;
  height: 4px;
  position: absolute;
  z-index: 100;
  background-color: red;
  border-radius: 2px;
  right: 0px;
`;

export const StyledTipText = styled.Text`
  color: ${({ theme }) => theme.colors.titleTertiary};
  margin: 15px 15px;
  text-align: right;
`;

export const StyledTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 17px;
  /* margin: 15px 15px 5px 15px; */
`;

export const StyledLine = styled.Text`
  background-color: ${({ theme }) => theme.colors.text};
  height: ${({ theme }) => theme.hairlineWidth};
  /* width: 200px; */
  margin: 15px 15px 5px 15px;
`;

interface StyledIconImageType {
  size: number;
}

export const StyledTitleView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledIconImage = styled.Image<StyledIconImageType>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  /* margin-top: 8px; */
  margin-right: 5px;
`;

// export const StyledHeader
