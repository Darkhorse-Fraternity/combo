/**
 * Created by lintong on 9/21/16.
 * @flow
 */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import * as immutable from 'immutable';
import { Platform } from 'react-native';
import { reducer as form } from 'redux-form/immutable';

import * as reducers from './reducers';

// import { combineReducers } from 'redux-immutablejs'
// import { fromJS } from 'immutable'

// const middleware = createReactNavigationReduxMiddleware(
//   'root',
//   state => state.nav,
// );

const middlewares = [thunk];
// let enhancer;
// if (__DEV__) {
//   const installDevTools = require('immutable-devtools');
//   installDevTools(immutable);

//   enhancer = compose(
//     applyMiddleware(...middlewares),
//     global.reduxNativeDevTools ? global.reduxNativeDevTools() : (nope) => nope,
//   );
//   // enhancer = applyMiddleware(...middlewares);
// } else {
const enhancer = applyMiddleware(...middlewares);
// }

let store;
export function creatStore(route) {
  if (!store && route) {
    // const navReducer = createNavigationReducer(route);
    const reducer = combineReducers({
      ...reducers,
      // nav: navReducer,
      form,
    });
    // const rootReducer = (state, action) => {
    //   if (action.type === 'LOGOUT') {
    //     const { nav } = state;
    //     state = { nav };
    //   }
    //   return reducer(state, action);
    // };

    store = createStore(reducer, {}, enhancer);
    // if (global.reduxNativeDevTools) {
    //   global.reduxNativeDevToolsCompose(store);
    // }
  }
  return store;
}