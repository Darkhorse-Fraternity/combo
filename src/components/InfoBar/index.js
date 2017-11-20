'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Text,
    Navigator,
    Vibration,
    Linking,
    Animated,
    Easing,
    View,
    Image,
    PixelRatio,
    TouchableWithoutFeedback,
    PanResponder
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {dataStorage} from '../../redux/actions/util'
import {connect} from 'react-redux'
import {fromJS} from 'immutable';
@connect(
    state =>({
        notify: state.util.get('notify')
    }),
    dispatch =>({

        hidden: ()=> {
            dispatch(dataStorage('notify',{show:false}))
        }

    })
)


export default class InfoBar extends Component {
    static propTypes = {}

    static defaultProps = {
        notify:fromJS({show:false})
    }

    constructor(props) {
        super(props);
        this.state = {
            show: true
        }

        this.createPanResponder = this.createPanResponder.bind(this);
    }


    componentDidMount() {
    }

    componentWillUnmount() {
        this.time && clearTimeout(this.time)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.notify.get('show')){
            //做一个定时器 5s后自定消失

            const timer  = setTimeout(()=>{
                   clearTimeout(timer);
                this.refs.aniView && this.refs.aniView.fadeOutUp().then(
                    (endState) =>  endState.finished && this.props.hidden() )
               },5000); //自动调用开始刷新 新增方法
            this.time = timer
        }
    }

    createPanResponder() {
        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder:() => true,
            onPanResponderRelease: (evt, gestureState)=>{
                console.log('test:', '');
                if(gestureState.dy > -10){
                    this.setState({show:false})
                    const notify = this.props.notify.get('notification').toJS()
                    console.log('广播111111111111','广播111111111111')
                    doReceiveNotify(notify)
                }else {
                    this.refs.aniView.fadeOutUp().then(
                        (endState) =>  {
                            if(endState.finished){
                                this.props.hidden()

                            }
                        } )
                }
            }
        });
    }

    render() {
        if (this.props.notify.get('show')) {
            const notify = this.props.notify.get('notification').toJS()
            return (
                <Animatable.View
                    ref="aniView"
                    {...this.createPanResponder().panHandlers}
                    animation="fadeInDown"
                    style={styles.infoBar}>
                    {/*<Image source={require('../../../source/img/logo/logo.png')}*/}
                           {/*style={styles.img}/>*/}
                    <Text style={styles.text}>
                        {notify.message}
                    </Text>
                </Animatable.View>
            )
        } else {
            return null
        }
    }


}

const styles = StyleSheet.create({
    infoBar: {
        position: 'absolute',
        top: 0,
        backgroundColor: '#ee4121',
        width: "100%",
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.15,
        flexDirection: 'row',
        // justifyContent:'center'
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop:25,
        // paddingVertical:25,
        paddingHorizontal:15,
    },

    img: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }

});
