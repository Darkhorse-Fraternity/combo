/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestConfig } from 'yapi-to-typescript';
import { Request } from './interface';
import baseRequest from './request';
import useRequest from '@ahooksjs/use-request';
import {
  BaseOptions,
  BaseResult,
  // CombineService,
  // CombineService,
  LoadMoreFormatReturn,
  LoadMoreOptions,
  LoadMoreOptionsWithFormat,
  // LoadMoreParams,
  LoadMoreParams,
  LoadMoreResult,
  OptionsWithFormat,
  RequestService,
  Service,
} from '@ahooksjs/use-request/lib/types';
import SimpleToast from 'react-native-simple-toast';

type PromiseArg<T> = T extends PromiseLike<infer U> ? U : T;

type ArrayArg<T> = T extends ArrayLike<infer U> ? U : T;

// 唯一和useRequest CombineService 里面的区别是 重新定义了 RequestService,但这也使得LoadMoreParams 无法使用
// 问题是，当重载 泛型出现时候，如何通过已经类型做封装。
type CombineService1<
  R,
  P extends any[],
  RequestService1 = string | ArrayArg<P>
> = RequestService1 | ((...args: P) => RequestService1) | Service<R, P>;

type CombineService2<
  R,
  P extends any[],
  L extends any[],
  RequestService1 = string | ArrayArg<L>
> = RequestService | ((...args: P) => RequestService1) | Service<R, P>;

type ConstomuseRequest<R = any, P extends any[] = any> = {
  <U = any, UU extends U = any>(
    service: CombineService1<R, P>,
    options: OptionsWithFormat<R, P, U, UU>,
  ): BaseResult<U, P>;
  (service: CombineService1<R, P>, options?: BaseOptions<R, P>): BaseResult<
    R,
    P
  >;
  <R1 extends LoadMoreFormatReturn>(
    service: CombineService2<R, LoadMoreParams<R1>, P>,
    options: LoadMoreOptionsWithFormat<R1, R>,
  ): LoadMoreResult<R1>;
  <R1 extends LoadMoreFormatReturn, RR extends R1>(
    service: CombineService2<R1, LoadMoreParams<R1>, P>,
    options: LoadMoreOptions<RR>,
  ): LoadMoreResult<R1>;
};

type MakeRequestHookType = <
  TRequestData,
  TRequestConfig extends RequestConfig,
  TRequestResult extends ReturnType<typeof baseRequest>
>(
  request: Request<TRequestData, TRequestConfig, TRequestResult>,
) => ConstomuseRequest<PromiseArg<TRequestResult>, TRequestData[]>;

const makeRequestHook: MakeRequestHookType = (request) => {
  // type Data = TRequestResult extends Promise<infer R> ? R : TRequestResult
  return ((requestData: any, config?: any) => {
    return useRequest(requestData, {
      requestMethod: (param) => request(param),
      throwOnError: true,
      onError: (e, params) => {
        console.log('makeRequestHook', e.message);
        console.log('params', params);

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
