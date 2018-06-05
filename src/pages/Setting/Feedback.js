/* @flow */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Toast from 'react-native-simple-toast';
import {req} from '../../redux/actions/req'

import {feedbackParam} from '../../request/leanCloud'
import {connect} from 'react-redux'
import HeaderBtn from '../../components/Button/HeaderBtn'
import {FEEDBACKPARAM} from '../../redux/reqKeys'
import {mainColor} from '../../Theme'

@connect(
    (state, props) => ({
        //data:state.req.get()
        userData: state.user.data,
        load:state.req.get(FEEDBACKPARAM).get('load')
    }),
    (dispatch, props) => ({
        send: (content) => {
            dispatch(async (dispatch, getState) => {
                if (content.length === 0) {
                    Toast.show('内容不能为空。')
                    return;
                }
                try {
                    const user = getState().user.data
                    const params = feedbackParam(content, user.mobilePhoneNumber);
                    await req(params,FEEDBACKPARAM)
                    Toast.show('我们收到了您的意见~')
                    props.navigation.goBack()
                } catch (e) {
                    Toast.show(e.message)
                }


            })


        }
    })
)

export default class Feedback extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            content: "",
        };
    }


    state: {
        content: string,
    };


    static navigationOptions = props => {
        return {
            // title: '意见反馈',
            // headerRight: ( <TouchableOpacity
            //     style={styles.headerBtn}
            //     onPress={() => {
            //         props.navigation.state.params.send()
            //     }}>
            //     <Icon name="md-send" size={20}/>
            // </TouchableOpacity>),
        }
    }




    _renderHeader = () => {

        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>意见反馈</Text>
            </View>
        )
    }

    render() {

        return (
            <View style={styles.containerStyle}>
                {this._renderHeader()}
                <TextInput
                    multiline={true}
                    selectionColor= {mainColor}
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder={"请填写您的宝贵意见。"}
                    maxLength={200}
                    onChangeText={(text) => this.setState({content: text})}
                />
                <Text style={styles.textStyle}>{this.state.content.length}/200</Text>
                <HeaderBtn
                    style={styles.headerBtn}
                    load={this.props.load }
                    disabled={this.state.content.length === 0}
                    title={'确定'}
                    onPress={() => {
                        this.props.send(this.state.content)
                    }}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal:25,
    },

    viewStyle: {
        backgroundColor: '#ffffff',
        height: 240,

    },

    input: {
        backgroundColor: 'white',
        height: 168,
        color: '#333333',
        fontSize: 14,
        marginTop: 25,
        textAlignVertical: 'top',
    },
    textStyle: {
        marginTop: 5,
        textAlign: 'right',
        color: '#999999',
    },
    headerBtn: {
        marginTop: 20,
        paddingHorizontal: 15,
        width:80
    },
    header: {
        paddingTop: 25,

    },
    headerTitle: {
        fontSize: 17,
    },

});

