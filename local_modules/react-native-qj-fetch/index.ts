import {
  schemeType,
  methodType,
  setNetworkConig,
  getNetworkConfig,
  getHeader,
  setDoCache,
  dataProps,
  setDataMap,
  setShowErrorAction,
  reqProps,
} from './config';
import { send, reqTry, req, reqO, reqCache } from './req';
import { useFetch, useReq } from './useReq';

export {
  send,
  reqTry,
  reqCache,
  req, // 请尽量用reqO,做了错误处理和错误报告
  reqO,
  methodType,
  schemeType,
  useFetch,
  useReq,
  setNetworkConig,
  getNetworkConfig,
  getHeader,
  setDoCache,
  setDataMap,
  setShowErrorAction,
};

export interface mapProps<T extends {}> extends dataProps<T> {}
export interface reqCProps extends reqProps {}
