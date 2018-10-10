import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import {
  ActivityIndicator,
  Platform
} from 'react-native'
import { creatAppNavigator } from './CreateAppNavigator'
import {
  reduxifyNavigator,
} from 'react-navigation-redux-helpers'
import React, { Component } from 'react';
// const prefix = Platform.OS === 'android' ? 'combo://combo/' : 'combo://';

// const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;


@connect(
  state => ({
    state: state.nav,
  })
)
export default class ReduxApp extends Component {
  render(): ReactElement<any> {
    const { state, dispatch, route } = this.props
    const AppNavigator = creatAppNavigator(route)
    const App = reduxifyNavigator(AppNavigator, "root");
    return (
      <App {...{state,dispatch}}/>
    );
  }
}

