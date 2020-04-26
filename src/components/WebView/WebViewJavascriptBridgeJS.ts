export const WebViewJavascriptBridgeJS = `
(function() {
  if (window.QJWebViewJavascriptBridge) {
    return;
  }
  if (!window.onerror) {
    window.onerror = function(msg, url, line) {
      console.log(
        'QJWebViewJavascriptBridge: ERROR:' + msg + '@' + url + ':' + line,
      );
    };
  }
  var sendMessageQueue = [];
  var messageHandlers = {};
  var responseCallbacks = {};
  var uniqueId = 1;
  window.QJWebViewJavascriptBridge = {
    registerHandler: registerHandler,
    callHandler: callHandler,
    _onMessage: _onMessage,
  };

  function registerHandler(handlerName, handler) {
    messageHandlers[handlerName] = handler;
  }

  function callHandler(handlerName, data, responseCallback) {
    if (arguments.length == 2 && typeof data == 'function') {
      responseCallback = data;
      data = null;
    }

    _doSend(handlerName, data, responseCallback);
  }
  function _doSend(handlerName, data, responseCallback) {
    if (responseCallback) {
      var callbackID = 'cb_' + uniqueId++ + '_' + new Date().getTime();
      responseCallbacks[callbackID] = responseCallback;
    }
    // sendMessageQueue.push(message);
    // window.webkit.messageHandlers.iOS_Native_FlushMessageQueue.postMessage(null)

    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        action: handlerName,
        callbackID: callbackID,
        params: data,
      }),
    );
  }

  function _onMessage(handlerName, data) {
    if (handlerName && responseCallbacks[handlerName]) {
      responseCallbacks[handlerName](data);
      delete responseCallbacks[handlerName];
    }
  }
})();
`;

export const injectJavaScriptInfo = (key: string, params?: Object) => {
  const paramsString = params ? JSON.stringify(params) : undefined;
  return `(function() {
    window.QJWebViewJavascriptBridge._onMessage("${key}",${paramsString});
  })();`;
};
