/**
 * Created by lintong on 2016/11/6.
 * @flow
 */

import {
  limitSearch,
  classDelete,
  classCreatNewOne,
  classUpdate,
  classBatch,
  classSearch,
  followeeList,
  followerList,
} from '../../request/leanCloud';
import { list, entitys } from '../scemes';
import { listReq } from '../actions/list';
import { req } from '../actions/req';

export function add(params: Object, key: string, option: Object = {}) {
  return (dispatch) => {
    const lParams = classCreatNewOne(key, params);
    return dispatch(req(lParams, key, option));
  };
}

export function update(
  objectId: string,
  params: Object,
  key: string,
  option: Object = {},
) {
  return (dispatch) => {
    const lParams = classUpdate(key, objectId, params);
    return dispatch(req(lParams, key, option));
  };
}

// 新构建的全自动更新函数。
export function updateByID(key, id, param, option) {
  return (dispatch) =>
    dispatch(
      update(id, param, key, {
        dataMap: (data) => ({
          ...param,
          ...data,
        }),
        sceme: entitys[key],
        ...option,
      }),
    );
}

export function remove(objectId: string, key: string, option: Object = {}) {
  return (dispatch) => {
    const lParams = classDelete(key, objectId);
    return dispatch(req(lParams, key, option));
  };
}

export function find(key: string, params: Object, option: Object = {}) {
  return (dispatch) => {
    const lParams = classSearch(key, params);
    return dispatch(req(lParams, key, option));
  };
}

export function findByID(key, id, option) {
  return (dispatch) => {
    const params = {
      where: {
        objectId: id,
      },
      limit: 1,
    };
    return dispatch(
      find(key, params, { sceme: list(entitys[key]), ...option }),
    );
  };
}

export function search(
  more: boolean,
  params: Object,
  key: string,
  option: Object = {},
  callPath: string,
  pageSize: number = 40,
) {
  return (dispatch, getState) => {
    const listKey = option.sKey || key;
    const page = !more ? 0 : getState().list.getIn([listKey, 'page']) + 1;
    const lParams = limitSearch(key, page, pageSize, params, callPath);
    return dispatch(listReq(key, lParams, more, option));
  };
}

export function followList(eeOrEr: 'string') {
  return (more, params, key, option) => (dispatch, getState) => {
    const follow = eeOrEr === 'ee' ? followeeList : followerList;
    const page = !more ? 0 : getState().list.getIn([key, 'page']) + 1;
    const lParams = follow(params.uid, page);
    return dispatch(listReq(key, lParams, more, option));
  };
}

export function batch(reqs: array, key: string, option: Object = {}) {
  return (dispatch) => {
    const params = classBatch(reqs);
    return dispatch(req(params, key, option));
  };
}