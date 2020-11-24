/* @flow */

// import {apiHost, apiHostNative} from '../configure/reqConfigs';
import { addParams, stringify, ParsedUrlQuery } from './qs';

import { getHashCode } from './util';
import {
  methodType,
  reqProps,
  reqCacheProps,
  getHeader,
  getHost,
  getScheme,
  getDoCache,
  getDataMap,
  dataProps,
  getShowErrorAction,
} from './config';
// if (typeof global.self === 'undefined') {
//   global.self = global;
// }

function fetchBody(params: ParsedUrlQuery, contentType: string) {
  switch (contentType) {
    case 'application/x-www-form-urlencoded':
    case 'application/x-www-form-urlencoded; charset=utf-8':
      return stringify(params);
    case 'application/json':
    case 'application/json; charset=utf-8':
      return JSON.stringify(params);
    default:
      break;
  }
  return undefined;
}

function errorShow(data: object) {
  if (__DEV__) {
    console.log('network error:', data);
  }
}

export function send({
  url,
  method,
  headers = {},
  body,
}: reqCacheProps): Promise<Response> {
  // fetch(request, { credentials: 'include' }),
  const contentType = headers['Content-Type'] || '';

  const requestPromise = fetch(url, {
    method,
    headers,
    body: body && fetchBody(body, contentType),
  });
  '';

  return requestPromise;
}

// const url = new URL(apiHostNative);

// console.log('apiHostNative', url.host);

export const reqO = async <T extends {}>({
  showError = true,
  ...other
}: reqProps): Promise<dataProps<T>> => {
  const data = await reqTry<T>(other);
  const showErrorAction = getShowErrorAction();
  if (showError && showErrorAction && data.error) {
    showErrorAction(other, data.error, data.code);
  }
  return data;
};

export const reqTry = async <T extends {}>(
  props: reqProps,
): Promise<dataProps<T>> => {
  const map = props.dataMap || getDataMap();
  const reload = () => req(props);
  try {
    const result = await reload();
    return map(result, result._qj_inner_error, reload);
  } catch (e) {
    return map({} as T, e, reload);
  }
};

export const req = ({
  scheme = getScheme(),
  host = getHost(),
  query,
  path,
  headers = getHeader(),
  params,
  body,
  method = methodType.get,
  ...other
}: reqProps) => {
  const urlpath = `${scheme}://${host}${path}`;
  if (method === methodType.get && !query) {
    query = params;
  } else if (
    method === methodType.post ||
    (method === methodType.put && !body)
  ) {
    body = params;
  }
  const url = !query ? urlpath : addParams(urlpath, query);
  return reqCache({
    url,
    headers,
    method,
    body,
    ...other,
  });
};

export const reqCache = async ({
  url,
  headers,
  body,
  method = methodType.get,
  cache = false,
  ...other
}: reqCacheProps) => {
  // 当没有cache 要求或者 不为get 请求则跳过cahce
  const goReq = () =>
    reqClean({
      url,
      method,
      headers,
      body,
      ...other,
    });
  const doCache = getDoCache();
  if (cache && doCache && method === methodType.get) {
    const key = addParams(url, { ...headers, ...body });
    const keyHash = `${getHashCode(key)}`;
    return doCache(keyHash, goReq);
  }
  return goReq();
};

// 结果转化
export const reqClean = async (params: reqCacheProps) => {
  const response = (await reqTimeout(params)) as Response;
  const contentType = response.headers.get('content-type');

  if (response.ok) {
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else if (contentType && contentType.includes('formdata')) {
      return response.formData();
    } else if (contentType && contentType.includes('text')) {
      return response.text();
    } else {
      throw new Error(`code:${response.status}`);
    }
  } else {
    if (contentType && contentType.includes('application/json')) {
      const json = await response.json();
      return { _qj_inner_error: json };
    } else {
      throw new Error(`code:${response.status}`);
    }
  }
};

export const reqTimeout = ({ timeout = 20000, ...other }: reqCacheProps) => {
  return Promise.race([
    send(other),
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('请求超时')), timeout);
    }),
  ]);
};
