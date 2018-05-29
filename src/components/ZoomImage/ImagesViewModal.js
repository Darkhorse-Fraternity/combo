/**
 * Created by lintong on 2018/4/3.
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Modal,
    Image,
    Dimensions,
    ViewPagerAndroid,
    StatusBar,
    Platform
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';

export default class ImagesViewModals extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            visible: false
        }
    }

    state: {};
    static propTypes = {
        imageUrls: PropTypes.array.isRequired,
        visible:PropTypes.bool,
        closeCallBack:PropTypes.func.isRequired
    };
    static defaultProps = {
        height: 250,
        visible:false
    };


    __renderHeader = () => {


        return (
            <View style={styles.header}>
                <TouchableOpacity
                    style={{width:100,height:70}}
                    onPress={() => {
                        // this.setState({ visible: false })
                        const closeCallBack = this.props.closeCallBack
                        closeCallBack && closeCallBack()
                    }}>
                    <Image
                        source={require('../../../source/img/visitor/visitor_delete.png')}
                        style={styles.close}/>
                </TouchableOpacity>
            </View>
        )

    }




    render() {

        const { imageUrls ,visible,closeCallBack} = this.props

        // console.log('test:', imageUrls);
        return (
                <Modal
                    onRequestClose={()=>{
                        // this.setState({ visible: false })
                        closeCallBack && closeCallBack()
                    }}
                    visible={visible}
                    transparent={true}>
                    {Platform.OS !== 'ios' &&  (
                        <StatusBar backgroundColor='black'/>
                    )}
                    <ImageViewer
                        imageUrls={imageUrls||[]}
                        onCancel={() => {
                            // this.setState({ visible: false })
                            closeCallBack && closeCallBack()
                        }}
                        {...this.props}
                        //saveToLocalByLongPress={()=>{}}
                        renderHeader={this.__renderHeader}
                        failImageSource={{
                            url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
                            width: Dimensions.get("window").width,
                            height: Dimensions.get("window").width
                        }}
                    />
                </Modal>
        );
    }
}
const styles = StyleSheet.create({
    close: {
        marginTop: 25,
        marginLeft: 25,
        width: 25,
        height: 25,
        tintColor: "white"
    },
    header:{
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex:10,
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
    }

})