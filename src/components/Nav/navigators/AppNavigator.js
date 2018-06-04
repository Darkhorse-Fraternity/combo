import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { createStackNavigator} from 'react-navigation';
import {Platform} from 'react-native'
import {AppNavigator} from './CreateAppNavigator'

import {
    createNavigationPropConstructor,
    initializeListeners
} from 'react-navigation-redux-helpers'


@connect(
    state => ({ nav: state.nav, })
)

export default  class AppWithNavigationState extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    };
    static defaultProps = {};

    componentDidMount() {
        initializeListeners("root", this.props.nav);
    }

    render() {
        const {dispatch,nav} = this.props
        const navigationPropConstructor = createNavigationPropConstructor("root");
        const navigation = navigationPropConstructor(dispatch, nav,);
        return <AppNavigator navigation={navigation} />;
    }

}
