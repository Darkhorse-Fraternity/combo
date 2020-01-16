/**
 * Created by lintong on 2017/6/2.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    Image,
    Clipboard,
    StyleSheet,
    Dimensions,
    TouchableNativeFeedback
} from 'react-native'
import Pop from '../../../Pop/index'
import {
    StyledIcon,
    StyledRowInnerView
} from './style'

import Button from '../../../Button'


export default class ListRadioView extends Component {
    // shouldComponentUpdate(nextProps: Object) {
    //     return !immutable.is(this.props, nextProps)
    // }


    shouldComponentUpdate(nextProps: Object) {
        return false //有点卡，强制不可更新
    }


    render(): ReactElement<any> {

        const itemView = (item, index) => {
            return (
                <Button
                    key={item}
                    style={{}}
                    onPress={() => {
                        Pop.hide()
                        this.props.onPress && this.props.onPress(index)
                    }}>
                    <StyledRowInnerView>
                        <Text style={styles.pop_item_text}>{item}</Text>
                        {this.props.selectedIndex === index &&  <StyledIcon
                            ref={this.chatBtnRef}
                            name={'md-checkmark'}
                            size={25}
                            color={'green'}
                            //backgroundColor="transparent"
                            //resizeMode = 'contain'
                            //source={image}
                        />}
                    </StyledRowInnerView>
                    <View style={styles.line}/>
                </Button>)

        }


        // console.log('this.props:', this.props);
        return (


            <View style={{ backgroundColor: 'white' }}>

                <View style={styles.top}>
                    <Button
                        background={TouchableNativeFeedback.SelectableBackgroundBorderless &&
                        TouchableNativeFeedback.SelectableBackgroundBorderless()}
                        onPress={() => {
                            Pop.hide()
                        }}
                        hitSlop={{ top: 15, left: 25, bottom: 15, right: 15 }}
                    >
                        <Image style={styles.delImg}
                               source={require('../../../../../source/img/visitor/visitor_delete.png')}/>
                    </Button>
                </View>


                <View style={{ paddingBottom: 20 }}>
                    {this.props.items.map((item, index) => {
                        return itemView(item, index)
                    })}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    top: {
        marginVertical: 20,
        width: '95%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    delImg: {
        width: 20,
        height: 20
    },

    pop_item_text: {
        fontSize: 17,
        color: 'rgb(100,100,100)',
        textAlign: 'left',
        marginLeft: 15,
    },
    line: {
        backgroundColor: 'rgb(200,200,200)',
        width: "100%",
        height: StyleSheet.hairlineWidth,
        marginLeft: 15,
    }

})