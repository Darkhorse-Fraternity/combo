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
import {
  StyledContent,
  StyledHeaderImage,
  StyledHeaderItem,
  StyledActivietyView,
  StyledActivityIndicator,

} from './style'
import { Map } from 'immutable';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import Button from '../../../components/Button'
import { formValueSelector } from 'redux-form/immutable'
import CourseForm, { FormID } from '../../../components/Form/Course'
import { uploadImages } from '../../../redux/actions/util'
import { update, updateByID, findByID } from '../../../redux/module/leancloud'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import { COURSE } from '../../../redux/reqKeys'
import { deleteFile } from '../../../request/leanCloud'
import { load, req } from "../../../redux/actions/req";
import Toast from 'react-native-simple-toast'
import { showImagePicker } from '../../../components/ImagePicker/imagePicker'
import { CourseStatu } from '../../../configure/enum'

const selector = formValueSelector(FormID)

@connect(
  (state, props) => ({
    coverLoad: state.req.get('CourseCover'),
    course: state.normalizr.get(COURSE).get(props.navigation.state.params.CourseId),
    courseLoad: state.req.get(COURSE).get('load')
  }),
  (dispatch, props) => ({

    load: () => {
      const id = props.navigation.state.params.CourseId
      return dispatch(findByID(COURSE, id))
    },

    onSubmit: (cance) => {
      dispatch(async (dispatch, getState) => {
        const id = props.navigation.state.params.CourseId
        const state = getState()

        // const course = state.normalizr.get(COURSE).get(props.navigation.state.params.CourseId)
        if (cance) {
          return await  dispatch(updateByID(COURSE, id, {
            statu: CourseStatu.close
          }))
        }


        const title = selector(state, 'title');
        const subtitle = selector(state, 'subtitle');
        let cover = selector(state, 'cover')
        const ppt = selector(state, 'ppt')

        //修改本地保存
        storage.save({
          key: "course",
          id,  //注意:请不要在key中使用_下划线符号!
          data: {
            title,
            cover,
            subtitle,
            ppt,
          },
        });
        cover = {
          "id": cover.get('id'),
          "__type": "File",
          url: cover.get('url')
        }
        // const cover = selector(state, 'cover');
        const params = {
          title,
          cover,
          subtitle,
          ppt,
          statu: CourseStatu.open
          // statu: course.get('statu') === 0 ? 1 : 0
        }


        const res = await  dispatch(updateByID(COURSE, id, params))
        Toast.show('发布成功')
        return res;
        // props.navigation.goBack()
      })

    },
    handleImage: async (onChange) => {

      const id = props.navigation.state.params.CourseId


      const response = await showImagePicker({
        title: '添加封面',
        maxWidth: 2000, // photos only
        maxHeight: 2000, // photos only
      })

      const { uri } = response

      if (uri.length > 0) {
        //上传image
        //判断是否有老照片,有的话就删除


        const res = await dispatch(uploadImages([uri], 'CourseCover'))
        const img = res.payload[0]
        // if (!img) {
        //     return null
        // }
        // const param = {
        //     cover: {
        //         "id": img.id,
        //         "__type": "File",
        //         url: img.attributes.url
        //     }
        // }

        // const res2 = await update(id, param, COURSE)
        // const entity = {
        //     ...param,
        //     ...res2
        // }


        // dispatch((dispatch, getstate) => {
        //     const state = getstate()
        //     const course = state.normalizr.get(COURSE).get(props.navigation.state.params.CourseId)
        //     const cover = course && course.get('cover')
        //     if (cover) {
        //         const deleteFileParam = deleteFile(cover.get('objectId'))
        //         req(deleteFileParam)
        //     }
        // })

        // dispatch(addNormalizrEntity(COURSE, entity))


        if (img) {
          onChange(new Map({ id: img.id, url: img.attributes.url }))
        }


      }


    }
  })
)


export default class CourseCreat extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    this.state = {
      getSave: false,
    }

    const id = props.course.get('objectId')
    storage.load({
      key: "course",
      id,
    }).then(localSave => {
      this.setState({
        getSave: true,
        localSave
      })
    }).catch(e => {
      this.setState({
        getSave: true,
      })
    })

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


    const coverLoad = this.props.coverLoad && this.props.coverLoad.get('load')

    const course = this.props.course
    const cover = course && course.get('cover')


    const initialValues = {
      cover: new Map({
        url: cover && cover.get('url'),
        id: cover && cover.get('objectId')
      }),
      title: course.get('title'),
      subtitle: course.get('subtitle'),
      ppt: course.get('ppt'),
      ...this.state.localSave,
    }
    // console.log('cover:', cover);


    return (
      <StyledContent>
        {course && this.state.getSave ? <CourseForm
            {...this.props}
            load={this.props.courseLoad}
            initialValues={initialValues}
            cance={course.get('statu') === CourseStatu.open}
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


