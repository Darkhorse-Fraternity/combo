import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';

export const StyledWebView = styled(WebView)`
  flex: 1;
  background-color: transparent;
`;

export const StyledError = styled.Text`
  align-self: center;
  color: ${({ theme }) => theme.colors.text};
`;
