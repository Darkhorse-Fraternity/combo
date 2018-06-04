import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import {
    Platform,
    BackHandler ,
    ToastAndroid} from 'react-native'
import { AppNavigator } from './CreateAppNavigator'
import { NavigationActions } from "react-navigation";
import {
    createNavigationPropConstructor,
    initializeListeners
} from 'react-navigation-redux-helpers'


@connect(
    state => ({ nav: state.nav, })
)

export default class AppWithNavigationState extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    };
    static defaultProps = {};

    componentDidMount() {
        initializeListeners("root", this.props.nav);
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    lastBackPressed : number = 0
    onBackPress = () => {
        if (Platform.OS === 'ios') return;
        const { dispatch, nav } = this.props;
        const{ routes ,index} = nav
        const tab = routes[index]
        const tabIndex = tab.index
        const tabNav = tab.routes[tabIndex]

        //idnex 前两个分别是登录和tabview
        if (index > 0 && tabNav.index > 0 ) {
            dispatch(NavigationActions.back())
            return true;
        }
        let times = Date.now();
        if (times - this.lastBackPressed >= 2500) {
            //再次点击退出应用
            this.lastBackPressed = times;
            ToastAndroid.show("再按一次退出应用", 0);
            return true;
        }
        this.lastBackPressed = 0;
        return false;
    }


    render() {
        const { dispatch, nav } = this.props
        const navigationPropConstructor = createNavigationPropConstructor("root");
        const navigation = navigationPropConstructor(dispatch, nav,);
        return <AppNavigator navigation={navigation}/>;
    }

}
