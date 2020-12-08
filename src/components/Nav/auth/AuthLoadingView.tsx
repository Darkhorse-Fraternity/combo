import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { firstInstaller } from '../../../../helps/util';
import Indicators from '../../Indicators';

import {
  Descriptor,
  ParamListBase,
  StackActions,
} from '@react-navigation/native';
import {
  anonymousUser,
  useGetInfoOfMe,
  userInfoFromLocal,
  useUpdateMeFromRemote,
} from 'src/data/data-context/user';
import { useGetIuseData } from 'src/data/data-context/core';
import { RouteKey } from '@pages/interface';

const AuthLoadingScreen: FC<Descriptor<ParamListBase>> = (props) => {
  const { run } = useGetIuseData();
  const { run: updateMeFromRemoteRun } = useUpdateMeFromRemote(true);
  const { user, replaceMe } = useGetInfoOfMe();
  const { objectId: uid, isTourist } = user;
  const [state, setstate] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(({ isConnected }) => {
      if (isConnected) {
        console.log('join');
        userInfoFromLocal().then((user1) => {
          //先从本地获取数据
          if (user1) {
            replaceMe(user1);
            updateMeFromRemoteRun(); // 远程更新
          } else {
            //如果本地没有缓存则注册匿名用户。
            anonymousUser().then((user2) => {
              replaceMe(user2);
            });
          }
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [replaceMe, updateMeFromRemoteRun]);

  useEffect(() => {
    if (uid && uid.length > 0) {
      run().then(() => {
        setstate(true);
      });
    }
  }, [run, uid]);

  useEffect(() => {
    let timeId: number | undefined;
    if (state) {
      firstInstaller().then((isFirstInstaller) => {
        props.navigation.dispatch(StackActions.replace('tab'));
        if (isTourist && isFirstInstaller) {
          timeId = setTimeout(() => {
            props.navigation.navigate(RouteKey.login);
          }, 100);
        }
      });
    }
    return () => {
      timeId && clearTimeout(timeId);
    };
  }, [isTourist, state, props.navigation]);

  return (
    <View style={styles.container}>
      <Indicators size={40} />
      <Text style={styles.text}>加载中...</Text>
      {/* <AuthLoadingScreenClass {...props} /> */}
    </View>
  );
};
export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 13,
    color: '#9e9e9e',
    fontStyle: 'italic',
    alignSelf: 'center',
  },
});
