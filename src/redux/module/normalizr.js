/**
 * Created by lintong on 2016/11/6.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import { normalize } from 'normalizr';
import { schemas, code } from '../scemes'
import { registerNormalizrKeys } from '../reqKeys'
import { dataCleanInject } from './inject'
import merger from './merge'

const registerKeys = (keys = []) => {
    const newKyes = {}
    keys.forEach((key) => {
        newKyes[key] = {}
    })
    return newKyes
}

const initialState = immutable.fromJS({ ...registerKeys(registerNormalizrKeys) });

export const ADD_NORMALIZR = 'ADD_NORMALIZR'


//我们使用的是mergeDeep 有个特点是只会覆盖，当存在array的时候转成了list，就只会添加了。
export function addNormalizrEntity(key, data) {
    if(!data){
        return dispatch=>{};
    }
    return dispatch => dispatch(addNormalizrEntities(key, { [code]: [data] }))
}


export function addNormalizrEntities(schemeOrkey, data) {
    if (!schemeOrkey || !data) {
        return dispatch=>{};
    }
    const scheme = typeof schemeOrkey === 'string' ? schemas[schemeOrkey] : schemeOrkey
    const nData = normalize(data, scheme)
    return dispatch => dispatch(addEntities(nData.entities))
}


export function addEntities(data: Object): Object {
    return dispatch => {
        // dispatch(dataCleanInject(data))
        return dispatch({
            type: ADD_NORMALIZR,
            payload: data,
        })
    }
}


export default function itemState(state: immutable.Map<string, any> = initialState, action: Object) {
    switch (action.type) {

        case ADD_NORMALIZR: {

            // const { fromJS } = require('immutable')
            // const nested = fromJS({ a: { b: { d:{s:1,k:4}  } } })
            // const nested2 = nested.mergeDeep({ a: { b: {d:{s:2,m:3} } } })
            // console.log('nested2:', nested2.toJS());
            // { a: { b: { d:{s:2,m:3,k:4}  } } }  只会去覆盖 存在的属性，如eg
            //  当存在【】 的时候，不会覆盖，变成了添加 所以无法直接使用mergedeep

            return merger(state,action.payload)
        }
        default:
            return state
    }

}