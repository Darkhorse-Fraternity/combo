import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { DeviceEventEmitter, Platform } from 'react-native';
import { DeviceEventEmitterKey } from './enum';
import { storage } from './storage';

const allKey = 'all';
const defaultValue = Platform.OS === 'ios' ? true : false;
// 是否开启了本地提醒功能
export const localRemindConfig = async () => {
  const res = await storage.getBatchDataWithIds({
    key: 'localRemind',
    ids: [allKey],
  });

  if (res.length > 0) {
    return res[0];
  }

  return defaultValue;
};

export const useLocalRemindConfig = () => {
  const [state, setstate] = useState(true);
  // useFocusEffect(() => {
  //   localRemindConfig().then((res)=>{
  //     setstate(res);
  //   })
  // }, [])

  useFocusEffect(
    useCallback(() => {
      localRemindConfig().then((res) => {
        setstate(res);
      });
    }, []),
  );

  return state;
};
const remindKey = 'localRemind';
export type RemindDataType = { [x: string]: boolean; all: boolean };
export const loadlocalRemind = async (): Promise<RemindDataType> => {
  const ids = await storage.getIdsForKey('localRemind');
  const values = await storage.getBatchDataWithIds({
    key: remindKey,
    ids,
  });
  const data = { all: Platform.OS === 'ios' };
  ids.forEach((id, index) => {
    data[id] = values[index];
  });

  return data;
};

export const useLoadlocalRemind = () => {
  const [localRemindData, setLocalRemindData] = useState<RemindDataType>({
    all: Platform.OS === 'ios',
  });

  const run = () => {
    loadlocalRemind().then((res) => {
      setLocalRemindData(res);
    });
  };

  useEffect(() => {
    run();
  }, []);

  useEffect(() => {
    const deEmitter = DeviceEventEmitter.addListener(
      DeviceEventEmitterKey.remind_reload,
      () => {
        run();
      },
    );
    return () => {
      deEmitter.remove();
    };
  }, []);

  return localRemindData;
};

export const remind = (id: string, value: boolean) => {
  return storage
    .save({
      key: remindKey,
      id, // 注意:请不要在key中使用_下划线符号!
      data: value,
    })
    .then(() => {
      DeviceEventEmitter.emit(DeviceEventEmitterKey.remind_reload);
    });
};
