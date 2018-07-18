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
    ActivityIndicator,
    View
} from 'react-native'
import theme from '../../../Theme'



import {
    StyledContent,
    StyledCard,
    StyledFace,
    StyledBack,
    StyledFaceText,
    StyledBackText,
    StyledIcon
} from './style'


import * as Animatable from 'react-native-animatable';
export const AniStyledContent = Animatable.createAnimatableComponent(StyledContent);

import { shouldComponentUpdate } from 'react-immutable-render-mixin';


export default class FlipButton extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);


        // this.state = {
        //     statu: done ? 1 : 0,//0:点击打卡，1：完成打卡，2：再来一组
        // };
    }


    static propTypes = {
        statu: PropTypes.number,
        faceText: PropTypes.string.isRequired,
        backText: PropTypes.string.isRequired,
        load: PropTypes.bool,
    };
    static defaultProps = {
        statu: 0,
        load: true,
        animation:'bounceInRight'
    };


    render() {
        // console.log('test:', this.state.statu !== 0 || this.props.load);
        const {
            style ,
            onPress,
            containStyle,
            disabled,
            load,
            statu,
            faceText,
            backText,
            animation
        } = this.props


        return (
            <AniStyledContent
                useNativeDriver
                duration={2000}
                easing="ease-in-out"
                animation={animation}
                style={style}
                activeOpacity={1}
                disabled={disabled || load}
                onPress={onPress}>
                <StyledCard
                    useNativeDriver={true}
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={statu !== 0 && !load}
                    clickable={false}
                    onFlipEnd={(isFlipEnd) => {
                        // console.log('isFlipEnd', isFlipEnd)
                        // this.setState({statu:1})
                    }}
                >
                    {/* Face Side */}
                    <StyledFace style={containStyle}>
                        {!load && statu === 0 ?
                            (<StyledFaceText>{faceText}</StyledFaceText>) :
                            (<ActivityIndicator size="small"
                                                color={theme.normalBtn.activityIndicatorColor}/>)
                        }
                    </StyledFace>
                    {/* Back Side */}
                    <StyledBack style={containStyle}>


                        <StyledIcon
                            ref={this.chatBtnRef}
                            name={'md-checkmark'}
                            size={20}
                            color={'green'}
                            //backgroundColor="transparent"
                            //resizeMode = 'contain'
                            //source={image}
                        />
                        <StyledBackText>{backText}</StyledBackText>

                    </StyledBack>
             </StyledCard>
            </AniStyledContent>
        );
    }
}
