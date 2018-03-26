/**
 * Created by lintong on 2017/8/30.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Platform,
    Dimensions,
    findNodeHandle,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    ActivityIndicator
} from 'react-native'
import { BlurView as BlurViewIOS } from 'react-native-blur';

const BlurView = Platform.OS == 'ios' ? BlurViewIOS : View
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons'
import { req, load } from '../../redux/actions/req'
import { uploadImages } from '../../redux/actions/util'
import HeaderBtn from '../../components/Button/HeaderBtn'

export const Btn = Animatable.createAnimatableComponent(TouchableWithoutFeedback);
import Pop from '../../components/Pop'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast'
import { classUpdate, classCreatNewOne } from '../../request/leanCloud'
import { batch } from '../../redux/module/leancloud'
import { selfUser, iCard, iUse } from '../../request/LCModle'
import { addNormalizrEntity } from '../../redux/module/normalizr'
import moment from 'moment'
import { ICARD, IDO, IUSE, IDOULIMAGE } from '../../redux/reqKeys'
import { mainColor } from '../../configure'
import ImageSelectView from '../../components/ImagePicker/ImageSelectView'
//static displayName = 
@connect(
    state => ({
        //data:state.req.get()
        iCard: state.normalizr.get(ICARD),
        load: state.req.get(IDO).get('load') || state.req.get(IDOULIMAGE).get('load')
    }),
    dispatch => ({
        //...bindActionCreators({},dispatch),
        done: (data, state, callBack) => {
            //先判断是否有图片，如果有则 先上传图片。
            dispatch(async (dispatch, getState) => {

                try {
                    const { files, ...otherState } = state
                    let ims = []

                    const state2 = getState()
                    const iCardM = state2.normalizr.get(ICARD).get(data[ICARD]).toJS()


                    if (iCardM.record.indexOf('图片') !== -1) {
                        const urls = files.map(file => file.uri)
                        const res = await dispatch(uploadImages(urls, IDOULIMAGE))

                        if (!res.payload) {
                            return
                        }
                        ims = res.payload.map(imgs => imgs.attributes.url)
                    }

                    const id = data.objectId
                    const time = data.time + 1
                    const param = {
                        doneDate: { "__type": "Date", "iso": moment() },
                        time: time,
                        //cycle,
                        statu: time === data.period ? "stop" : "start"
                    }

                    // const IUseP = classUpdate(IUSE, id, param)
                    const iDoP = classCreatNewOne(IDO, {
                        ...selfUser(),
                        ...iUse(id),
                        ...iCard(iCardM.objectId),
                        ...otherState,
                        imgs: ims
                    })

                    const res2 = await load(iDoP, IDO)

                    if (res2.error) {
                        Toast.show(res2.error)
                        return
                    }


                    const entity = {
                        ...param,
                        objectId: id
                    }

                    dispatch(addNormalizrEntity(IUSE, entity))
                    Pop.hide()

                } catch (e) {
                    console.log('test:', e.message);
                }

            })


        },
    })
)
export default class  extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            backgroundView: null,
            recordText: '',
            files: []
        }
    }

    static propTypes = {
        data: PropTypes.object,
    };
    static defaultProps = {
        data: {}
    };
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '主页',
        }
    };

    // shouldComponentUpdate(nextProps: Object) {
    //     return !immutable.is(this.props, nextProps)
    // }

    __checkType = (type) => {
        const data = this.props.data
        const iCard = this.props.iCard.get(data[ICARD]).toJS()
        const record = iCard.record
        return record.indexOf(type) !== -1
    }

    __chackDone = () => {
        const { backgroundView, load, ...state } = this.state

        if (this.__checkType('文字') && this.state.recordText.length == 0) {
            Toast.show('需要添加文字记录~')
            return;
        }

        if (this.__checkType('图片') && this.state.files.length == 0) {
            Toast.show('需要添加图片~')
            return;
        }


        this.props.done(this.props.data, state)
    }


    __textType = () => {
        return (
            <View>
                {/*<Text style={{fontSize: 15, marginTop:10}}>一句话日记</Text>*/}
                <TextInput
                    placeholderTextColor="rgba(180,180,180,1)"
                    selectionColor={mainColor}
                    returnKeyType='next'
                    maxLength={50}
                    placeholder={"一句话日记"}
                    value={this.state.recordText}
                    //keyboardType={boardType}
                    style={styles.textInputStyle}
                    underlineColorAndroid='transparent'
                    clearButtonMode='while-editing'
                    enablesReturnKeyAutomatically={true}
                    //onSubmitEditing={() =>this.focusNextField(ref)}
                    onChangeText={(text) => this.setState({ recordText: text })}
                />
                <View style={styles.line}/>
            </View>
        )
    }

    render(): ReactElement<any> {
        return (
            <View
                onStartShouldSetResponder={() => true}
                onResponderGrant={Keyboard.dismiss}
                ref={(e) => {
                    if (this.state.backgroundView === null && Platform.OS === 'ios') {
                        this.setState({ backgroundView: findNodeHandle(e) })
                    }
                }}
                style={[this.props.style, styles.wrap, {
                    backgroundColor: Platform.OS === 'ios' ?
                        'transparent' : 'rgba(255,255,255,0.95)'
                }]}>
                {Platform.OS === 'ios' && this.state.backgroundView && (<BlurView
                    style={[styles.absolute]}
                    viewRef={this.state.backgroundView}
                    blurType="xlight"
                    blurAmount={3}
                />)}
                <View/>
                <View style={styles.do}>


                    {this.__checkType('图片') && (<ImageSelectView
                        onChange={(files) => {
                            this.setState({ files })
                        }}
                        files={this.state.files}
                        maxImage={1}/>)}

                    {this.__checkType('文字') && this.__textType()}


                    {this.props.load ?
                        (<View style={[{ padding: 20 }]}>
                            <ActivityIndicator size="large"/>
                        </View>) :
                        (<View style={[styles.top]}>
                            <HeaderBtn
                                title="取消"
                                style={styles.close}
                                hitSlop={{ top: 5, left: 50, bottom: 5, right: 50 }}
                                onPress={() => {
                                    Pop.hide()
                                }}/>
                            <HeaderBtn
                                title="打卡"
                                hitSlop={{ top: 5, left: 50, bottom: 5, right: 50 }}
                                style={styles.close}
                                onPress={this.__chackDone}/>
                        </View>)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    absolute: {
        ...StyleSheet.absoluteFillObject,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

    },
    do: {
        padding: 50,
    },
    top: {
        marginTop: 15
    },
    textInputStyle: {
        height: 40
    },
    line: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    close: {
        marginTop: 15,
        width: 80,
    }
})
