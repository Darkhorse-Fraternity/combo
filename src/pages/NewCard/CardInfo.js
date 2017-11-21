/**
 * Created by lintong on 2017/11/20.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    ScrollView
} from 'react-native'
import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux';
// import styled from 'styled-components/native';
import {ICARD, USER} from '../../redux/reqKeys'
import {getUserByID} from '../../request/leanCloud'
import {req} from '../../redux/actions/req'
//static displayName = CardInfo
@connect(
    (state,props) => ({
        //data:state.req.get()
        iCard: state.normalizr.get(ICARD).get(props.navigation.state.params.iCard.objectId),
        user: state.normalizr.get(USER).get(props.navigation.state.params.iCard.user),
    }),
    (dispatch,props) => ({
        //...bindActionCreators({},dispatch),
        loadUser:(user)=>{


            if(!user.username && user.objectId){
                console.log('user:', props);
                const param = getUserByID(user.objectId)
                req(param,USER,{'normalizr':true})

            }
        }
    })
)
export default class CardInfo extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
        }
    };


    componentDidMount() {
        this.props.loadUser(this.props.user.toJS())
    }

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    render(): ReactElement<any> {
        const iCard = this.props.iCard.toJS()
        return (
            <ScrollView style={[this.props.style, styles.wrap]}>
                <Image source={{uri:iCard.img.url}} style={styles.img}/>
                <Text>
                    {iCard.title}
                </Text>
                <Text>
                    周期：{iCard.period}
                </Text>
                <Text>
                    记录模式：{iCard.record.join("+")}
                </Text>
                <Text>
                    关键字：{iCard.keys.join("+")}
                </Text>
                <Text>
                    使用人数：{iCard.useNum}
                </Text>
                <Text>
                    提醒时间：{iCard.notifyTime}
                </Text>
            </ScrollView>
        );
    }
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor:'white',
    },
    img: {
        width:width,
        height:width* 0.7,
    }
})
