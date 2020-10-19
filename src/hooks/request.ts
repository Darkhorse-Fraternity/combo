import { RequestFunctionParams } from 'yapi-to-typescript'
import axios, { AxiosResponse } from 'axios';
import { httpHeaders } from '@configure/reqConfigs';

interface AxiosResponseOtherInfoType {
  __axios_info:Omit<AxiosResponse,'data'>
}

export interface RequestOptions {
  /**
   * 使用的服务器。
   *
   * - `prod`: 生产服务器
   * - `dev`: 测试服务器
   * - `mock`: 模拟服务器
   *
   * @default prod
   */
  server?: 'prod' | 'dev' | 'mock',
}

export default function request<TResponseData>(
  payload: RequestFunctionParams,
  options: RequestOptions = {
    server: 'prod',
  },
): Promise<TResponseData & AxiosResponseOtherInfoType> {
  const { path, method, data, devUrl, prodUrl } = payload;
  const baseURL = options.server === 'dev' ? devUrl : prodUrl;
  // 请求地址
  const config = method === 'GET' ?{ params:data, }:{ data };

  return axios.request<TResponseData>({
    baseURL,
    url: path,
    method,
    headers: httpHeaders(true),
    ...config
  }).then(res=>{
    // res.config
    const {data,...ohter} = res;
    const response = {
      ...res.data,
      __axios_info:ohter
    }
    return response;
  });
 
}