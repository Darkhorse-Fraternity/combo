import React, { PureComponent } from 'react';
import {

  StyleSheet,
  View,
  Text,
} from 'react-native';
import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import moment from 'moment';
import { userInfo } from '../../../redux/actions/user';

import { IUSE } from '../../../redux/reqKeys';
import { firstInstaller } from '../../../../helps/util';
import Indicators from '../../Indicators';
import { listReq } from '../../../redux/actions/list';
import { iUseList as iUseListParams } from '../../../request/leanCloud';
import { StackActions } from '@react-navigation/native';

@connect(
  state => ({}),
  (dispatch, props) => ({
    bootstrapAsync: async () => {
      try {
        const user = await dispatch(userInfo());
        if (user.sessionToken) {
          // Toast.show('111')
          const p1 = dispatch(
            listReq(IUSE, iUseListParams(), false, {
              dataMap: data => {
                const { iUseList } = data.result;
                // 添加副本
                // console.log('fbList', fbList);

                // dispatch(addNormalizrEntities(FLAGRECORD, { results: fbList }));

                // 通过本地时间验证,判断今日是否已经打卡
                const newIUseList = iUseList.sort((a, b) => {
                  const aDone = moment(0, 'HH').isBefore(a.doneDate.iso);
                  const bDone = moment(0, 'HH').isBefore(b.doneDate.iso);
                  if (aDone && bDone) {
                    return false;
                  }
                  return aDone;
                });
                return { results: newIUseList };
              },
            }),
          );

          let timer;
          const p2 = new Promise(resolve => {
            timer = setTimeout(resolve, 9000, 'one');
          });

          await Promise.race([p1, p2]);
          if (timer) {
            clearTimeout(this.timer);
          }

          // Toast.show('222')
          // dispatch(async (dispatch, getState) => {
          //   const state = getState();
          //   const { user } = state;

          const isFirstInstaller = await firstInstaller();
          // console.log('isFirstInstaller:', isFirstInstaller);
          if (user.isTourist && isFirstInstaller) {
            props.navigation.dispatch(StackActions.replace('tab'));
            props.navigation.navigate('login');
            // props.navigation.dispatch(StackActions.replace('login'));
          } else {
            props.navigation.dispatch(StackActions.replace('tab'));
          }
          // });
        }
        // props.navigation.navigate(user ? 'tab' : 'login');
      } catch (e) {
        console.log('bootstrapAsync error:', e.message);
      }
    },
  }),
)
export default class AuthLoadingScreen extends PureComponent {
  unsubscribe: NetInfoSubscription | undefined;
  async componentDidMount() {
    const { isConnected } = await NetInfo.fetch();
    if (!isConnected) {
      this.unsubscribe = NetInfo.addEventListener(state => {
        if (state.isConnected) {
          this.props.bootstrapAsync();
        }
      });
    } else {
      this.props.bootstrapAsync();
    }
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  // Fetch the token from storage then navigate to our appropriate place

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Indicators size={40} />
        <Text style={styles.text}>加载中...</Text>
      </View>
    );
  }
}

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
