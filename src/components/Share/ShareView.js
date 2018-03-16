/**
 * Created by lintong on 2017/6/2.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component, PropTypes} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    Clipboard,
    StyleSheet,
    Dimensions
} from 'react-native'
import {connect} from 'react-redux'
import {mainColor} from '../../configure'
import {Toast} from 'react-native-simple-toast'
import Pop from '../../../src/components/Pop'
import {
    shareTo,
    SHARE_TO_TIMELINE,
    SHARE_TO_SESSION,
    SHARE_TO_QQ,
    Share_TO_ZONE
} from '../../redux/actions/share'


@connect(
    state => ({}),
    dispatch => ({
        share:(type,params)=>{
            shareTo(type,params)
        }
    })
)
export default class ShareView extends Component {
    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }


    render(): ReactElement<any> {

        const item = (source, titel, press) => {
            return (
                <TouchableOpacity onPress={press}>
                    <View style={{paddingHorizontal: 15}}>
                        <Image style={styles.pop_item_image} source={source}/>
                        <Text style={styles.pop_item_text}>{titel}</Text>
                    </View>
                </TouchableOpacity>)

        }

        const share = this.props.share

        return (
            <View style={{backgroundColor: 'white', alignItems: 'center'}}>

                <View style={styles.top}>
                    <TouchableOpacity
                        onPress={() => {
                            Pop.hide()
                        }}
                        hitSlop={{top: 15, left: 25, bottom: 15, right: 15}}
                    >
                        <Image style={styles.delImg}
                               source={require('../../../source/img/visitor/visitor_delete.png')}/>
                    </TouchableOpacity>
                </View>


                <View style={{flexDirection:'row'}}>
                    <View style={styles.pop_item}>
                        {item(require('../../../source/img/icon/朋友圈分享.png'), '朋友圈', () => {
                            share(SHARE_TO_TIMELINE)
                        })}
                    </View>
                    <View style={styles.pop_item}>
                        {item(require('../../../source/img/icon/好友分享.png'), '微信好友', () => {
                            share(SHARE_TO_SESSION)
                        })}
                    </View>
                    <View style={styles.pop_item}>
                        {item(require('../../../source/img/icon/Qzone分享.png'), 'Q-Zone', () => {
                            share(Share_TO_ZONE)
                        })}
                    </View>
                    <View style={styles.pop_item}>
                        {item(require('../../../source/img/icon/QQ分享.png'), 'QQ', () => {
                            share(SHARE_TO_QQ)
                        })}
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    top: {
        marginVertical: 20,
        width: '90%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    delImg: {
        width: 20,
        height: 20
    },
    pop_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 5,
    },
    pop_item_image: {
        width: 50,
        height: 50,
    },
    pop_item_text: {
        fontSize: 13,
        marginTop: 5,
        color: 'rgb(100,100,100)',
        alignSelf: 'center',
    },
    pwd: {
        marginTop: 10,
        color: mainColor,
        fontSize: 56,
    },
    des: {
        marginTop: 5,
        marginBottom: 20,
        fontSize: 17,
    }
})