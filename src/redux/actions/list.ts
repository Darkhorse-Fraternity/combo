/**
 * Created by lintong on 10/19/16.
 * @flow
 */

import Toast from 'react-native-simple-toast';
import { ListLoadType } from '../../components/Base/interface';
import { schemas } from '../scemes';
import { addNormalizrEntity } from '../module/normalizr';
/**
 * 保证加载的时候，同个请求不窜行。
 */

import { RESCODE, SUCCODE, DATA, MSG, reqM, cleanData } from './req';

export const LIST_START = 'LIST_START';
export const LIST_FAILED = 'LIST_FAILED';
export const LIST_SUCCEED = 'LIST_SUCCEEDT';
export const LIST_SELECT = 'LIST_SELECT';
export const LIST_DELETE = 'LIST_DELETE';
export const LIST_ADD = 'LIST_ADD';

const pageSize = 40;

const pageKey = 'pageIndex';

export function listReq(
  key: string = '',
  params: Object,
  more: bool = false,
  option: Object = {},
) {
  return async (dispatch, getState) => {
    const listKey = option.sKey || key;
    const page = !more ? 0 : getState().list.getIn([listKey, 'page']) + 1;
    const load = getState().list.getIn([listKey, 'loadStatu']);

    if (
      load !== ListLoadType.LIST_LOAD_DATA &&
      load !== ListLoadType.LIST_LOAD_MORE
    ) {
      // not serial
      // params.params[pageKey] = page + ''
      dispatch(_listStart(page, listKey)); // 当page 不为0 的时候则表示不是加载多页。
      // console.log('params:', params);

      try {
        const response = await reqM(params);
        if (response[RESCODE] && response[RESCODE] === SUCCODE) {
          const data = await dispatch(
            cleanData(response, {
              ...option,
              sceme: option.sceme || schemas[key],
            }),
          );
          if (!data) {
            console.log(listKey, data, '数据为空');
            return dispatch(_listFailed(listKey));
          }
          const loadStatu =
            (response[DATA][DATA] || data).length < pageSize
              ? ListLoadType.LIST_LOAD_NO_MORE
              : ListLoadType.LIST_NORMAL;
          dispatch(_listSucceed(data, page, listKey, loadStatu));
        } else {
          return dispatch(_listFailed(listKey, response[MSG]));
        }
      } catch (e) {
        console.log('error:', e.message);
        Toast.show(e.message);
        dispatch(_listFailed(listKey));
      }
    }
  };
}

// export function listLoad(key: string, params: Object, more: bool = false, dataMap: Function): Function {
//     return (dispatch, getState) => {
//         const page = !more ? 0 : getState().list.getIn([key, 'page']) + 1;
//         const load = getState().list.getIn([key, 'loadStatu'])
//         if (load !== LIST_LOAD_DATA && load !== LIST_LOAD_MORE) {//not serial
//             params.params[pageKey] = page + '';
//             // const newParams = limitSearch(path,page,pageSize,params);
//             dispatch(_listStart(page , key));//当page 不为0 的时候则表示不是加载多页。
//             req(params).then(response => {
//                 // console.log('response:', response);
//                 if (response[RESCODE] === SUCCODE) {
//                     const res = response[DATA] || response
//                     let data = dataMap ? dataMap(res) : res.results
//                     // console.log('response:', data);
//                     dispatch(_listSucceed(data, page, key));
//                 } else {
//                     dispatch(_listFailed(key));
//                 }
//
//             }).catch((e) => {
//                 console.log('error:', e.message)
//                 Toast.show(e.message)
//                 dispatch(_listFailed(key));
//             })
//
//         }
//     }
// }

/**
 * 请求成功
 * @param  {[type] data:Object [成功返回的数据]
 * @param  {[type]} page:number =  0 [当前的页数。]
 * @return {[type]}             [description]
 */

function _listSucceed(
  data: Object,
  page: number = 0,
  key: string,
  loadStatu: string,
): Object {
  // const loadStatu = data.length < pageSize ?
  //   LIST_LOAD_NO_MORE : LIST_NORMAL

  return {
    type: LIST_SUCCEED,
    page,
    loadStatu,
    data,
    key,
  };
}

/**
 * 请求失败
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
function _listFailed(key: string): Object {
  return {
    type: LIST_FAILED,
    loadStatu: 'LIST_LOAD_ERROR',
    key,
  };
}

/**
 * 开始请求，使得loaded 变动。
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
function _listStart(page: number, key: string): Object {
  const loadStatu =
    page !== 0 ? ListLoadType.LIST_LOAD_MORE : ListLoadType.LIST_LOAD_DATA;
  return {
    type: LIST_START,
    loadStatu,
    key,
  };
}

export function clear(key: string, rowID: number, loadStatu: string) {
  return {
    type: LIST_DELETE,
    rowID,
    key,
    loadStatu,
  };
}

// 用于normalizr 数据化后的处理，find value 对应的index
export function claerByID(key: string, objID: string) {
  return (dispatch, getState) => {
    if (!objID) {
      return;
    }
    const state = getState();
    let list = state.list.get(key);
    list = list && list.get('listData');
    list = list && list.toJS();
    if (!list) {
      return;
    }
    const rowID = list.indexOf(objID);
    if (rowID > -1) {
      // const loadStatu = list.length <= 1 ? LIST_NO_DATA : LIST_NORMAL
      return dispatch(clear(key, rowID, ListLoadType.LIST_NORMAL));
    }
  };
}

export function add(key, data) {
  return {
    type: LIST_ADD,
    key,
    data,
    loadStatu: ListLoadType.LIST_NORMAL,
  };
}

export function addListNormalizrEntity(key, data) {
  return (dispatch) => {
    if (!data) {
      return;
    }
    dispatch(addNormalizrEntity(key, data));
    // dispatch(addNormalizrEntities(key,data))
    dispatch(add(key, data.objectId));
  };
}
