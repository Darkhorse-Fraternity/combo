import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import {
    ActivityIndicator,
    Platform
} from 'react-native'
import { AppNavigator } from './CreateAppNavigator'
import {
    reduxifyNavigator,
} from 'react-navigation-redux-helpers'

// const prefix = Platform.OS === 'android' ? 'combo://combo/' : 'combo://';

// const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;

const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
    state: state.nav,
});

export default connect(mapStateToProps)(App);

