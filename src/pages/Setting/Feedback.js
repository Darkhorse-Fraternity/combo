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
import Icon from 'react-native-vector-icons/Ionicons'
import {mainColor} from '../../configure'
import {backViewColor, textInputTextColor, placeholderTextColor, grayFontColor} from '../../configure'
import {feedbackParam} from '../../request/leanCloud'
import {connect} from 'react-redux'

class Feedback extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            content: "",
        };
    }

    requestHandle: Object;

    state: {
        content: string,
    };


    static navigationOptions = props => {
        return {
            title: '意见反馈',
            headerRight: ( <TouchableOpacity
                style={styles.headerBtn}
                onPress={() => {
                    props.navigation.state.params.send()
                }}>
                <Icon name="md-send" size={20}/>
            </TouchableOpacity>),
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({send: () => this.props.send(this.state.content)})

    }


    _tapRight = () => {
        // this.props.refresh({rightButtonIsLoad:true})
        // if(this.state.content != null && this.state.content.length > 0){
        //   var self = this;
        //   // feedBackRequest.params.content = this.state.content;
        //   const params = feedbackParam(this.state.content,this.props.data.mobilePhoneNumber);
        //
        //   this.requestHandle = request(params, function(response){
        //
        //     self.props.refresh({rightButtonIsLoad:false})
        //        if(response.statu){
        //          self.props.pop();
        //          Toast.show('您的意见我们收到啦.');
        //        }
        //
        //   });
        // }else {
        //    Toast.show("提交内容不能为空");
        // }
    };


    render() {

        return (
            <View style={styles.containerStyle}>
                <TextInput
                    multiline={true}
                    placeholderTextColor={placeholderTextColor}
                    selectionColor= {mainColor}
                    style={styles.account}
                    underlineColorAndroid='transparent'
                    placeholder={"请填写您的宝贵意见。"}
                    maxLength={200}
                    onChangeText={(text) => this.setState({content: text})}
                />
                <Text style={styles.textStyle}>{this.state.content.length}/200</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    containerStyle: {
        flex: 1,
        backgroundColor: backViewColor,
    },

    viewStyle: {
        backgroundColor: '#ffffff',
        height: 240,

    },

    account: {
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: 'white',
        height: 168,
        color: textInputTextColor,

        fontSize: 14,
        marginTop: 15,
        textAlignVertical: 'top',
        paddingHorizontal: 12,
        paddingTop: 14,
    },
    textStyle: {
        marginTop: 5,
        marginRight: 12,
        textAlign: 'right',
        color: grayFontColor,
    },
    headerBtn: {
        padding: 20,
        paddingHorizontal: 15,
    },
});


const mapStateToProps = (state) => {

    return {}
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        send: (content) => {
            dispatch(async (dispatch, getState) => {
                if (content.length === 0) {
                    Toast.show('内容不能为空。')
                }
                try {
                    const user = getState().user.data
                    const params = feedbackParam(content, user.mobilePhoneNumber);
                    await req(params)
                    Toast.show('我们收到了您的意见~')
                    props.navigation.goBack()
                } catch (e) {
                    Toast.show(e.message)
                }


            })


        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feedback)
