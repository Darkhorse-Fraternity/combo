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
    createNavigationPropConstructor,
    reduxifyNavigator,
    initializeListeners
} from 'react-navigation-redux-helpers'

const prefix = Platform.OS === 'android' ? 'combo://combo/' : 'combo://';

// const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;

const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
    state: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(App);


// @connect(
//     state => ({ nav: state.nav, })
// )


// export default class AppWithNavigationState extends React.Component {
//
//     static propTypes = {
//         dispatch: PropTypes.func,
//         nav: PropTypes.object,
//     };
//     static defaultProps = {};
//
//
//
//
//     render() {
//         // const { dispatch, nav } = this.props
//         // const App = reduxifyNavigator(AppNavigator,"root");
//         // const navigation = navigationPropConstructor(dispatch, nav,);
//
//         console.log('this.props:', this.props);
//
//         return <App
//             navigation = {this.props.nav}
//              //navigation={this.props.nav}
//             // uriPrefix={prefix}
//             // persistenceKey={navigationPersistenceKey}
//             // renderLoadingExperimental={() => <ActivityIndicator/>}
//         />;
//     }
//
// }


export default AppWithNavigationState