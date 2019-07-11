/* @flow */


import { defaultHost, httpHeaders } from '../configure/reqConfigs';
import { addParams, toQueryString } from './useMeth';

// if (typeof global.self === 'undefined') {
//   global.self = global;
// }

export const schemeType = {
  http: 'http',
  https: 'https',
};

export const methodType = {
  get: 'GET',
  post: 'POST',
  head: 'HEAD',
  put: 'PUT',
  delete: 'DELETE',
};


function throwIfMissing(paramName: string = ''): string {
  throw new Error(`Missing parameter${paramName}`);
  // return '';
}


export async function send({
  scheme = schemeType.https,
  host = defaultHost,
  path = throwIfMissing('send/path'),
  method = methodType.get,
  timeout = 10000,
  params,
  head,
  needSession = true,
}) {
  const urlpath = `${scheme}://${host}${path}`;
  const headers = head || httpHeaders(needSession);


  const contentType = headers['Content-Type'];
  let body;
  if (method === methodType.post) {
    body = fetchBody(params, contentType);
  }
  const url = fetchUrl(urlpath, method, params);
  // fetch(request, { credentials: 'include' }),
  const fetchPromise = fetch(url, {
    method,
    headers,
    body
  });
  const requestPromise = fetchByInterrupt(fetchPromise, timeout);
  // 做错误处理.

  const tr1 = new Date();
  return new Promise(((resolve, reject) => {
    requestPromise
      .then((res) => {
        if (!res.ok) {
          errorShow({
            url,
            method,
            headers,
            body,
            res
          });
        }
        const tr2 = new Date();
        console.log(url, tr2 - tr1);

        return resolve(res);
      })
      .catch((e) => {
        if (__DEV__) {
          errorShow({
            url,
            method,
            headers,
            body
          });
        }
        const tr2 = new Date();
        console.log(url, tr2 - tr1);
        return reject(e);
      });
  }));
}


function fetchBody(params, contentType) {
  switch (contentType) {
    case 'application/x-www-form-urlencoded':
    case 'application/x-www-form-urlencoded; charset=utf-8':
      return toQueryString(params);
    case 'application/json':
    case 'application/json; charset=utf-8':
      return JSON.stringify(params);
    default:
      break;
  }
  return undefined;
}

function fetchUrl(urlpath, method, params) {
  if (method === methodType.get) {
    return addParams(urlpath, params);
  }
  return urlpath;
}


function fetchByInterrupt(fetchPromise, timeout) {
  return Promise.race([
    fetchPromise,
    new Promise(((_, reject) => {
      setTimeout(() => reject(new Error('请求超时')), timeout);
    }))
  ]);
}

function errorShow(data) {
  if (__DEV__) {
    console.log('network error:', data);
  }
}
