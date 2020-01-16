import React from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
// import AsyncStorage from '@react-native-community/async-storage';
// import { loadUserData } from '../../../configure/storage'
// import { loginSucceed } from '../../../redux/actions/user'
import { connect } from "react-redux";
// import Toast from 'react-native-simple-toast';
import moment from "moment";
import { userInfo } from "../../../redux/actions/user";
// import { search } from '../../../redux/module/leancloud';
// import { selfUser } from '../../../request/LCModle';
import { IUSE, FLAGRECORD } from "../../../redux/reqKeys";
import { firstInstaller } from "../../../../helps/util";
import Indicators from "../../Indicators";
import { listReq } from "../../../redux/actions/list";
import { iUseList as iUseListParams } from "../../../request/leanCloud";
import { addNormalizrEntities } from "../../../redux/module/normalizr";

@connect(
  state => ({}),
  (dispatch, props) => ({
    bootstrapAsync: async () => {
      try {
        const user = await dispatch(userInfo());
        // if (user) {
        //   await dispatch(search(false, {
        //     where: {
        //       ...dispatch(selfUser()),
        //       statu: 'start'
        //     },
        //     order: '-time',
        //     include: ICARD + ',iCard.user'
        //   }, IUSE))
        // }
        // const user = await loadUserData();
        // dispatch(loginSucceed(user))
        // This will switch to the App screen or auth screen and this loading
        // screen will be unmounted and thrown away.
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
                  const aDone = moment(0, "HH").isBefore(a.doneDate.iso);
                  const bDone = moment(0, "HH").isBefore(b.doneDate.iso);
                  if (aDone && bDone) {
                    return false;
                  }
                  return aDone;
                });
                return { results: newIUseList };
              }
            })
          );

          let timer;
          const p2 = new Promise(resolve => {
            timer = setTimeout(resolve, 9000, "one");
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
            props.navigation.navigate("login", { transition: "forVertical" });
          } else {
            props.navigation.navigate("tab");
          }
          // });
        }
        // props.navigation.navigate(user ? 'tab' : 'login');
      } catch (e) {
        console.log("bootstrapAsync error:", e.message);
        // Toast.show(e.message)
        // props.navigation.navigate('login');
      }
    }
  })
)
export default class AuthLoadingScreen extends React.Component {
  unsubscribe = null;
  async componentDidMount() {
    const { isConnected } = await NetInfo.fetch();
    if (!isConnected) {
      // console.log('111');
      this.unsubscribe = NetInfo.addEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
    } else {
      this.props.bootstrapAsync();
    }
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  handleFirstConnectivityChange = isConnected => {
    console.log(`Then, is ${isConnected ? "online" : "offline"}`);
    if (isConnected) {
      this.props.bootstrapAsync();
    }
  };
  // Fetch the token from storage then navigate to our appropriate place

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Indicators size="large" />
        {/* <ActivityIndicator size={'large'}/> */}
        {/* <StatusBar barStyle="default" /> */}
        <Text style={styles.text}>加载中...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    marginTop: 10,
    fontSize: 15,
    color: "#9e9e9e",
    fontStyle: "italic",
    alignSelf: "center"
  }
});
