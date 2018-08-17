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
        const tab =routes[routesIndex]
        const tabRoutes = tab.routes
        if(!tabRoutes) return;
        const tabIndex = tab.index
        const nav = tabRoutes[tabIndex]
        const navRoutes = nav.routes
        const navIndex = nav.index

        if(navIndex >= index){
            const key = navRoutes[index].key
            // console.log('key:', key);
            dispatch( NavigationActions.back({key}))
        }
    })
}