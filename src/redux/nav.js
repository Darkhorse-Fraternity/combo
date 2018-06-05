import  store from './store'
import { NavigationActions } from 'react-navigation'

export function push(key,params) {
    store.dispatch( NavigationActions.navigate({routeName:key,params}))
}

export function pop(key) {
    store.dispatch( NavigationActions.back({key}))
}

export function popToIndex(index = 1) {
    //根据index 识别key
    store.dispatch((dispatch,getState)=>{
        const state = getState()
        const routes = state.nav.routes
        const routesIndex = state.nav.index
        if(routesIndex >= index){
            const key = routes[index].key
            console.log('key:', key);
            dispatch( NavigationActions.back({key}))
        }
    })
}