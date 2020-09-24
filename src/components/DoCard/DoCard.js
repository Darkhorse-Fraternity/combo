import React from 'react';

import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {formValueSelector} from 'redux-form/immutable';
import {IDO, IUSE, IDOCALENDAR, IDOULIMAGE} from '../../redux/reqKeys';
import Pop from '../Pop';

import {classCreatNewOne} from '../../request/leanCloud';
import {selfUser, iCard, iUse, Flag, FlagRecord} from '../../request/LCModle';
import {addNormalizrEntity} from '../../redux/module/normalizr';
import {add} from '../../redux/actions/list';
import {req, reqChangeData} from '../../redux/actions/req';
import {Privacy} from '../../configure/enum';
import {updateUserData} from '../../redux/actions/user';


export default function creatIDO(iUseM, iCardM, other) {
  return async (dispatch, getState) => {
    // TODO 查询是否需要上传副本信息
    const state = getState();
    const user = state.user.data;

    const FlagRecordModal = iUseM.fr && {
      ...FlagRecord(iUseM.fr),
    };

    const iDoParma = {
      ...dispatch(selfUser()),
      ...iUse(iUseM.objectId),
      ...iCard(iCardM.objectId),
      ...other,
      doneDate: {__type: 'Date', iso: other.doneDate.toISOString()},
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
      commentNum: 0,
    };
    // 添加到列表
    dispatch(addNormalizrEntity(IDO, iDoEntity));

    // 这边只有日记才被记录进去
    if (iDoParma.recordText || iDoParma.imgs) {
      dispatch(add(IDO + iUseM.objectId, res.objectId));
      iUseM.privacy === Privacy.open &&
        dispatch(add(IDO + iCardM.objectId, res.objectId));
    }

    // type === 0 表示是打卡 1表示是日记
    if (other.type === 0 || other.type === 2) {
      const {createdAt, doneDate} = iDoEntity;
      const dtime = doneDate ? doneDate.iso : createdAt;
      const date = moment(dtime).format('YYYY-MM-DD');
      // 添加到日历
      dispatch(
        reqChangeData(IDOCALENDAR, {
          [date]: iDoEntity,
        }),
      );
      const time = iUseM.time + 1;
      let param = {};

      if (other.type === 0) {
        param = {
          doneDate: {__type: 'Date', iso: moment().toISOString()},
          time,
          // cycle,
          // statu: time % iUseM.period === 0 ? 'stop' : 'start'
        };
      } else if (other.type === 2) {
        param = {
          time,
        };
        dispatch(
          updateUserData({
            toolConfig: {
              ...user.toolConfig,
              redo: user.toolConfig.redo - 1,
            },
          }),
        );
      }
      // await update(IUSE, iUseM.objectId, param)
      const entity = {
        ...param,
        objectId: iUseM.objectId,
      };

      dispatch(addNormalizrEntity(IUSE, entity));
    }

    return iDoEntity;
  };
}
