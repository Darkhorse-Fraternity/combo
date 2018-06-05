/* @flow */
'use strict';
import React, {Component, PropTypes} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    Switch,
    Linking,
    Platform,
} from 'react-native'
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux'
import {logout} from '../../redux/actions/user'
import {dataStorage} from '../../redux/actions/util'
import DeviceInfo from 'react-native-device-info'
import Button from '../../components/Button'

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'white',
        paddingTop:15,
    },
    groupSpace: {
        height: 15 / 2,
    },
    group: {
        // backgroundColor: 'white',
    },
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth ,
        borderBottomColor: '#e4e4e4',
    },


    // cbutton:{
    //   marginRight:10,
    //   marginLeft:10,
    //   marginTop: 20,
    //   height: 40,
    //   justifyContent: 'center',
    // },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderRightWidth: StyleSheet.hairlineWidth * 2,
        borderColor: '#8c8c85',
        transform: [{rotate: '315deg'}],
        width: 10,
        height: 10,
    },
    ImageStyles: {
        width: 30,
        height: 30,
    },
    imageNail: {
        // marginTop: 13,
        // marginBottom: 13,
        marginLeft: 10,
        width: 20,
        height: 20,
    },

    rowText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#333333',
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(100,100,100,0.1)',
    },
});


class WBSetting extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            logoutLoad: false
        }
    }


    static navigationOptions = props => {
        return {
         //  title:'设置'
        }
    }


    state: {
        logoutLoad: bool
    };

    _renderRow(title: string, needArrow: bool, activity: bool = false, onPress: Function = () => {
    }) {
        return (
            <Button style={styles.row} onPress={onPress}>
                    <View style={{flexDirection: 'row',
                        justifyContent: 'center'}}>
                        {/*<Image
                         source={source}
                         style={styles.imageNail}
                         />*/}
                        <Text style={styles.rowText}>
                            {title}
                        </Text>
                    </View>
                    {activity === false &&
                    needArrow && <View style={styles.arrowView}/>}
                    {activity === true && <ActivityIndicator/>}
            </Button>
        );
    }

    _logout = () => {
        //发送请求给服务器
        this.props.logout();
    };



    render() {
        const navigation = this.props.navigation
        return (
            <ScrollView style={styles.list}>


                {/*<View style={[styles.row,{paddingVertical: 5}]}>*/}
                {/*<View style={{flexDirection:'row',justifyContent:'center'}}>*/}
                {/*/!*<Image*/}
                {/*source={source}*/}
                {/*style={styles.imageNail}*/}
                {/*/>*!/*/}
                {/*<Text style={styles.rowText}>*/}
                {/*消息通知*/}
                {/*</Text>*/}
                {/*</View >*/}
                {/*<Switch onTintColor={mainColor} onValueChange={this.props.noti} value={this.props.notiValue}/>*/}
                {/*</View>*/}


                {this._renderRow('意见反馈', true, false, () => {
                    // NavigationManager.goToPage("Feedback");
                    navigation.navigate("Feedback");
                })}
                {/*<View style={styles.line}/>*/}
                {/*<View style={styles.groupSpace}/>*/}
                {/*{this._renderRow('关于我们', true, false, () => {*/}
                    {/*// NavigationManager.goToPage("Feedback");*/}
                    {/*navigation.navigate("About");*/}
                {/*})}*/}
                {this._renderRow('给个评价', true, false, () => {
                    let url = ''
                    if (Platform.OS == 'ios') {
                        url = 'http://itunes.apple.com/WebObjects/MZStore.woa/wa/' +
                            'viewContentsUserReviews?id=APPID' +
                            '&pageNumber=0&sortOrdering=2&type=Purple+Software&mt=8'
                    } else {
                        url = 'market://details?id=' + DeviceInfo.getBundleId()
                    }
                    Linking.openURL(url)

                })}
                {/*<View style={styles.line}/>*/}
                {/*<View style={styles.groupSpace}/>*/}
                {/*{this._renderRow('清除缓存', true, false, () => {*/}
                {/*Toast.show('清除成功')*/}
                {/*})}*/}


                <View style={styles.groupSpace}/>
                {this._renderRow('退出登录', false, this.state.logoutLoad, () => {
                    // Actions.asWhiteBoard();
                    this._logout();
                })}

            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    //从login reduce 中获取state的初始值。
    //console.log('state:',state);

    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        logout: () =>{
            dispatch(logout());

        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WBSetting)
