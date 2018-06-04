import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { createStackNavigator} from 'react-navigation';
import {TransitionConfiguration} from './TransitionConfiguration'
import Tab from '../components/StaticTab'
import {route} from '../../../pages'
import {Platform} from 'react-native'
import WebView from '../../Base/BaseWebView'


import {
    createNavigationPropConstructor,
    createReduxBoundAddListener,
} from 'react-navigation-redux-helpers'


export const AppNavigator = createStackNavigator({
    ...route,
    Tab: {screen: Tab},
    WebView: {screen: WebView}
}, {
    // initialRouteName:'Home',
    navigationOptions: {
        header:null,
    },
    //使得视图和头部一起运动，
    // 目前没有办法单独设置，除非使页面单独存在一个栈中
    //https://github.com/react-community/react-navigation/issues/1276
    headerMode:'screen',


    transitionConfig: TransitionConfiguration,
});

// const AppWithNavigationState = ({dispatch, nav}) => {
//     const addListener = createReduxBoundAddListener("root");
//     return (<AppNavigator navigation={{ dispatch, state: nav,addListener }}/>)
// };

// AppWithNavigationState.propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     nav: PropTypes.object.isRequired,
// };


// const navigationPropConstructor = createNavigationPropConstructor("root");

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
        // initializeListeners("root", this.props.nav);
    }

    render() {
        const addListener = createReduxBoundAddListener("root");
        const {dispatch,nav} = this.props
        // console.log('AppWithNavigationState:', this.props);
        // const navigation = navigationPropConstructor(
        //     this.props.dispatch,
        //     this.props.nav,
        // );
        return <AppNavigator navigation={{ dispatch, state: nav,addListener }} />;
    }

}

// const mapStateToProps = state => ({
//     nav: state.nav,
// });

// export default connect(mapStateToProps)(AppWithNavigationState);