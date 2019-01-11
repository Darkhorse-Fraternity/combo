import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
// import { loadUserData } from '../../../configure/storage'
// import { loginSucceed } from '../../../redux/actions/user'
import { userInfo } from '../../../redux/actions/user'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast'
import { search } from '../../../redux/module/leancloud'
import { selfUser } from '../../../request/LCModle'
import { IUSE, ICARD } from '../../../redux/reqKeys'
import {firstInstaller} from '../../../../helps/util'
import Indicators from '../../../components/Indicators'

@connect(
  state => ({}),
  (dispatch, props) => ({
    bootstrapAsync: async () => {

      try {
        const user = await dispatch(userInfo())
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
          // await dispatch(search(false, {
          //   where: {
          //     ...dispatch(selfUser()),
          //     statu: 'start'
          //   },
          //   order: '-time',
          //   include: ICARD + ',iCard.user'
          // }, IUSE))
          // Toast.show('222')
          dispatch( async (dispatch, getState) => {
            const state = getState()
            const { user } = state

            const isFirstInstaller = await firstInstaller()
            // console.log('isFirstInstaller:', isFirstInstaller);
            if (user.isTourist && isFirstInstaller) {
              props.navigation.navigate('login', { transition: 'forVertical' });
            } else {
              props.navigation.navigate('tab');
            }

          })

        }
        // props.navigation.navigate(user ? 'tab' : 'login');
      } catch (e) {
        console.log('bootstrapAsync error:', e.message);
        // Toast.show(e.message)
        // props.navigation.navigate('login');
      }

    }
  })
)

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.bootstrapAsync();

  }

  // Fetch the token from storage then navigate to our appropriate place


  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Indicators size={'large'}/>
        {/*<ActivityIndicator size={'large'}/>*/}
        {/*<StatusBar barStyle="default" />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})