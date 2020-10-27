import { WebViewProps } from 'react-native-webview';

export interface WebViewProp extends WebViewProps {
  url: string;
  headers?: Object;
  onMessageEvents?: Record<
    string,
    (data: OnMessageDataType) => Promise<Object> | undefined
  >;
}

export interface OnMessageDataType {
  action: string;
  params?: Object;
  callbackID?: string;
}
