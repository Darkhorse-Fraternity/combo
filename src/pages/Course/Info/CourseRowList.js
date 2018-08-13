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
import ImagesViewModal from '../../../components/ZoomImage/ImagesViewModal'
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
        this.state = {
            visible: false,
            index:0
        }
    }

    static propTypes = {};
    static defaultProps = {};


    render(): ReactElement<any> {

        const { course } = this.props
        let ppt = course.get('ppt')
        ppt = ppt && ppt.toJS()
        console.log('ppt:', ppt);

        const urlList = ppt && ppt.map(item => {
            return {
                url: item.img.url
            }
        }) || []


        return ppt ? [
            <ImagesViewModal
                visible={this.state.visible}
                index={this.state.index}
                closeCallBack={() => {
                    this.setState({ visible: false,index:0 })
                }}
                imageUrls={ [...urlList]}/>,
            ...ppt.map((item,index)=>{
            return (
                <CourseRow
                    onPress={()=>{
                        this.setState({ visible: true,index:index })
                    }}
                    key={index}
                    item ={item} />
            )
        })]:[];
    }
}


