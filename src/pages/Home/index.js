/**
 * Created by lintong on 2017/7/3.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,

    Dimensions,
    TouchableOpacity,

} from 'react-native'
import {connect} from 'react-redux'

import Pop from '../../components/Pop'
import Menu from '../../pages/Home/Menu'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable';
import BG from '../../components/BG/BG'
import CardView from '../Card/CardView'
import LoginView from '../Setting/LoginView'

import PushManage from '../../configure/localNotification'
function makeScaleInTranslation(translationType, value) {
    return {
        from: {
            [translationType]: 0,
        },
        to: {
            [translationType]: value,
        },
    };
}
const cloudMoveLeft = makeScaleInTranslation('translateX', -500);
Animatable.initializeRegistryWithDefinitions({cloudMoveLeft})



@connect(
    state =>({
        isLogin: state.user.isLogin,
    }),
    (dispatch, props) =>({
        //...bindActionCreators({},dispatch)
        sayHello:()=>{

        }
    })
)
export  default  class Home extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    static navigationOptions = props => {
        const {navigation} = props;
        const {state} = navigation;
        const {params} = state;
        const isLogin = params ? params.isLogin : false
        const title = "登录"
        // console.log('test:', params,localLoad);
        return {
            // header: isLogin ? undefined : ()=>(<View style={{height:64,backgroundColor:'#F5FCFF'}}/>),
            title:!isLogin ?  title: '金色光芒',
            headerRight:!isLogin ?undefined: ( <TouchableOpacity
                style={styles.headerBtn}
                onPress={()=>{
                        navigation.navigate('NewCard')
                    }}>
                <Icon name="md-add" size={30}/>
            </TouchableOpacity>),
            headerLeft: !isLogin ? undefined :(
                <TouchableOpacity
                    style={styles.headerBtn}
                    onPress={()=>{
                        Pop.show(<Menu/>,{maskStyle:{backgroundColor:'transparent'}})
                }}>
                    <Icon name="md-list" size={30}/>
                </TouchableOpacity>)
        }
    };


    componentWillReceiveProps(nextProps) {

        if (nextProps.isLogin != this.props.isLogin) {
            const {navigation} = nextProps;
            navigation.setParams({isLogin: nextProps.isLogin})
            // LayoutAnimation.spring()
        }
    }


    render(): ReactElement<any> {
        const {isLogin} = this.props

        return (
            <View style={[this.props.style,styles.container]}>
                <PushManage/>
                <BG style={styles.bc}/>
                <View style={styles.main}>
                    {!isLogin && (
                            <LoginView/>
                    )}
                    {isLogin && (<CardView
                        animation="slideInDown"
                        navigation={this.props.navigation}
                        onScroll={(e)=>{
                             const x =  e.nativeEvent.contentOffset.x
                            if(x<-80){
                                {/*console.log('test:', x);*/}
                                 Pop.show(<Menu/>,{maskStyle:{backgroundColor:'transparent'}})
                            }

                        }}
                    />)}
                </View>
            </View>
        );
    }
}


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    bc: {
        position: 'absolute',
        width: width,
        height: height - 44,
    },
    header: {
        marginTop: 30,
        flexDirection: 'row',
        width: width,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },

    headerBtn: {
        padding: 20,
        paddingHorizontal: 15,
    },
    main: {
        flex:1,
    },
    loginBg: {
        width: width,
        height: height - 64,
        alignItems: 'center'

    },
    login: {
        width: width - 100,
        height: 300,
        marginTop: 100,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0.3,
        },
        justifyContent: 'space-between',
        borderTopColor: '#EE7A8D',
        borderTopWidth: 4,
    }

})
