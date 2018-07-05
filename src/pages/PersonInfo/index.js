/* @flow */
'use strict';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Picker,
    Image,
} from 'react-native'
import imagePicker from '../../components/ImagePicker/imagePicker'
import {connect} from 'react-redux'
import {uploadAvatar} from '../../redux/actions/util'
import Button from '../../components/Button'
const styles = StyleSheet.create({
    list: {
        backgroundColor: 'white',
    },
    groupSpace: {
        height: 15 / 2,
    },
    group: {
        borderBottomWidth: StyleSheet.hairlineWidth ,
        borderBottomColor: '#e4e4e4',
        paddingVertical:30,
    },
    headerStyle: {
        paddingLeft: 29 / 2,
        paddingRight: 23 / 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row: {
        alignItems: 'center',
        paddingLeft: 29 / 2,
        paddingRight: 23 / 2,
        paddingVertical:30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth ,
        borderBottomColor: '#e4e4e4',
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowText: {
        fontSize: 14,
        // fontWeight: '500',
        color: '#333333',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
        marginLeft: 15,
    },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderRightWidth: StyleSheet.hairlineWidth * 2,
        borderColor: '#8c8c85',
        transform: [{rotate: '315deg'}],
        marginLeft: 5,
        width: 10,
        height: 10,
    },
    destext: {
        margin: 56 / 2,
        marginLeft: 15,
        // marginLeft:15,
        fontSize: 11,
        color: '#999999'
    },

    thumbnail: {
        marginTop: 13,
        marginBottom: 13,
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: -2
    },

});


class PersonInfo extends React.Component {

    constructor(props: Object) {
        super(props);
        this.state = {}
    }







    _renderHeadRow(onPress: Function = () => {
    }) {
        const my_head = require('../../../source/img/my/my_head.png');
        const source = this.props.userData.avatar ? {uri: this.props.userData.avatar.url} : my_head

        return (
            <Button onPress={onPress} style={styles.group}>
                <View style={styles.headerStyle}>

                    <View style={styles.infoContainer}>
                        <Text style={styles.rowText}>修改头像</Text>
                    </View>
                    <Image
                        source={source}
                        style={styles.thumbnail}
                    />
                    <View style={styles.arrowView}/>
                </View>
            </Button>
        );
    }


    _renderRow(title: string, des: string, onPress: Function) {
        return (
            <View>
                <Button onPress={onPress}>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>
                            {title}
                        </Text>
                        <View style={styles.row2}>
                            <Text style={styles.rowText}>
                                {des}
                            </Text>
                            {title != '账号' && <View style={styles.arrowView}/>}
                        </View>
                    </View>
                </Button>
            </View>
        );
    }



    render() {



        return (
            <ScrollView  style={styles.list}>
                {this._renderHeadRow(this.props.picker)}
                {this._renderRow('昵称', this.props.userData.nickname, () => {
                    this.props.navigation.navigate("NickName");
                })}
                {/*{this._renderRow('手机号码修改', this.props.userData.nickname, () => {*/}
                    {/*this.props.navigation.navigate("NickName");*/}
                {/*})}*/}
            </ScrollView>
        );
    }
}


const mapStateToProps = (state) => {
    //从login reduce 中获取state的初始值。
    // console.log('state:',state);
    return {
        userData: state.user.data,
        //  state:state.route.navigationState.routes[state.route.navigationState.index],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        picker: () => {
            // dispatch(pickerImage())
            imagePicker({
                title: '添加图片',
                maxWidth: 500, // photos only
                maxHeight: 500, // photos only
            }, (response) => {
                // console.log('Response = ', response);
                if (response.uri) {
                    dispatch(uploadAvatar(response.uri))
                }
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonInfo)
