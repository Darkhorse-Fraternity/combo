import { methodType } from './'

// import {LeanCloud_APP_ID,LeanCloud_APP_KEY} from '../configure/leancloud'

export function cardList(): Object {
  return {
    path: '/call/cardList',
    method: methodType.get,
    params: {}
  }
}

export function fbJoin(params) {
  return {
    path: '/call/fbJoin',
    method: methodType.post,
    params: params
  }
}