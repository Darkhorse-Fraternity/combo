/**
 * Created by lintong on 2018/8/8.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    Dimensions
} from 'react-native'
import PropTypes from 'prop-types';


import {
    StyledRow,
    StyledImg,
    StyledBottomText,
    StyledRowInner
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';


export default class CourseRow extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};


    render(): ReactElement<any> {


        const { item } = this.props
        const { text, img } = item
        const url = img.url

        return (
            <StyledRow>
                <StyledRowInner>
                    <StyledImg
                        key={'img'}
                        width={Dimensions.get('window').width - 30}
                        source={{ uri: url }}/>
                    {text ? <StyledBottomText
                        style={{
                            color: 'rgb(150,150,150)',
                            margin: 15
                        }}>
                        {text}
                    </StyledBottomText>:<View style={{height:2}}/>}
                </StyledRowInner>

            </StyledRow>
        );
    }
}

