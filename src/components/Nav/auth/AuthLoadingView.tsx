import React, { FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

// import { userInfo } from '../../../redux/actions/user';

import { firstInstaller } from '../../../../helps/util';
import Indicators from '../../Indicators';

import {
  Descriptor,
  ParamListBase,
  StackActions,
} from '@react-navigation/native';
import { updateLocation, userInfo } from 'src/data/data-context/user';
import DataContext from 'src/data/data-context';
import { useGetIuseData } from 'src/data/data-context/core';

const AuthLoadingScreen: FC<Descriptor<ParamListBase>> = (props) => {
  const { data, dispatch: contextDispatch } = useContext(DataContext);
  const {
    user: { objectId: uid, isTourist },
  } = data;

  const { run } = useGetIuseData();
  const [state, setstate] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(({ isConnected }) => {
      if (isConnected) {
        console.log('join');
        userInfo().then((user) => {
          updateLocation(user as never);
          contextDispatch({ type: 'update_user_info', user: user as never });
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [contextDispatch]);

  useEffect(() => {
    if (uid && uid.length > 0) {
      run().then(() => {
        setstate(true);
      });
    }
  }, [run, uid]);

  useEffect(() => {
    if (state) {
      firstInstaller().then((isFirstInstaller) => {
        props.navigation.dispatch(StackActions.replace('tab'));
        if (isTourist && isFirstInstaller) {
          props.navigation.navigate('login');
        }
      });
    }
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
