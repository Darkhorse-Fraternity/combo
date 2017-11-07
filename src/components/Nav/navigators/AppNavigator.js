import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import {TransitionConfiguration} from './TransitionConfiguration'
import Tab from '../components/Tab'
import {route} from '../../../pages'
export const AppNavigator = StackNavigator({
    ...route,
    Tab: {screen: Tab},
}, {
    // initialRouteName:'Home',
    navigationOptions: {
        headerStyle:{
            backgroundColor:'white',
            shadowColor:'#F5FCFF',
            borderBottomColor:'#F5FCFF',

            //headerBackTitle:' '
        },
        headerTintColor:'black',
        headerTitleStyle:{
            color: 'black',
            alignItems:'center',
            fontSize:13,
        },
        headerBackTitle:null,

    },
    //使得视图和头部一起运动，
    // 目前没有办法单独设置，除非使页面单独存在一个栈中
    //https://github.com/react-community/react-navigation/issues/1276
    headerMode:'screen',


    transitionConfig: TransitionConfiguration,
});

const AppWithNavigationState = ({dispatch, nav}) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })}/>
);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
