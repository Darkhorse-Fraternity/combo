/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestConfig } from 'yapi-to-typescript';
import { Request } from './interface';
import baseRequest from './request';
import useRequest from '@ahooksjs/use-request';
import {
  BaseOptions,
  BaseResult,
  // CombineService,
  LoadMoreFormatReturn,
  LoadMoreOptions,
  LoadMoreOptionsWithFormat,
  // LoadMoreParams,
  LoadMoreResult,
  OptionsWithFormat,
  Service,
} from '@ahooksjs/use-request/lib/types';
import SimpleToast from 'react-native-simple-toast';

type PromiseArg<T> = T extends PromiseLike<infer U> ? U : T;

type ArrayArg<T> = T extends ArrayLike<infer U> ? U : T;

type CombineService<
  R,
  P extends any[],
  RequestService = string | ArrayArg<P>
> = RequestService | ((...args: P) => RequestService) | Service<R, P>;

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
    service: CombineService<R, P>,
    options: LoadMoreOptionsWithFormat<R1, R>,
  ): LoadMoreResult<R1>;
  <R1 extends LoadMoreFormatReturn, RR extends R1>(
    service: CombineService<R1, P>,
    options: LoadMoreOptions<RR>,
  ): LoadMoreResult<R1>;
};

type MakeRequestHookType = <
  TRequestData,
  TRequestConfig extends RequestConfig,
  TRequestResult extends ReturnType<typeof baseRequest>
>(
  request: Request<TRequestData, TRequestConfig, TRequestResult>,
) => ReturnS<PromiseArg<TRequestResult>, TRequestData[]>;

const makeRequestHook: MakeRequestHookType = (request) => {
  // type Data = TRequestResult extends Promise<infer R> ? R : TRequestResult
  return ((requestData: any, config?: any) => {
    return useRequest(requestData, {
      requestMethod: (param) => request(param),
      throwOnError: true,
      onError: (e) => {
        SimpleToast.showWithGravity(
          e.message,
          SimpleToast.LONG,
          SimpleToast.CENTER,
        );
      },
      ...config,
    });
  }) as typeof useRequest;
};

export default makeRequestHook;
