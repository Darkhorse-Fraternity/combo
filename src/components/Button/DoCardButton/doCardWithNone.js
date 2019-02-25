import React from 'react';
import Pop from '../../Pop';
import Do from '../../../pages/Card/Do';
import { creatIDO } from './DoCard';
import { ICARD } from '../../../redux/reqKeys';

export function doCardWithNone(iUse, type = 0) {
  return async (dispatch, getState) => {
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
    return await dispatch(creatIDO(iUse, iCardM, { type }));
  };
}
