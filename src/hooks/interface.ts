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
 * 接口 [call_iUseList3↗](http://121.89.170.197:3000/project/59/interface/api/472) 的 **请求类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /call/iUseList3`
 * @更新时间 `2020-10-29 15:36:47`
 */
export interface PostCallIUseList3Request {}

/**
 * 接口 [call_iUseList3↗](http://121.89.170.197:3000/project/59/interface/api/472) 的 **返回类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /call/iUseList3`
 * @更新时间 `2020-10-29 15:36:47`
 */
export interface PostCallIUseList3Response {
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
 * 接口 [call_iUseList3↗](http://121.89.170.197:3000/project/59/interface/api/472) 的 **请求配置的类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /call/iUseList3`
 * @更新时间 `2020-10-29 15:36:47`
 */
type PostCallIUseList3RequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/call/iUseList3',
    undefined,
    string,
    string,
    true
  >
>

/**
 * 接口 [call_iUseList3↗](http://121.89.170.197:3000/project/59/interface/api/472) 的 **请求配置**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /call/iUseList3`
 * @更新时间 `2020-10-29 15:36:47`
 */
const postCallIUseList3RequestConfig: PostCallIUseList3RequestConfig = {
  mockUrl: mockUrl_0_1_0_0,
  devUrl: devUrl_0_1_0_0,
  prodUrl: prodUrl_0_1_0_0,
  path: '/call/iUseList3',
  method: Method.POST,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: true,
}

/**
 * 接口 [call_iUseList3↗](http://121.89.170.197:3000/project/59/interface/api/472) 的 **请求函数**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /call/iUseList3`
 * @更新时间 `2020-10-29 15:36:47`
 */
export const postCallIUseList3 = makeRequest<
  PostCallIUseList3Request,
  PostCallIUseList3Response,
  PostCallIUseList3RequestConfig
>(postCallIUseList3RequestConfig)

/**
 * 接口 [call_iUseList3↗](http://121.89.170.197:3000/project/59/interface/api/472) 的 **React Hook**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /call/iUseList3`
 * @更新时间 `2020-10-29 15:36:47`
 */
export const usePostCallIUseList3 = makeRequestHook<
  PostCallIUseList3Request,
  PostCallIUseList3RequestConfig,
  ReturnType<typeof postCallIUseList3>
>(postCallIUseList3)

/**
 * 接口 [get_classes_iUse↗](http://121.89.170.197:3000/project/59/interface/api/474) 的 **请求类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse`
 * @更新时间 `2020-11-02 17:06:55`
 */
export interface GetClassesIUseRequest {}

/**
 * 接口 [get_classes_iUse↗](http://121.89.170.197:3000/project/59/interface/api/474) 的 **返回类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse`
 * @更新时间 `2020-11-02 17:06:55`
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
      __type: string
      className: string
      objectId: string
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
 * @更新时间 `2020-11-02 17:06:55`
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
 * @更新时间 `2020-11-02 17:06:55`
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
 * @更新时间 `2020-11-02 17:06:55`
 */
export const getClassesIUse = makeRequest<GetClassesIUseRequest, GetClassesIUseResponse, GetClassesIUseRequestConfig>(
  getClassesIUseRequestConfig,
)

/**
 * 接口 [get_classes_iUse↗](http://121.89.170.197:3000/project/59/interface/api/474) 的 **React Hook**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse`
 * @更新时间 `2020-11-02 17:06:55`
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
 * @更新时间 `2020-11-09 17:44:47`
 */
export interface GetClassesIUseIdRequest {
  include?: string
  where?: string
  id: string
}

/**
 * 接口 [加入卡片详情↗](http://121.89.170.197:3000/project/59/interface/api/488) 的 **返回类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse/:id`
 * @更新时间 `2020-11-09 17:44:47`
 */
export interface GetClassesIUseIdResponse {
  updatedAt: string
  cycle?: number
  objectId: string
  privacy: number
  time: number
  createdAt: string
  doneDate?: {
    __type: string
    iso: string
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
    objectId: string
    createdAt?: string
    state?: number
    className?: string
    recordDay?: number[]
    title?: string
    notifyText?: string
    __type: string
    record?: string[]
    period?: string
    price?: number
    user?: {
      __type?: string
      className?: string
      objectId?: string
    }
    iconAndColor?: {
      name?: string
      color?: string
    }
  }
}

/**
 * 接口 [加入卡片详情↗](http://121.89.170.197:3000/project/59/interface/api/488) 的 **请求配置的类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse/:id`
 * @更新时间 `2020-11-09 17:44:47`
 */
type GetClassesIUseIdRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/classes/iUse/:id',
    undefined,
    'id',
    'include' | 'where',
    false
  >
>

/**
 * 接口 [加入卡片详情↗](http://121.89.170.197:3000/project/59/interface/api/488) 的 **请求配置**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse/:id`
 * @更新时间 `2020-11-09 17:44:47`
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
  queryNames: ['include', 'where'],
  requestDataOptional: false,
}

/**
 * 接口 [加入卡片详情↗](http://121.89.170.197:3000/project/59/interface/api/488) 的 **请求函数**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `GET /classes/iUse/:id`
 * @更新时间 `2020-11-09 17:44:47`
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
 * @更新时间 `2020-11-09 17:44:47`
 */
export const useGetClassesIUseId = makeRequestHook<
  GetClassesIUseIdRequest,
  GetClassesIUseIdRequestConfig,
  ReturnType<typeof getClassesIUseId>
>(getClassesIUseId)

/**
 * 接口 [更新卡片使用↗](http://121.89.170.197:3000/project/59/interface/api/506) 的 **请求类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `PUT /classes/iUse/:id`
 * @更新时间 `2020-11-09 17:45:46`
 */
export interface PutClassesIUseIdRequest {
  privacy?: number
  statu?: string
  id: string
}

/**
 * 接口 [更新卡片使用↗](http://121.89.170.197:3000/project/59/interface/api/506) 的 **返回类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `PUT /classes/iUse/:id`
 * @更新时间 `2020-11-09 17:45:46`
 */
export interface PutClassesIUseIdResponse {
  objectId?: string
  createdAt?: string
}

/**
 * 接口 [更新卡片使用↗](http://121.89.170.197:3000/project/59/interface/api/506) 的 **请求配置的类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `PUT /classes/iUse/:id`
 * @更新时间 `2020-11-09 17:45:46`
 */
type PutClassesIUseIdRequestConfig = Readonly<
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
 * 接口 [更新卡片使用↗](http://121.89.170.197:3000/project/59/interface/api/506) 的 **请求配置**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `PUT /classes/iUse/:id`
 * @更新时间 `2020-11-09 17:45:46`
 */
const putClassesIUseIdRequestConfig: PutClassesIUseIdRequestConfig = {
  mockUrl: mockUrl_0_1_0_0,
  devUrl: devUrl_0_1_0_0,
  prodUrl: prodUrl_0_1_0_0,
  path: '/classes/iUse/:id',
  method: Method.PUT,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_0,
  paramNames: ['id'],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [更新卡片使用↗](http://121.89.170.197:3000/project/59/interface/api/506) 的 **请求函数**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `PUT /classes/iUse/:id`
 * @更新时间 `2020-11-09 17:45:46`
 */
export const putClassesIUseId = makeRequest<
  PutClassesIUseIdRequest,
  PutClassesIUseIdResponse,
  PutClassesIUseIdRequestConfig
>(putClassesIUseIdRequestConfig)

/**
 * 接口 [更新卡片使用↗](http://121.89.170.197:3000/project/59/interface/api/506) 的 **React Hook**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `PUT /classes/iUse/:id`
 * @更新时间 `2020-11-09 17:45:46`
 */
export const usePutClassesIUseId = makeRequestHook<
  PutClassesIUseIdRequest,
  PutClassesIUseIdRequestConfig,
  ReturnType<typeof putClassesIUseId>
>(putClassesIUseId)

/**
 * 接口 [添加卡片使用↗](http://121.89.170.197:3000/project/59/interface/api/514) 的 **请求类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /classes/iUse`
 * @更新时间 `2020-11-09 18:07:35`
 */
export interface PostClassesIUseRequest {
  privacy?: number
  statu?: string
  iCard: {
    __type: string
    className: string
    objectId: string
  }
  user: {
    __type: string
    className: string
    objectId: string
  }
}

/**
 * 接口 [添加卡片使用↗](http://121.89.170.197:3000/project/59/interface/api/514) 的 **返回类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /classes/iUse`
 * @更新时间 `2020-11-09 18:07:35`
 */
export interface PostClassesIUseResponse {
  objectId?: string
  createdAt?: string
}

/**
 * 接口 [添加卡片使用↗](http://121.89.170.197:3000/project/59/interface/api/514) 的 **请求配置的类型**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /classes/iUse`
 * @更新时间 `2020-11-09 18:07:35`
 */
type PostClassesIUseRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/classes/iUse',
    undefined,
    string,
    string,
    false
  >
>

/**
 * 接口 [添加卡片使用↗](http://121.89.170.197:3000/project/59/interface/api/514) 的 **请求配置**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /classes/iUse`
 * @更新时间 `2020-11-09 18:07:35`
 */
const postClassesIUseRequestConfig: PostClassesIUseRequestConfig = {
  mockUrl: mockUrl_0_1_0_0,
  devUrl: devUrl_0_1_0_0,
  prodUrl: prodUrl_0_1_0_0,
  path: '/classes/iUse',
  method: Method.POST,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [添加卡片使用↗](http://121.89.170.197:3000/project/59/interface/api/514) 的 **请求函数**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /classes/iUse`
 * @更新时间 `2020-11-09 18:07:35`
 */
export const postClassesIUse = makeRequest<
  PostClassesIUseRequest,
  PostClassesIUseResponse,
  PostClassesIUseRequestConfig
>(postClassesIUseRequestConfig)

/**
 * 接口 [添加卡片使用↗](http://121.89.170.197:3000/project/59/interface/api/514) 的 **React Hook**
 *
 * @分类 [iUse↗](http://121.89.170.197:3000/project/59/interface/api/cat_368)
 * @请求头 `POST /classes/iUse`
 * @更新时间 `2020-11-09 18:07:35`
 */
export const usePostClassesIUse = makeRequestHook<
  PostClassesIUseRequest,
  PostClassesIUseRequestConfig,
  ReturnType<typeof postClassesIUse>
>(postClassesIUse)

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

/**
 * 接口 [更新习惯↗](http://121.89.170.197:3000/project/59/interface/api/504) 的 **请求类型**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `PUT /classes/iCard/:id`
 * @更新时间 `2020-11-10 11:00:23`
 */
export interface PutClassesICardIdRequest {
  circleState?: number
  state?: number
  describe?: string
  iconAndColor?: {
    name: string
    color: string
  }
  limitTimes?: string[]
  notifyTimes?: string[]
  record?: string[]
  recordDay?: number[]
  sound?: {
    open: boolean
    item: {
      title: string
      type: string
      key: string
    }
  }
  title?: string
  notifyText?: string
  id: string
}

/**
 * 接口 [更新习惯↗](http://121.89.170.197:3000/project/59/interface/api/504) 的 **返回类型**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `PUT /classes/iCard/:id`
 * @更新时间 `2020-11-10 11:00:23`
 */
export interface PutClassesICardIdResponse {
  objectId?: string
  createdAt?: string
}

/**
 * 接口 [更新习惯↗](http://121.89.170.197:3000/project/59/interface/api/504) 的 **请求配置的类型**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `PUT /classes/iCard/:id`
 * @更新时间 `2020-11-10 11:00:23`
 */
type PutClassesICardIdRequestConfig = Readonly<
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
 * 接口 [更新习惯↗](http://121.89.170.197:3000/project/59/interface/api/504) 的 **请求配置**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `PUT /classes/iCard/:id`
 * @更新时间 `2020-11-10 11:00:23`
 */
const putClassesICardIdRequestConfig: PutClassesICardIdRequestConfig = {
  mockUrl: mockUrl_0_1_0_1,
  devUrl: devUrl_0_1_0_1,
  prodUrl: prodUrl_0_1_0_1,
  path: '/classes/iCard/:id',
  method: Method.PUT,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_1,
  paramNames: ['id'],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [更新习惯↗](http://121.89.170.197:3000/project/59/interface/api/504) 的 **请求函数**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `PUT /classes/iCard/:id`
 * @更新时间 `2020-11-10 11:00:23`
 */
export const putClassesICardId = makeRequest<
  PutClassesICardIdRequest,
  PutClassesICardIdResponse,
  PutClassesICardIdRequestConfig
>(putClassesICardIdRequestConfig)

/**
 * 接口 [更新习惯↗](http://121.89.170.197:3000/project/59/interface/api/504) 的 **React Hook**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `PUT /classes/iCard/:id`
 * @更新时间 `2020-11-10 11:00:23`
 */
export const usePutClassesICardId = makeRequestHook<
  PutClassesICardIdRequest,
  PutClassesICardIdRequestConfig,
  ReturnType<typeof putClassesICardId>
>(putClassesICardId)

/**
 * 接口 [新建卡片习惯↗](http://121.89.170.197:3000/project/59/interface/api/512) 的 **请求类型**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `POST /classes/iCard`
 * @更新时间 `2020-11-10 10:58:09`
 */
export interface PostClassesICardRequest {
  circleState?: number
  state?: number
  notifyText: string
  iconAndColor: {
    name: string
    color: string
  }
  limitTimes: string[]
  notifyTimes: string[]
  record: string[]
  recordDay: number[]
  sound: {
    open: boolean
    item: {
      title: string
      type: string
      key: string
    }
  }
  title: string
  user: {
    __type: string
    className: string
    objectId: string
  }
}

/**
 * 接口 [新建卡片习惯↗](http://121.89.170.197:3000/project/59/interface/api/512) 的 **返回类型**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `POST /classes/iCard`
 * @更新时间 `2020-11-10 10:58:09`
 */
export interface PostClassesICardResponse {
  objectId?: string
  createdAt?: string
}

/**
 * 接口 [新建卡片习惯↗](http://121.89.170.197:3000/project/59/interface/api/512) 的 **请求配置的类型**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `POST /classes/iCard`
 * @更新时间 `2020-11-10 10:58:09`
 */
type PostClassesICardRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/classes/iCard',
    undefined,
    string,
    string,
    false
  >
>

/**
 * 接口 [新建卡片习惯↗](http://121.89.170.197:3000/project/59/interface/api/512) 的 **请求配置**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `POST /classes/iCard`
 * @更新时间 `2020-11-10 10:58:09`
 */
const postClassesICardRequestConfig: PostClassesICardRequestConfig = {
  mockUrl: mockUrl_0_1_0_1,
  devUrl: devUrl_0_1_0_1,
  prodUrl: prodUrl_0_1_0_1,
  path: '/classes/iCard',
  method: Method.POST,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_1,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [新建卡片习惯↗](http://121.89.170.197:3000/project/59/interface/api/512) 的 **请求函数**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `POST /classes/iCard`
 * @更新时间 `2020-11-10 10:58:09`
 */
export const postClassesICard = makeRequest<
  PostClassesICardRequest,
  PostClassesICardResponse,
  PostClassesICardRequestConfig
>(postClassesICardRequestConfig)

/**
 * 接口 [新建卡片习惯↗](http://121.89.170.197:3000/project/59/interface/api/512) 的 **React Hook**
 *
 * @分类 [iCard↗](http://121.89.170.197:3000/project/59/interface/api/cat_375)
 * @请求头 `POST /classes/iCard`
 * @更新时间 `2020-11-10 10:58:09`
 */
export const usePostClassesICard = makeRequestHook<
  PostClassesICardRequest,
  PostClassesICardRequestConfig,
  ReturnType<typeof postClassesICard>
>(postClassesICard)

const mockUrl_0_1_0_2 = 'http://121.89.170.197:3000/mock/59' as any
const devUrl_0_1_0_2 = 'https://api.icourage.cn/1.1' as any
const prodUrl_0_1_0_2 = 'http://api.icourage.cn/1.1' as any
const dataKey_0_1_0_2 = undefined as any

/**
 * 接口 [打卡↗](http://121.89.170.197:3000/project/59/interface/api/478) 的 **请求类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /classes/iDo`
 * @更新时间 `2020-10-21 16:47:26`
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
 * 接口 [打卡↗](http://121.89.170.197:3000/project/59/interface/api/478) 的 **返回类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /classes/iDo`
 * @更新时间 `2020-10-21 16:47:26`
 */
export interface PostClassesIDoResponse {
  objectId?: string
  createdAt?: string
}

/**
 * 接口 [打卡↗](http://121.89.170.197:3000/project/59/interface/api/478) 的 **请求配置的类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /classes/iDo`
 * @更新时间 `2020-10-21 16:47:26`
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
 * 接口 [打卡↗](http://121.89.170.197:3000/project/59/interface/api/478) 的 **请求配置**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /classes/iDo`
 * @更新时间 `2020-10-21 16:47:26`
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
 * 接口 [打卡↗](http://121.89.170.197:3000/project/59/interface/api/478) 的 **请求函数**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /classes/iDo`
 * @更新时间 `2020-10-21 16:47:26`
 */
export const postClassesIDo = makeRequest<PostClassesIDoRequest, PostClassesIDoResponse, PostClassesIDoRequestConfig>(
  postClassesIDoRequestConfig,
)

/**
 * 接口 [打卡↗](http://121.89.170.197:3000/project/59/interface/api/478) 的 **React Hook**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /classes/iDo`
 * @更新时间 `2020-10-21 16:47:26`
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
 * @更新时间 `2020-10-21 14:34:31`
 */
export interface GetClassesIDoRequest {
  count?: string
  limit: string
  where?: string
  skip?: string
  order?: string
  include?: string
}

/**
 * 接口 [打卡详细记录列表↗](http://121.89.170.197:3000/project/59/interface/api/484) 的 **返回类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo`
 * @更新时间 `2020-10-21 14:34:31`
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
      __type: string
      className: string
      objectId: string
      privacy?: number
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
    doneDate?: {
      iso: string
      __type: string
    }
    type: number
  }[]
  count?: number
}

/**
 * 接口 [打卡详细记录列表↗](http://121.89.170.197:3000/project/59/interface/api/484) 的 **请求配置的类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo`
 * @更新时间 `2020-10-21 14:34:31`
 */
type GetClassesIDoRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/classes/iDo',
    undefined,
    string,
    'count' | 'limit' | 'where' | 'skip' | 'order' | 'include',
    false
  >
>

/**
 * 接口 [打卡详细记录列表↗](http://121.89.170.197:3000/project/59/interface/api/484) 的 **请求配置**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo`
 * @更新时间 `2020-10-21 14:34:31`
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
  queryNames: ['count', 'limit', 'where', 'skip', 'order', 'include'],
  requestDataOptional: false,
}

/**
 * 接口 [打卡详细记录列表↗](http://121.89.170.197:3000/project/59/interface/api/484) 的 **请求函数**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo`
 * @更新时间 `2020-10-21 14:34:31`
 */
export const getClassesIDo = makeRequest<GetClassesIDoRequest, GetClassesIDoResponse, GetClassesIDoRequestConfig>(
  getClassesIDoRequestConfig,
)

/**
 * 接口 [打卡详细记录列表↗](http://121.89.170.197:3000/project/59/interface/api/484) 的 **React Hook**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `GET /classes/iDo`
 * @更新时间 `2020-10-21 14:34:31`
 */
export const useGetClassesIDo = makeRequestHook<
  GetClassesIDoRequest,
  GetClassesIDoRequestConfig,
  ReturnType<typeof getClassesIDo>
>(getClassesIDo)

/**
 * 接口 [修改打卡↗](http://121.89.170.197:3000/project/59/interface/api/494) 的 **请求类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `PUT /classes/iDo/:id`
 * @更新时间 `2020-10-23 09:57:49`
 */
export interface PutClassesIDoIdRequest {
  imgs?: string[]
  recordText?: string
  state?: number
  id: string
}

/**
 * 接口 [修改打卡↗](http://121.89.170.197:3000/project/59/interface/api/494) 的 **返回类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `PUT /classes/iDo/:id`
 * @更新时间 `2020-10-23 09:57:49`
 */
export interface PutClassesIDoIdResponse {
  objectId?: string
  createdAt?: string
}

/**
 * 接口 [修改打卡↗](http://121.89.170.197:3000/project/59/interface/api/494) 的 **请求配置的类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `PUT /classes/iDo/:id`
 * @更新时间 `2020-10-23 09:57:49`
 */
type PutClassesIDoIdRequestConfig = Readonly<
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
 * 接口 [修改打卡↗](http://121.89.170.197:3000/project/59/interface/api/494) 的 **请求配置**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `PUT /classes/iDo/:id`
 * @更新时间 `2020-10-23 09:57:49`
 */
const putClassesIDoIdRequestConfig: PutClassesIDoIdRequestConfig = {
  mockUrl: mockUrl_0_1_0_2,
  devUrl: devUrl_0_1_0_2,
  prodUrl: prodUrl_0_1_0_2,
  path: '/classes/iDo/:id',
  method: Method.PUT,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_2,
  paramNames: ['id'],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [修改打卡↗](http://121.89.170.197:3000/project/59/interface/api/494) 的 **请求函数**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `PUT /classes/iDo/:id`
 * @更新时间 `2020-10-23 09:57:49`
 */
export const putClassesIDoId = makeRequest<
  PutClassesIDoIdRequest,
  PutClassesIDoIdResponse,
  PutClassesIDoIdRequestConfig
>(putClassesIDoIdRequestConfig)

/**
 * 接口 [修改打卡↗](http://121.89.170.197:3000/project/59/interface/api/494) 的 **React Hook**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `PUT /classes/iDo/:id`
 * @更新时间 `2020-10-23 09:57:49`
 */
export const usePutClassesIDoId = makeRequestHook<
  PutClassesIDoIdRequest,
  PutClassesIDoIdRequestConfig,
  ReturnType<typeof putClassesIDoId>
>(putClassesIDoId)

/**
 * 接口 [点赞↗](http://121.89.170.197:3000/project/59/interface/api/510) 的 **请求类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /call/iDoLike`
 * @更新时间 `2020-10-27 13:25:27`
 */
export interface PostCallIDoLikeRequest {
  iDoId: string
  addNum: number
}

/**
 * 接口 [点赞↗](http://121.89.170.197:3000/project/59/interface/api/510) 的 **返回类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /call/iDoLike`
 * @更新时间 `2020-10-27 13:25:27`
 */
export interface PostCallIDoLikeResponse {
  result: {
    likeNum: number
    objectId: string
    updatedAt: string
    __type: string
    className: string
  }
}

/**
 * 接口 [点赞↗](http://121.89.170.197:3000/project/59/interface/api/510) 的 **请求配置的类型**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /call/iDoLike`
 * @更新时间 `2020-10-27 13:25:27`
 */
type PostCallIDoLikeRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/call/iDoLike',
    undefined,
    string,
    string,
    false
  >
>

/**
 * 接口 [点赞↗](http://121.89.170.197:3000/project/59/interface/api/510) 的 **请求配置**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /call/iDoLike`
 * @更新时间 `2020-10-27 13:25:27`
 */
const postCallIDoLikeRequestConfig: PostCallIDoLikeRequestConfig = {
  mockUrl: mockUrl_0_1_0_2,
  devUrl: devUrl_0_1_0_2,
  prodUrl: prodUrl_0_1_0_2,
  path: '/call/iDoLike',
  method: Method.POST,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_2,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [点赞↗](http://121.89.170.197:3000/project/59/interface/api/510) 的 **请求函数**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /call/iDoLike`
 * @更新时间 `2020-10-27 13:25:27`
 */
export const postCallIDoLike = makeRequest<
  PostCallIDoLikeRequest,
  PostCallIDoLikeResponse,
  PostCallIDoLikeRequestConfig
>(postCallIDoLikeRequestConfig)

/**
 * 接口 [点赞↗](http://121.89.170.197:3000/project/59/interface/api/510) 的 **React Hook**
 *
 * @分类 [iDo↗](http://121.89.170.197:3000/project/59/interface/api/cat_382)
 * @请求头 `POST /call/iDoLike`
 * @更新时间 `2020-10-27 13:25:27`
 */
export const usePostCallIDoLike = makeRequestHook<
  PostCallIDoLikeRequest,
  PostCallIDoLikeRequestConfig,
  ReturnType<typeof postCallIDoLike>
>(postCallIDoLike)

const mockUrl_0_1_0_3 = 'http://121.89.170.197:3000/mock/59' as any
const devUrl_0_1_0_3 = 'https://api.icourage.cn/1.1' as any
const prodUrl_0_1_0_3 = 'http://api.icourage.cn/1.1' as any
const dataKey_0_1_0_3 = undefined as any

/**
 * 接口 [用户详情↗](http://121.89.170.197:3000/project/59/interface/api/490) 的 **请求类型**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/:id`
 * @更新时间 `2020-11-13 11:01:18`
 */
export interface GetUsersIdRequest {
  id: string
}

/**
 * 接口 [用户详情↗](http://121.89.170.197:3000/project/59/interface/api/490) 的 **返回类型**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/:id`
 * @更新时间 `2020-11-13 11:01:18`
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
  authData?: {
    anonymous?: {
      id: string
    }
  }
  username: string
  sessionToken: string
}

/**
 * 接口 [用户详情↗](http://121.89.170.197:3000/project/59/interface/api/490) 的 **请求配置的类型**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/:id`
 * @更新时间 `2020-11-13 11:01:18`
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
 * @更新时间 `2020-11-13 11:01:18`
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
 * @更新时间 `2020-11-13 11:01:18`
 */
export const getUsersId = makeRequest<GetUsersIdRequest, GetUsersIdResponse, GetUsersIdRequestConfig>(
  getUsersIdRequestConfig,
)

/**
 * 接口 [用户详情↗](http://121.89.170.197:3000/project/59/interface/api/490) 的 **React Hook**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/:id`
 * @更新时间 `2020-11-13 11:01:18`
 */
export const useGetUsersId = makeRequestHook<GetUsersIdRequest, GetUsersIdRequestConfig, ReturnType<typeof getUsersId>>(
  getUsersId,
)

/**
 * 接口 [第三方登录↗](http://121.89.170.197:3000/project/59/interface/api/520) 的 **请求类型**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `POST /users`
 * @更新时间 `2020-11-13 14:11:44`
 */
export interface PostUsersRequest {
  authData: {
    anonymous?: {
      __op?: string
      id?: string
    }
    qq?: {
      access_token: string
      openid: string
      oauth_consumer_key: string
    }
    wechat?: {
      access_token: string
      openid: string
    }
    lc_apple?: {
      uid: string
    }
  }
}

/**
 * 接口 [第三方登录↗](http://121.89.170.197:3000/project/59/interface/api/520) 的 **返回类型**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `POST /users`
 * @更新时间 `2020-11-13 14:11:44`
 */
export interface PostUsersResponse {
  updatedAt: string
  uid?: number
  objectId: string
  createdAt: string
  emailVerified?: boolean
  balance?: number
  mobilePhoneVerified?: boolean
  toolConfig?: {
    redo?: number
  }
  username: string
  sessionToken?: string
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
    bucket?: string
  }
  authData?: {
    anonymous?: {
      id?: string
    }
  }
}

/**
 * 接口 [第三方登录↗](http://121.89.170.197:3000/project/59/interface/api/520) 的 **请求配置的类型**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `POST /users`
 * @更新时间 `2020-11-13 14:11:44`
 */
type PostUsersRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/users',
    undefined,
    string,
    string,
    false
  >
>

/**
 * 接口 [第三方登录↗](http://121.89.170.197:3000/project/59/interface/api/520) 的 **请求配置**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `POST /users`
 * @更新时间 `2020-11-13 14:11:44`
 */
const postUsersRequestConfig: PostUsersRequestConfig = {
  mockUrl: mockUrl_0_1_0_3,
  devUrl: devUrl_0_1_0_3,
  prodUrl: prodUrl_0_1_0_3,
  path: '/users',
  method: Method.POST,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_3,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [第三方登录↗](http://121.89.170.197:3000/project/59/interface/api/520) 的 **请求函数**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `POST /users`
 * @更新时间 `2020-11-13 14:11:44`
 */
export const postUsers = makeRequest<PostUsersRequest, PostUsersResponse, PostUsersRequestConfig>(
  postUsersRequestConfig,
)

/**
 * 接口 [第三方登录↗](http://121.89.170.197:3000/project/59/interface/api/520) 的 **React Hook**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `POST /users`
 * @更新时间 `2020-11-13 14:11:44`
 */
export const usePostUsers = makeRequestHook<PostUsersRequest, PostUsersRequestConfig, ReturnType<typeof postUsers>>(
  postUsers,
)

/**
 * 接口 [自己的用户详情(含token)↗](http://121.89.170.197:3000/project/59/interface/api/534) 的 **请求类型**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/me`
 * @更新时间 `2020-11-13 15:58:19`
 */
export interface GetUsersMeRequest {}

/**
 * 接口 [自己的用户详情(含token)↗](http://121.89.170.197:3000/project/59/interface/api/534) 的 **返回类型**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/me`
 * @更新时间 `2020-11-13 15:58:19`
 */
export interface GetUsersMeResponse {
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
  authData?: {
    anonymous?: {
      id: string
    }
  }
  username: string
  sessionToken: string
}

/**
 * 接口 [自己的用户详情(含token)↗](http://121.89.170.197:3000/project/59/interface/api/534) 的 **请求配置的类型**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/me`
 * @更新时间 `2020-11-13 15:58:19`
 */
type GetUsersMeRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/users/me',
    undefined,
    string,
    string,
    true
  >
>

/**
 * 接口 [自己的用户详情(含token)↗](http://121.89.170.197:3000/project/59/interface/api/534) 的 **请求配置**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/me`
 * @更新时间 `2020-11-13 15:58:19`
 */
const getUsersMeRequestConfig: GetUsersMeRequestConfig = {
  mockUrl: mockUrl_0_1_0_3,
  devUrl: devUrl_0_1_0_3,
  prodUrl: prodUrl_0_1_0_3,
  path: '/users/me',
  method: Method.GET,
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_3,
  paramNames: [],
  queryNames: [],
  requestDataOptional: true,
}

/**
 * 接口 [自己的用户详情(含token)↗](http://121.89.170.197:3000/project/59/interface/api/534) 的 **请求函数**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/me`
 * @更新时间 `2020-11-13 15:58:19`
 */
export const getUsersMe = makeRequest<GetUsersMeRequest, GetUsersMeResponse, GetUsersMeRequestConfig>(
  getUsersMeRequestConfig,
)

/**
 * 接口 [自己的用户详情(含token)↗](http://121.89.170.197:3000/project/59/interface/api/534) 的 **React Hook**
 *
 * @分类 [user↗](http://121.89.170.197:3000/project/59/interface/api/cat_389)
 * @请求头 `GET /users/me`
 * @更新时间 `2020-11-13 15:58:19`
 */
export const useGetUsersMe = makeRequestHook<GetUsersMeRequest, GetUsersMeRequestConfig, ReturnType<typeof getUsersMe>>(
  getUsersMe,
)

const mockUrl_0_1_0_4 = 'http://121.89.170.197:3000/mock/59' as any
const devUrl_0_1_0_4 = 'https://api.icourage.cn/1.1' as any
const prodUrl_0_1_0_4 = 'http://api.icourage.cn/1.1' as any
const dataKey_0_1_0_4 = undefined as any

/**
 * 接口 [评论列表↗](http://121.89.170.197:3000/project/59/interface/api/496) 的 **请求类型**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `GET /classes/iComment`
 * @更新时间 `2020-10-22 11:03:02`
 */
export interface GetClassesICommentRequest {
  limit: string
  skip?: string
  include?: string
  where?: string
  order?: string
  count?: string
}

/**
 * 接口 [评论列表↗](http://121.89.170.197:3000/project/59/interface/api/496) 的 **返回类型**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `GET /classes/iComment`
 * @更新时间 `2020-10-22 11:03:02`
 */
export interface GetClassesICommentResponse {
  results?: {
    text: string
    user: {
      updatedAt?: string
      uid?: number
      objectId: string
      toolConfig?: {
        redo?: number
      }
      nickname?: string
      headimgurl?: string
      createdAt?: string
      className?: string
      emailVerified?: boolean
      balance?: number
      __type: string
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
      mobilePhoneVerified?: boolean
    }
    iDo: {
      __type: string
      className: string
      objectId: string
    }
    createdAt: string
    updatedAt: string
    objectId: string
  }[]
}

/**
 * 接口 [评论列表↗](http://121.89.170.197:3000/project/59/interface/api/496) 的 **请求配置的类型**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `GET /classes/iComment`
 * @更新时间 `2020-10-22 11:03:02`
 */
type GetClassesICommentRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/classes/iComment',
    undefined,
    string,
    'limit' | 'skip' | 'include' | 'where' | 'order' | 'count',
    false
  >
>

/**
 * 接口 [评论列表↗](http://121.89.170.197:3000/project/59/interface/api/496) 的 **请求配置**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `GET /classes/iComment`
 * @更新时间 `2020-10-22 11:03:02`
 */
const getClassesICommentRequestConfig: GetClassesICommentRequestConfig = {
  mockUrl: mockUrl_0_1_0_4,
  devUrl: devUrl_0_1_0_4,
  prodUrl: prodUrl_0_1_0_4,
  path: '/classes/iComment',
  method: Method.GET,
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_4,
  paramNames: [],
  queryNames: ['limit', 'skip', 'include', 'where', 'order', 'count'],
  requestDataOptional: false,
}

/**
 * 接口 [评论列表↗](http://121.89.170.197:3000/project/59/interface/api/496) 的 **请求函数**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `GET /classes/iComment`
 * @更新时间 `2020-10-22 11:03:02`
 */
export const getClassesIComment = makeRequest<
  GetClassesICommentRequest,
  GetClassesICommentResponse,
  GetClassesICommentRequestConfig
>(getClassesICommentRequestConfig)

/**
 * 接口 [评论列表↗](http://121.89.170.197:3000/project/59/interface/api/496) 的 **React Hook**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `GET /classes/iComment`
 * @更新时间 `2020-10-22 11:03:02`
 */
export const useGetClassesIComment = makeRequestHook<
  GetClassesICommentRequest,
  GetClassesICommentRequestConfig,
  ReturnType<typeof getClassesIComment>
>(getClassesIComment)

/**
 * 接口 [添加评论↗](http://121.89.170.197:3000/project/59/interface/api/498) 的 **请求类型**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `POST /classes/iComment`
 * @更新时间 `2020-10-22 14:02:04`
 */
export interface PostClassesICommentRequest {
  text: string
  user: {
    __type: string
    objectId: string
    className: string
  }
  iDo: {
    __type: string
    objectId: string
    className: string
  }
}

/**
 * 接口 [添加评论↗](http://121.89.170.197:3000/project/59/interface/api/498) 的 **返回类型**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `POST /classes/iComment`
 * @更新时间 `2020-10-22 14:02:04`
 */
export interface PostClassesICommentResponse {
  objectId: string
  createdAt: string
}

/**
 * 接口 [添加评论↗](http://121.89.170.197:3000/project/59/interface/api/498) 的 **请求配置的类型**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `POST /classes/iComment`
 * @更新时间 `2020-10-22 14:02:04`
 */
type PostClassesICommentRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/classes/iComment',
    undefined,
    string,
    string,
    false
  >
>

/**
 * 接口 [添加评论↗](http://121.89.170.197:3000/project/59/interface/api/498) 的 **请求配置**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `POST /classes/iComment`
 * @更新时间 `2020-10-22 14:02:04`
 */
const postClassesICommentRequestConfig: PostClassesICommentRequestConfig = {
  mockUrl: mockUrl_0_1_0_4,
  devUrl: devUrl_0_1_0_4,
  prodUrl: prodUrl_0_1_0_4,
  path: '/classes/iComment',
  method: Method.POST,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_4,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [添加评论↗](http://121.89.170.197:3000/project/59/interface/api/498) 的 **请求函数**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `POST /classes/iComment`
 * @更新时间 `2020-10-22 14:02:04`
 */
export const postClassesIComment = makeRequest<
  PostClassesICommentRequest,
  PostClassesICommentResponse,
  PostClassesICommentRequestConfig
>(postClassesICommentRequestConfig)

/**
 * 接口 [添加评论↗](http://121.89.170.197:3000/project/59/interface/api/498) 的 **React Hook**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `POST /classes/iComment`
 * @更新时间 `2020-10-22 14:02:04`
 */
export const usePostClassesIComment = makeRequestHook<
  PostClassesICommentRequest,
  PostClassesICommentRequestConfig,
  ReturnType<typeof postClassesIComment>
>(postClassesIComment)

/**
 * 接口 [删除评论↗](http://121.89.170.197:3000/project/59/interface/api/500) 的 **请求类型**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `DELETE /classes/iComment/:id`
 * @更新时间 `2020-10-22 18:14:22`
 */
export interface DeleteClassesICommentIdRequest {
  id: string
}

/**
 * 接口 [删除评论↗](http://121.89.170.197:3000/project/59/interface/api/500) 的 **返回类型**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `DELETE /classes/iComment/:id`
 * @更新时间 `2020-10-22 18:14:22`
 */
export interface DeleteClassesICommentIdResponse {}

/**
 * 接口 [删除评论↗](http://121.89.170.197:3000/project/59/interface/api/500) 的 **请求配置的类型**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `DELETE /classes/iComment/:id`
 * @更新时间 `2020-10-22 18:14:22`
 */
type DeleteClassesICommentIdRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/59',
    'https://api.icourage.cn/1.1',
    'http://api.icourage.cn/1.1',
    '/classes/iComment/:id',
    undefined,
    'id',
    string,
    false
  >
>

/**
 * 接口 [删除评论↗](http://121.89.170.197:3000/project/59/interface/api/500) 的 **请求配置**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `DELETE /classes/iComment/:id`
 * @更新时间 `2020-10-22 18:14:22`
 */
const deleteClassesICommentIdRequestConfig: DeleteClassesICommentIdRequestConfig = {
  mockUrl: mockUrl_0_1_0_4,
  devUrl: devUrl_0_1_0_4,
  prodUrl: prodUrl_0_1_0_4,
  path: '/classes/iComment/:id',
  method: Method.DELETE,
  requestBodyType: RequestBodyType.form,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_1_0_4,
  paramNames: ['id'],
  queryNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [删除评论↗](http://121.89.170.197:3000/project/59/interface/api/500) 的 **请求函数**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `DELETE /classes/iComment/:id`
 * @更新时间 `2020-10-22 18:14:22`
 */
export const deleteClassesICommentId = makeRequest<
  DeleteClassesICommentIdRequest,
  DeleteClassesICommentIdResponse,
  DeleteClassesICommentIdRequestConfig
>(deleteClassesICommentIdRequestConfig)

/**
 * 接口 [删除评论↗](http://121.89.170.197:3000/project/59/interface/api/500) 的 **React Hook**
 *
 * @分类 [iComment↗](http://121.89.170.197:3000/project/59/interface/api/cat_403)
 * @请求头 `DELETE /classes/iComment/:id`
 * @更新时间 `2020-10-22 18:14:22`
 */
export const useDeleteClassesICommentId = makeRequestHook<
  DeleteClassesICommentIdRequest,
  DeleteClassesICommentIdRequestConfig,
  ReturnType<typeof deleteClassesICommentId>
>(deleteClassesICommentId)

/* prettier-ignore-end */
