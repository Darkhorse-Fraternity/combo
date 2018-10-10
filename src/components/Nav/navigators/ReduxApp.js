import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import {
  ActivityIndicator,
  Platform
} from 'react-native'
import {
  reduxifyNavigator,
} from 'react-navigation-redux-helpers'
import React, { Component } from 'react';

// const prefix = Platform.OS === 'android' ? 'combo://combo/' : 'combo://';

// const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;
let App
@connect(
  state => ({
    state: state.nav,
  })
)
export default class ReduxApp extends Component {
  render(): ReactElement<any> {
    const { state, dispatch ,appNavigator} = this.props
     App = !App ? reduxifyNavigator(appNavigator, "root"):App;
    return (
      <App {...{state,dispatch}}/>
    );
  }
}

