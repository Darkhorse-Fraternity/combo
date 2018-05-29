/**
 * Created by lintong on 2017/7/12.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { doCardWithNone } from '../../Button/DoCardButton/DoCard'
import moment from 'moment'


import {
    StyledContent,
    StyledCard,
    StyledFace,
    StyledBack,
    StyledFaceText,
    StyledBackText,
    StyledIcon
} from './style'

import { connect } from 'react-redux'

@connect(
    (state, props) => ({
        iUse: state.normalizr.get('iUse').get(props.navigation.state.params.iUse.objectId),

    }),
    (dispatch, props) => ({
        doCard: (data) => {
            dispatch(doCardWithNone(data))
        },

    })
)
export default class DoCardButton extends Component {
    constructor(props: Object) {
        super(props);

        let { iUse } = props
        iUse = iUse && iUse.toJS()

        const done = moment(2, "HH").isBefore(iUse.doneDate.iso)
        // const over = iUse.time === Number(iCard.period)


        this.state = {
            statu: done ? 1 : 0,//0:点击打卡，1：完成打卡，2：再来一组
        };
    }


    static propTypes = {
        iUse: PropTypes.object.isRequired,
    };
    static defaultProps = {};

    componentWillReceiveProps(nextProps) {

        let { iUse } = nextProps
        iUse = iUse && iUse.toJS()

        const done = moment(2, "HH").isBefore(iUse.doneDate.iso)

        if(done && this.state.statu === 0){
            this.setState({ statu: 1})
        }
    }


    render() {
        return (
            <StyledContent
                activeOpacity={1}
                disabled={this.state.statu === 1}
                onPress={() => {
                    // if(this.state.statu ===0){
                    //     this.setState({statu:1})
                    // }else {
                    //     this.setState({statu:0})
                    // }
                    let { iUse } = this.props
                    iUse = iUse && iUse.toJS()
                    this.props.doCard(iUse)

                }}>
                <StyledCard
                    useNativeDriver={true}
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={this.state.statu !== 0}
                    clickable={false}
                    onFlipEnd={(isFlipEnd) => {
                        // console.log('isFlipEnd', isFlipEnd)
                        // this.setState({statu:1})
                    }}
                >
                    {/* Face Side */}
                    <StyledFace>
                        <StyledFaceText>点击{"\n"}打卡</StyledFaceText>
                    </StyledFace>
                    {/* Back Side */}
                    <StyledBack>
                        <StyledIcon
                            ref={this.chatBtnRef}
                            name={'md-checkmark'}
                            size={20}
                            color={'#a6a6a6'}
                            //backgroundColor="transparent"
                            //resizeMode = 'contain'
                            //source={image}
                        />
                        <StyledBackText>已完成</StyledBackText>
                    </StyledBack>
                </StyledCard>
            </StyledContent>
        );
    }
}
