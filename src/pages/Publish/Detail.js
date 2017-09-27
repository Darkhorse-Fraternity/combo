/**
 * Created by lintong on 2017/9/26.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Alert
} from 'react-native'
import {connect} from 'react-redux'
import {backViewColor} from '../../configure'
import {ICARD} from '../../redux/reqKeys'
import {addNormalizrEntity} from '../../redux/module/normalizr'
import {update} from '../../redux/module/leancloud'
import {bindActionCreators} from 'redux';
import BounceBtn from '../../components/Button/BounceBtn'

//static displayName = PublishDetail
@connect(
    (state, props) =>({
        //data:state.req.get()
        iCard: state.normalizr.get(ICARD).get(props.navigation.state.params.iCardID)
    }),
    dispatch =>({
        //...bindActionCreators({},dispatch),
        refresh: async(data) => {
            const id = data.objectId
            const param = {
                state: data.state === 0 ? 1 : 0
            }

            const res = await  await update(id, param, ICARD)

            const entity = {
                ...param,
                ...res
            }
            dispatch(addNormalizrEntity(ICARD, entity))
        },
    })
)
export  default  class PublishDetail extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        const {navigation} = props;
        const {state} = navigation;
        const {params} = state;
        return {
            title: params.title,
        }
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }


    __alert = (iCard)=> {
        Alert.alert(
            '确定取消发布?',
            '取消发布后意味着您不再提供服务',
            [{text: '取消'}, {
                text: '确定', onPress: () => {
                    this.props.refresh(iCard)
                }
            }]
        )
    }

    render(): ReactElement<any> {
        const iCard = this.props.iCard.toJS()
        return (
            <View style={[this.props.style,styles.wrap]}>
                <BounceBtn
                    style={{height:120}}
                    color="#rgb(136,175,160)"
                    radius={60}
                    moveColor="#rgba(136,175,160,0.4)"
                    onPress={()=>{
                    this.props.navigation.navigate('OptionView',{opData:iCard})
                }}
                    title="修改配置"/>
                <BounceBtn
                    style={{height:120,}}
                    radius={60}
                    color="#rgb(156,175,110)"
                    moveColor="#rgba(156,175,110,0.4)"
                    onPress={ ()=>{
                        if(iCard.state == 0){
                            this.props.refresh(iCard)
                        }else{
                            this.__alert(iCard)
                        }
                        }}
                    title={iCard.state === 0?"马上发布":'取消发布'}/>
                <BounceBtn
                    style={{height:120}}
                    color="#rgb(136,175,130)"
                    radius={60}
                    moveColor="#rgba(136,175,130,0.4)"
                    onPress={()=>{
                    this.props.navigation.navigate('Serve',{iCard})
                }}
                    title="查看记录"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: backViewColor,
        flexDirection: 'row'
    },
})
