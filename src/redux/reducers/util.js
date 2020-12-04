/* @flow */

'use strict';

import {
  LOAD_AVATAR,
  DATA_STORAGE,
  UPLOAD_IMAGES,
  APP_STATE_UPDATE,
  LOCAL_REMIND,
} from '../actions/util';
import * as immutable from 'immutable';
const initialUtilState = immutable.fromJS({
  loadAvatar: false,
  appState: '',
  loadStatu: {},
});

export default function drawState(state = initialUtilState, action) {
  switch (action.type) {
    case LOAD_AVATAR: {
      return state.setIn(['loadAvatar'], action.statu);
    }

    case DATA_STORAGE: {
      const data =
        typeof action.data === 'object'
          ? immutable.fromJS(action.data)
          : action.data;
      return state.set(action.key, data);
    }
    case UPLOAD_IMAGES: {
      return state.set(action.key, action.statu);
    }

    case APP_STATE_UPDATE: {
      return state.set('appState', action.state);
    }

    default:
      return state;
  }
}
