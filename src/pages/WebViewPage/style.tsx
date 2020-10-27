import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native';
// import SafeAreaView from 'react-native-safe-area-view';

export const StyleSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

export const StyledWebView = styled(WebView)`
  flex: 1;
`;

export const StyledError = styled.Text`
  align-self: center;
`;
