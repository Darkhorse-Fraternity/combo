import { DeviceEventEmitter } from 'react-native';
import { addParams } from '../../request/useMeth';

export function doReceiveNotify(notify: {
  data: { webUrl: string; params?: {} };
  foreground: boolean;
}) {
  const data = notify.data;
  if (!data) {
    return;
  }
  const url = data.webUrl;
  const host = 'combo://combo';
  if (url && url.indexOf(host) === 0) {
    // const nUrl = url.slice(hihomeHost.length, url.length)
    // store.dispatch(NavigationActions.navigate({routeName: nUrl, params: data.params}))
    DeviceEventEmitter.emit('url', { url: addParams(url, data.params) });
  }
}
