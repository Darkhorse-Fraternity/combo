import { denormalize, schema } from 'normalizr';
import { useCallback, useContext, useEffect, useRef } from 'react';
import {
  GetClassesIUseIdResponse,
  usePostCallIUseList3,
} from 'src/hooks/interface';
import DataContext, { useGetUserInfo } from './index';
import { IUseComboType, iUseSceme } from './interface';

export const useGetIuseData = () => {
  const { data, dispatch } = useContext(DataContext);

  const { data: iUseData, run, loading, ...other } = usePostCallIUseList3(
    {},
    { manual: true },
  );

  const addIuse = useCallback(
    (info: IUseComboType) => {
      dispatch({ type: 'updata_iUse', data: info });
    },
    [dispatch],
  );

  const user = useGetUserInfo();
  const userId = user.objectId;

  const userFirstRef = useRef(true);
  useEffect(() => {
    if (userId && !userFirstRef.current) {
      run();
    }
    userFirstRef.current = false;
  }, [run, userId]);

  // 第一次进默认做一个检测。s
  const firstRef = useRef(true);
  useEffect(() => {
    if (data.iUses_self.list.length === 0 && firstRef.current) {
      run();
    }
    firstRef.current = false;
  }, [data, run]);

  // const addIuse = (info: IUseComboType) => {
  //   dispatch({ type: 'updata_iUse', data: info });
  // };
  useEffect(() => {
    if (iUseData?.result?.iUseList) {
      addIuse(iUseData?.result?.iUseList);
    }
  }, [dispatch, iUseData, addIuse]);

  const dataRef = useRef<GetClassesIUseIdResponse[]>([]);
  // useEffect(() => {

  // }, [data])
  if (data.iUses_self) {
    const iUseData = denormalize(
      data.iUses_self.list,
      new schema.Array(iUseSceme),
      {
        iUse: data.iUses_self.entities,
        iCard: data.iCards_self,
      },
    );

    dataRef.current = iUseData;
  }
  return { data: dataRef.current, addIuse, run, loading, ...other };
};
