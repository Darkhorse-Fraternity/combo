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
    Image,
} from 'react-native'
import ImagesViewModal from './ImagesViewModal'


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



    render() {

        const { style, imageUrls, height } = this.props

        return (
            <View style={[ styles.wrapper]}>
                <ImagesViewModal
                    visible={this.state.visible}
                    closeCallBack={()=>{
                        this.setState({ visible: false })
                    }}
                    imageUrls={imageUrls}/>
                <View
                    height={height}
                    containerStyle={{flex:1}}
                    showsButtons={false}>
                    {imageUrls.map(item => (
                        <TouchableOpacity
                            style={styles.slide}
                            key={item.url}
                            onPress={() => {
                                this.setState({ visible: true })
                            }}
                        >
                            <Image source={{ uri: item.url }} style={[style,styles.img]}/>
                        </TouchableOpacity>
                    ))}
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
    },
    slide: {
        flex: 1,
    },
    img: {
        flex: 1,
    },


})