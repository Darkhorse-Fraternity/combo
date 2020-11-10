
import {
  registerListKeys,
  ICARD,
  USER,
  IUSE,
  COURSE,
  IDO,
  ORDER,
  ENCH,
  FLAG,
  FLAGRECORD,
} from './reqKeys';
import { schema } from 'normalizr';
export const code = 'results';

export const entity = <T>(key: string, config = {}) =>
  new schema.Entity<T>(key, config, { idAttribute: 'objectId' });
export const list = (item:[]) =>
  new schema.Object({ [code]: new schema.Array(item) });
export const entityFromCode = (key: string) =>
  new schema.Object({ [code]: entity(key) });

export const user = entity(USER);
export const course = entity(COURSE, { user });

const iCard = entity(ICARD, { user, course });
export const flag = entity(FLAG, { iCard });
export const iUse = entity(IUSE, { user, iCard });

export const iDO = entity(IDO, { user, iCard, iUse });
export const order = entity(ORDER, { user, iCard });
export const ench = entity(ENCH, { user });

export const flagRecord = entity(FLAGRECORD, { Flag: flag, iCard });
//
// const config = {
//     [IUSE]:{USER,ICARD},
//     [ICARD]:{USER}
// }
//
// const getConfig = (key)=>{
//     const cf = config[key]
//     //如果
//     if(cf){
//         const nfc = {}
//         Object.keys(cf).forEach(key=>{
//             nfc[key] = entity(key,getConfig(key)||{})
//         })
//         console.log('nfc:', nfc);
//         return nfc
//     }
// }
//
// const entitys = (key)=>{
//     return entity(key,getConfig(key)||{})
// }

export const entitys = {
  [ICARD]: iCard,
  [IUSE]: iUse,
  [COURSE]: course,
  [IDO]: iDO,
  [USER]: user,
  [ORDER]: order,
  [ENCH]: ench,
  [FLAG]: flag,
  [FLAGRECORD]: flagRecord,
};

const auto = (key: string) => list(entitys[key] || entity(key));

function autoKeys(keys: string[]) {
  const schemas = {};
  keys.forEach((key) => {
    schemas[key] = auto(key);
  });
  return schemas;
}

// 请求识别的key对应的sceme
export const schemas = {
  ...autoKeys(registerListKeys),
};

// 从normalizr 数据库中取得、存入对应值的key
export const listDefouteKey = {};
