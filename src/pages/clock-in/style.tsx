import styled from 'styled-components/native';
// import {SafeAreaView} from '@react-navigation/native';
import Button from '@components/Button';
import Feather from 'react-native-vector-icons/Feather';

export const StyledHeader = styled.View`
  flex:1;
`

export const StyledContent = styled.SafeAreaView`
  flex: 1;
`;

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex:1;
`

export const StyledTexInput = styled.TextInput`
  flex:1;
  margin:10px 15px ;
  text-align-vertical: top;
  /* background-color:red; */
  /* padding:0px; */
  /* text-align-vertical:top; */
`;

export const StyledHeaderText = styled.Text`
  
`

export const StyledToolBar = styled.View`
  width:100%;
  flex-direction:row;
  padding:0px 10px;
  margin-bottom:0px;
  /* height:74px; */
  /* background-color:yellow; */
`

export const StyledToolBarItem = styled(Feather)`
  width:20px;
  height:20px;
  margin: 5px 5px 10px 5px;
  /* background-color:red; */

`

export const StyledToolBarItemTip = styled.View`
  width:4px;
  height:4px;
  position:absolute;
  z-index:100;
  background-color:red;
  border-radius:2px;
  right:0px;
`

// export const StyledHeader