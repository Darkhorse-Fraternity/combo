/**
 * Created by lintong on 9/21/16.
 * @flow
 */


'use strict';

import { createStore, applyMiddleware, compose,combineReducers } from 'redux';
import thunk from 'redux-thunk';

import * as immutable from 'immutable';
import { Platform } from 'react-native';
import * as reducers from './reducers'
import {AppNavigator} from "../components/Nav/navigators/CreateAppNavigator";
// import { combineReducers } from 'redux-immutablejs'
import { reducer as form } from 'redux-form/immutable'
// import { fromJS } from 'immutable'
import {
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'
// import nav from "./reducers/nav";

const navReducer = createNavigationReducer(AppNavigator);
const reducer = combineReducers({
    ...reducers,
    nav: navReducer,
    form
});


const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        // 	umeng.pageEnd('设置');
        // 	umeng.pageStart("登录");

        // console.log('test:', state);
        const {nav} = state
        state = {nav}
    }

    if (action.type === "NAV_PUSH") {
        //  const navigationState =  state.route.navigationState
        // 	umeng.pageStart(navigationState.routes[navigationState.index].title);
    }else if(action.type === 'NAV_POP'){
        // 	const navigationState =  state.route.navigationState;
        // 	umeng.pageEnd(navigationState.routes[navigationState.index].title);
    }

    return reducer(state, action)
}
const middlewares = [thunk,middleware];
let enhancer;
if (__DEV__) {
    const installDevTools = require('immutable-devtools');
    installDevTools(immutable);

    enhancer = compose(
        applyMiddleware(...middlewares),
        global.reduxNativeDevTools ?
            global.reduxNativeDevTools() :
            nope => nope
    );
    // enhancer = applyMiddleware(...middlewares);
} else {
    enhancer = applyMiddleware(...middlewares);
}




// export default function configureStore(initialState) {
//   const enhancer = compose(
//     applyMiddleware(thunk),
//     tools,//安卓无法使用，bug on
//   );
//   return createStore(rootReducer, initialState, enhancer);
// }


const store = createStore(rootReducer, {}, enhancer);
if (global.reduxNativeDevTools) {
    global.reduxNativeDevToolsCompose(store);
}
// return store;
// }

export default store