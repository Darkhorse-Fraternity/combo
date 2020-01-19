import {useState, useEffect, Dispatch, SetStateAction} from 'react';
// import {apiHostNative} from '../configure/reqConfigs';
import {addParams} from './qs';
import {reqO} from './req';
import {
  reqProps,
  parasProps,
  getHeader,
  getHost,
  getScheme,
  dataProps,
} from './config';

// }

export const useFetch = <T extends {}>(
  {
    host = getHost(),
    path,
    headers = getHeader(),
    query,
    scheme = getScheme(),
    ...other
  }: reqProps,
  autoTrigger: boolean = true,
): [
  parasProps<T | undefined>,
  () => Promise<dataProps<T>>,
  (value: T) => void,
] => {
  //是否暂时冻结。

  const [pending, setPending] = useState(autoTrigger);
  const [code, setCode] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T>();

  const otherParamString = JSON.stringify(other);
  // const urlpath = `${apiHostNative}${path}`;
  const urlpath = `${scheme}://${host}${path}`;
  // console.log('urlpath', urlpath);

  const headersString = JSON.stringify(headers);
  // const url = !query ? urlpath : addParams(urlpath, query);
  const load = () => {    
    setPending(true);    
    return reqO<T>({host, path, headers, ...other}).then(res => {
      if (!res.error) {
        setData(res.result);
        setError(null);
      } else {
        setError(res.error);
      }
      // setCode(res.code);
      setPending(false);
      return res;
    });
  };
  useEffect(() => {
    // Update the document title using the browser API
    autoTrigger && load();    
  }, [urlpath, headersString, otherParamString]);

  return [
    {
      pending,
      code,
      firstLoadSuc: !!data,
      error,
      result: data,
    },

    load,
    value => {
      setData(value);
      setPending(false);
      setCode(0);
      setError(null);
    },
  ];
};

//兼容老版本
export const useReq = <T extends {}>(
  params: reqProps,
  defaultValue?: T,
  autoTrigger?: boolean,
): [
  parasProps<T | undefined>,
  (value: object) => void,
  () => Promise<dataProps<T>>,
] => {
  const [data, reload, setData] = useFetch<T>(params, autoTrigger);

  return [
    {
      ...data,
      result: data.result || defaultValue,
    },
    value => {
      setData({
        ...(data.result as T),
        ...value,
      });
    },
    reload,
  ];
};
