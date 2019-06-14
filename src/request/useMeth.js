

export function addParams(url:string, params:Object) {
  if (url.indexOf('?') === -1) {
    return `${url}?${toQueryString(params)}`;
  }
  return `${url}&${toQueryString(params)}`;
}


/**
 * 将对象转换成query字符串形式
 * @param  {[type]} obj 参数
 * @return {[type]} string key1=value1&key2=value2
 */
export function toQueryString(obj:Object) {
  return obj ? Object.keys(obj).sort().map((key) => {
    let val = obj[key];
    if (typeof val === 'object') val = JSON.stringify(val);
    if (Array.isArray(val)) {
      return val.sort().map(val2 => `${encodeURIComponent(key)}=${encodeURIComponent(val2)}`).join('&');
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
  }).join('&') : '';
}


export function queryStringToJSON(queryString) {
  if (queryString.indexOf('?') > -1) {
    queryString = queryString.split('?')[1];
  }
  const pairs = queryString.split('&');
  const result = {};
  pairs.forEach((pair) => {
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });
  return result;
}
