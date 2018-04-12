/**
 * Created by lintong on 2016/11/6.
 * @flow
 */
'use strict';
import {
    limitSearch,
    classDelete,
    classCreatNewOne,
    classUpdate,
    classBatch,
    classSearch,
    followeeList,
    followerList
} from '../../request/leanCloud';

import {listReq} from '../actions/list'
import {req} from  '../actions/req'
export function add(params: Object, key: string, option: Object = {}) {

    const lParams = classCreatNewOne(key, params)
    return req(lParams, key, option)
}

export function update(objectId: string, params: Object, key: string, option: Object = {}) {
    const lParams = classUpdate(key, objectId, params)
    return req(lParams, key, option)

}

export function remove(objectId: string, key: string, option: Object = {}) {

    const lParams = classDelete(key, objectId)
    return req(lParams, key, option)
}

export function find(key: string,params: Object, option: Object = {}) {
    const lParams = classSearch(key,params)
    return req(lParams, key, option)
}

export function search(more: bool,
                       params: Object,
                       key: string,
                       option: Object,
                       callPath:string ,
                       pageSize: number = 40) {

    return (dispatch, getState) => {
        const page = !more ? 0 : getState().list.getIn([key, 'page']) + 1;
        const lParams = limitSearch(key, page, pageSize, params,callPath)
        return dispatch(listReq(key, lParams, more, option))
    }
}

export function followList(eeOrEr:'string') {
    return (more,params,key,option)=> (dispatch, getState) => {

            const follow = eeOrEr === 'ee'?followeeList:followerList
            const page = !more ? 0 : getState().list.getIn([key, 'page']) + 1;
            const lParams = follow(params.uid,page)
            return dispatch(listReq(key, lParams, more,option))
    }

}

export function batch(reqs: array,key:string, option: Object = {}) {
    const params = classBatch(reqs)
    return req(params,key,option)
}