import { RequestConfig } from 'yapi-to-typescript';
import { Request } from './interface';
import baseRequest from './request';
import useRequest from '@ahooksjs/use-request';
import { OptionsWithFormat } from '@ahooksjs/use-request/lib/types';
// import axios from 'axios';
// import { useEffect, useMemo } from 'react';

interface OptionsWithFormat2<R, P extends unknown[], U, UU extends U>
  extends Omit<OptionsWithFormat<R, P, U, UU>, 'formatResult'> {
  formatResult?: (res: R) => U;
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

// type ResultType<T extends  any,M extends any> = T extends  infer R ? R : M;

export default function makeRequestHook<
  TRequestData,
  TRequestConfig extends RequestConfig,
  TRequestResult extends ReturnType<typeof baseRequest>
>(request: Request<TRequestData, TRequestConfig, TRequestResult>) {
  // type Data = TRequestResult extends Promise<infer R> ? R : TRequestResult
  type P = TRequestData[];
  type RequestDataType<R, T> =
    | R
    | ((...args: R[]) => R)
    | ((...args: R[]) => Promise<T>);

  // R为返回后的类型， U 为  formatResult 后的类型 ,
  // 当未指定U 的时候 N为R类型，否则则为U类型

  return <U = unknown, R = ThenArg<TRequestResult>, N = U extends {} ? U : R>(
    requestData: RequestDataType<TRequestData, TRequestResult>,
    config?: OptionsWithFormat2<R, P, N, N>,
  ) => {
    const newConfig: OptionsWithFormat<R, P, N, N> = {
      cacheTime: -1,
      ...config,
    } as OptionsWithFormat<R, P, N, N>;

    return useRequest<R, P, N>(requestData, {
      requestMethod: (param: TRequestData) =>
        // request({ ...param, cancelToken: cancelTokenSource.token }),
        request(param),
      ...newConfig,
    });
  };
}
