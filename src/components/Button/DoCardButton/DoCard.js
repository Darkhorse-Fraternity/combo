import React from 'react';

import { ICARD, IDO, IUSE, IDOCALENDAR } from '../../../redux/reqKeys'
import Pop from '../../Pop'
import moment from 'moment'
import Do from '../../../pages/Card/Do/Do'
import { classCreatNewOne } from '../../../request/leanCloud'

import { selfUser, iCard, iUse } from '../../../request/LCModle'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import { addListNormalizrEntity, add } from '../../../redux/actions/list'
import { req, reqChangeData } from '../../../redux/actions/req'
import Toast from 'react-native-simple-toast'

export function doCardWithNone(data) {
  return async (dispatch, getState) => {
    const state = getState()
    const iCardM = state.normalizr.get(ICARD).get(data[ICARD]).toJS()

    if (iCardM.record.length > 0) {
      Pop.show(<Do data={data}/>,
        {
          wrapStyle: { justifyContent: 'flex-start' },
          maskStyle: {
            backgroundColor: 'transparent',
          }
        })
      return;
    }

    //在这边添加新的判断

    // const IUseP = classUpdate(IUSE, id, param)
    return await dispatch(creatIDO(data, iCardM))

  }

}

export function recordDiary(data) {
  Pop.show(<Do data={data}/>,
    {
      wrapStyle: { justifyContent: 'flex-start' },
      maskStyle: {
        backgroundColor: 'transparent',
      }
    })
}


export function doCard(data, other) {
  return async (dispatch, getState) => {
    const state = getState()
    const iCardM = state.normalizr.get(ICARD).get(data[ICARD]).toJS()


    //在这边添加新的判断

    // const IUseP = classUpdate(IUSE, id, param)
    dispatch(creatIDO(data, iCardM, other))

  }
}

function creatIDO(iUseM, iCardM, other) {
  return async (dispatch) => {


    const iDoParma = {
      ...selfUser(),
      ...iUse(iUseM.objectId),
      ...iCard(iCardM.objectId),
      ...other
    }

    const iDoP = classCreatNewOne(IDO, iDoParma)


    const res = await req(iDoP, IDO)

    // console.log('res:', res);
    if (res.error) {
      Toast.show(res.error.message)
      return
    }


    const iDoEntity = {
      ...iDoParma,
      ...res,
      updatedAt: res.createdAt,
      commentNew: false,
      commentNum: 0
    }
    //添加到列表
    await dispatch(addNormalizrEntity(IDO, iDoEntity))
    dispatch(add(IDO + iUseM.objectId, res.objectId))
    dispatch(add(IDO + iCardM.objectId, res.objectId))

    //添加到req
    const date = moment(iDoEntity.createdAt).format("YYYY-MM-DD")
    dispatch(reqChangeData(IDOCALENDAR, {
      [date]: iDoEntity
    }))


    const time = iUseM.time + 1
    const param = {
      doneDate: { "__type": "Date", "iso": moment() },
      time: time,
      //cycle,
      statu: time % iUseM.period === 0 ? "stop" : "start"
    }
    const entity = {
      ...param,
      objectId: iUseM.objectId
    }

    await dispatch(addNormalizrEntity(IUSE, entity))

    return iDoEntity
  }
}