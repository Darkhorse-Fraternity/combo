import React from 'react';

import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { formValueSelector } from 'redux-form/immutable';
import {
  IDO, IUSE, IDOCALENDAR, IDOULIMAGE
} from '../../redux/reqKeys';
import Pop from '../Pop';

import { classCreatNewOne } from '../../request/leanCloud';
import {
  selfUser, iCard, iUse, Flag, FlagRecord
} from '../../request/LCModle';
import { addNormalizrEntity } from '../../redux/module/normalizr';
import { add } from '../../redux/actions/list';
import { req, reqChangeData } from '../../redux/actions/req';
import { Privacy } from '../../configure/enum';
import { updateUserData } from '../../redux/actions/user';
// import { FormID } from '../Form/DoCardForm/index';
// import { uploadImages } from '../../redux/actions/util';

// export async function doPre(iUseM, iCardM, other) {
//   return async (dispatch, getState) => {
//     try {
//       const state = getState();
//       const selector = formValueSelector(FormID);
//       const recordText = selector(state, 'recordText') || '';
//       let imgs = selector(state, 'imgs');
//       imgs = imgs && imgs.toJS();


//       if (iCardM.record.indexOf('文字') !== -1 && recordText.length === 0) {
//         Toast.show('需要添加文字记录~');
//         return;
//       }

//       if (iCardM.record.indexOf('图片') !== -1 && imgs.length === 0) {
//         Toast.show('需要添加图片~');
//         return;
//       }


//       if (imgs.length !== 0) {
//         const urls = imgs.map(file => file.uri);
//         const res = await dispatch(uploadImages(urls, IDOULIMAGE));
//         if (!res.payload) {
//           return;
//         }
//         imgs = res.payload.map(img => img.attributes.url);
//       }
//       await dispatch(creatIDO(iUseM, iCardM,
//         {
//           recordText,
//           imgs,
//           type: 0,
//         }));

//       Pop.hide();
//     } catch (e) {
//       console.log('test:', e.message);
//     }
//   };
// }


export default function creatIDO(iUseM, iCardM, other) {
  return async (dispatch, getState) => {
    // TODO 查询是否需要上传副本信息
    const state = getState();
    const user = state.user.data;

    const FlagRecordModal = iUseM.fr && {
      ...FlagRecord(iUseM.fr)
    };

    const iDoParma = {
      ...dispatch(selfUser()),
      ...iUse(iUseM.objectId),
      ...iCard(iCardM.objectId),
      ...other,
      doneDate: { __type: 'Date', iso: other.doneDate.toISOString() },
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
      doneDate: other.doneDate,
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
    if (other.type === 0 || other.type === 2) {
      const { createdAt, doneDate } = iDoEntity;
      const date = moment(doneDate || createdAt).format('YYYY-MM-DD');
      // 添加到日历
      dispatch(reqChangeData(IDOCALENDAR, {
        [date]: iDoEntity
      }));
      const time = iUseM.time + 1;
      let param = {};


      if (other.type === 0) {
        param = {
          doneDate: { __type: 'Date', iso: moment().toISOString() },
          time,
          // cycle,
          // statu: time % iUseM.period === 0 ? 'stop' : 'start'
        };
      } else if (other.type === 2) {
        param = {
          time,
        };
        dispatch(updateUserData({
          toolConfig: {
            ...user.toolConfig,
            redo: user.toolConfig.redo - 1,
          }
        }));
      }
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
