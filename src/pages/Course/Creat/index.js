/**
 * Created by lintong on 2018/7/9.
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Dimensions,

} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons'
import { showImagePicker } from '../../../components/ImagePicker/imagePicker'
import {
    StyledContent,
    StyledHeaderImage,
    StyledHeaderItem,
    StyledActivietyView,
    StyledActivityIndicator
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import Button from '../../../components/Button'
import { formValueSelector } from 'redux-form/immutable'
import CourseForm, { FormID } from '../../../components/Form/Course'
import { uploadImages } from '../../../redux/actions/util'
import { update, updateByID,findByID } from '../../../redux/module/leancloud'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import { COURSE } from '../../../redux/reqKeys'
import { deleteFile } from '../../../request/leanCloud'
import { load, req } from "../../../redux/actions/req";
import Toast from 'react-native-simple-toast'

const selector = formValueSelector(FormID)

@connect(
    (state, props) => ({
        coverLoad: state.req.get('CourseCover'),
        course: state.normalizr.get(COURSE).get(props.navigation.state.params.CourseId),
        courseLoad:state.req.get(COURSE).get('load')
    }),
    (dispatch, props) => ({

        load: () => {
            const id = props.navigation.state.params.CourseId
            findByID(COURSE, id)
        },

        onSubmit:  () => {
            dispatch(async (dispatch, getState) => {
                const id = props.navigation.state.params.CourseId
                const state = getState()
                const title = selector(state, 'title');
                const subtitle = selector(state, 'subtitle');
                // const cover = selector(state, 'cover');
                const params = { title, subtitle, statu:1}


                updateByID(COURSE,id, params )

                Toast.show('发布成功')
                props.navigation.goBack()
            })

        },
        handleImage: async (url) => {

            const id = props.navigation.state.params.CourseId

            if (url.length > 0) {
                //上传image
                //判断是否有老照片,有的话就删除


                const res = await dispatch(uploadImages([url], 'CourseCover'))
                const img = res.payload[0]
                if (!img) {
                    return null
                }
                const param = {
                    cover: {
                        "id": img.id,
                        "__type": "File",
                        url: img.attributes.url
                    }
                }

                const res2 = await update(id, param, COURSE)
                const entity = {
                    ...param,
                    ...res2
                }



                dispatch((dispatch, getstate) => {
                    const state = getstate()
                    const course = state.normalizr.get(COURSE).get(props.navigation.state.params.CourseId)
                    const cover = course && course.get('cover')
                    if (cover) {
                        const deleteFileParam = deleteFile(cover.get('objectId'))
                        req(deleteFileParam)
                    }
                })

                dispatch(addNormalizrEntity(COURSE, entity))

                return img.attributes.url

            }


        }
    })
)


export default class CourseCreat extends Component {
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
        !this.props.course && this.props.load()
    }

    // __renderRow = () => {
    //     const load = this.props.imageLoad
    //     let url;
    //     return (
    //         <StyledHeaderItem>
    //             {
    //                 load ?
    //                         <ActivityIndicator/>
    //                     :
    //                     <Button
    //                         style={[ {flex:1,justifyContent:'center', alignItems: url ? null : 'center' }]}
    //                         onPress={this.props.picker}>
    //                         {!url ? (<Icon name="md-add" size={50}/>) :
    //                             (<StyledHeaderImage source={{ uri: url }}/>)}
    //                     </Button>
    //             }
    //         </StyledHeaderItem>
    //     )
    // }

    render(): ReactElement<any> {

        const data = [{ id: 0, img: null, audio: null }, { id: 1, img: null, audio: null }]

        const coverLoad = this.props.coverLoad && this.props.coverLoad.get('load')

        const course = this.props.course
        const cover = course && course.get('cover')

        return (
            <StyledContent>
                {course ? <CourseForm
                        load = {this.props.courseLoad}
                        initialValues={{
                            cover: cover && cover.get('url'),
                            title: course.get('title'),
                            subtitle:course.get('subtitle')
                        }}
                        imageLoad={coverLoad}
                        handleImage={this.props.handleImage}
                        onSubmit={this.props.onSubmit}/> :
                    <StyledActivietyView>
                        <StyledActivityIndicator/>
                    </StyledActivietyView>
                }

            </StyledContent>
        );
    }
}


