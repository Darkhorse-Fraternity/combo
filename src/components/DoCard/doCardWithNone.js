import React from 'react';
import Pop from '../Pop';
import Do from './Do';
import { creatIDO } from './DoCard';
import { ICARD } from '../../redux/reqKeys';

export default function doCardWithNone(iUse, type = 0) {
  return (dispatch, getState) => {
    const state = getState();
    const iCardM = state.normalizr.get(ICARD).get(iUse[ICARD]).toJS();

    if (iCardM.record.length > 0) {
      Pop.show(<Do data={iUse} type={type} />,
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
    return dispatch(creatIDO(iUse, iCardM, { type }));
  };
}
