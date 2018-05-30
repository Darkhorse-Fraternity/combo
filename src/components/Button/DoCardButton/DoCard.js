import React from 'react';

import { ICARD, IDO, IUSE } from '../../../redux/reqKeys'
import Pop from '../../Pop'
import moment from 'moment'
import Do from '../../../pages/Card/Do'
import {  classCreatNewOne } from '../../../request/leanCloud'

import { selfUser, iCard, iUse } from '../../../request/LCModle'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import {  load } from '../../../redux/actions/req'
import Toast from 'react-native-simple-toast'


export function doCardWithNone(data) {
    return async (dispatch,getState) => {
        const state = getState()
        const iCardM = state.normalizr.get(ICARD).get(data[ICARD]).toJS()

        if (iCardM.record.length > 0) {
            Pop.show(<Do data={data}/>,
                {wrapStyle:{justifyContent: 'flex-start'},
                    maskStyle: { backgroundColor: 'transparent',
                    } })
            return
        }

        //在这边添加新的判断

        // const IUseP = classUpdate(IUSE, id, param)
       dispatch(creatIDO(data,iCardM))

    }

}


export function doCard(data,other) {
    return async (dispatch,getState) => {
        const state = getState()
        const iCardM = state.normalizr.get(ICARD).get(data[ICARD]).toJS()


        //在这边添加新的判断

        // const IUseP = classUpdate(IUSE, id, param)
        dispatch(creatIDO(data,iCardM,other))

    }
}

function creatIDO(iUseM,iCardM,other) {
    return async (dispatch) => {
        const iDoP = classCreatNewOne(IDO, {
            ...selfUser(),
            ...iUse(iUseM.objectId),
            ...iCard(iCardM.objectId),
            ...other

        })


        const res = await load(iDoP, IDO)

        // console.log('res:', res);
        if (res.error) {
            Toast.show(res.error.message)
            return
        }

        const time = iUseM.time + 1
        const param = {
            doneDate: { "__type": "Date", "iso": moment() },
            time: time,
            //cycle,
            statu: time === iUseM.period ? "stop" : "start"
        }
        const entity = {
            ...param,
            objectId: iUseM.objectId
        }

        dispatch(addNormalizrEntity(IUSE, entity))
    }
}