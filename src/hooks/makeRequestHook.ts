import { RequestConfig } from 'yapi-to-typescript'
import { Request } from "./interface"
import baseRequest from "./request"
import { useRequest, } from 'ahooks'
import { OptionsWithFormat } from '@ahooksjs/use-request/lib/types'

interface  OptionsWithFormat2<R, P extends any[], U, UU extends U> extends 
  Omit<OptionsWithFormat<R, P , U, UU >,'formatResult' >  {
  formatResult?: (res: R) => U;
}
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export default function makeRequestHook<
  TRequestData, 
  TRequestConfig extends RequestConfig,
  TRequestResult extends ReturnType<typeof baseRequest>
>(request: Request<TRequestData, TRequestConfig, TRequestResult>) {
  // type Data = TRequestResult extends Promise<infer R> ? R : TRequestResult

  type P = TRequestData[]
  type RequestDataType<R,T> =  R | ((...args: R[]) => R)
                          | ((...args:  R[]) => Promise<T>)
  return <U = ThenArg<TRequestResult>>(
    requestData: RequestDataType<TRequestData,TRequestResult> , 
    config?: OptionsWithFormat2<TRequestResult, P, U,U>) =>
    useRequest<TRequestResult, P, U>(requestData, {
      requestMethod: (param: any) => request(param),
      ...config  as OptionsWithFormat<TRequestResult, P, U,U>
    })
}