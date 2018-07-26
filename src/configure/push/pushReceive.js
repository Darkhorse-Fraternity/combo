import store from '../../redux/store'
import {NavigationActions} from 'react-navigation';
import {
    Platform,
} from 'react-native';

export function doReceiveNotify(notify) {
    const data = notify.data
    if(!data){return}
    const url = data.webUrl
    const hihomeHost = 'combo://'
    if (url &&  url.indexOf(hihomeHost) === 0) {
        const nUrl = url.slice(hihomeHost.length, url.length)
        console.log('nUrl:', nUrl);

        store.dispatch(NavigationActions.navigate({routeName: nUrl, params: data.params}))
    }

}


