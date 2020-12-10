/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestConfig } from 'yapi-to-typescript';
import { Request } from './interface';
import baseRequest from './request';
import useRequest from '@ahooksjs/use-request';
import {
  BaseOptions,
  BaseResult,
  CombineService,
  LoadMoreFormatReturn,
  LoadMoreOptions,
  LoadMoreOptionsWithFormat,
  LoadMoreParams,
  LoadMoreResult,
  OptionsWithFormat,
} from '@ahooksjs/use-request/lib/types';
// import axios from 'axios';
// import { useEffect, useMemo } from 'react';

// interface OptionsWithFormat2<R, P extends unknown[], U, UU extends U>
//   extends Omit<OptionsWithFormat<R, P, U, UU>, 'formatResult'> {
//   formatResult?: (res: R) => U;
// }

// type CombineService<R, P extends any[]> =
//   | RequestService
//   | ((...args: P) => RequestService)
//   | Service<R, P>;

// type Test = CombineService<{}, { id: string }[]>;

// const ts: Test = { id: 56478 };
// console.log(ts);

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

// type RequestDataType<R, T> =
//   | R
//   | ((...args: R[]) => R)
//   | ((...args: R[]) => Promise<T>);

type ReturnS<R = any, P extends any[] = any> = {
  <U = any, UU extends U = any>(
    service: CombineService<R, P>,
    options: OptionsWithFormat<R, P, U, UU>,
  ): BaseResult<U, P>;
  (service: CombineService<R, P>, options?: BaseOptions<R, P>): BaseResult<
    R,
    P
  >;
  <R1 extends LoadMoreFormatReturn>(
    service: CombineService<R, LoadMoreParams<R1>>,
    options: LoadMoreOptionsWithFormat<R1, R>,
  ): LoadMoreResult<R1>;
  <R1 extends LoadMoreFormatReturn & R, RR extends R1>(
    service: CombineService<R1, LoadMoreParams<R1>>,
    options: LoadMoreOptions<RR>,
  ): LoadMoreResult<R1>;
};

type MakeRequestHookType = <
  TRequestData,
  TRequestConfig extends RequestConfig,
  TRequestResult extends ReturnType<typeof baseRequest>
>(
  request: Request<TRequestData, TRequestConfig, TRequestResult>,
) => ReturnS<ThenArg<TRequestResult>, TRequestData[]>;

const makeRequestHook: MakeRequestHookType = (request) => {
  // type Data = TRequestResult extends Promise<infer R> ? R : TRequestResult
  return ((requestData: any, config?: any) => {
    return useRequest(requestData, {
      requestMethod: (param) => request(param),
      throwOnError: true,
      ...config,
    });
  }) as typeof useRequest;
};

export default makeRequestHook;
