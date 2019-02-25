import React from 'react';

import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {
  ICARD, IDO, IUSE, IDOCALENDAR, FLAG
} from '../../../redux/reqKeys';


import { classCreatNewOne } from '../../../request/leanCloud';
import {
  selfUser, iCard, iUse, Flag, FlagRecord
} from '../../../request/LCModle';
import { addNormalizrEntity } from '../../../redux/module/normalizr';
import { add } from '../../../redux/actions/list';
import { req, reqChangeData } from '../../../redux/actions/req';
import { Privacy } from '../../../configure/enum';


export function doCard(data, other) {
  return async (dispatch, getState) => {
    const state = getState();
    const iCardM = state.normalizr.get(ICARD).get(data[ICARD]).toJS();


    // 在这边添加新的判断

    // const IUseP = classUpdate(IUSE, id, param)
    dispatch(creatIDO(data, iCardM, other));
  };
}

export function creatIDO(iUseM, iCardM, other) {
  return async (dispatch) => {
    // TODO 查询是否需要上传副本信息

    const FlagRecordModal = iUseM.fr && {
      ...FlagRecord(iUseM.fr)
    };

    const iDoParma = {
      ...dispatch(selfUser()),
      ...iUse(iUseM.objectId),
      ...iCard(iCardM.objectId),
      ...other,
      ...FlagRecordModal,
    };

    const iDoP = classCreatNewOne(IDO, iDoParma);


    const res = await dispatch(req(iDoP, IDO));

    // console.log('res:', res);
    if (res.error) {
      Toast.show(res.error.message);
      return;
    }


    const iDoEntity = {
      ...iDoParma,
      ...res,
      updatedAt: res.createdAt,
      commentNew: false,
      commentNum: 0
    };
    // 添加到列表
    await dispatch(addNormalizrEntity(IDO, iDoEntity));


    // 这边只有日记才被记录进去
    if (iDoParma.recordText || iDoParma.imgs) {
      dispatch(add(IDO + iUseM.objectId, res.objectId));
      iUseM.privacy === Privacy.open
      && dispatch(add(IDO + iCardM.objectId, res.objectId));
    }


    // type === 0 表示是打卡 1表示是日记
    if (other.type === 0) {
      const date = moment(iDoEntity.createdAt).format('YYYY-MM-DD');
      dispatch(reqChangeData(IDOCALENDAR, {
        [date]: iDoEntity
      }));


      const time = iUseM.time + 1;
      const param = {
        doneDate: { __type: 'Date', iso: moment().toISOString() },
        time,
        // cycle,
        statu: time % iUseM.period === 0 ? 'stop' : 'start'
      };

      // await update(IUSE, iUseM.objectId, param)
      const entity = {
        ...param,
        objectId: iUseM.objectId
      };

      await dispatch(addNormalizrEntity(IUSE, entity));
    }


    return iDoEntity;
  };
}
