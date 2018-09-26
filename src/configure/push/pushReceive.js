import store from '../../redux/store'
import {NavigationActions} from 'react-navigation';
import {
    Platform,
    DeviceEventEmitter
} from 'react-native';
import {addParams} from '../../request/useMeth'

export function doReceiveNotify(notify) {
    const data = notify.data
    if(!data){return}
    const url = data.webUrl
    const hihomeHost = 'combo://combo'
    if (url &&  url.indexOf(hihomeHost) === 0) {
        const nUrl = url.slice(hihomeHost.length, url.length)
        // store.dispatch(NavigationActions.navigate({routeName: nUrl, params: data.params}))
        DeviceEventEmitter.emit('url',{url:addParams(url,data.params)});
    }

}


