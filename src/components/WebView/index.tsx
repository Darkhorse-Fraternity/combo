import React, {
  memo,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  Ref,
  useLayoutEffect,
} from 'react';
import {
  default as WebViewType,
  WebViewMessageEvent,
} from 'react-native-webview';
import { LoadAnimation, loadView } from '@components/Load';
import { StyledError, StyledWebView } from './style';

// import {useNavigation} from '@react-navigation/native';
// import {push, pop} from '@components/NativeRoute';
// import {useIsFirstRouteInParent} from '@components/UseNavigationAllParams';
// import {loginAction, useLoginCheck} from '@components/NativeTool';
import { WebViewProp, OnMessageDataType } from './interface';
import {
  WebViewJavascriptBridgeJS,
  injectJavaScriptInfo,
} from './WebViewJavascriptBridgeJS';
import SimpleToast from 'react-native-simple-toast';
// import {WebViewNavigationEvent} from 'react-native-webview/lib/WebViewTypes';
const MemoWebView = memo(StyledWebView);

// ```objc method :
// share:(title : @"xx", description : @"xx", link : @"xx", image : @"xx" ,callback : @"xx");
// shareEnable:(bool)
// wxPay:(json: "xx", callback : "xx")
// callNumber:("xx")
// comment:(comment_id : "xx", "comment_user_id" : "xx", "comment_user_name" : "xx")
// showPushDialog:(int)
// setupNavgationBarButtonItem:(type : "xx", "title" : "xx")
// showCommentList
// getCurrentPosition:("xx")
// logout
// ```

// ```objc method :
//              getPageID;
//              getEventID;
//              getObjectID
//              getObjectSch
//  ```

export const useCombinedRefs = <T extends any>(
  ...refs: Array<Ref<T>>
): Ref<T> =>
  useCallback(
    (element: T) =>
      refs.forEach((ref) => {
        if (!ref) {
          return;
        }

        // Ref can have two types - a function or an object. We treat each case.
        if (typeof ref === 'function') {
          return ref(element);
        }

        // As per https://github.com/facebook/react/issues/13029
        // it should be fine to set current this way.
        (ref as any).current = element;
      }),
    refs,
  );

interface WebViewRefProp {
  forwardRef?: Ref<WebViewType>;
}

const WebView = (props: WebViewProp & WebViewRefProp) => {
  const {
    url,
    headers,
    startInLoadingState = true,
    onMessage,
    onMessageEvents,
    forwardRef: webViewRefOut,
    source,
    ...other
  } = props;
  const webViewRefIn = useRef<WebViewType>(null);
  // const {goBack} = useNavigation();
  // const isFirstRouteInParent = useIsFirstRouteInParent();
  // const [isLogin, ifLoginLoading] = useLoginCheck();
  // const firstRef = useRef(true);
  const renderLoading = useCallback(() => <LoadAnimation top={100} />, []);

  //  source
  const memoSource = useMemo(
    () =>
      source ?? {
        uri: url || '',
        headers,
      },
    [url, headers],
  );

  const callJS = (key: string, params?: Object) => {
    webViewRefIn.current?.injectJavaScript(injectJavaScriptInfo(key, params));
    // console.log('webViewRefIn', webViewRefIn);
    // console.log('key', key);
  };

  // useEffect(() => {
  //   if (!ifLoginLoading) {
  //     if (isLogin && !firstRef.current) {
  //       const key = 'loginStateChange';
  //       const params = {header: getHeader()};
  //       callJS(key, params);
  //     }
  //     firstRef.current = false;
  //   }
  // }, [isLogin, ifLoginLoading]);

  // const webViewAction = async (dataString: string) => {
  //   const data = JSON.parse(dataString);

  //   const {action, params, callbackID} = data as OnMessageDataType;
  //   let response: Object | undefined = undefined;
  //   if (onMessageEvents) {
  //     const eventAction = onMessageEvents[action];
  //     const response = await eventAction(data);
  //     if (callbackID) {
  //       callJS(callbackID, response);
  //     }
  //     return;
  //   }
  //   if (action === 'goback') {
  //     if (isFirstRouteInParent) {
  //       pop(true);
  //     } else {
  //       goBack();
  //     }
  //   } else if (action === 'push' && params) {
  //     push(params['key']);
  //   } else if (action === 'login') {
  //     if (isLogin) {
  //       return SimpleToast.show('已登录');
  //     }
  //     response = await loginAction();
  //     console.log('response', response);
  //   } else if (action === 'test') {
  //   }
  //   if (callbackID) {
  //     callJS(callbackID, response);
  //   }
  // };

  // web端 主动调用的接受
  const onMsg = (event: WebViewMessageEvent) => {
    // webViewAction(event.nativeEvent.data);
  };

  // const memoOnMsg = useCallback(onMessage || onMsg, [isLogin]);

  //合并多个refs https://github.com/facebook/react/issues/13029
  const refs = useCombinedRefs(webViewRefIn, webViewRefOut || null);

  return memoSource || true ? (
    <MemoWebView
      ref={refs}
      startInLoadingState={startInLoadingState}
      source={memoSource}
      renderLoading={renderLoading}
      // onMessage={memoOnMsg}
      // onError={e => {
      //   console.log('e', e);
      // }}
      injectedJavaScriptBeforeContentLoaded={WebViewJavascriptBridgeJS}
      // onLoad={onLoad}
      {...other}
    />
  ) : (
    <StyledError> 未传入URL</StyledError>
  );
};

//https://zh-hans.reactjs.org/docs/forwarding-refs.html
const WebViewRef = React.forwardRef<WebViewType, WebViewProp>((props, ref) => (
  <WebView forwardRef={ref} {...props} />
));

export default WebViewRef;
