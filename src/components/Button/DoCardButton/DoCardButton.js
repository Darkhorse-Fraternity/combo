/**
 * Created by lintong on 2017/7/12.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { doCardWithNone } from '../../Button/DoCardButton/doCardWithNone'
import moment from 'moment'
import {
    ActivityIndicator,
    View,
    Platform
} from 'react-native'
import theme from '../../../Theme'

import {
    StyledContent,
} from './style'
import { IDO } from '../../../redux/reqKeys'
import * as Animatable from 'react-native-animatable';
export const AniStyledContent = Animatable.createAnimatableComponent(StyledContent);
// import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import FlipButton from '../FlipButton'


import { connect } from 'react-redux'

@connect(
    (state, props) => ({
        // iUse: state.normalizr.get(IUSE).get(props.navigation.state.params.iUse.objectId),
        load: state.req.get(IDO).get('load'),
    }),
    (dispatch, props) => ({
        doCard: async (data) => {
          return  await dispatch(doCardWithNone(data))
        },

    })
)
export default class DoCardButton extends Component {
    constructor(props: Object) {
        super(props);
        // this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

        let { iUse } = props
        iUse = iUse && iUse.toJS()


        const done = iUse? moment(2, "HH").isBefore(iUse.doneDate.iso) :false
        // const over = iUse.time === Number(iCard.period)


        this.state = {
            statu: done ? 1 : 0,//0:点击打卡，1：完成打卡，2：再来一组
        };
    }


    static propTypes = {
        iUse: PropTypes.object.isRequired,
        animation:PropTypes.string,
        afterDone:PropTypes.func

    };
    static defaultProps = {
        animation:Platform.OS === 'ios'?'bounceIn':'bounceInRight'
    };


    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.statu !== nextState.statu ||
    //         this.props.load !== nextProps.load
    // }
    //
    componentWillReceiveProps(nextProps) {

        let { iUse } = nextProps
        iUse = iUse && iUse.toJS()

        const done = iUse ?moment(2, "HH").isBefore(iUse.doneDate.iso):false

        if (done && this.state.statu === 0) {
            this.setState({ statu: 1 })
        }
    }


    render() {
        // console.log('test:', this.state.statu !== 0 || this.props.load);
        const {animation,load} = this.props


        return (
            <FlipButton
                faceText={`点击${"\n"}打卡`}
                backText={'已完成'}
                disabled={this.state.statu !== 0}
                // animation={}
                load={load}
                flip={this.state.statu !== 0}
                onPress={async () => {
                    let { iUse } = this.props
                    iUse = iUse && iUse.toJS()
                    const res =  await this.props.doCard(iUse)
                    this.props.afterDone &&  this.props.afterDone(res)

                }}
                containStyle={{width:70,height:70,borderRadius:35}}
                style={{ zIndex: 10,
                    position: 'absolute',
                    right: 10,
                    bottom:  50}}/>
        )

    }
}
