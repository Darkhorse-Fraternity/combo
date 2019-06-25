import React from 'react';
import Pop from '../Pop';
import Do from './Do';
import creatIDO from './doCard';
import { ICARD } from '../../redux/reqKeys';

export default function doCardWithNone(iUse, type = 0, doneDate = new Date()) {
  return (dispatch, getState) => {
    const state = getState();
    const iCardM = state.normalizr.get(ICARD).get(iUse[ICARD]).toJS();
    // 我们在首页直接更改了iUse,所以这边只能直接传递
    if (iCardM.record.length > 0) {
      Pop.show(<Do
        iUseId={iUse.objectId}
        iUse={iUse}
        type={type}
        record={iCardM.record}
        doneDate={doneDate}
      />,
      {
        wrapStyle: { justifyContent: 'flex-start' },
        maskStyle: {
          backgroundColor: 'transparent',
        }
      });
      return;
    }

    // 在这边添加新的判断

    // const IUseP = classUpdate(IUSE, id, param)
    return dispatch(creatIDO(iUse, iCardM, { type, doneDate }));
  };
}
