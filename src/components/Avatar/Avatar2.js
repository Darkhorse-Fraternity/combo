/**
 * Created by lintong on 2018/9/29.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
  StyledContent2,
  StyledAvatar,
  StyledIndicator
} from './style'
import {add_Leancloud_Thumbnail_Suffix} from '../../../helps/util'
// 限定缩略图
// https://developer.qiniu.com/dora/manual/1279/basic-processing-images-imageview2
//?imageView/1/w/10/h/10/q/100/format/png

// @connect(
//   state => ({
//     // user: state.user.data,
//   }),
//   dispatch => ({})
// )


export default class Avatar extends PureComponent {
  constructor(props: Object) {
    super(props);

  }

  static propTypes = {
    type: PropTypes.string,
    radius: PropTypes.number,
    load: PropTypes.bool,

  };
  static defaultProps = {
    type: 'small',
    radius: 30,
    load: false,
  };


  render(): ReactElement<any> {


    const { radius, user, load } = this.props

    const { avatar, headimgurl, } = user
    let avatarUrl = (avatar ? avatar.url : headimgurl)
    avatarUrl = !avatarUrl ?avatarUrl:add_Leancloud_Thumbnail_Suffix(avatarUrl,radius*3,radius*3)
    const avatarSource = avatarUrl ? { uri: avatarUrl } :
      require('../../../source/img/my/my_head.png')


    return (
      <StyledContent2 radius={radius}>
        {load ? <StyledIndicator radius={radius}/> :
          <StyledAvatar
            radius={radius}
            source={avatarSource}/>}
      </StyledContent2>
    );
  }
}


