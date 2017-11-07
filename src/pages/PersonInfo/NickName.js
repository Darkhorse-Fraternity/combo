//昵称修改
'use strict';
import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    findNodeHandle,
    TouchableOpacity
} from 'react-native'
import {backViewColor, mainColor, textInputTextColor, placeholderTextColor} from '../../configure'
import {updateUserName} from '../../request/leanCloud'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import {updateUserData} from '../../redux/actions/user'
import Toast from 'react-native-simple-toast';
import {req} from '../../redux/actions/req'

class NickName extends React.Component {


    constructor(props: Object) {
        super(props);
        this.state = {
            loaded: false,
            nickName: this.props.userData.username,
        }
    }

    state: {
        loaded: bool,
        nickName: string,
    }


    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;le
        // const {params} = state;
        return {
            title: '修改昵称',
            headerRight: ( <TouchableOpacity
                style={styles.headerBtn}
                onPress={() => {
                    props.navigation.state.params.send()
                }}>
                <Icon name="md-send" size={20}/>
            </TouchableOpacity>),
        }
    };

    componentWillMount() {
        this.props.navigation.setParams({send: this._tapRight})

    }

    _tapRight = () => {
        if (this.state != null) {
            if (this.state.nickName.length == 0) {
                Toast.show('昵称不能为空');
                this.refs.nameInput.focus();
                return;
            } else {
                this.refs.nameInput.blur();
            }

            //接下就这里提交请求
            this.props.update(this.state.nickName)

        }
    }


    renderRowMain(title: string, placeholder: string, onChangeText: Function,
                  keyboardType: string = 'default', autoFocus: bool = false) {

        return (
            //  <View style={styles.rowMainStyle} >
            <TextInput
                ref="nameInput"
                placeholderTextColor={placeholderTextColor}
                placeholder={placeholder}
                style={styles.textInputStyle}
                onChangeText={onChangeText}
                maxLength={16}
                underlineColorAndroid='transparent'
                defaultValue={this.props.userData.username}
                clearButtonMode='while-editing'
                enablesReturnKeyAutomatically={true}
                returnKeyType='done'
                selectionColor={mainColor}
                onSubmitEditing={this._tapRight}
                selectTextOnFocus={false}
                autoFocus={true}
            />
            //  </View>
        )
    }

    render() {
        return (
            <View style={styles.container}
                  onStartShouldSetResponderCapture={(e) => {
                      const target = e.nativeEvent.target;
                      if (target !== findNodeHandle(this.refs.nameInput)) {
                          this.refs.nameInput.blur();
                      }
                  }}>
                <View style={styles.rowStyle}>
                    {this.renderRowMain('昵称修改:', "请输入的昵称",
                        (text) => {
                            this.setState({nickName: text});
                            // this.props.refresh({rightButtonDisabled: text.length == 0,})
                        }, 'default'
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backViewColor,
    },
    rowStyle: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'white',
    },


    textInputStyle: {
        //  padding:15,
        marginLeft: 15,
        fontSize: 13,
        height: 40,
        flex: 1,
        borderColor: 'gray',
        backgroundColor: '#00000000',
        color: textInputTextColor,
    },

    headerBtn: {
        padding: 20,
        paddingHorizontal: 15,
    },
})


const mapStateToProps = (state) => {

    return {
        userData: state.user.data,

    }
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        update: (username) => {

            dispatch(async (dispatch, getState) => {

                const user = getState().user.data
                const params = updateUserName(user.objectId, username);

                await req(params)


                Toast.show('修改成功');
                //修改store
                dispatch(updateUserData({username}))
                props.navigation.goBack()


            })

        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NickName)
