import Do from './Do'
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// const BlurView = Platform.OS === 'ios' ? BlurViewIOS : View
import { uploadImages } from '../../../redux/actions/util'
import Pop from '../../../components/Pop/index'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast'

import { ICARD, IDO, IUSE, IDOULIMAGE } from '../../../redux/reqKeys'
import DoCardForm, { FormID } from '../../../components/Form/DoCardForm/index'
//static displayName =
import { doCard } from '../../../components/Button/DoCardButton/DoCard'
import { formValueSelector } from 'redux-form/immutable'

@connect(
  state => ({
    //data:state.req.get()
    iCard: state.normalizr.get(ICARD),
    load: state.req.get(IDO).get('load') ||
    state.req.get(IDOULIMAGE).get('load')
  }),
  (dispatch, props) => ({
    //...bindActionCreators({},dispatch),
    done: () => {
      //先判断是否有图片，如果有则 先上传图片。
      dispatch(async (dispatch, getState) => {

        try {

          const data = props.data;
          // const {files, ...otherState} = state

          const state = getState()
          const iCardM = state.normalizr.get(ICARD).get(data[ICARD]).toJS()


          const selector = formValueSelector(FormID)
          const recordText = selector(state, 'recordText') || ""
          let imgs = selector(state, 'imgs')
          imgs = imgs && imgs.toJS()


          if (recordText.length === 0 || imgs.length === 0) {
            Toast.show('总要记录些什么吧~')
            return;
          }


          if (imgs.length !== 0) {
            const urls = imgs.map(file => file.uri)
            const res = await dispatch(uploadImages(urls, IDOULIMAGE))
            if (!res.payload) {
              return
            }
            imgs = res.payload.map(img => img.attributes.url)
          }


          await dispatch(doCard(data,
            {
              recordText,
              imgs,
              type:1,
            }))

          Pop.hide()

        } catch (e) {
          console.log('test:', e.message);
        }

      })


    },
  })
)

export default class Diary extends Component {
  render(): ReactElement<any> {

    // const data = this.props.data
    // const iCard = this.props.iCard.get(data[ICARD]).toJS()
    const record = ['文字', '图片']

    return (
      <Do record={record} {...this.props} type={1}/>
    )
  }

}

