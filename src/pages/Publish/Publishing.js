/**
 * Created by lintong on 2017/9/26.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Alert,
    Text,
    Dimensions,
    TextInput,
    ActivityIndicator,
    Image
} from 'react-native'
import Button from '../../components/Button'
import { connect } from 'react-redux'
import { ICARD } from '../../redux/reqKeys'
import { addNormalizrEntity } from '../../redux/module/normalizr'
import { update } from '../../redux/module/leancloud'
import imagePicker from '../../components/ImagePicker/imagePicker'
import { bindActionCreators } from 'redux';
import BounceBtn from '../../components/Button/BounceBtn'
import Icon from 'react-native-vector-icons/Ionicons'
import { PBULImage } from '../../redux/reqKeys'
import { uploadImages } from '../../redux/actions/util'
//static displayName = PublishDetail
import Toast from 'react-native-simple-toast'
import HeaderBtn from '../../components/Button/HeaderBtn'
import CardPublishForm, { FormID } from '../../components/Form/CardPublish'
import { formValueSelector } from 'redux-form/immutable'

const selector = formValueSelector(FormID)

@connect(
    (state, props) => ({
        //data:state.req.get()
        iCard: state.normalizr.get(ICARD).get(props.navigation.state.params.iCardID),
        imageLoad: state.req.get(PBULImage).get('load'),
        load: state.req.get(ICARD).get('load'),
        user: state.user.data
    }),
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch),
        publish: (data) => {

            if (!data.img) {
                Toast.show('发布的卡片必须有图片哟!');
                return;
            }
            // if (!keys) {
            //     Toast.show('发布的卡片必须有关键字哟!');
            //     return;
            // }

            dispatch(async (dispatch, getState) => {

                const state = getState()
                const user = state.user.data
                // console.log('user:', user);
                if (!user.nickname || user.nickname.length === 0) {

                    props.navigation.navigate('NickName')
                    Toast.show('发布卡片前需要先设置昵称~!');
                    return;
                }

                const keys = selector(state, 'keys');
                const describe = selector(state, 'describe');
                const id = data.objectId
                const param = {
                    state: data.state === 0 ? 1 : 0,
                    keys: keys.split(','),
                    describe,
                }
                const res = await  update(id, param, ICARD)

                const entity = {
                    ...param,
                    ...res
                }
                dispatch(addNormalizrEntity(ICARD, entity))


            })

        },

        unPublish: async (data) => {
            const id = data.objectId
            const param = {
                state: data.state === 0 ? 1 : 0
            }
            const res = await  update(id, param, ICARD)

            const entity = {
                ...param,
                ...res
            }
            dispatch(addNormalizrEntity(ICARD, entity))
        },
        picker: async (uri) => {
            // dispatch(pickerImage())

            if (uri) {
                // dispatch(uploadAvatar(response.uri))
                const res = await dispatch(uploadImages([uri],
                    PBULImage))

                if (!res.payload) {
                    return
                }

                const id = props.navigation.state.params.iCardID
                const img = res.payload[0]
                console.log('img:', img);
                const param = {
                    img: {
                        "id": img.id,
                        "__type": "File",
                        url: img.attributes.url
                    }
                }
                const res2 = await  update(id, param, ICARD)
                const entity = {
                    ...param,
                    ...res2
                }
                dispatch(addNormalizrEntity(ICARD, entity))

                return img.attributes.url
            }
        }
    })
)
export default class Publishing extends Component {
    constructor(props: Object) {
        super(props);
        const keys = props.iCard.get('keys')
        this.state = {
            keys: keys && keys.join(",")
        }
    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            // title: params.title,
        }
    };

    shouldComponentUpdate(nextProps: Object, nextState: object) {
        return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
    }


    render(): ReactElement<any> {
        const { imageLoad, iCard, picker ,load} = this.props
        // const iCard = this.props.iCard
        // const url = iCard.img && iCard.img.url
        const cover = iCard.get('img')
        let keys = iCard.get('keys')
        keys = keys && keys.toJS()

        return (
            <View style={[this.props.style, styles.wrap]}>
                {/*{this._renderHeader(iCard)}*/}


                {/*<HeaderBtn*/}
                {/*hitSlop={{ top: 0, left: 20, bottom: 20, right: 20 }}*/}
                {/*style={styles.headerBtn}*/}
                {/*load={this.props.load}*/}
                {/*title={iCard.state === 0 ? "马上发布" : '取消发布'}*/}
                {/*onPress={() => {*/}
                {/*if (iCard.state === 0) {*/}
                {/*this.props.publish(iCard, this.state.keys)*/}
                {/*} else {*/}
                {/*// this.__alert(iCard)*/}
                {/*this.props.unPublish(iCard)*/}
                {/*}*/}
                {/*}}/>*/}

                <CardPublishForm
                    load={load}
                    initialValues={{
                        cover: cover && cover.get('url'),
                        keys: keys && keys.toString(),
                        describe: iCard.get('describe')
                    }}
                    title={iCard.get('title')}
                    imageLoad={imageLoad}
                    state={iCard.get('state')}
                    handleImage={picker}
                    onSubmit={() => {

                        const iCardModel = iCard.toJS()
                        if (iCardModel.state === 0) {
                            this.props.publish(iCardModel, this.state.keys)
                        } else {
                            // this.__alert(iCard)
                            this.props.unPublish(iCardModel)
                        }
                    }}
                />
            </View>
        );
    }
}
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: "white",
        // flexDirection: 'row'
    },
    header: {
        padding: 25,
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
    },
    useNum: {
        marginTop: 10,
        fontSize: 15,
        color: 'rgb(50,50,50)',
    },

    row: {
        backgroundColor: 'white',
        // paddingHorizontal: 25,
        marginHorizontal: 30,
        paddingVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
    },


    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    rowText: {
        marginLeft: 3,
        fontSize: 14,
        color: 'rgb(100,100,100)',
    },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderRightWidth: StyleSheet.hairlineWidth * 2,
        borderColor: '#8c8c85',
        transform: [{ rotate: '315deg' }],
        marginRight: 5,
        width: 10,
        height: 10,
    },
    item: {
        backgroundColor: 'white',
        width: (width - 50) / 3,
        height: width / 3 * 1.3,
        marginTop: 10,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            height: 3,
            width: 2,
        },
        elevation: 10,
        justifyContent: 'center'
    },
    addImageText: {
        marginTop: 10,
        marginLeft: 5,
        color: 'rgb(100,100,100)'
    },
    textInputStyle: {
        width: width - 60,
        height: 40,
        marginTop: 20,
        marginLeft: 10,
        textAlign: 'left',
        fontSize: 14,
        color: 'black',
        // backgroundColor: 'red'
    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e4e4e4',
    },
    img: {
        flex: 1,
        borderRadius: 10,
    },
    headerBtn: {
        marginTop: 20,
        paddingHorizontal: 15,
        width: 120,
        marginLeft: 25,
        // backgroundColor:'#F3AC41'
    },
})
