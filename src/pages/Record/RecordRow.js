/**
 * Created by lintong on 2018/1/8.
 * @flow
 */
'use strict';

// import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Easing,
    Image,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import ZoomImage from 'react-native-zoom-image';
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'
//static displayName = RecordRow
@connect(
    state => ({
        //data:state.req.get()
        user: state.user.data
    }),
    dispatch => ({
        //...bindActionCreators({},dispatch),
    })
)
export default class RecordRow extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {
        item: PropTypes.object.isRequired,
        navigation: PropTypes.object,
        showChat: PropTypes.bool
    };
    static defaultProps = {
        showChat: true
    };


    // shouldComponentUpdate(nextProps: Object) {
    //     return !immutable.is(this.props, nextProps)
    // }

    chatBtnRef = 0
    _renderChatBtn = (item) => {
        const { commentNew, commentNum, user } = item

        return (
            <View
                onPress={() => {
                    this.props.navigation &&
                    this.props.navigation.navigate('RComment', { data: item })
                }}
                style={styles.chatbtn}
            >
                {/*<Image style={{width:20,height:20}} source={icon}/>*/}


                {commentNew && user.objectId === this.props.user.objectId
                && (<View style={styles.newTip}/>)}

                <Icon
                    ref={this.chatBtnRef}
                    name={'ios-chatbubbles-outline'}
                    size={25}
                    color={'black'}
                    //backgroundColor="transparent"
                    //resizeMode = 'contain'
                    //source={image}
                    style={styles.icon}/>
                {commentNum > 0 && (<Text
                    numberOfLines={1}
                    style={[styles.chatBtnText,]}>{item.commentNum}</Text>)}
                {/*<Text style={[styles.tabLinkText,{color:focused?"#0093cb":'rgb(150,150,150)'}]}>{tabInfo.label}</Text>*/}
            </View>
        )
    }

    _renderDone = () => {
        return (
            <Icon
                ref={this.chatBtnRef}
                name={'md-checkmark'}
                size={25}
                color={'green'}
                //backgroundColor="transparent"
                //resizeMode = 'contain'
                //source={image}
                style={styles.icon}/>
        )
    }

    render(): ReactElement<any> {
        const { item } = this.props
        if (!item) return null
        const img = item.imgs && item.imgs[0] || null
        console.log('test:',item, img);
        const date = moment(item.createdAt).format("YYYY-MM-DD HH:mm")
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    this.props.navigation &&
                    this.props.navigation.navigate('RComment', { data: item })
                }}
                style={[this.props.style, styles.wrap]}>
                {img && (<Image
                    // easingFunc={Easing.bounce}
                    style={styles.image}
                    source={{ uri: img }}/>)}
                <View style={styles.bottom}>
                    {!!item.recordText && (<Text numberOfLines={1}
                                                 style={styles.text}>
                        {item.recordText}
                    </Text>)}
                    <View style={styles.dateView}>
                        <Text style={styles.date}>
                            {date}
                        </Text>
                        {this.props.showChat ?
                            this._renderChatBtn(item) :
                            this._renderDone()}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    wrap: {
        // flex: 1,
        // marginBottom:2,
    },
    bottom: {
        marginTop: 5,
        marginBottom: 5,
        // flexDirection: 'row',
        // width: '100%',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        paddingHorizontal: 15,
    },
    dateView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: width * 0.7,
    },
    newTip: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',
        marginRight: 5
    },
    date: {
        fontSize: 15,
        color: 'rgb(100,100,100)',
        paddingVertical: 3,
        // paddingHorizontal: 5,
    },
    text: {
        paddingVertical: 3,
        // paddingHorizontal: 5,
        fontSize: 16,
        color: 'rgb(50,50,50)'
    },
    icon: {
        alignSelf: 'center'
    },
    chatbtn: {
        justifyContent: 'space-between',
        margin: 4,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatBtnText: {
        marginLeft: 5,
    }
})
