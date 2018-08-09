/**
 * Created by lintong on 2018/8/8.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import {
    StyledContent,
} from './style'
import {
    COURSE,
} from '../../../redux/reqKeys'
import CourseRow from './CourseRow'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';


@connect(
    (state, props) => ({
        course: state.normalizr.get(COURSE).get(props.courseId)
    }),
    dispatch => ({})
)


export default class CourseRowList extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};


    render(): ReactElement<any> {

        const { course } = this.props
        let ppt = course.get('ppt')
        ppt = ppt && ppt.toJS()
        console.log('ppt:', ppt);

        return ppt ? ppt.map((item,index)=>{
            return (
                <CourseRow key={index} item ={item} />
            )
        }):[];
    }
}


