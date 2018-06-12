import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import {loadUserData} from '../../../configure/storage'
import {loginSucceed} from '../../../redux/actions/user'
import { connect } from 'react-redux'

@connect(
    state => ({}),
    (dispatch, props) => ({
        bootstrapAsync:async () => {

            try{
                const user = await loadUserData();
                dispatch(loginSucceed(user))
                // This will switch to the App screen or auth screen and this loading
                // screen will be unmounted and thrown away.
                props.navigation.navigate(user ? 'Tab' : 'Login');
            }catch(e) {
                props.navigation.navigate('Login');
            }

        }
    })
)

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place


    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                {/*<StatusBar barStyle="default" />*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    }
})