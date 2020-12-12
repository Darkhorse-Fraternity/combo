import {
  LoadMoreFormatReturn,
  LoadMoreOptionsWithFormat,
} from '@ahooksjs/use-request/lib/types';
import { useCallback, useEffect, useRef } from 'react';
import { RequestConfig } from 'yapi-to-typescript';
// import { getClassesIDo } from './interface';
import makeRequestHook from './makeRequestHook';

type PromiseArg<T> = T extends PromiseLike<infer U> ? U : T;

const makeLoadMoreRequestHook = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RequestType extends (...arg: any) => any
>(
  request: RequestType,
) => {
  type RequestReturnType = PromiseArg<ReturnType<RequestType>>;
  type RequestParameterType = Parameters<RequestType>;
  type ParmasType = RequestParameterType[0];
  return makeRequestHook<ParmasType, RequestConfig, RequestReturnType>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request as any,
  );
};

export const makeLCLoadMoreRequestHook = <
  RequestDataType extends { skip: string; limit: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RequestReturnDataType extends any,
  RequestType extends (
    requestData: RequestDataType,
  ) => Promise<RequestReturnDataType>
>(
  request: RequestType,
  { mapKey = 'result', limit = 20 }: { mapKey?: string; limit?: number },
) => {
  type RequestReturnType = PromiseArg<ReturnType<RequestType>>;
  // type ConfigType = Omit<
  //   LoadMoreOptionsWithFormat<ResultType, RequestReturnType>,
  //   'loadMore'
  // >;
  // type ConfigType2 = Omit<ConfigType, 'loadMore'>;

  return <ResultType extends LoadMoreFormatReturn>(
    params: Omit<RequestDataType, 'skip' | 'limit'>,
    config: Omit<
      LoadMoreOptionsWithFormat<ResultType, RequestReturnType>,
      'loadMore' | 'isNoMore'
    >,
  ) => {
    // const { formatResult, ...rest1 } = config;
    const hook = makeLoadMoreRequestHook(request);
    const skipRef = useRef(0);
    //@ts-expect-error
    const np: RequestDataType = {
      ...params,
      skip: skipRef.current + '',
      limit: limit + '',
    };
    const res = hook(np, {
      loadMore: true,
      isNoMore: (nData) =>
        !nData || !nData[mapKey]?.length || nData[mapKey].length < limit,
      // formatResult: (res) => ({ ...res, list: res.results || [] }) as any,

      ...config,
    });
    const { data, cancel, reload, ...rest } = res;
    skipRef.current = data?.[mapKey]?.length ?? 0;
    const cancelRef = useRef(cancel);
    cancelRef.current = cancel;
    useEffect(() => {
      return () => {
        cancelRef.current();
      };
    }, []);

    const resetReload = useCallback(() => {
      skipRef.current = 0;
      reload();
    }, [reload]);

    return { data: data as ResultType, reload: resetReload, cancel, ...rest };
  };
  // };
};

// const useGetFbLoadMore = makeLCLoadMoreRequestHook(getClassesIDo, {});

// const useTest = () => {
//   const { data } = useGetFbLoadMore(
//     {},
//     {
//       formatResult: (res) => ({ ...res, list: res.results || [] }),
//       cacheKey: 'GetClassesIDo',
//       // staleTime: 100 * 60 * 60 * 24
//       cacheTime: 100 * 60 * 60 * 24,
//       refreshDeps: [],
//     },
//   );
//   const list = data?.list;
// };
