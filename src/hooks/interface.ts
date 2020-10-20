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
const devUrl_0_0_0_0 = 'http://121.89.170.197:7001' as any
const prodUrl_0_0_0_0 = 'http://121.89.170.197:7001' as any
const dataKey_0_0_0_0 = undefined as any

/**
 * 接口 [获取副本列表↗](http://121.89.170.197:3000/project/11/interface/api/304) 的 **请求类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb`
 * @更新时间 `2020-10-07 21:02:10`
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
 * @更新时间 `2020-10-07 21:02:10`
 */
export interface GetFbResponse {
  code: number
  data: {
    count?: number
    rows?: {
      id?: number
      userID?: string
      cost?: string
      coverUrl?: string
      rewardConfig?: {
        type?: string
      }
      titleConfig?: {
        title?: string
        introduction?: string
      }
      sort?: number
      active?: number
      verify?: number
      startTime?: string
      endTime?: string
      limitTime?: {
        end_at?: string
        start_at?: string
      }
      joinTime?: string
      created_at?: string
      updated_at?: string
    }[]
  }
  msg?: string
  timeStamp?: number
}

/**
 * 接口 [获取副本列表↗](http://121.89.170.197:3000/project/11/interface/api/304) 的 **请求配置的类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb`
 * @更新时间 `2020-10-07 21:02:10`
 */
type GetFbRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/11',
    'http://121.89.170.197:7001',
    'http://121.89.170.197:7001',
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
 * @更新时间 `2020-10-07 21:02:10`
 */
const getFbRequestConfig: GetFbRequestConfig = {
  mockUrl: mockUrl_0_0_0_0,
  devUrl: devUrl_0_0_0_0,
  prodUrl: prodUrl_0_0_0_0,
  path: '/fb',
  method: Method.GET,
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
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
 * @更新时间 `2020-10-07 21:02:10`
 */
export const getFb = makeRequest<GetFbRequest, GetFbResponse, GetFbRequestConfig>(getFbRequestConfig)

/**
 * 接口 [获取副本列表↗](http://121.89.170.197:3000/project/11/interface/api/304) 的 **React Hook**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `GET /fb`
 * @更新时间 `2020-10-07 21:02:10`
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
  RequestConfig<
    'http://121.89.170.197:3000/mock/11',
    'http://121.89.170.197:7001',
    'http://121.89.170.197:7001',
    '/fb/:id',
    undefined,
    'id',
    ':id',
    false
  >
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
 * @更新时间 `2020-09-21 19:42:00`
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
 * @更新时间 `2020-09-21 19:42:00`
 */
export interface PostFbResponse {}

/**
 * 接口 [创建副本↗](http://121.89.170.197:3000/project/11/interface/api/308) 的 **请求配置的类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fb`
 * @更新时间 `2020-09-21 19:42:00`
 */
type PostFbRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/11',
    'http://121.89.170.197:7001',
    'http://121.89.170.197:7001',
    '/fb',
    undefined,
    string,
    string,
    false
  >
>

/**
 * 接口 [创建副本↗](http://121.89.170.197:3000/project/11/interface/api/308) 的 **请求配置**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fb`
 * @更新时间 `2020-09-21 19:42:00`
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
 * @更新时间 `2020-09-21 19:42:00`
 */
export const postFb = makeRequest<PostFbRequest, PostFbResponse, PostFbRequestConfig>(postFbRequestConfig)

/**
 * 接口 [创建副本↗](http://121.89.170.197:3000/project/11/interface/api/308) 的 **React Hook**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fb`
 * @更新时间 `2020-09-21 19:42:00`
 */
export const usePostFb = makeRequestHook<PostFbRequest, PostFbRequestConfig, ReturnType<typeof postFb>>(postFb)

/**
 * 接口 [查询当前用户是否加入该副本↗](http://121.89.170.197:3000/project/11/interface/api/310) 的 **请求类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /checkFbJoin`
 * @更新时间 `2020-09-21 19:40:40`
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
 * @更新时间 `2020-09-21 19:40:40`
 */
export interface PostCheckFbJoinResponse {}

/**
 * 接口 [查询当前用户是否加入该副本↗](http://121.89.170.197:3000/project/11/interface/api/310) 的 **请求配置的类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /checkFbJoin`
 * @更新时间 `2020-09-21 19:40:40`
 */
type PostCheckFbJoinRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/11',
    'http://121.89.170.197:7001',
    'http://121.89.170.197:7001',
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
 * @更新时间 `2020-09-21 19:40:40`
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
 * @更新时间 `2020-09-21 19:40:40`
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
 * @更新时间 `2020-09-21 19:40:40`
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
 * @更新时间 `2020-10-07 19:18:04`
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
 * @更新时间 `2020-10-07 19:18:04`
 */
export interface PostFbJoinResponse {
  /**
   * 加入成功或失败
   */
  result: boolean
  /**
   * 提示
   */
  msg: string
  /**
   * 加入失败时没有这个字段
   */
  info: {
    /**
     * 加入副本记录的ID
     */
    id: number
    /**
     * 为0时表示需要支付金额，为1时表示已付款或不需要付款(0元)
     */
    pay: number
    /**
     * 支付金额，单位元
     */
    payMoney: number
  }
}

/**
 * 接口 [加入副本↗](http://121.89.170.197:3000/project/11/interface/api/312) 的 **请求配置的类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fbJoin`
 * @更新时间 `2020-10-07 19:18:04`
 */
type PostFbJoinRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/11',
    'http://121.89.170.197:7001',
    'http://121.89.170.197:7001',
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
 * @更新时间 `2020-10-07 19:18:04`
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
 * @更新时间 `2020-10-07 19:18:04`
 */
export const postFbJoin = makeRequest<PostFbJoinRequest, PostFbJoinResponse, PostFbJoinRequestConfig>(
  postFbJoinRequestConfig,
)

/**
 * 接口 [加入副本↗](http://121.89.170.197:3000/project/11/interface/api/312) 的 **React Hook**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `POST /fbJoin`
 * @更新时间 `2020-10-07 19:18:04`
 */
export const usePostFbJoin = makeRequestHook<PostFbJoinRequest, PostFbJoinRequestConfig, ReturnType<typeof postFbJoin>>(
  postFbJoin,
)

/**
 * 接口 [选择付款方式↗](http://121.89.170.197:3000/project/11/interface/api/468) 的 **请求类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `PUT /fbJoinSelectPayType/:id`
 * @更新时间 `2020-10-07 19:18:06`
 */
export interface PutFbJoinSelectPayTypeIdRequest {
  userID: string
  /**
   * 1支付宝2微信3余额
   */
  payType: number
  /**
   * id为加入副本接口返回的info.id
   */
  id: string
}

/**
 * 接口 [选择付款方式↗](http://121.89.170.197:3000/project/11/interface/api/468) 的 **返回类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `PUT /fbJoinSelectPayType/:id`
 * @更新时间 `2020-10-07 19:18:06`
 */
export interface PutFbJoinSelectPayTypeIdResponse {
  /**
   * 支付订单生成成功或失败
   */
  result: boolean
  payInfo: boolean
}

/**
 * 接口 [选择付款方式↗](http://121.89.170.197:3000/project/11/interface/api/468) 的 **请求配置的类型**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `PUT /fbJoinSelectPayType/:id`
 * @更新时间 `2020-10-07 19:18:06`
 */
type PutFbJoinSelectPayTypeIdRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/11',
    'http://121.89.170.197:7001',
    'http://121.89.170.197:7001',
    '/fbJoinSelectPayType/:id',
    undefined,
    'id',
    string,
    false
  >
>

/**
 * 接口 [选择付款方式↗](http://121.89.170.197:3000/project/11/interface/api/468) 的 **请求配置**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `PUT /fbJoinSelectPayType/:id`
 * @更新时间 `2020-10-07 19:18:06`
 */
const putFbJoinSelectPayTypeIdRequestConfig: PutFbJoinSelectPayTypeIdRequestConfig = {
  mockUrl: mockUrl_0_0_0_0,
  devUrl: devUrl_0_0_0_0,
  prodUrl: prodUrl_0_0_0_0,
  path: '/fbJoinSelectPayType/:id',
  method: Method.PUT,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_0_0_0,
  paramNames: ['id'],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [选择付款方式↗](http://121.89.170.197:3000/project/11/interface/api/468) 的 **请求函数**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `PUT /fbJoinSelectPayType/:id`
 * @更新时间 `2020-10-07 19:18:06`
 */
export const putFbJoinSelectPayTypeId = makeRequest<
  PutFbJoinSelectPayTypeIdRequest,
  PutFbJoinSelectPayTypeIdResponse,
  PutFbJoinSelectPayTypeIdRequestConfig
>(putFbJoinSelectPayTypeIdRequestConfig)

/**
 * 接口 [选择付款方式↗](http://121.89.170.197:3000/project/11/interface/api/468) 的 **React Hook**
 *
 * @分类 [副本接口↗](http://121.89.170.197:3000/project/11/interface/api/cat_270)
 * @请求头 `PUT /fbJoinSelectPayType/:id`
 * @更新时间 `2020-10-07 19:18:06`
 */
export const usePutFbJoinSelectPayTypeId = makeRequestHook<
  PutFbJoinSelectPayTypeIdRequest,
  PutFbJoinSelectPayTypeIdRequestConfig,
  ReturnType<typeof putFbJoinSelectPayTypeId>
>(putFbJoinSelectPayTypeId)

const mockUrl_0_1_0_0 = 'http://121.89.170.197:3000/mock/59' as any
const devUrl_0_1_0_0 = 'https://api.icourage.cn/1.1' as any
const prodUrl_0_1_0_0 = 'http://api.icourage.cn/1.1' as any
const dataKey_0_1_0_0 = undefined as any

/**
 * 接口 [call_iUseList2↗](http://121.89.170.197:3000/project/59/interface/api/472) 的 **请求类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /call/iUseList2`
 * @更新时间 `2020-10-12 18:02:49`
 */
export interface PostCallIUseList2Request {}

/**
 * 接口 [call_iUseList2↗](http://121.89.170.197:3000/project/59/interface/api/472) 的 **返回类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /call/iUseList2`
 * @更新时间 `2020-10-12 18:02:49`
 */
export interface PostCallIUseList2Response {
  result?: {
    iUseList?: {
      cycle: number
      privacy: number
      time: number
      doneDate: {
        __type?: string
        iso?: string
      }
      user: {
        __type?: string
        className?: string
        objectId?: string
      }
      statu: string
      iCard: {
        notifyTimes?: string[]
        sound?: {
          open?: boolean
          item?: {
            title?: string
            type?: string
            key?: string
          }
        }
        limitTimes?: string[]
        notifyTime?: string
        useNum?: number
        circleState?: number
        state?: number
        recordDay?: number[]
        title?: string
        notifyText?: string
        record?: string[]
        period?: string
        price?: number
        user?: {
          uid?: number
          toolConfig?: {
            redo?: number
          }
          username?: string
          emailVerified?: boolean
          balance?: number
          authData?: {
            anonymous?: {
              id?: string
            }
            qq?: null
            weixin?: null
          }
          mobilePhoneVerified?: boolean
          objectId?: string
          createdAt?: string
          updatedAt?: string
          __type?: string
          className?: string
          nickname?: string
          headimgurl?: string
          mobilePhoneNumber?: string
          avatar?: {
            name?: string
            url?: string
            mime_type?: string
            bucket?: string
            metaData?: {}
            objectId?: string
            createdAt?: string
            updatedAt?: string
            __type?: string
          }
        }
        iconAndColor?: {
          name?: string
          color?: string
        }
        objectId?: string
        createdAt?: string
        updatedAt?: string
        __type?: string
        className?: string
        color?: string
        icon?: string
      }
      isFb: boolean
      objectId: string
      createdAt: string
      updatedAt: string
      __type: string
      className: string
    }[]
  }
}

/**
 * 接口 [call_iUseList2↗](http://121.89.170.197:3000/project/59/interface/api/472) 的 **请求配置的类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /call/iUseList2`
 * @更新时间 `2020-10-12 18:02:49`
 */
type PostCallIUseList2RequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/call/iUseList2',
    undefined,
    string,
    string,
    true
  >
>

/**
 * 接口 [call_iUseList2↗](http://121.89.170.197:3000/project/59/interface/api/472) 的 **请求配置**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /call/iUseList2`
 * @更新时间 `2020-10-12 18:02:49`
 */
const postCallIUseList2RequestConfig: PostCallIUseList2RequestConfig = {
  mockUrl: mockUrl_0_1_0_0,
  devUrl: devUrl_0_1_0_0,
  prodUrl: prodUrl_0_1_0_0,
  path: '/call/iUseList2',
  method: Method.POST,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: true,
}

/**
 * 接口 [call_iUseList2↗](http://121.89.170.197:3000/project/59/interface/api/472) 的 **请求函数**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /call/iUseList2`
 * @更新时间 `2020-10-12 18:02:49`
 */
export const postCallIUseList2 = makeRequest<
  PostCallIUseList2Request,
  PostCallIUseList2Response,
  PostCallIUseList2RequestConfig
>(postCallIUseList2RequestConfig)

/**
 * 接口 [call_iUseList2↗](http://121.89.170.197:3000/project/59/interface/api/472) 的 **React Hook**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /call/iUseList2`
 * @更新时间 `2020-10-12 18:02:49`
 */
export const usePostCallIUseList2 = makeRequestHook<
  PostCallIUseList2Request,
  PostCallIUseList2RequestConfig,
  ReturnType<typeof postCallIUseList2>
>(postCallIUseList2)

/**
 * 接口 [get_classes_iUse↗](http://121.89.170.197:3000/project/59/interface/api/474) 的 **请求类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse`
 * @更新时间 `2020-10-12 17:56:30`
 */
export interface GetClassesIUseRequest {}

/**
 * 接口 [get_classes_iUse↗](http://121.89.170.197:3000/project/59/interface/api/474) 的 **返回类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse`
 * @更新时间 `2020-10-12 17:56:30`
 */
export interface GetClassesIUseResponse {
  results?: {
    updatedAt: string
    cycle: number
    objectId: string
    privacy: number
    time: number
    createdAt: string
    doneDate: {
      __type?: string
      iso?: string
    }
    user: {
      __type?: string
      className?: string
      objectId?: string
    }
    statu: string
    iCard: {
      notifyTimes?: string[]
      sound?: {
        open?: boolean
        item?: {
          title?: string
          type?: string
          key?: string
        }
      }
      updatedAt?: string
      limitTimes?: string[]
      notifyTime?: string
      useNum?: number
      objectId?: string
      circleState?: number
      createdAt?: string
      state?: number
      className?: string
      recordDay?: number[]
      title?: string
      notifyText?: string
      __type?: string
      record?: string[]
      period?: string
      price?: number
      user?: {
        updatedAt?: string
        uid?: number
        objectId?: string
        toolConfig?: {
          redo?: number
        }
        username?: string
        createdAt?: string
        className?: string
        emailVerified?: boolean
        balance?: number
        __type?: string
        authData?: {
          anonymous?: {
            id?: string
          }
        }
        mobilePhoneVerified?: boolean
        nickname?: string
        headimgurl?: string
        avatar?: {
          mime_type?: string
          updatedAt?: string
          key?: string
          name?: string
          objectId?: string
          createdAt?: string
          __type?: string
          url?: string
          provider?: string
          metaData?: {}
          bucket?: string
        }
      }
      iconAndColor?: {
        name?: string
        color?: string
      }
      color?: string
      icon?: string
    }
  }[]
}

/**
 * 接口 [get_classes_iUse↗](http://121.89.170.197:3000/project/59/interface/api/474) 的 **请求配置的类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse`
 * @更新时间 `2020-10-12 17:56:30`
 */
type GetClassesIUseRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/classes/iUse',
    undefined,
    string,
    string,
    true
  >
>

/**
 * 接口 [get_classes_iUse↗](http://121.89.170.197:3000/project/59/interface/api/474) 的 **请求配置**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse`
 * @更新时间 `2020-10-12 17:56:30`
 */
const getClassesIUseRequestConfig: GetClassesIUseRequestConfig = {
  mockUrl: mockUrl_0_1_0_0,
  devUrl: devUrl_0_1_0_0,
  prodUrl: prodUrl_0_1_0_0,
  path: '/classes/iUse',
  method: Method.GET,
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: true,
}

/**
 * 接口 [get_classes_iUse↗](http://121.89.170.197:3000/project/59/interface/api/474) 的 **请求函数**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse`
 * @更新时间 `2020-10-12 17:56:30`
 */
export const getClassesIUse = makeRequest<GetClassesIUseRequest, GetClassesIUseResponse, GetClassesIUseRequestConfig>(
  getClassesIUseRequestConfig,
)

/**
 * 接口 [get_classes_iUse↗](http://121.89.170.197:3000/project/59/interface/api/474) 的 **React Hook**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse`
 * @更新时间 `2020-10-12 17:56:30`
 */
export const useGetClassesIUse = makeRequestHook<
  GetClassesIUseRequest,
  GetClassesIUseRequestConfig,
  ReturnType<typeof getClassesIUse>
>(getClassesIUse)

/**
 * 接口 [加入卡片详情↗](http://121.89.170.197:3000/project/59/interface/api/488) 的 **请求类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse/:id`
 * @更新时间 `2020-10-15 10:46:44`
 */
export interface GetClassesIUseIdRequest {
  id: string
}

/**
 * 接口 [加入卡片详情↗](http://121.89.170.197:3000/project/59/interface/api/488) 的 **返回类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse/:id`
 * @更新时间 `2020-10-15 10:46:44`
 */
export interface GetClassesIUseIdResponse {
  updatedAt: string
  cycle: number
  objectId: string
  privacy: number
  time: number
  createdAt: string
  doneDate: {
    __type?: string
    iso?: string
  }
  user: {
    __type: string
    className: string
    objectId: string
  }
  statu: string
  iCard: {
    __type: string
    className: string
    objectId: string
  }
}

/**
 * 接口 [加入卡片详情↗](http://121.89.170.197:3000/project/59/interface/api/488) 的 **请求配置的类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse/:id`
 * @更新时间 `2020-10-15 10:46:44`
 */
type GetClassesIUseIdRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/classes/iUse/:id',
    undefined,
    'id',
    string,
    false
  >
>

/**
 * 接口 [加入卡片详情↗](http://121.89.170.197:3000/project/59/interface/api/488) 的 **请求配置**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse/:id`
 * @更新时间 `2020-10-15 10:46:44`
 */
const getClassesIUseIdRequestConfig: GetClassesIUseIdRequestConfig = {
  mockUrl: mockUrl_0_1_0_0,
  devUrl: devUrl_0_1_0_0,
  prodUrl: prodUrl_0_1_0_0,
  path: '/classes/iUse/:id',
  method: Method.GET,
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_0,
  paramNames: ['id'],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [加入卡片详情↗](http://121.89.170.197:3000/project/59/interface/api/488) 的 **请求函数**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse/:id`
 * @更新时间 `2020-10-15 10:46:44`
 */
export const getClassesIUseId = makeRequest<
  GetClassesIUseIdRequest,
  GetClassesIUseIdResponse,
  GetClassesIUseIdRequestConfig
>(getClassesIUseIdRequestConfig)

/**
 * 接口 [加入卡片详情↗](http://121.89.170.197:3000/project/59/interface/api/488) 的 **React Hook**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse/:id`
 * @更新时间 `2020-10-15 10:46:44`
 */
export const useGetClassesIUseId = makeRequestHook<
  GetClassesIUseIdRequest,
  GetClassesIUseIdRequestConfig,
  ReturnType<typeof getClassesIUseId>
>(getClassesIUseId)

const mockUrl_0_1_0_1 = 'http://121.89.170.197:3000/mock/59' as any
const devUrl_0_1_0_1 = 'https://api.icourage.cn/1.1' as any
const prodUrl_0_1_0_1 = 'http://api.icourage.cn/1.1' as any
const dataKey_0_1_0_1 = undefined as any

/**
 * 接口 [习惯列表↗](http://121.89.170.197:3000/project/59/interface/api/476) 的 **请求类型**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `POST /call/cardList`
 * @更新时间 `2020-10-20 13:59:28`
 */
export interface PostCallCardListRequest {
  skip?: string
  limit: string
  order?: string
  count?: number
}

/**
 * 接口 [习惯列表↗](http://121.89.170.197:3000/project/59/interface/api/476) 的 **返回类型**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `POST /call/cardList`
 * @更新时间 `2020-10-20 13:59:28`
 */
export interface PostCallCardListResponse {
  result?: {
    notifyTimes: string[]
    sound: {
      open?: boolean
      item?: {
        title?: string
        type?: string
        key?: string
        source?: number
      }
    }
    limitTimes: string[]
    notifyTime: string
    password: string
    useNum: number
    circleState: number
    state: number
    recordDay: number[]
    title: string
    notifyText: string
    record: string[]
    period: string
    price: number
    user: {
      __type?: string
      className?: string
      objectId?: string
    }
    iconAndColor: {
      name?: string
      color?: string
    }
    objectId: string
    createdAt: string
    updatedAt: string
    __type: string
    className: string
    keys?: string[]
    describe?: string
    img?: {
      name?: string
      url?: string
      mime_type?: string
      bucket?: string
      metaData?: {}
      objectId?: string
      createdAt?: string
      updatedAt?: string
      __type?: string
    }
    activityEndDate?: {
      __type?: string
      iso?: string
    }
  }[]
}

/**
 * 接口 [习惯列表↗](http://121.89.170.197:3000/project/59/interface/api/476) 的 **请求配置的类型**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `POST /call/cardList`
 * @更新时间 `2020-10-20 13:59:28`
 */
type PostCallCardListRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/call/cardList',
    undefined,
    string,
    string,
    false
  >
>

/**
 * 接口 [习惯列表↗](http://121.89.170.197:3000/project/59/interface/api/476) 的 **请求配置**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `POST /call/cardList`
 * @更新时间 `2020-10-20 13:59:28`
 */
const postCallCardListRequestConfig: PostCallCardListRequestConfig = {
  mockUrl: mockUrl_0_1_0_1,
  devUrl: devUrl_0_1_0_1,
  prodUrl: prodUrl_0_1_0_1,
  path: '/call/cardList',
  method: Method.POST,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_1,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [习惯列表↗](http://121.89.170.197:3000/project/59/interface/api/476) 的 **请求函数**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `POST /call/cardList`
 * @更新时间 `2020-10-20 13:59:28`
 */
export const postCallCardList = makeRequest<
  PostCallCardListRequest,
  PostCallCardListResponse,
  PostCallCardListRequestConfig
>(postCallCardListRequestConfig)

/**
 * 接口 [习惯列表↗](http://121.89.170.197:3000/project/59/interface/api/476) 的 **React Hook**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `POST /call/cardList`
 * @更新时间 `2020-10-20 13:59:28`
 */
export const usePostCallCardList = makeRequestHook<
  PostCallCardListRequest,
  PostCallCardListRequestConfig,
  ReturnType<typeof postCallCardList>
>(postCallCardList)

/**
 * 接口 [习惯详情↗](http://121.89.170.197:3000/project/59/interface/api/486) 的 **请求类型**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `GET /classes/iCard/:id`
 * @更新时间 `2020-10-20 15:25:18`
 */
export interface GetClassesICardIdRequest {
  id: string
}

/**
 * 接口 [习惯详情↗](http://121.89.170.197:3000/project/59/interface/api/486) 的 **返回类型**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `GET /classes/iCard/:id`
 * @更新时间 `2020-10-20 15:25:18`
 */
export interface GetClassesICardIdResponse {
  notifyTimes: string[]
  sound: {
    open: boolean
    item: {
      title: string
      type: string
      key: string
    }
  }
  updatedAt: string
  limitTimes: string[]
  notifyTime: string
  useNum: number
  objectId: string
  createdAt: string
  state: number
  recordDay: number[]
  title: string
  notifyText?: string
  record?: string[]
  period?: string
  price?: number
  user: {
    __type?: string
    className?: string
    objectId?: string
  }
  iconAndColor: {
    name?: string
    color?: string
  }
  activityEndDate?: {
    iso: string
    __type: string
  }
}

/**
 * 接口 [习惯详情↗](http://121.89.170.197:3000/project/59/interface/api/486) 的 **请求配置的类型**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `GET /classes/iCard/:id`
 * @更新时间 `2020-10-20 15:25:18`
 */
type GetClassesICardIdRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/classes/iCard/:id',
    undefined,
    'id',
    string,
    false
  >
>

/**
 * 接口 [习惯详情↗](http://121.89.170.197:3000/project/59/interface/api/486) 的 **请求配置**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `GET /classes/iCard/:id`
 * @更新时间 `2020-10-20 15:25:18`
 */
const getClassesICardIdRequestConfig: GetClassesICardIdRequestConfig = {
  mockUrl: mockUrl_0_1_0_1,
  devUrl: devUrl_0_1_0_1,
  prodUrl: prodUrl_0_1_0_1,
  path: '/classes/iCard/:id',
  method: Method.GET,
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_1,
  paramNames: ['id'],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [习惯详情↗](http://121.89.170.197:3000/project/59/interface/api/486) 的 **请求函数**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `GET /classes/iCard/:id`
 * @更新时间 `2020-10-20 15:25:18`
 */
export const getClassesICardId = makeRequest<
  GetClassesICardIdRequest,
  GetClassesICardIdResponse,
  GetClassesICardIdRequestConfig
>(getClassesICardIdRequestConfig)

/**
 * 接口 [习惯详情↗](http://121.89.170.197:3000/project/59/interface/api/486) 的 **React Hook**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `GET /classes/iCard/:id`
 * @更新时间 `2020-10-20 15:25:18`
 */
export const useGetClassesICardId = makeRequestHook<
  GetClassesICardIdRequest,
  GetClassesICardIdRequestConfig,
  ReturnType<typeof getClassesICardId>
>(getClassesICardId)

const mockUrl_0_1_0_2 = 'http://121.89.170.197:3000/mock/59' as any
const devUrl_0_1_0_2 = 'https://api.icourage.cn/1.1' as any
const prodUrl_0_1_0_2 = 'http://api.icourage.cn/1.1' as any
const dataKey_0_1_0_2 = undefined as any

/**
 * 接口 [clockIn↗](http://121.89.170.197:3000/project/59/interface/api/478) 的 **请求类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /classes/iDo`
 * @更新时间 `2020-10-13 18:09:25`
 */
export interface PostClassesIDoRequest {
  user: {
    __type: string
    className: string
    objectId: string
  }
  iUse: {
    __type: string
    className: string
    objectId: string
  }
  iCard: {
    __type: string
    className: string
    objectId: string
  }
  type: number
  doneDate: {
    __type: string
    iso: string
  }
  imgs?: string[]
  recordText?: string
}

/**
 * 接口 [clockIn↗](http://121.89.170.197:3000/project/59/interface/api/478) 的 **返回类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /classes/iDo`
 * @更新时间 `2020-10-13 18:09:25`
 */
export interface PostClassesIDoResponse {
  objectId?: string
  createdAt?: string
}

/**
 * 接口 [clockIn↗](http://121.89.170.197:3000/project/59/interface/api/478) 的 **请求配置的类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /classes/iDo`
 * @更新时间 `2020-10-13 18:09:25`
 */
type PostClassesIDoRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/classes/iDo',
    undefined,
    string,
    string,
    false
  >
>

/**
 * 接口 [clockIn↗](http://121.89.170.197:3000/project/59/interface/api/478) 的 **请求配置**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /classes/iDo`
 * @更新时间 `2020-10-13 18:09:25`
 */
const postClassesIDoRequestConfig: PostClassesIDoRequestConfig = {
  mockUrl: mockUrl_0_1_0_2,
  devUrl: devUrl_0_1_0_2,
  prodUrl: prodUrl_0_1_0_2,
  path: '/classes/iDo',
  method: Method.POST,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_2,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [clockIn↗](http://121.89.170.197:3000/project/59/interface/api/478) 的 **请求函数**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /classes/iDo`
 * @更新时间 `2020-10-13 18:09:25`
 */
export const postClassesIDo = makeRequest<PostClassesIDoRequest, PostClassesIDoResponse, PostClassesIDoRequestConfig>(
  postClassesIDoRequestConfig,
)

/**
 * 接口 [clockIn↗](http://121.89.170.197:3000/project/59/interface/api/478) 的 **React Hook**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /classes/iDo`
 * @更新时间 `2020-10-13 18:09:25`
 */
export const usePostClassesIDo = makeRequestHook<
  PostClassesIDoRequest,
  PostClassesIDoRequestConfig,
  ReturnType<typeof postClassesIDo>
>(postClassesIDo)

/**
 * 接口 [打卡详细记录↗](http://121.89.170.197:3000/project/59/interface/api/480) 的 **请求类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo/:id`
 * @更新时间 `2020-10-14 15:15:43`
 */
export interface GetClassesIDoIdRequest {
  /**
   * 5f6c3923e81ba025bbf986e6
   */
  id: string
}

/**
 * 接口 [打卡详细记录↗](http://121.89.170.197:3000/project/59/interface/api/480) 的 **返回类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo/:id`
 * @更新时间 `2020-10-14 15:15:43`
 */
export interface GetClassesIDoIdResponse {
  updatedAt: string
  objectId: string
  recordText: string
  createdAt: string
  type: number
  state: number
  likeNum: number
  iUse: {
    __type?: string
    className?: string
    objectId?: string
  }
  imgs?: string[]
  commentNew?: boolean
  commentNum?: number
  doneDate: {
    __type?: string
    iso?: string
  }
  user: {
    __type?: string
    className?: string
    objectId?: string
  }
  iCard: {
    __type?: string
    className?: string
    objectId?: string
  }
}

/**
 * 接口 [打卡详细记录↗](http://121.89.170.197:3000/project/59/interface/api/480) 的 **请求配置的类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo/:id`
 * @更新时间 `2020-10-14 15:15:43`
 */
type GetClassesIDoIdRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/classes/iDo/:id',
    undefined,
    'id',
    string,
    false
  >
>

/**
 * 接口 [打卡详细记录↗](http://121.89.170.197:3000/project/59/interface/api/480) 的 **请求配置**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo/:id`
 * @更新时间 `2020-10-14 15:15:43`
 */
const getClassesIDoIdRequestConfig: GetClassesIDoIdRequestConfig = {
  mockUrl: mockUrl_0_1_0_2,
  devUrl: devUrl_0_1_0_2,
  prodUrl: prodUrl_0_1_0_2,
  path: '/classes/iDo/:id',
  method: Method.GET,
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_2,
  paramNames: ['id'],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [打卡详细记录↗](http://121.89.170.197:3000/project/59/interface/api/480) 的 **请求函数**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo/:id`
 * @更新时间 `2020-10-14 15:15:43`
 */
export const getClassesIDoId = makeRequest<
  GetClassesIDoIdRequest,
  GetClassesIDoIdResponse,
  GetClassesIDoIdRequestConfig
>(getClassesIDoIdRequestConfig)

/**
 * 接口 [打卡详细记录↗](http://121.89.170.197:3000/project/59/interface/api/480) 的 **React Hook**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo/:id`
 * @更新时间 `2020-10-14 15:15:43`
 */
export const useGetClassesIDoId = makeRequestHook<
  GetClassesIDoIdRequest,
  GetClassesIDoIdRequestConfig,
  ReturnType<typeof getClassesIDoId>
>(getClassesIDoId)

/**
 * 接口 [打卡详细记录列表↗](http://121.89.170.197:3000/project/59/interface/api/484) 的 **请求类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo`
 * @更新时间 `2020-10-20 13:58:25`
 */
export interface GetClassesIDoRequest {
  count?: string
  limit: string
  where?: string
  skip?: string
  order?: string
}

/**
 * 接口 [打卡详细记录列表↗](http://121.89.170.197:3000/project/59/interface/api/484) 的 **返回类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo`
 * @更新时间 `2020-10-20 13:58:25`
 */
export interface GetClassesIDoResponse {
  results: {
    updatedAt: string
    objectId: string
    recordText: string
    createdAt: string
    state: number
    likeNum: number
    iUse: {
      __type?: string
      className?: string
      objectId?: string
    }
    imgs: string[]
    commentNew: boolean
    commentNum: number
    user: {
      __type?: string
      className?: string
      objectId?: string
    }
    iCard: {
      __type?: string
      className?: string
      objectId?: string
    }
  }[]
  count?: number
}

/**
 * 接口 [打卡详细记录列表↗](http://121.89.170.197:3000/project/59/interface/api/484) 的 **请求配置的类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo`
 * @更新时间 `2020-10-20 13:58:25`
 */
type GetClassesIDoRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/classes/iDo',
    undefined,
    string,
    'count' | 'limit' | 'where' | 'skip' | 'order',
    false
  >
>

/**
 * 接口 [打卡详细记录列表↗](http://121.89.170.197:3000/project/59/interface/api/484) 的 **请求配置**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo`
 * @更新时间 `2020-10-20 13:58:25`
 */
const getClassesIDoRequestConfig: GetClassesIDoRequestConfig = {
  mockUrl: mockUrl_0_1_0_2,
  devUrl: devUrl_0_1_0_2,
  prodUrl: prodUrl_0_1_0_2,
  path: '/classes/iDo',
  method: Method.GET,
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_2,
  paramNames: [],
  queryNames: ['count', 'limit', 'where', 'skip', 'order'],
  requestDataOptional: false,
}

/**
 * 接口 [打卡详细记录列表↗](http://121.89.170.197:3000/project/59/interface/api/484) 的 **请求函数**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo`
 * @更新时间 `2020-10-20 13:58:25`
 */
export const getClassesIDo = makeRequest<GetClassesIDoRequest, GetClassesIDoResponse, GetClassesIDoRequestConfig>(
  getClassesIDoRequestConfig,
)

/**
 * 接口 [打卡详细记录列表↗](http://121.89.170.197:3000/project/59/interface/api/484) 的 **React Hook**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo`
 * @更新时间 `2020-10-20 13:58:25`
 */
export const useGetClassesIDo = makeRequestHook<
  GetClassesIDoRequest,
  GetClassesIDoRequestConfig,
  ReturnType<typeof getClassesIDo>
>(getClassesIDo)

const mockUrl_0_1_0_3 = 'http://121.89.170.197:3000/mock/59' as any
const devUrl_0_1_0_3 = 'https://api.icourage.cn/1.1' as any
const prodUrl_0_1_0_3 = 'http://api.icourage.cn/1.1' as any
const dataKey_0_1_0_3 = undefined as any

/**
 * 接口 [用户详情↗](http://121.89.170.197:3000/project/59/interface/api/490) 的 **请求类型**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/:id`
 * @更新时间 `2020-10-15 16:26:00`
 */
export interface GetUsersIdRequest {
  id: string
}

/**
 * 接口 [用户详情↗](http://121.89.170.197:3000/project/59/interface/api/490) 的 **返回类型**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/:id`
 * @更新时间 `2020-10-15 16:26:00`
 */
export interface GetUsersIdResponse {
  updatedAt: string
  uid: number
  objectId: string
  toolConfig: {
    redo?: number
  }
  nickname?: string
  headimgurl?: string
  createdAt: string
  emailVerified: boolean
  balance: number
  avatar?: {
    mime_type?: string
    updatedAt?: string
    key?: string
    name?: string
    objectId?: string
    createdAt?: string
    __type?: string
    url?: string
    provider?: string
    metaData?: {}
    bucket?: string
  }
  mobilePhoneVerified: boolean
}

/**
 * 接口 [用户详情↗](http://121.89.170.197:3000/project/59/interface/api/490) 的 **请求配置的类型**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/:id`
 * @更新时间 `2020-10-15 16:26:00`
 */
type GetUsersIdRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/users/:id',
    undefined,
    'id',
    string,
    false
  >
>

/**
 * 接口 [用户详情↗](http://121.89.170.197:3000/project/59/interface/api/490) 的 **请求配置**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/:id`
 * @更新时间 `2020-10-15 16:26:00`
 */
const getUsersIdRequestConfig: GetUsersIdRequestConfig = {
  mockUrl: mockUrl_0_1_0_3,
  devUrl: devUrl_0_1_0_3,
  prodUrl: prodUrl_0_1_0_3,
  path: '/users/:id',
  method: Method.GET,
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_3,
  paramNames: ['id'],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [用户详情↗](http://121.89.170.197:3000/project/59/interface/api/490) 的 **请求函数**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/:id`
 * @更新时间 `2020-10-15 16:26:00`
 */
export const getUsersId = makeRequest<GetUsersIdRequest, GetUsersIdResponse, GetUsersIdRequestConfig>(
  getUsersIdRequestConfig,
)

/**
 * 接口 [用户详情↗](http://121.89.170.197:3000/project/59/interface/api/490) 的 **React Hook**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/:id`
 * @更新时间 `2020-10-15 16:26:00`
 */
export const useGetUsersId = makeRequestHook<GetUsersIdRequest, GetUsersIdRequestConfig, ReturnType<typeof getUsersId>>(
  getUsersId,
)

/* prettier-ignore-end */
