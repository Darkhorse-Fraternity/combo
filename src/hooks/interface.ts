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
    'http://127.0.0.1',
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
    'http://127.0.0.1',
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
    'http://127.0.0.1',
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
    'http://127.0.0.1',
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
    'http://127.0.0.1',
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
    'http://127.0.0.1',
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

/* prettier-ignore-end */
