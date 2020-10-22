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
  return <U = ThenArg<TRequestResult>>(requestData: TRequestData, config?: OptionsWithFormat2<TRequestResult, any[], U,U>) =>
    // 一个简单的 Hook 实现，实际项目可结合其他库使用，比如：
    // @umijs/hooks 的 useRequest (https://github.com/umijs/hooks)
    // swr (https://github.com/zeit/swr)
    useRequest<TRequestResult, any[], U>(requestData, {
      requestMethod: (param: any) => request(param),
      ...config  as OptionsWithFormat<TRequestResult, any[], U,U>
    })
}