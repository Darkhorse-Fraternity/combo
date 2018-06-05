import {
    createBottomTabNavigator,
    createStackNavigator,
} from 'react-navigation';
// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import React from 'react'
import {
    View,
    Button,
    Text
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {TransitionConfiguration} from '../navigators/TransitionConfiguration'

const AniIonicons = Animatable.createAnimatableComponent(Ionicons);
import {
    homeRoute,
    settingRoute,
    navigationOptions
} from '../../../pages'

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Details!</Text>
            </View>
        );
    }
}

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* other code from before here */}
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

class SettingsScreen extends React.Component {

    render() {
        console.log('test:', this.props);
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* other code from before here */}
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

const HomeStack = createStackNavigator({
    ...homeRoute
}, {
    initialRouteName: 'Home',
    navigationOptions,
    transitionConfig: TransitionConfiguration,
});

const SettingsStack = createStackNavigator({
    ...settingRoute,
}, {
    initialRouteName: 'PersonCenter',
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

            return {
                tabBarIcon: ({ focused, tintColor }) => {
                    const { routeName } = navigation.state;
                    let iconName;
                    if (routeName === 'Home') {
                        iconName = `md-sunny`;
                    } else if (routeName === 'Settings') {
                        iconName = `ios-happy`;
                    }

                    // You can return any component that you like here! We usually use an
                    // icon component from react-native-vector-icons
                    return <AniIonicons
                        // delay={1000}
                        // useNativeDriver={true}
                        ref={node => refs[routeName] = node}
                        name={iconName}
                        size={!!focused ? 35 : 35}
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
                tabBarVisible: navigation.state.index === 0
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
            inactiveTintColor: '#F0C98B',
            showLabel: false,
            style: {
                backgroundColor: "white",
            },
            // tabStyle:{
            //     backgroundColor:'red'
            // }

        },
    },
);