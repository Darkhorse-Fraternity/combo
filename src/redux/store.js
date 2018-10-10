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

import tracking from './middleware/tracking'
// import { combineReducers } from 'redux-immutablejs'
import { reducer as form } from 'redux-form/immutable'
// import { fromJS } from 'immutable'
import {
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'









const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const middlewares = [thunk,middleware,tracking];
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


let store
export function creatStore(route) {
  if(!store && route){
    const navReducer = createNavigationReducer(route);
    const reducer = combineReducers({
      ...reducers,
      nav: navReducer,
      form
    });
    const rootReducer = (state, action) => {
      if (action.type === 'LOGOUT') {
        const {nav} = state
        state = {nav}
      }
      return reducer(state, action)
    }

    store = createStore(rootReducer, {}, enhancer);
    if (global.reduxNativeDevTools) {
      global.reduxNativeDevToolsCompose(store);
    }
  }
  return store
}