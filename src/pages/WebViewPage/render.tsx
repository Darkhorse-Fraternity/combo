import React from 'react';

import WebView from '@components/WebView';

// import {useNavigationAllParamsWithType} from '@components/UseNavigationAllParams';
import { StyleSafeAreaView } from './style';
import { RouteKey } from '@pages/interface';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
// import {RouteKey} from '@pages/routeKey';

const WebViewPage = () => {
  const data = useNavigationAllParamsWithType<RouteKey.web>();
  return (
    <StyleSafeAreaView >
      <WebView {...data} />
    </StyleSafeAreaView>
  );
};
export default WebViewPage;
