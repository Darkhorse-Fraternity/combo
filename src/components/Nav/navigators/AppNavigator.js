import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import {
    ActivityIndicator
} from 'react-native'
import { AppNavigator } from './CreateAppNavigator'
import {
    createNavigationPropConstructor,
    initializeListeners
} from 'react-navigation-redux-helpers'


// const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;

@connect(
    state => ({ nav: state.nav, })
)

export default class AppWithNavigationState extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func,
        nav: PropTypes.object,
    };
    static defaultProps = {};

    componentDidMount() {
        initializeListeners("root", this.props.nav);
    }

    componentWillUnmount() {
    }

    render() {
        const { dispatch, nav } = this.props
        const navigationPropConstructor = createNavigationPropConstructor("root");
        const navigation = navigationPropConstructor(dispatch, nav,);


        return <AppNavigator
            navigation={navigation}
            // persistenceKey={navigationPersistenceKey}
            // renderLoadingExperimental={() => <ActivityIndicator/>}
        />;
    }

}
