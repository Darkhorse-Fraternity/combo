/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
// prettier-ignore
import { Method, RequestBodyType, ResponseBodyType, RequestConfig, RequestFunctionRestArgs, FileData, prepare } from 'yapi-to-typescript'
// @ts-ignore
import request from './request'
// @ts-ignore
import makeRequestHook from './makeRequestHook'

// makeRequest
function makeRequestRequired<TReqeustData, TResponseData, TRequestConfig extends RequestConfig>(
  requestConfig: TRequestConfig,
) {
  const req = function(requestData: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) {
    return request<TResponseData>(prepare(requestConfig, requestData), ...args)
  }
  req.requestConfig = requestConfig
  return req
}
function makeRequestOptional<TReqeustData, TResponseData, TRequestConfig extends RequestConfig>(
  requestConfig: TRequestConfig,
) {
  const req = function(requestData?: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) {
    return request<TResponseData>(prepare(requestConfig, requestData), ...args)
  }
  req.requestConfig = requestConfig
  return req
}
function makeRequest<TReqeustData, TResponseData, TRequestConfig extends RequestConfig>(requestConfig: TRequestConfig) {
  const optional = makeRequestOptional<TReqeustData, TResponseData, TRequestConfig>(requestConfig)
  const required = makeRequestRequired<TReqeustData, TResponseData, TRequestConfig>(requestConfig)
  return (requestConfig.requestDataOptional ? optional : required) as TRequestConfig['requestDataOptional'] extends true
    ? typeof optional
    : typeof required
}

// Request
export type Request<
  TReqeustData,
  TRequestConfig extends RequestConfig,
  TRequestResult
> = (TRequestConfig['requestDataOptional'] extends true
  ? (requestData?: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult
  : (requestData: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult) & {
  requestConfig: TRequestConfig
}

const mockUrl_0_0_0_0 = 'http://121.89.170.197:3000/mock/11' as any
const devUrl_0_0_0_0 = 'http://127.0.0.1' as any
const prodUrl_0_0_0_0 = '' as any
const dataKey_0_0_0_0 = undefined as any

/**
 * 接口 [获取副本列表↗](http://121.89.170.197:3000/project/11/interface/api/304) 的 **请求类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb`
 * @更新时间 `2020-08-10 19:42:57`
 */
export interface GetFbRequest {
  /**
   * 分页查询起始条数，从0开始
   */
  offset: string
  /**
   * 每页几条，默认10，最大100
   */
  limit: string
  /**
   * 列表显示 1是0否
   */
  active?: string
  /**
   * 审核状态0待审1审过2没过
   */
  verify?: string
}

/**
 * 接口 [获取副本列表↗](http://121.89.170.197:3000/project/11/interface/api/304) 的 **返回类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb`
 * @更新时间 `2020-08-10 19:42:57`
 */
export type GetFbResponse = any

/**
 * 接口 [获取副本列表↗](http://121.89.170.197:3000/project/11/interface/api/304) 的 **请求配置的类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb`
 * @更新时间 `2020-08-10 19:42:57`
 */
type GetFbRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/11',
    'http://127.0.0.1',
    '',
    '/fb',
    undefined,
    string,
    'offset' | 'limit' | 'active' | 'verify',
    false
  >
>

/**
 * 接口 [获取副本列表↗](http://121.89.170.197:3000/project/11/interface/api/304) 的 **请求配置**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb`
 * @更新时间 `2020-08-10 19:42:57`
 */
const getFbRequestConfig: GetFbRequestConfig = {
  mockUrl: mockUrl_0_0_0_0,
  devUrl: devUrl_0_0_0_0,
  prodUrl: prodUrl_0_0_0_0,
  path: '/fb',
  method: Method.GET,
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.raw,
  dataKey: dataKey_0_0_0_0,
  paramNames: [],
  queryNames: ['offset', 'limit', 'active', 'verify'],
  requestDataOptional: false,
}

/**
 * 接口 [获取副本列表↗](http://121.89.170.197:3000/project/11/interface/api/304) 的 **请求函数**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb`
 * @更新时间 `2020-08-10 19:42:57`
 */
export const getFb = makeRequest<GetFbRequest, GetFbResponse, GetFbRequestConfig>(getFbRequestConfig)

/**
 * 接口 [获取副本列表↗](http://121.89.170.197:3000/project/11/interface/api/304) 的 **React Hook**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb`
 * @更新时间 `2020-08-10 19:42:57`
 */
export const useGetFb = makeRequestHook<GetFbRequest, GetFbRequestConfig, ReturnType<typeof getFb>>(getFb)

/**
 * 接口 [获取副本详情↗](http://121.89.170.197:3000/project/11/interface/api/306) 的 **请求类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb/:id`
 * @更新时间 `2020-08-10 19:55:37`
 */
export interface GetFbIdRequest {
  /**
   * fb的id
   */
  ':id': string
  /**
   * fb的id
   */
  id: string
}

/**
 * 接口 [获取副本详情↗](http://121.89.170.197:3000/project/11/interface/api/306) 的 **返回类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb/:id`
 * @更新时间 `2020-08-10 19:55:37`
 */
export interface GetFbIdResponse {}

/**
 * 接口 [获取副本详情↗](http://121.89.170.197:3000/project/11/interface/api/306) 的 **请求配置的类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb/:id`
 * @更新时间 `2020-08-10 19:55:37`
 */
type GetFbIdRequestConfig = Readonly<
  RequestConfig<'http://121.89.170.197:3000/mock/11', 'http://127.0.0.1', '', '/fb/:id', undefined, 'id', ':id', false>
>

/**
 * 接口 [获取副本详情↗](http://121.89.170.197:3000/project/11/interface/api/306) 的 **请求配置**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb/:id`
 * @更新时间 `2020-08-10 19:55:37`
 */
const getFbIdRequestConfig: GetFbIdRequestConfig = {
  mockUrl: mockUrl_0_0_0_0,
  devUrl: devUrl_0_0_0_0,
  prodUrl: prodUrl_0_0_0_0,
  path: '/fb/:id',
  method: Method.GET,
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_0_0_0,
  paramNames: ['id'],
  queryNames: [':id'],
  requestDataOptional: false,
}

/**
 * 接口 [获取副本详情↗](http://121.89.170.197:3000/project/11/interface/api/306) 的 **请求函数**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb/:id`
 * @更新时间 `2020-08-10 19:55:37`
 */
export const getFbId = makeRequest<GetFbIdRequest, GetFbIdResponse, GetFbIdRequestConfig>(getFbIdRequestConfig)

/**
 * 接口 [获取副本详情↗](http://121.89.170.197:3000/project/11/interface/api/306) 的 **React Hook**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb/:id`
 * @更新时间 `2020-08-10 19:55:37`
 */
export const useGetFbId = makeRequestHook<GetFbIdRequest, GetFbIdRequestConfig, ReturnType<typeof getFbId>>(getFbId)

/**
 * 接口 [创建副本↗](http://121.89.170.197:3000/project/11/interface/api/308) 的 **请求类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fb`
 * @更新时间 `2020-08-10 19:53:16`
 */
export interface PostFbRequest {
  /**
   * 用户ID
   */
  userID: string
  /**
   * 加入副本费用
   */
  cost: number
  /**
   * 封面图地址
   */
  coverUrl: string
  rewardConfig?: {
    /**
     * 奖励类型money redo
     */
    type: string
    redo?: string
  }
  titleConfig: {
    /**
     * 副本标题
     */
    title: string
    /**
     * 副本介绍
     */
    introduction: string
  }
  /**
   * 开始日期
   */
  startTime: string
  /**
   * 结束日期
   */
  endTime: string
  /**
   * 加入截止时间
   */
  joinTime: string
  limitTime: {
    /**
     * 开始打卡时间
     */
    start_at: string
    /**
     * 结束打卡时间
     */
    end_at: string
  }
  /**
   * 结算时间
   */
  close_at: string
  /**
   * 排序
   */
  sort: number
}

/**
 * 接口 [创建副本↗](http://121.89.170.197:3000/project/11/interface/api/308) 的 **返回类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fb`
 * @更新时间 `2020-08-10 19:53:16`
 */
export interface PostFbResponse {}

/**
 * 接口 [创建副本↗](http://121.89.170.197:3000/project/11/interface/api/308) 的 **请求配置的类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fb`
 * @更新时间 `2020-08-10 19:53:16`
 */
type PostFbRequestConfig = Readonly<
  RequestConfig<'http://121.89.170.197:3000/mock/11', 'http://127.0.0.1', '', '/fb', undefined, string, string, false>
>

/**
 * 接口 [创建副本↗](http://121.89.170.197:3000/project/11/interface/api/308) 的 **请求配置**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fb`
 * @更新时间 `2020-08-10 19:53:16`
 */
const postFbRequestConfig: PostFbRequestConfig = {
  mockUrl: mockUrl_0_0_0_0,
  devUrl: devUrl_0_0_0_0,
  prodUrl: prodUrl_0_0_0_0,
  path: '/fb',
  method: Method.POST,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_0_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [创建副本↗](http://121.89.170.197:3000/project/11/interface/api/308) 的 **请求函数**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fb`
 * @更新时间 `2020-08-10 19:53:16`
 */
export const postFb = makeRequest<PostFbRequest, PostFbResponse, PostFbRequestConfig>(postFbRequestConfig)

/**
 * 接口 [创建副本↗](http://121.89.170.197:3000/project/11/interface/api/308) 的 **React Hook**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fb`
 * @更新时间 `2020-08-10 19:53:16`
 */
export const usePostFb = makeRequestHook<PostFbRequest, PostFbRequestConfig, ReturnType<typeof postFb>>(postFb)

/**
 * 接口 [查询当前用户是否加入该副本↗](http://121.89.170.197:3000/project/11/interface/api/310) 的 **请求类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /checkFbJoin`
 * @更新时间 `2020-08-10 19:55:44`
 */
export interface PostCheckFbJoinRequest {
  /**
   * 用户ID
   */
  userID: string
  /**
   * 副本ID
   */
  fbID: string
}

/**
 * 接口 [查询当前用户是否加入该副本↗](http://121.89.170.197:3000/project/11/interface/api/310) 的 **返回类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /checkFbJoin`
 * @更新时间 `2020-08-10 19:55:44`
 */
export interface PostCheckFbJoinResponse {}

/**
 * 接口 [查询当前用户是否加入该副本↗](http://121.89.170.197:3000/project/11/interface/api/310) 的 **请求配置的类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /checkFbJoin`
 * @更新时间 `2020-08-10 19:55:44`
 */
type PostCheckFbJoinRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/11',
    'http://127.0.0.1',
    '',
    '/checkFbJoin',
    undefined,
    string,
    string,
    false
  >
>

/**
 * 接口 [查询当前用户是否加入该副本↗](http://121.89.170.197:3000/project/11/interface/api/310) 的 **请求配置**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /checkFbJoin`
 * @更新时间 `2020-08-10 19:55:44`
 */
const postCheckFbJoinRequestConfig: PostCheckFbJoinRequestConfig = {
  mockUrl: mockUrl_0_0_0_0,
  devUrl: devUrl_0_0_0_0,
  prodUrl: prodUrl_0_0_0_0,
  path: '/checkFbJoin',
  method: Method.POST,
  requestBodyType: RequestBodyType.form,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_0_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [查询当前用户是否加入该副本↗](http://121.89.170.197:3000/project/11/interface/api/310) 的 **请求函数**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /checkFbJoin`
 * @更新时间 `2020-08-10 19:55:44`
 */
export const postCheckFbJoin = makeRequest<
  PostCheckFbJoinRequest,
  PostCheckFbJoinResponse,
  PostCheckFbJoinRequestConfig
>(postCheckFbJoinRequestConfig)

/**
 * 接口 [查询当前用户是否加入该副本↗](http://121.89.170.197:3000/project/11/interface/api/310) 的 **React Hook**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /checkFbJoin`
 * @更新时间 `2020-08-10 19:55:44`
 */
export const usePostCheckFbJoin = makeRequestHook<
  PostCheckFbJoinRequest,
  PostCheckFbJoinRequestConfig,
  ReturnType<typeof postCheckFbJoin>
>(postCheckFbJoin)

/**
 * 接口 [加入副本↗](http://121.89.170.197:3000/project/11/interface/api/312) 的 **请求类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fbJoin`
 * @更新时间 `2020-08-10 19:55:27`
 */
export interface PostFbJoinRequest {
  /**
   * 用户ID
   */
  userID: string
  /**
   * 副本ID
   */
  fbID: string
}

/**
 * 接口 [加入副本↗](http://121.89.170.197:3000/project/11/interface/api/312) 的 **返回类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fbJoin`
 * @更新时间 `2020-08-10 19:55:27`
 */
export interface PostFbJoinResponse {}

/**
 * 接口 [加入副本↗](http://121.89.170.197:3000/project/11/interface/api/312) 的 **请求配置的类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fbJoin`
 * @更新时间 `2020-08-10 19:55:27`
 */
type PostFbJoinRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/11',
    'http://127.0.0.1',
    '',
    '/fbJoin',
    undefined,
    string,
    string,
    false
  >
>

/**
 * 接口 [加入副本↗](http://121.89.170.197:3000/project/11/interface/api/312) 的 **请求配置**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fbJoin`
 * @更新时间 `2020-08-10 19:55:27`
 */
const postFbJoinRequestConfig: PostFbJoinRequestConfig = {
  mockUrl: mockUrl_0_0_0_0,
  devUrl: devUrl_0_0_0_0,
  prodUrl: prodUrl_0_0_0_0,
  path: '/fbJoin',
  method: Method.POST,
  requestBodyType: RequestBodyType.form,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_0_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [加入副本↗](http://121.89.170.197:3000/project/11/interface/api/312) 的 **请求函数**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fbJoin`
 * @更新时间 `2020-08-10 19:55:27`
 */
export const postFbJoin = makeRequest<PostFbJoinRequest, PostFbJoinResponse, PostFbJoinRequestConfig>(
  postFbJoinRequestConfig,
)

/**
 * 接口 [加入副本↗](http://121.89.170.197:3000/project/11/interface/api/312) 的 **React Hook**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fbJoin`
 * @更新时间 `2020-08-10 19:55:27`
 */
export const usePostFbJoin = makeRequestHook<PostFbJoinRequest, PostFbJoinRequestConfig, ReturnType<typeof postFbJoin>>(
  postFbJoin,
)

/* prettier-ignore-end */
