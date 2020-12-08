export interface dataProps<T> {
  error: string | null;
  result: T;
  code: number;
}

export interface parasProps<T> extends dataProps<T> {
  pending: boolean;
  firstLoadSuc: boolean;
}

export interface ParsedUrlQuery {
  [key: string]: never;
}

export enum schemeType {
  http = 'http',
  https = 'https',
}

export enum methodType {
  get = 'GET',
  post = 'POST',
  head = 'HEAD',
  put = 'PUT',
  delete = 'DELETE',
}

// 参数转化

export interface ReqPlacehold {
  scheme?: string;
  host?: string;
  headers?: HeadersInit_;
}

export interface ReqProps extends ReqPlacehold {
  query?: ParsedUrlQuery;
  body?: ParsedUrlQuery;
  path?: string;
  params?: ParsedUrlQuery;
  timeout?: number;
  cache?: boolean;
  method?: string;
  showError?: boolean;
  dataMap?: <T extends {}>(data: T, e?: Error) => dataProps<T>;
}

export interface ReqCacheProps extends ReqProps {
  url: string;
}

let networkConifg: ReqPlacehold = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  host: '',
  scheme: '',
};

export const setNetworkConig = (config: ReqPlacehold) => {
  networkConifg = {
    ...config,
    headers: {
      ...networkConifg.headers,
      ...config.headers,
    },
  };
};

export const getNetworkConfig = () => {
  return networkConifg;
};

export const getHeader = () => {
  return networkConifg.headers as { token: string };
};

export const getHost = () => {
  return networkConifg.host;
};

export const getScheme = () => {
  return networkConifg.scheme || 'https';
};

let doCache: (key: string, req: Function) => Promise<unknown>;
export const setDoCache = (
  cache: (key: string, req: Function) => Promise<unknown>,
) => {
  return (doCache = cache);
};

export const getDoCache = () => {
  return doCache;
};

let dataMap: <T extends {}>(
  data: T,
  e?: Error,
  reload?: Function,
) => dataProps<T>;
export const setDataMap = (
  map: <T extends {}>(data: T, e?: Error) => dataProps<T>,
) => [(dataMap = map)];

export const getDataMap = () => {
  return dataMap;
};

let errorAction: (props: ReqProps, error: string, code: number) => void;

export const getShowErrorAction = () => {
  return errorAction;
};

export const setShowErrorAction = (
  action: (props: ReqProps, error: string, code: number) => void,
) => {
  errorAction = action;
};
