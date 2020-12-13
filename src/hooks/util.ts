import { useEffect, useRef } from 'react';
import { RequestConfig } from 'yapi-to-typescript';
import makeRequestHook from './makeRequestHook';

type PromiseArg<T> = T extends PromiseLike<infer U> ? U : T;

export const useCanceWhenLeave = (cancel: (...args: any[]) => void) => {
  const cancelRef = useRef(cancel);
  cancelRef.current = cancel;
  useEffect(() => {
    return () => {
      cancelRef.current();
    };
  }, []);
};

export const makeCRequestHook = <
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
