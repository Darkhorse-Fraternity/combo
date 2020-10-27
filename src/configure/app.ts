import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
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
