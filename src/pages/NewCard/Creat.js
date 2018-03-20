/**
 * Created by lintong on 2017/7/11.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    // TextInput,
    Dimensions,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import { ICARD, IUSE } from '../../redux/reqKeys'
import { add } from '../../redux/module/leancloud'
import { bindActionCreators } from 'redux';
import { addListNormalizrEntity } from '../../redux/actions/list'
import { addNormalizrEntity } from '../../redux/module/normalizr'
import { mainColor } from '../../configure'
import { selfUser, iCard } from '../../request/LCModle'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'
import OptionDo,{StaticOption} from './OptionDo'
import {
    reduxForm,
    formValueSelector,
    formValues
} from 'redux-form/immutable'


export const FormID = 'CreatCardForm'
const selector = formValueSelector(FormID) // <-- same as form name


import { TextInput } from '../../components/Form/Cunstom'
//static displayName = Creat




@connect(
    state => ({
        //data:state.req.get()
        title: selector(state, 'title') ,
        initialValues:StaticOption
    }),
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch),
        add: (option = StaticOption) => dispatch(async (dispatch, getState) => {

            // console.log('test:', option);

            // const state = getState()
            // const user = state.user.data;
            //新建卡片
            const state = getState()
            const title = selector(state, 'title')
            const param = {
                title,
                // cycle: 0,
                // time: 0,
                // notifyTime:option&&option.notifyTime||"20.00",
                ...option,
                // doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
                ...selfUser(),
            }

            const res = await add(param, ICARD)
            const entity = {
                ...param,
                ...res
            }
            dispatch(addNormalizrEntity(ICARD, entity))

            //返回首页
            dispatch((dispatch, getState) => {
                const key = getState().nav.routes[2].key
                props.navigation.goBack(key)
            })


            const iCardId = res.objectId
            //询问是否立即使用。
            Alert.alert(
                '你新建了一个卡片，是否立即使用它',
                '您可以使用或者分享它',
                [{
                    text: '取消', onPress: () => {
                        props.navigation.navigate('PublishDetail', {
                            iCardID: iCardId,
                            data: entity
                        })
                    }
                },
                    {
                        text: '确定', onPress: async () => {

                        const param = {
                            cycle: 0,
                            time: 0,
                            // notifyTime:option&&option.notifyTime||"20.00",
                            doneDate: { "__type": "Date", "iso": moment('2017-03-20') },
                            ...selfUser(),
                            ...iCard(iCardId)
                        }
                        const res = await add(param, IUSE)
                        const entity = {
                            ...param,
                            ...res
                        }
                        dispatch(addListNormalizrEntity(IUSE, entity))
                    }
                    }
                ]
            )

        }),
    })
)


@reduxForm({
    form: FormID,
})

// @formValues('title')


export default class Creat extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            step: 0,
            optionOpen: false,
        }
    }

    static propTypes = {
        title: PropTypes.string
    };
    static defaultProps = {
        title:''
    };
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            header: null,
            title: null,
            headerLeft: null
        }
    };

    shouldComponentUpdate(nextProps: Object, nextState: Object) {
        return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
    }


    __nextStep = () => {


        const step = this.state.step + 1
        this.setState({ step })
        if (step === 2) {
            this.props.add()
        }

    }

    __backStep = () => {

        const step = this.state.step - 1
        this.setState({ step })
        if (step === -1) {
            this.props.navigation.goBack()
        }
    }

    __doOption = () => {
        this.setState({ optionOpen: true })
    }


    __renderName = () => {
        return (
            <View>
                <View style={styles.row}>
                    <TextInput
                        name='title'
                        placeholderTextColor="rgba(180,180,180,1)"
                        selectionColor={mainColor}
                        returnKeyType='next'
                        maxLength={50}
                        //keyboardType={boardType}
                        style={styles.textInputStyle}
                        underlineColorAndroid='transparent'
                        placeholder='卡片名称'
                        clearButtonMode='while-editing'
                        enablesReturnKeyAutomatically={true}
                        //onSubmitEditing={() =>this.focusNextField(ref)}
                        // onChangeText={(text) => this.setState({title: text})}
                    />
                    <View style={styles.line}/>
                </View>
                <View style={styles.ctrlView}>
                    <TouchableOpacity
                        onPress={this.__backStep}
                        style={[styles.sureBtn]}>
                        <Text style={styles.sureBtnText}>上一步</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.props.title.length === 0}
                        onPress={this.__nextStep}
                        style={[styles.sureBtn, {
                            backgroundColor:
                                this.props.title.length === 0 ? "rgb(200,200,200)" : "black"
                        }]}>
                        <Text style={styles.sureBtnText}>下一步</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    __doneView = () => {
        return (
            <View>
                <Text style={styles.doneTitle}>{this.props.title}</Text>
                <View style={styles.doneCtrlView}>
                    <TouchableOpacity
                        onPress={this.__backStep}
                        style={[styles.sureBtn]}>
                        <Text style={styles.sureBtnText}>上一步</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.__doOption}
                        style={[styles.sureBtn]}>
                        <Text style={styles.sureBtnText}>更多配置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.props.title.length === 0}
                        onPress={this.__nextStep}
                        style={[styles.sureBtn]}>
                        <Text style={styles.sureBtnText}>完成</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    render(): ReactElement<any> {
        return (
            <View style={[this.props.style, styles.wrap]}>
                <View style={{
                    height: 60,
                    backgroundColor: this.state.optionOpen ? "#F5FCFF" : "white"
                }}/>
                {this.state.step === 0 && !this.state.optionOpen && this.__renderName()}
                {this.state.step === 1 && !this.state.optionOpen && this.__doneView()}
                {this.state.optionOpen && (<OptionDo goBack={() => {
                    this.setState({ optionOpen: false })
                }}/>)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: 'white',
        // paddingTop:60,
    },
    row: {
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderBottomColor: mainColor,
        // marginHorizontal: 30,
        paddingHorizontal: 50,
        // paddingVertical:20,
    },
    downRow: {
        marginHorizontal: 30,
        height: 90,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle: {

        marginLeft: -15,
        //textAlign: 'center',
        fontSize: 14,
        height: 40,
        paddingLeft: 15,
        //width: Dimensions.get('window').width - 60,
        // color: 'black',
        marginTop: 10,
        // borderWidth: StyleSheet.hairlineWidth,
        // borderColor: "rgb(180,180,180)",
        // borderRadius: 25,

    },
    sureBtn: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        paddingVertical: 10,
        marginTop: 20,
    },
    sureBtnText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 15,
    },
    ctrlView: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: 50,
        paddingTop: 20,
    },
    doneBtn: {
        // width: 50,
        // height: 50,
        marginTop: 20,
        // borderRadius: 25,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    doneCtrlView: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: 50,
        paddingTop: 10,
    },
    doneTitle: {
        marginTop: 15,
        paddingHorizontal: 55,
        fontSize: 20,
        fontWeight: '600',
    },
    line: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgb(0,0,0)'
    }
})
