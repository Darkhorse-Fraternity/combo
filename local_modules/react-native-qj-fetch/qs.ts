
export interface ParsedUrlQuery {
  [key: string]: any;
}

export function addParams(url: string, params: ParsedUrlQuery) {
  if (url.indexOf('?') === -1) {
    return `${url}?${stringify(params)}`;
  }
  return `${url}&${stringify(params)}`;
}

/**
 * 将对象转换成query字符串形式
 * @param  {[type]} obj 参数
 * @return {[type]} string key1=value1&key2=value2
 */
export function stringify(obj: ParsedUrlQuery) {
  return obj
    ? Object.keys(obj)
        .sort()
        .map(key => {
          let val = obj[key];
          if (typeof val === 'object') val = JSON.stringify(val);
          if (Array.isArray(val)) {
            return val
              .sort()
              .map(
                val2 =>
                  `${encodeURIComponent(key)}=${encodeURIComponent(val2)}`,
              )
              .join('&');
          }
          return `${encodeURIComponent(key)}=${encodeURIComponent(val || '')}`;
        })
        .join('&')
    : '';
}

export function parse(queryString: string) {
  if (queryString.indexOf('?') > -1) {
    queryString = queryString.split('?')[1];
  }
  const pairs = queryString.split('&');
  const result: ParsedUrlQuery = {};
  pairs.forEach(pair => {
    const pairArray = pair.split('=');
    result[pairArray[0]] = decodeURIComponent(pairArray[1] || '');
  });
  return result;
}
