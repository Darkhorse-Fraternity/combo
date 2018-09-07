import React from 'react'
import {
    View,
    Button,
    Text
} from 'react-native'


import {
    createBottomTabNavigator,
    createStackNavigator,
} from 'react-navigation';
// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const AniIonicons = Animatable.createAnimatableComponent(Ionicons);
import {
    homeRoute,
    settingRoute,
    navigationOptions
} from '../../../pages'
import {TransitionConfiguration} from '../navigators/TransitionConfiguration'


const HomeStack = createStackNavigator({
    ...homeRoute
}, {
    initialRouteName: 'home',
    navigationOptions,
    transitionConfig: TransitionConfiguration,
});


const SettingsStack = createStackNavigator({
    ...settingRoute,
}, {
    initialRouteName: 'personCenter',
    navigationOptions,
    transitionConfig: TransitionConfiguration,
});




const refs = {}
export default createBottomTabNavigator(
    {
        Home: HomeStack,
        Settings: SettingsStack,
    },
    {
        navigationOptions: ({ navigation }) => {
            const { routeName,index } = navigation.state;
            let iconName;
            let labelName;
            if (routeName === 'Home') {
                iconName = `md-sunny`;
                labelName = 'Now'
            } else if (routeName === 'Settings') {
                iconName = `ios-happy`;
                labelName = '我的'
            }
            return {
                // header:null,
                tabBarIcon: ({ focused, tintColor }) => {



                    // You can return any component that you like here! We usually use an
                    // icon component from react-native-vector-icons
                    return <AniIonicons
                        // delay={1000}
                        // useNativeDriver={true}
                        ref={node => refs[routeName] = node}
                        name={iconName}
                        size={!!focused ? 25 : 25}
                        color={tintColor}/>;
                },
                tabBarOnPress: ({ navigation, defaultHandler }: args) => {

                    defaultHandler()


                    // setTimeout(()=>{
                    //     const { routeName } = navigation.state;
                    //     console.log('test:', refs[routeName]);
                    //     refs1[routeName] && refs1[routeName].bounceIn(1000);
                    // },1000)

                },
                tabBarVisible: index === 0,
                tabBarLabel: labelName
            }
        },
        // tabBarComponent: (option, k) => {
        //     console.log('test:', option, k);
        //     const {onTabPress} = option
        //     console.log('test:', onTabPress);
        //     return (<View style={{ height: 64,
        //             flexDirection:'row',
        //             width: 320, backgroundColor: 'red' }}>
        //
        //
        //         </View>
        //     )
        // },
        tabBarOptions: {
            activeTintColor: '#F3AC41',
            inactiveTintColor: '#cbcbcb',
            showLabel: true,

            style: {
                backgroundColor: "#f1f6f9",
                borderTopColor:'white'
            },
            labelStyle: {
                fontSize: 12,
                marginTop:-1,
                marginBottom:2
            },
            tabStyle:{
                paddingTop:3,
            }

        },
    },
);