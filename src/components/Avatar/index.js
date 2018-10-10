/**
 * Created by lintong on 2018/9/29.
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
  StyledAvatar,
  StyledIndicator
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';


@connect(
  state => ({
    user: state.user.data,
  }),
  dispatch => ({})
)


export default class Avatar extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

  }

  static propTypes = {
    type: PropTypes.string,
    width: PropTypes.number,
    load: PropTypes.bool
  };
  static defaultProps = {
    type: 'small',
    radius: 40,
    load: false,
  };


  render(): ReactElement<any> {


    const { radius, user, load } = this.props
    const { avatar, headimgurl, } = user
    const avatarUrl = avatar ? avatar.url : headimgurl
    const avatarSource = avatarUrl ? { uri: avatarUrl } :
      require('../../../source/img/my/icon-60.png')

    return (
      <StyledContent radius={radius}>
        {load ? <StyledIndicator radius={radius}/> :
          <StyledAvatar
            radius={radius}
            source={avatarSource}/>}
      </StyledContent>
    );
  }
}

