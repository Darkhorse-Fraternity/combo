/**
 * Created by lintong on 2017/8/30.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ScrollView,
    StyleSheet,
    Platform,
    Dimensions,
    findNodeHandle,
    Keyboard,
} from 'react-native'
import {BlurView} from 'react-native-blur';

// const BlurView = Platform.OS === 'ios' ? BlurViewIOS : View
import {uploadImages} from '../../redux/actions/util'
import Pop from '../../components/Pop'
import {connect} from 'react-redux'
import Toast from 'react-native-simple-toast'

import {ICARD, IDO, IUSE, IDOULIMAGE} from '../../redux/reqKeys'
import DoCardForm,{FormID} from '../../components/Form/DoCardForm'
//static displayName =
import {doCard} from '../../components/Button/DoCardButton/DoCard'
import { formValueSelector } from 'redux-form/immutable'

@connect(
    state => ({
        //data:state.req.get()
        iCard: state.normalizr.get(ICARD),
        load: state.req.get(IDO).get('load') ||
        state.req.get(IDOULIMAGE).get('load')
    }),
    (dispatch,props) => ({
        //...bindActionCreators({},dispatch),
        done: () => {
            //先判断是否有图片，如果有则 先上传图片。
            dispatch(async (dispatch, getState) => {

                try {

                    const data = props.data;
                    // const {files, ...otherState} = state

                    const state = getState()
                    const iCardM = state.normalizr.get(ICARD).get(data[ICARD]).toJS()


                    const selector = formValueSelector(FormID)
                    const recordText = selector(state,'recordText') || ""
                    let imgs = selector(state, 'imgs')
                    imgs = imgs && imgs.toJS()


                    if (iCardM.record.indexOf('文字') !== -1 && recordText.length === 0) {
                        Toast.show('需要添加文字记录~')
                        return;
                    }

                    if (iCardM.record.indexOf('图片') !== -1 && imgs.length === 0) {
                        Toast.show('需要添加图片~')
                        return;
                    }



                    if (iCardM.record.indexOf('图片') !== -1) {
                        const urls = imgs.map(file => file.uri)
                        const res = await dispatch(uploadImages(urls, IDOULIMAGE))
                        if (!res.payload) {
                            return
                        }
                        imgs = res.payload.map(img => img.attributes.url)
                    }


                    await dispatch(doCard(data,{recordText,imgs}))

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
            viewRef: null,
        }
    }

    static propTypes = {
        data: PropTypes.object,
    };
    static defaultProps = {
        data: {}
    };


    // shouldComponentUpdate(nextProps: Object) {
    //     return !immutable.is(this.props, nextProps)
    // }





    render(): ReactElement<any> {

        const data = this.props.data
        const iCard = this.props.iCard.get(data[ICARD]).toJS()
        const record = iCard.record

        // console.log('submitting:', this.props.load);

        return (
            <ScrollView
                onStartShouldSetResponder={() => true}
                onResponderGrant={Keyboard.dismiss}
                ref={(e) => {
                    if (this.state.viewRef === null && Platform.OS === 'ios') {
                        this.setState({viewRef: findNodeHandle(e)})
                    }
                }}
                style={[this.props.style, styles.wrap, {
                    backgroundColor: Platform.OS === 'ios' ?
                        'transparent' : 'rgba(255,255,255,1)'
                }]}>
                {this.state.viewRef && (<BlurView
                    style={[styles.absolute]}
                    viewRef={this.state.viewRef}
                    blurType="xlight"
                    blurAmount={15}
                />)}
                <View/>
                <DoCardForm
                    load={this.props.load}
                    record={record}
                    onSubmit={this.props.done}/>
            </ScrollView>
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
        marginTop:15
    },
    textInputStyle: {
        height:40
    },
    line: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    close:{
        marginTop:15,
        width:80,
    }
})
