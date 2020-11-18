import { denormalize, schema } from 'normalizr';
import { string } from 'prop-types';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  GetClassesIUseIdResponse,
  usePostCallIUseList3,
} from 'src/hooks/interface';
import DataContext, { useGetUserInfo } from './index';
import {
  iCardSceme,
  iCards_self_type,
  ICardUpdateType,
  IUseComboType,
  iUseSceme,
  iUses_self_type,
  IUseType,
  IUseType2,
  IUseUpdateType,
} from './interface';

// let iUseGlobelData =

export const useGetIuseData = <T>(id?: T) => {
  const { data, dispatch } = useContext(DataContext);
  const { iUses_self, iCards_self } = data;
  // const firstRef = useRef(true); // 第一次进来，避免将data to state 进行不要的转化
  const dataRef = useRef<T extends string ? IUseType : IUseType[]>();

  const memoDenormalizeIUse = useCallback(
    () => denormalizeIUse<T>(iUses_self, iCards_self, id),
    [iCards_self, iUses_self, id],
  );

  dataRef.current =
    iUses_self.list.length > 0 ? memoDenormalizeIUse() : undefined;

  const { data: iUseData, run, ...other } = usePostCallIUseList3(
    {},
    { manual: true, cacheTime: 0, staleTime: 100 },
  );

  const addIuse = useCallback(
    (info: IUseComboType) => {
      dispatch({ type: 'get_iUse', data: info });
    },
    [dispatch],
  );
  useEffect(() => {
    if (iUseData?.result?.iUseList) {
      addIuse(iUseData?.result?.iUseList);
    }
  }, [dispatch, iUseData, addIuse]);

  return { data: dataRef.current, run, ...other };
};

const denormalizeIUse = <T>(
  iUses_self: iUses_self_type,
  iCards_self: iCards_self_type,
  id?: T,
) => {
  if (!id) {
    return denormalize(iUses_self.list, new schema.Array(iUseSceme), {
      iUse: iUses_self.entities,
      iCard: iCards_self,
    });
  } else {
    return denormalize(id, iUseSceme, {
      iUse: iUses_self.entities,
      iCard: iCards_self,
    });
  }
};

export const useMutateIuseData = () => {
  const { data, dispatch } = useContext(DataContext);

  const update = useCallback(
    (params: IUseUpdateType) => {
      const oldData = denormalize(params.objectId, iUseSceme, {
        iUse: data.iUses_self.entities,
        iCard: data.iCards_self,
      });
      const newData = {
        ...oldData,
        ...params,
      };
      dispatch({ type: 'update_iUse', data: newData });
    },
    [data.iCards_self, data.iUses_self.entities, dispatch],
  );

  const add = useCallback(
    (info: IUseType | GetClassesIUseIdResponse | IUseType2) => {
      dispatch({ type: 'update_iUse', data: info as IUseType });
    },
    [dispatch],
  );

  const remove = useCallback(
    (id: string) => dispatch({ type: 'remove_iUse', id }),
    [dispatch],
  );

  return { update, remove, add };
};

export const useMutateICardData = () => {
  const { data, dispatch } = useContext(DataContext);

  const update = useCallback(
    (params: ICardUpdateType) => {
      const oldData = denormalize(params.objectId, iCardSceme, {
        iCard: data.iCards_self,
      });
      const newData = {
        ...oldData,
        ...params,
      };
      dispatch({ type: 'update_iCard', data: newData });
    },
    [data.iCards_self, dispatch],
  );
  return { update };
};
