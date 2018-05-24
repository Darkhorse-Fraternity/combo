/**
 * Created by lintong on 2017/7/12.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FlipCard from 'react-native-flip-card'


import {
    View,
    StyleSheet
} from 'react-native'



export default class DoCardButton extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {};
    }


    static propTypes = {};
    static defaultProps = {};


    render() {
        const {title, radius} = this.props
        // console.log('radius:', radius);
        return (
            <View
                style={styles.card}
                friction={6}
                perspective={1000}
                flipHorizontal={true}
                flipVertical={false}
                flip={false}
                clickable={true}
                onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
            >
                {/* Face Side */}
                <View style={styles.face}>
                    <Text>The Face</Text>
                </View>
                {/* Back Side */}
                <View style={styles.back}>
                    <Text>The Back</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    card: {
        width:200,
    },
    face: {
        flex:1,
        backgroundColor: '#2ecc71',
        justifyContent: 'center',
        alignItems: 'center',
    },
    back: {
        flex:1,
        backgroundColor: '#f1c40f',
        justifyContent: 'center',
        alignItems: 'center',
    },
});