/**
 * Created by lintong on 2016/11/6.
 * @flow
 */

import * as immutable from 'immutable';

const initialState = immutable.fromJS({});

export default function itemState(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
