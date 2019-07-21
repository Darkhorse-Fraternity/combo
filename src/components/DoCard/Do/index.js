import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { formValueSelector } from 'redux-form/immutable';
import DoWithLoad from './DoWithLoad';


// const BlurView = Platform.OS === 'ios' ? BlurViewIOS : View
import { uploadImages, localRemind } from '../../../redux/actions/util';
import Pop from '../../Pop/index';

import {
  ICARD, IDO, IDOULIMAGE, IUSE
} from '../../../redux/reqKeys';
import { FormID } from '../../Form/DoCardForm/index';
// static displayName =
import creatIDO from '../DoCard';

@connect(
  state => ({
    // data:state.req.get()
    // iCard: state.normalizr.get(ICARD),
    // load: state.req.get(IDO).get('load')
    // || state.req.get(IDOULIMAGE).get('load')
  }),
  (dispatch, props) => ({
    // ...bindActionCreators({},dispatch),
    done: (type = 0, doneDate = new Date()) =>
    // 先判断是否有图片，如果有则 先上传图片。
    // console.log('done');

      dispatch(async (dispatch, getState) => {
        try {
          console.log('xxxxx');

          const { iUse } = props;
          const state = getState();
          // const {files, ...otherState} = state
          // const iUse = state.normalizr.get(IUSE).get(iUseId).toJS();

          const iCardM = state.normalizr.get(ICARD).get(iUse[ICARD]).toJS();


          const selector = formValueSelector(FormID);
          const recordText = selector(state, 'recordText') || '';
          let imgs = selector(state, 'imgs');
          imgs = imgs && imgs.toJS();


          if (iCardM.record.indexOf('文字') !== -1 && recordText.length === 0) {
            Toast.show('需要添加文字记录~');
            return;
          }

          if (iCardM.record.indexOf('图片') !== -1 && imgs.length === 0) {
            Toast.show('需要添加图片~');
            return;
          }


          if (imgs.length !== 0) {
            const urls = imgs.map(file => file.uri);
            const res = await dispatch(uploadImages(urls, IDOULIMAGE));
            if (!res.payload) {
              return;
            }
            imgs = res.payload.map(img => img.attributes.url);
          }


          const iDoRes = await dispatch(creatIDO(iUse, iCardM,
            {
              recordText,
              imgs,
              type,
              doneDate,
            }));

          // Pop.hide();
          return iDoRes;
        } catch (e) {
          console.log('test:', e.message);
        }
      })
    ,
  })
)

export default class Do extends Component {
  render(): ReactElement<any> {
    const {
      type = 0,
      done,
      record,
      doneDate,
      iUseId,
      ...otherProps
    } = this.props;
    // const iCard = this.props.iCard.get(iUse[ICARD]);

    // record 强制类型需要

    return (
      <DoWithLoad
        record={record}
        localSaveID={iUseId}
        done={() => done(type, doneDate)}
        type={type}
        {...otherProps}
      />
    );
  }
}
