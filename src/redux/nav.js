import  store from './configureStore'
import { addNavigationHelpers } from 'react-navigation'
import {
    createReduxBoundAddListener,
} from 'react-navigation-redux-helpers'
export function push(key,params) {
    navigation().navigate(key,params)
}

export function pop() {
    navigation().goBack()
}
export function navigation() {
    const state = store.getState()
    const addListener = createReduxBoundAddListener("root");
    return addNavigationHelpers({  dispatch:store.dispatch, state: state.nav ,addListener})
}