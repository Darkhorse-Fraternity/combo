/**
 * Created by lintong on 2018/7/9.
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
    StyledTitle,
    StyledMain,
    StyledDes,
    StyledHeaderBtn,
    StyledEditBtn
} from './style'
import { update, add ,findByID} from '../../../redux/module/leancloud'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { ICARD,COURSE } from '../../../redux/reqKeys'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import { selfUser, Course } from '../../../request/LCModle'
import  Info from '../../Course/Info'
@connect(
    (state,props) => ({
        iCard: state.normalizr.get(ICARD).get(props.navigation.state.params.iCardID),
        load: state.req.get(ICARD).get('load') || state.req.get(COURSE).get('load'),
        course: state.normalizr.get(COURSE).get(props.navigation.state.params.CourseId)

    }),
    (dispatch,props) => ({
        dataLoad: () => {
            const id = props.navigation.state.params.CourseId
            findByID(COURSE, id)
        },
        add: async () => {

            //创建 Course
            const courseParam = {
                ...selfUser(),
            }
            const course = await add(courseParam, COURSE)
            const courseEntity = {
                ...courseParam,
                ...course
            }
            dispatch(addNormalizrEntity(COURSE, courseEntity))

            const id = props.navigation.state.params.iCardID
            const param = {
                ...Course(course.objectId),
            }
            //
            const res = await  await update(id, param, ICARD)
            //
            const entity = {
                ...param,
                ...res
            }
            dispatch(addNormalizrEntity(ICARD, entity))
            props.navigation.navigate('CourseCreat',{CourseId:course.objectId})
        },
        edit:(CourseId)=>{

            props.navigation.navigate('CourseCreat',{CourseId})

        }
    })
)


export default class CourseRelease extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '',
        }
    };




    componentDidMount() {
        //判断是否存在 course 如果不存在则直接加载一个
        // const course = this.props.iCard.get('course')
        // const courseId = course && course.get('objectId')
        // console.log('courseId:', courseId);
        !this.props.course && this.props.dataLoad()

    }


    render(): ReactElement<any> {


        const courseId = this.props.iCard.get('course')

        // console.log('iCard:', iCard);


        // console.log('courseId:', courseId);


        return (
            <StyledContent>
                <StyledTitle>
                    课程发布
                </StyledTitle>

                {!!courseId &&
                <StyledEditBtn

                    onPress={()=>this.props.edit(courseId)}
                    title={'编辑'}
                />}
                <Info {...this.props} courseId={courseId}/>
                {!courseId && <StyledMain>
                    <StyledDes>
                        还没有课程
                    </StyledDes>
                    <StyledHeaderBtn
                        load={this.props.load}
                        onPress={this.props.add}
                        title={'添加'}/>

                </StyledMain>}
            </StyledContent>
        );
    }
}


