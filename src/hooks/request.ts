import { RequestFunctionParams } from 'yapi-to-typescript'
import axios from 'axios';
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
): Promise<TResponseData> {
  return new Promise<TResponseData>((resolve, reject) => {
    // 基本地址
   
    const { path, method, data, devUrl, prodUrl } = payload;
    const baseURL = options.server === 'dev' ? devUrl : prodUrl;
    // 请求地址
    const config = method === 'GET' ?{ params:data, }:{ data };
  

    // 具体请求逻辑
    return axios({
      baseURL,
      url: path,
      method,
      // headers: leancloudHeaders,
      ...config
    });
  })
}