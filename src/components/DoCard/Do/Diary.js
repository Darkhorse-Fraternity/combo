import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { formValueSelector } from 'redux-form/immutable';
import Do from './Do';


// const BlurView = Platform.OS === 'ios' ? BlurViewIOS : View
import { uploadImages } from '../../../redux/actions/util';
import Pop from '../../Pop/index';

import {
  ICARD, IDO, IUSE, IDOULIMAGE
} from '../../../redux/reqKeys';
import { FormID } from '../../Form/DoCardForm/index';
// static displayName =
import { doCard } from '../DoCard';

@connect(
  state => ({
    // data:state.req.get()
    iCard: state.normalizr.get(ICARD),
    load: state.req.get(IDO).get('load')
    || state.req.get(IDOULIMAGE).get('load')
  }),
  (dispatch, props) => ({
    // ...bindActionCreators({},dispatch),
    done: () => {
      // 先判断是否有图片，如果有则 先上传图片。
      dispatch(async (dispatch, getState) => {
        try {
          const { iUse } = props;
          // const {files, ...otherState} = state

          const state = getState();
          // const iCardM = state.normalizr.get(ICARD).get(data[ICARD]).toJS()


          const selector = formValueSelector(FormID);
          const recordText = selector(state, 'recordText') || '';
          let imgs = selector(state, 'imgs');
          imgs = imgs && imgs.toJS();


          if (recordText.length === 0 && imgs.length === 0) {
            Toast.show('总要记录些什么吧~');
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


          await dispatch(doCard(iUse,
            {
              recordText,
              imgs,
              type: 1,
            }));

          Pop.hide();
        } catch (e) {
          console.log('test:', e.message);
        }
      });
    },
  })
)

export default class Diary extends Component {
  render(): ReactElement<any> {
    const { iUse } = this.props;

    // console.log('ICARD:', data[ICARD]);
    const iCard = this.props.iCard.get(iUse[ICARD]);

    const record = ['文字', '图片'];

    return (
      <Do record={record} {...this.props} iCard={iCard} type={1} />
    );
  }
}

export function recordDiary(iUse) {
  Pop.show(<Diary iUse={iUse} />,
    {
      wrapStyle: { justifyContent: 'flex-start' },
      maskStyle: {
        backgroundColor: 'transparent',
      }
    });
}
