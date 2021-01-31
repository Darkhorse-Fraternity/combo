/*
 * @Author: tonyYo
 * @Date: 2021-01-06 16:44:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-31 18:34:36
 * @FilePath: /Combo/src/hooks/request.ts
 */
import { RequestFunctionParams } from 'yapi-to-typescript';
import axios from 'axios';
import { httpHeaders } from '@configure/reqConfigs';

// interface AxiosResponseOtherInfoType {
//   __axios_info: Omit<AxiosResponse, 'data'>;
// }

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
  server?: 'prod' | 'dev' | 'mock';
}

export default function request<TResponseData>(
  payload: RequestFunctionParams,
  options: RequestOptions = {
    server: 'prod',
  },
  // ): Promise<TResponseData & AxiosResponseOtherInfoType> {
): Promise<TResponseData> {
  const { path, method, data, devUrl, prodUrl } = payload;

  let baseURL = options.server === 'dev' ? devUrl : prodUrl;

  // 请求地址
  const config = method === 'GET' ? { params: data } : { data };
  return axios
    .request<TResponseData>({
      baseURL,
      url: path,
      method,
      headers: httpHeaders(),
      ...config,
    })
    .then((res) => {
      // res.config
      // const { data, ...ohter } = res;
      const response = {
        ...res.data,
        // __axios_info:ohter
      };
      return response;
    });
}
