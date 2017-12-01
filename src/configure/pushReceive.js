import store from '../redux/configureStore'
import {NavigationActions} from 'react-navigation';
import {
    Platform,
} from 'react-native';

export function doReceiveNotify(notify) {
    const data = notify.data
    const url = data.webUrl
    const hihomeHost = 'hihome://'
    if (url &&  url.indexOf(hihomeHost) === 0) {
        const nUrl = url.slice(hihomeHost.length, url.length)
        console.log('nUrl:', nUrl);
        store.dispatch(NavigationActions.navigate({routeName: nUrl, params: {}}))
    }

}