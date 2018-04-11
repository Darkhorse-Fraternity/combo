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
    TouchableOpacity,
    Modal,
    Image,
    Dimensions,
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';
import Swiper from 'react-native-swiper'

export default class ZoomImage extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            visible: false
        }
    }

    state: {};
    static propTypes = {
        imageUrls: PropTypes.array.isRequired,
        height: PropTypes.number,
    };
    static defaultProps = {
        height: 250
    };


    __renderHeader = () => {

        return (
            <View>
                <TouchableOpacity
                    style={{width:100,height:100}}
                    onPress={() => {
                        this.setState({ visible: false })
                    }}>
                    <Image
                        source={require('../../../source/img/visitor/visitor_delete.png')}
                        style={styles.close}/>
                </TouchableOpacity>
            </View>
        )

    }

    render() {

        const { style, imageUrls, height } = this.props


        return (
            <View style={[style]}>
                <Modal visible={this.state.visible} transparent={true}>
                    <ImageViewer
                        imageUrls={imageUrls}
                        onCancel={() => {
                            this.setState({ visible: false })
                        }}
                        renderHeader={this.__renderHeader}
                        failImageSource={{
                            url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
                            width: Dimensions.get("window").width,
                            height: Dimensions.get("window").width
                        }}
                    />
                </Modal>
                <Swiper
                    height={height}
                    showsButtons={false}>
                    {imageUrls.map(item => (
                        <TouchableOpacity
                            style={styles.slide}
                            key={item.url}
                            onPress={() => {
                                this.setState({ visible: true })
                            }}
                        >
                            <Image source={{ uri: item.url }} style={styles.img}/>
                        </TouchableOpacity>
                    ))}
                </Swiper>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    slide: {
        flex: 1,
        backgroundColor: '#9DD6EB',
    },
    img: {
        flex: 1,
    },
    close: {
        marginTop: 25,
        marginLeft: 25,
        width: 25,
        height: 25,
        tintColor: "white"
    }
})