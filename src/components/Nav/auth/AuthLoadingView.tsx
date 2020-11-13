import React, { FC, PureComponent, useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import moment from 'moment';
// import { userInfo } from '../../../redux/actions/user';

import { IUSE } from '../../../redux/reqKeys';
import { firstInstaller } from '../../../../helps/util';
import Indicators from '../../Indicators';
import { listReq } from '../../../redux/actions/list';
import { iUseList as iUseListParams } from '../../../request/leanCloud';
import {
  Descriptor,
  ParamListBase,
  StackActions,
} from '@react-navigation/native';
import { userInfo } from 'src/data/data-context/user';
import DataContext, { useGetUserInfo } from 'src/data/data-context';
import { useGetIuseData } from 'src/data/data-context/core';
import { usePostCallIUseList3 } from 'src/hooks/interface';

const AuthLoadingScreen: FC<Descriptor<ParamListBase>> = (props) => {
  const { data, dispatch: contextDispatch } = useContext(DataContext);
  const {
    user: { objectId: uid, isTourist },
  } = data;
  const { data: iUse, run } = useGetIuseData();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        userInfo().then((user) => {
          contextDispatch({ type: 'update_user_info', user: user as never });
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [contextDispatch]);

  useEffect(() => {
    if (uid) {
      run();
    }
  }, [run, uid]);

  useEffect(() => {
    if (iUse) {
      firstInstaller().then((isFirstInstaller) => {
        if (isTourist && isFirstInstaller) {
          props.navigation.dispatch(StackActions.replace('tab'));
          props.navigation.navigate('login');
        } else {
          props.navigation.dispatch(StackActions.replace('tab'));
        }
      });
    }
  }, [isTourist, iUse, props.navigation]);

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
