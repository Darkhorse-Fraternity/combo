/**
 * Created by lintong on 2017/7/12.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import * as Animatable from 'react-native-animatable';

export const Btn = Animatable.createAnimatableComponent(TouchableWithoutFeedback);
// function makeSlideInTranslation(translationType, fromValue) {
//     return {
//         from: {
//             [translationType]: 0,
//         },
//         to: {
//             [translationType]: fromValue,
//         },
//     };
// }
// const slideOutDownBig = makeSlideInTranslation('translateY', 10);
// Animatable.initializeRegistryWithDefinitions({slideOutDownBig})

function makeScaleInTranslation(translationType, fromValue) {
    return {
        from: {
            [translationType]: 0.9,
        },
        to: {
            [translationType]: fromValue,
        },
    };
}

const scaleSpring = makeScaleInTranslation('scale', 1);
Animatable.initializeRegistryWithDefinitions({scaleSpring})

export default class SmallDoneBtn extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {};
    }


    static propTypes = {
        radius: PropTypes.number,
    };
    static defaultProps = {
        radius: 20
    };
    static
    navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '主页',
        }
    };

    render() {
        const {title, radius} = this.props
        // console.log('radius:', radius);
        return (
            <TouchableWithoutFeedback
                hitSlop={{top: 50, left: 50, bottom: 50, right: 50}}
                onPress={this.props.onPress}>
                <View style={styles.background1}>
                    <View style={styles.background2}>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
const styles = StyleSheet.create({

    background1: {
        height: 20,
        width: 20,
        backgroundColor: 'rgba(200,200,200,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    background2: {
        height: 10,
        width: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        width: 40,
        color: 'white',
        textAlign: 'center',
        lineHeight: 18,
        fontSize: 16,
    }
})